<!-- 
功能介绍：
1、
 -->

<template>
  <transition name="slide-fade">
    <div class="wrap-dialog" :class="{'no-footer': !(buttons&&buttons.length>0)}" :style="{'z-index': zIndex + 1}" v-if="value+''==='true'">
      <i class="cicon-cross-chr" @click="clk_hide"></i>
      <header :style="cstl.header">
        <slot name="title"></slot>
      </header>
      <vperfect-scrollbar :settings="settings">
        <slot name="content"></slot>
      </vperfect-scrollbar>
      <footer :style="cstl.footer" v-if="buttons&&buttons.length>0">
        <template v-for="info in buttons">
          <cmp-button v-if="JSON.stringify(info.fileoption)" :key="info.id" :theme="info.theme" :fileoption="info.fileoption" @cbk_file="clk_file($event,info)">{{info.text}}</cmp-button>
          <cmp-button v-else :key="info.id" :theme="info.theme" :prnt="info.prnt" @click="clk_btn(info)">{{info.text}}</cmp-button>
        </template>
      </footer>
    </div>
  </transition>
</template>

<script type="text/babel">
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import Button from '../../button/index.js';

  export default {
    name: 'Dialog',
    components: {
      'vperfect-scrollbar': VuePerfectScrollbar,
      'cmpButton': Button
    },
    data: function () {
      return {
        id: 'dlg_' + new Date().getTime() + parseInt(Math.random() * 100),
        // 滚动速度，默认1
        settings: {
          wheelSpeed: 0.5
        },
        zIndex: 1000,
        domZz: ''
      };
    },
    props: {
      value: '',
      // 是否模态，即是否产生遮罩效果
      modal: {
        default: true
      },
      // error|success|warning
      type: '',
      stl: {
        type: Object,
        default: function (data) {
          return this.stlDefVal();
        }
      },
      buttons: {
        type: Array,
        default: function () {
          return [{
            text: '确定'
          }, {
            text: '取消',
            // primary|success|info|warning|danger|line|#f56c6c
            theme: 'info'
          }];
        }
      },
      callback: {
        type: Function,
        default: function (data) {
          return function () {
            // 
          };
        }
      }
    },
    watch: {
      value: function (val) {
        if (val + '' === 'true') {
          this.modal + '' === 'true' && this.creatZz();
        } else {
          this.removeZz();
        }
      },
      modal: function (val) {
        // if (val + '' === 'true' && this.value + '' === 'true') {
        //   this.creatZz();
        // } else {
        //   this.removeZz();
        // }
      }
    },
    computed: {
      cstl: function () {
        return Object.assign(this.stlDefVal(), this.stl);
      }
    },
    beforeDestroy: function () {
      window.removeEventListener('keyup', this.evt_keyup);
      this.removeZz();
    },
    mounted: function () {
      window.addEventListener('keyup', this.evt_keyup);
      this.creatZz();
    },
    methods: {
      evt_keyup: function (event) {
        let e = event || window.event;
        let keyCode = e.keyCode;

        if (keyCode === 27 && this.value) {
          this.clk_hide();
        }
      },
      clk_btn: function (data) {
        this.$emit('callback', data);
      },
      clk_file: function (files, data) {
        data.files = files || '';
        this.clk_btn(data);
      },
      clk_hide: function () {
        this.$emit('input', false);
      },
      creatZz: function () {
        if (this.modal + '' === 'true' && this.value + '' === 'true') {
          var dom = document.createElement('div');

          dom.setAttribute('id', this.id);
          dom.setAttribute('class', 'center-hv');
          dom.setAttribute('style', 'position: fixed;background-color: rgba(0, 0, 0, 0.1);z-index: ' + this.zIndex);
          document.body.appendChild(dom);
        }
      },
      removeZz: function () {
        var dom = document.getElementById(this.id);

        dom && (document.body.removeChild(dom));
      },
      stlDefVal: function () {
        return {
          header: {
            // left|center
            'text-align': 'left'
          },
          footer: {
            // left|center|right
            'text-align': 'right'
          }
        };
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-dialog {
    position: fixed;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 420px;
    height: 150px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    opacity: 1;
    color: #666;
    background-color: #fff;

    >.cicon-cross-chr {
      position: absolute;
      top: 0px;
      right: 0px;
      color: #999;
      font-size: 30px;
      cursor: pointer;
    }

    >header {
      padding: 0 10px;
      height: 50px;
      line-height: 50px;
      text-align: left;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #333;
      font-size: 18px;
    }

    >section {
      padding: 0 10px;
      height: calc(100% - 50px - 50px);
      word-break: break-all;

      >[class^="cicon"] {
        font-size: 24px;
        color: #fff;
        background-color: #f56c6c;
      }

      >[class^="cicon-cross-crle"] {
        background-color: #f56c6c;
      }

      >[class^="cicon-tick-crle"] {
        background-color: #13ce66;
      }

      >[class^="cicon-exclamation-crle"] {
        background-color: #e6a23c;
      }
    }

    >footer {
      padding: 0 10px;
      height: 50px;
      line-height: 50px;

      >.button {
        margin-left: 10px;
        padding-top: 0;
        height: 34px;
        line-height: 34px;
      }

      >.button:first-of-type {
        margin-left: 0;
      }
    }
  }

  .wrap-dialog.no-footer > section {
    height: calc(100% - 50px);
  }

  .slide-fade-enter-active {
    transition: top .1s ease-in, opacity .1s ease-in;
  }

  .slide-fade-leave-active {
    transition: top .1s ease-out, opacity .1s ease-out;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    top: -50px;
    opacity: 0;
  }
</style>