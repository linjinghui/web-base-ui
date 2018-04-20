<!--
功能介绍：
1、自定义提示内容 - text
2、自定义主题背景 - theme(默认#303133)
3、显示方位 - position：top|right|bottom|left
4、触发方式 - model: hover|click
 -->

<script type="text/babel">
  export default {
    name: 'Tooltip',
    data: function () {
      return {
        id: 'tooltip_' + new Date().getTime() + parseInt(Math.random() * 100),
        // 目标元素对象
        slotDom: {},
        // 提示框对象
        tooltipDom: {},
        // 箭头对象
        triangleDom: {}
      };
    },
    props: {
      text: '',
      theme: {
        default: '#303133'
      },
      position: {
        default: 'top'
      },
      model: {
        default: 'click'
      }
    },
    // 1、构造目标元素 并 获取目标元素长、宽、相对位置left、top
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
      if (this.model === 'click') {
        window.removeEventListener('click', this.doToggleTooltip);
      }
    },
    destroyed: function () {
      this.removeTooltipDom();
    },
    mounted: function () {
      // 2、构造出tooltip dom节点 并 获取text dom节点长、宽
      this.$nextTick(function () {
        this.rendTooltipDom();
        this.slotDomEvent();
      });
    },
    methods: {
      // 手动渲染提示 DOM
      rendTooltipDom: function () {
        let dom = document.createElement('p');
        let triangle = '';

        dom.setAttribute('id', this.id);
        dom.setAttribute('class', 'tooltip');
        dom.setAttribute('style', 'background-color: ' + this.theme);
        dom.innerHTML = this.text;

        triangle = document.createElement('i');
        triangle.setAttribute('class', 'cicon-triangle-right');
        triangle.setAttribute('style', 'color: ' + this.theme);
        dom.appendChild(triangle);

        triangle = document.createElement('i');
        triangle.setAttribute('class', 'cicon-triangle-bottom');
        triangle.setAttribute('style', 'color: ' + this.theme);
        dom.appendChild(triangle);

        triangle = document.createElement('i');
        triangle.setAttribute('class', 'cicon-triangle-left');
        triangle.setAttribute('style', 'color: ' + this.theme);
        dom.appendChild(triangle);

        triangle = document.createElement('i');
        triangle.setAttribute('class', 'cicon-triangle-top');
        triangle.setAttribute('style', 'color: ' + this.theme);
        dom.appendChild(triangle);

        document.body.appendChild(dom);
        // 获取提示 DOM的基本属性
        this.tooltipDom = {
          dom: dom,
          width: dom.offsetWidth,
          height: dom.offsetHeight
        };
        // 2-2、计算text dom节点 基于 目标元素 四周的 相对位置left、top
        // 2-3、计算text dom > 箭头 节点 基于 目标元素 四周的 相对位置left、top
        this.countTooltipPostn();
        // 3、设置text dom节点所在方位
        this.setTooltipPostn(this.position);
      },
      // 获取slot元素
      getTooltipDom: function () {
        return this.tooltipDom.dom;
      },
      // 手动移除提示 DOM
      removeTooltipDom: function () {
        let dom = this.getTooltipDom();

        dom && document.body.removeChild(dom);
      },
      // 计算提示 DOM的相对位置
      countTooltipPostn: function () {
        let left = '';

        this.tooltipDom.psnTop = {
          left: this.slotDom.left,
          top: this.slotDom.top - this.tooltipDom.height - (26 - 16 + 5)
        };
        this.triangleDom.psnTop = {
          // left: this.slotDom.left - this.tooltipDom.psnTop.left + this.slotDom.width / 2 - 26 / 2
          left: 5
        };

        this.tooltipDom.psnBottom = {
          left: this.slotDom.left,
          top: this.slotDom.top + this.slotDom.height + (26 - 16 + 5)
        };
        this.triangleDom.psnBottom = {
          // left: this.slotDom.left - this.tooltipDom.psnTop.left + this.slotDom.width / 2 - 26 / 2
          left: 5
        };

        left = this.slotDom.left + this.slotDom.width + (26 - 16 + 5);
        this.tooltipDom.psnRight = {
          left: left,
          top: this.slotDom.top
        };
        this.triangleDom.psnRight = {
          // top: this.slotDom.top + this.slotDom.height / 2 - this.tooltipDom.psnRight.top - 26 / 2
          top: 5
        };

        left = this.slotDom.left - this.tooltipDom.width - (26 - 16 + 5);
        this.tooltipDom.psnLeft = {
          left: left < 0 ? 0 : left,
          top: this.slotDom.top,
          maxWidth: left < 0 ? (this.tooltipDom.width + left) : ''
        };
        this.triangleDom.psnLeft = {
          // top: this.slotDom.top + this.slotDom.height / 2 - this.tooltipDom.psnRight.top - 26 / 2
          top: 5
        };
        console.log(this.tooltipDom);
        console.log(this.triangleDom);
      },
      // 设置text dom节点所在方位
      setTooltipPostn: function (type) {
        let dom = this.getTooltipDom();
        let triangle = '';
        let className = dom.className.replace(/top|left|bottom|right/g, '');

        dom.className = className + ' ' + type;
        // 默认隐藏
        dom.style.display = 'none';
        if (type === 'top') {
          triangle = dom.querySelector('.cicon-triangle-bottom');
          dom.style.top = this.tooltipDom.psnTop.top + 'px';
          dom.style.left = this.tooltipDom.psnTop.left + 'px';
          triangle.style.left = this.triangleDom.psnTop.left + 'px';
        } else if (type === 'right') {
          triangle = dom.querySelector('.cicon-triangle-left');
          dom.style.top = this.tooltipDom.psnRight.top + 'px';
          dom.style.left = this.tooltipDom.psnRight.left + 'px';
          triangle.style.top = this.triangleDom.psnRight.top + 'px';
        } else if (type === 'bottom') {
          triangle = dom.querySelector('.cicon-triangle-top');
          dom.style.top = this.tooltipDom.psnBottom.top + 'px';
          dom.style.left = this.tooltipDom.psnBottom.left + 'px';
          triangle.style.left = this.triangleDom.psnBottom.left + 'px';
        } else if (type === 'left') {
          triangle = dom.querySelector('.cicon-triangle-right');
          dom.style.top = this.tooltipDom.psnLeft.top + 'px';
          dom.style.left = this.tooltipDom.psnLeft.left + 'px';
          triangle.style.top = this.triangleDom.psnLeft.top + 'px';
          if (this.tooltipDom.psnLeft.maxWidth) {
            dom.style.maxWidth = this.tooltipDom.psnLeft.maxWidth + 'px';
          }
        }
      },
      // 给目标元素添加事件
      slotDomEvent: function () {
        let _this = this;

        if (this.model === 'hover') {
          this.$el.addEventListener('mouseenter', function () {
            _this.doToggleTooltip('show');
          });
          this.$el.addEventListener('mouseleave', function () {
            _this.doToggleTooltip();
          });
        } else if (this.model === 'click') {
          this.$el.addEventListener('click', function (e) {
            (e || window.event).stopPropagation();
            _this.doToggleTooltip('show');
          });
          window.addEventListener('click', this.doToggleTooltip);
        }
      },
      // 显示、隐藏text dom节点 - type: show(显示)，其他(隐藏)
      doToggleTooltip: function (type) {
        this.getTooltipDom().style.display = type === 'show' ? '' : 'none';
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
      display: none;
      position: absolute;
      font-size: 26px;
    }

    >.cicon-triangle-right {
      right: -16px;
    }

    >.cicon-triangle-bottom {
      bottom: -16px;
    }

    >.cicon-triangle-left {
      left: -16px;
    }

    >.cicon-triangle-top {
      top: -16px;
    }
  }

  .tooltip.top >.cicon-triangle-bottom {
    display: inherit;
  }

  .tooltip.right >.cicon-triangle-left {
    display: inherit;
  }

  .tooltip.bottom >.cicon-triangle-top {
    display: inherit;
  }

  .tooltip.left >.cicon-triangle-right {
    display: inherit;
  }
</style>