<!--
功能介绍：
1、自定义提示内容 - text
2、自定义主题背景 - theme(默认#303133)
 -->

<script type="text/babel">
  export default {
    name: 'Tooltip',
    data: function () {
      return {
        id: 'tooltip_' + new Date().getTime() + parseInt(Math.random() * 100),
        slotDom: '',
        tooltipDom: ''
      };
    },
    props: {
      text: '',
      theme: {
        default: '#303133'
      }
    },
    watch: {
      text: function (val) {
        this.reRendDomAttr(val);
      },
      theme: function (val) {
        this.reRendDomAttr('', val);
      },
      'tooltipDom.top': {
        deep: true,
        handler: function (val) {
          alert(val);
          this.tooltipDom.dom.style.top = val + 'px';
          // dom.setAttribute('style', 'background-color: ' + this.theme);
        }
      }
    },
    computed: {
      //
    },
    render: function (createElement) {
      let dom = (function (children) {
        return children && children.filter(c => {
          return c && c.tag;
        })[0];
      }(this.$slots.default));
      
      this.$nextTick(function () {
        if (dom.elm) {
          this.slotDom = {
            dom: dom.elm,
            left: dom.elm.offsetLeft,
            top: dom.elm.offsetTop,
            width: dom.elm.offsetWidth,
            height: dom.elm.offsetHeight
          };
        }
      });
      return dom;
    },
    beforeDestroy: function () {
      //
    },
    destroyed: function () {
      this.removeDom();
    },
    mounted: function () {
      this.$nextTick(function () {
        this.rendDom();
      });
    },
    methods: {
      // 1、渲染提示框
      // 2、设置计算提示框位置
      // 
      // 手动渲染提示 DOM
      rendDom: function () {
        let dom = document.createElement('p');
        let triangle = document.createElement('i');

        dom.setAttribute('id', this.id);
        dom.setAttribute('class', 'tooltip');
        dom.setAttribute('style', 'background-color: ' + this.theme);
        dom.innerText = this.text;

        triangle.setAttribute('class', 'cicon-triangle-right');
        triangle.setAttribute('style', JSON.stringify({
          'color': this.theme,
          'top': '130px'
        }).replace(/[{}"]/g, '').replace(/,/g, ';'));
        dom.appendChild(triangle);

        document.body.appendChild(dom);
        // 获取提示 DOM的基本属性
        this.tooltipDom = {
          dom: dom,
          width: dom.offsetWidth,
          height: dom.offsetHeight
        };
        this.setTooltipPostn();
      },
      // 获取slot元素
      getSlotDom: function () {
        return this.tooltipDom.dom;
      },
      // 手动移除提示 DOM
      removeDom: function () {
        let dom = this.getSlotDom();

        dom && document.body.removeChild(dom);
      },
      // 手动更新提示内容
      reRendDomAttr: function (text, theme) {
        let dom = this.getSlotDom();
        let triangle = dom && dom.querySelector('[class^=cicon-triangle]');

        if (text) {
          dom && (dom.innerText = text);
        }
        if (theme) {
          dom && (dom.setAttribute('style', 'background-color: ' + theme));
          triangle && (triangle.setAttribute('style', 'color: ' + theme));
        }
      },
      // 计算提示 DOM的相对位置
      setTooltipPostn: function (type) {
        // this.slotDom.left;
        // this.slotDom.top;
        // this.slotDom.width;
        // this.slotDom.height;

        // this.tooltipDom.width;
        // this.tooltipDom.height;
        // alert(this.slotDom.top);
        this.tooltipDom.top = this.slotDom.top + (this.slotDom.height - this.tooltipDom.height) / 2;
        // console.log(dom);
        // console.log(left);
      }
    }
  };
</script>

<style lang="scss" id="cssTooltip">
  .tooltip {
    position: absolute;
    top: 100px;
    left: 100px;
    padding: 8px 10px;
    color: #fff;
    border-radius: 4px;
    user-select: none;
    z-index: 101;

    >[class^=cicon-triangle] {
      position: absolute;
      font-size: 26px;
    }

    >.cicon-triangle-right {
      margin: auto;
      right: -16px;
      top: 0;
      bottom: 0;
    }
  }
</style>

// import Popper from 'element-ui/src/utils/vue-popper';
// import debounce from 'throttle-debounce/debounce';
// import { addClass, removeClass, on, off } from 'element-ui/src/utils/dom';
// import { getFirstComponentChild } from 'element-ui/src/utils/vdom';
// import { generateId } from 'element-ui/src/utils/util';
// import Vue from 'vue';

//   export default {
//     name: 'ElTooltip',
//     props: {
//       openDelay: {
//         type: Number,
//         default: 0
//       },
//       disabled: Boolean,
//       manual: Boolean,
//       effect: {
//         type: String,
//         default: 'dark'
//       },
//       arrowOffset: {
//         type: Number,
//         default: 0
//       },
//       popperClass: String,
//       content: String,
//       visibleArrow: {
//         default: true
//       },
//       transition: {
//         type: String,
//         default: 'el-fade-in-linear'
//       },
//       popperOptions: {
//         default() {
//           return {
//             boundariesPadding: 10,
//             gpuAcceleration: false
//           };
//         }
//       },
//       enterable: {
//         type: Boolean,
//         default: true
//       },
//       hideAfter: {
//         type: Number,
//         default: 0
//       }
//     },
//     data() {
//       return {
//         timeoutPending: null,
//         focusing: false
//       };
//     },
//     computed: {
//       tooltipId() {
//         return `el-tooltip-${generateId()}`;
//       }
//     },
//     beforeCreate() {
//       if (this.$isServer) return;

//       this.popperVM = new Vue({
//         data: { node: '' },
//         render(h) {
//           return this.node;
//         }
//       }).$mount();

//       this.debounceClose = debounce(200, () => this.handleClosePopper());
//     },
//     render(h) {
//       if (this.popperVM) {
//         this.popperVM.node = (
//           <transition
//             name={ this.transition }
//             onAfterLeave={ this.doDestroy }>
//             <div
//               onMouseleave={ () => { this.setExpectedState(false); this.debounceClose(); } }
//               onMouseenter= { () => { this.setExpectedState(true); } }
//               ref="popper"
//               role="tooltip"
//               id={this.tooltipId}
//               aria-hidden={ (this.disabled || !this.showPopper) ? 'true' : 'false' }
//               v-show={!this.disabled && this.showPopper}
//               class={
//                 ['el-tooltip__popper', 'is-' + this.effect, this.popperClass]
//               }>
//               { this.$slots.content || this.content }
//             </div>
//           </transition>);
//       }

//       if (!this.$slots.default || !this.$slots.default.length) return this.$slots.default;

//       const vnode = getFirstComponentChild(this.$slots.default);

//       if (!vnode) return vnode;

//       const data = vnode.data = vnode.data || {};
//       data.staticClass = this.concatClass(data.staticClass, 'el-tooltip');

//       return vnode;
//     },
//     mounted() {
//       this.referenceElm = this.$el;
//       if (this.$el.nodeType === 1) {
//         this.$el.setAttribute('aria-describedby', this.tooltipId);
//         this.$el.setAttribute('tabindex', 0);
//         on(this.referenceElm, 'mouseenter', this.show);
//         on(this.referenceElm, 'mouseleave', this.hide);
//         on(this.referenceElm, 'focus', () => {
//           if (!this.$slots.default || !this.$slots.default.length) {
//             this.handleFocus();
//             return;
//           }
//           const instance = this.$slots.default[0].componentInstance;
//           if (instance && instance.focus) {
//             instance.focus();
//           } else {
//             this.handleFocus();
//           }
//         });
//         on(this.referenceElm, 'blur', this.handleBlur);
//         on(this.referenceElm, 'click', this.removeFocusing);
//       }
//     },
//     watch: {
//       focusing(val) {
//         if (val) {
//           addClass(this.referenceElm, 'focusing');
//         } else {
//           removeClass(this.referenceElm, 'focusing');
//         }
//       }
//     },
//     methods: {
//       show() {
//         this.setExpectedState(true);
//         this.handleShowPopper();
//       },

//       hide() {
//         this.setExpectedState(false);
//         this.debounceClose();
//       },
//       handleFocus() {
//         this.focusing = true;
//         this.show();
//       },
//       handleBlur() {
//         this.focusing = false;
//         this.hide();
//       },
//       removeFocusing() {
//         this.focusing = false;
//       },

//       concatClass(a, b) {
//         if (a && a.indexOf(b) > -1) return a;
//         return a ? b ? (a + ' ' + b) : a : (b || '');
//       },

//       handleShowPopper() {
//         if (!this.expectedState || this.manual) return;
//         clearTimeout(this.timeout);
//         this.timeout = setTimeout(() => {
//           this.showPopper = true;
//         }, this.openDelay);

//         if (this.hideAfter > 0) {
//           this.timeoutPending = setTimeout(() => {
//             this.showPopper = false;
//           }, this.hideAfter);
//         }
//       },

//       handleClosePopper() {
//         if (this.enterable && this.expectedState || this.manual) return;
//         clearTimeout(this.timeout);

//         if (this.timeoutPending) {
//           clearTimeout(this.timeoutPending);
//         }
//         this.showPopper = false;

//         if (this.disabled) {
//           this.doDestroy();
//         }
//       },

//       setExpectedState(expectedState) {
//         if (expectedState === false) {
//           clearTimeout(this.timeoutPending);
//         }
//         this.expectedState = expectedState;
//       }
//     },
//     destroyed() {
//       const reference = this.referenceElm;
//       off(reference, 'mouseenter', this.show);
//       off(reference, 'mouseleave', this.hide);
//       off(reference, 'focus', this.handleFocus);
//       off(reference, 'blur', this.handleBlur);
//       off(reference, 'click', this.removeFocusing);
//     }
//   };