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
        pstns: ['top', 'right', 'bottom', 'left'],
        markNum: 0,
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
        default: 'hover'
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
          this.slotDom = { dom: dom.elm };
          // 获取slotDom 位置信息
          this.getSlotDomAttr();
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
    watch: {
      text: function () {
        this.resetToopText();
      }
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
        let font = '';

        dom.setAttribute('id', this.id);
        dom.setAttribute('class', 'tooltip');
        dom.setAttribute('style', 'background-color: ' + this.theme);

        font = document.createElement('span');
        font.setAttribute('class', 'text');
        font.innerHTML = this.text;
        dom.appendChild(font);

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
        this.update();
        this.doToggleTooltip();
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
      // 给目标元素添加事件
      slotDomEvent: function () {
        let _this = this;

        if (this.model === 'hover') {
          this.$el.addEventListener('mouseenter', function () {
            // 获取slotDom 位置信息
            _this.getSlotDomAttr();
            _this.update();
            _this.doToggleTooltip('show');
          });
          this.$el.addEventListener('mouseleave', function () {
            _this.doToggleTooltip();
          });
        } else if (this.model === 'click') {
          this.$el.addEventListener('click', function (e) {
            (e || window.event).stopPropagation();
            // 获取slotDom 位置信息
            _this.getSlotDomAttr();
            _this.update();
            _this.doToggleTooltip('show');
          });
          window.addEventListener('click', this.doToggleTooltip);
        }
      },
      // 显示、隐藏text dom节点 - type: show(显示)，其他(隐藏)
      doToggleTooltip: function (type) {
        this.getTooltipDom().style.display = type === 'show' ? '' : 'none';
      },
      getSlotDomAttr: function () {
        let dom = this.slotDom.dom;
        let bdcr = dom.getBoundingClientRect();

        this.slotDom.left = bdcr.left;
        this.slotDom.top = bdcr.top;
        this.slotDom.bottom = document.body.offsetHeight - dom.offsetHeight - bdcr.top;
        this.slotDom.right = document.body.offsetWidth - dom.offsetWidth - bdcr.left;
        this.slotDom.width = dom.offsetWidth;
        this.slotDom.height = dom.offsetHeight;
      },
      setTooltipPstn: function (type) {
        let dom = this.getTooltipDom();
        let arrow = 12;
        let left = 200;
        let top = 200;
        let max = this.pstns.length;
        let bodyHeight = document.body.offsetHeight;
        let bodyWidth = document.body.offsetWidth;
        let nextPosnIndex = (function (_this) {
          let index = _this.pstns.indexOf(type);

          return (index >= max - 1) ? 0 : index + 1;
        }(this));

        if (type === 'top') {
          top = this.slotDom.top - this.tooltipDom.height - arrow;
          left = this.slotDom.left + (this.slotDom.width - this.tooltipDom.width) / 2;
        } else if (type === 'right') {
          top = this.slotDom.top + (this.slotDom.height - this.tooltipDom.height) / 2;
          left = this.slotDom.left + this.slotDom.width + arrow;
        } else if (type === 'bottom') {
          top = this.slotDom.top + this.slotDom.height + arrow;
          left = this.slotDom.left + (this.slotDom.width - this.tooltipDom.width) / 2;
        } else if (type === 'left') {
          top = this.slotDom.top + (this.slotDom.height - this.tooltipDom.height) / 2;
          left = this.slotDom.left - this.tooltipDom.width - arrow;
        }
        if (this.markNum < max && (top < 0 || left < 0 || (top + this.tooltipDom.height > bodyHeight) || (left + this.tooltipDom.width > bodyWidth))) {
          this.markNum += 1;
          this.setTooltipPstn(this.pstns[nextPosnIndex]);
        } else {
          dom.style.left = left + 'px';
          dom.style.top = top + 'px';
          this.setTooltipArrowPstn(type);
        }
      },
      setTooltipArrowPstn: function (type) {
        let dom = this.getTooltipDom();

        dom.setAttribute('class', 'tooltip ' + type);
      },
      resetToopText: function () {
        let dom = this.tooltipDom.dom.querySelector('.text');

        dom.innerHTML = this.text;
      },
      update: function () {
        this.markNum = 0;
        this.setTooltipPstn(this.position);
      }
    }
  };
</script>

<style lang="scss" id="cssTooltip">
  .tooltip {
    position: fixed;
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
      margin: auto;
      font-size: 26px;
    }

    >.cicon-triangle-right {
      right: -16px;
      top: 0;
      bottom: 0;
    }

    >.cicon-triangle-bottom {
      bottom: -16px;
      left: 0;
      right: 0;
    }

    >.cicon-triangle-left {
      left: -16px;
      top: 0;
      bottom: 0;
    }

    >.cicon-triangle-top {
      top: -16px;
      left: 0;
      right: 0;
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