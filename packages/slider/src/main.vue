<!--
功能介绍：
1、自定义百分比位置 - percent - 实时返回
2、自定义主题色 - theme
3、禁用 - disabled
4、最大值 - max - 用于tip提示
 -->
<template>
  <div class="slider" :disabled="disabled">
    <div class="runway" ref="runway" @click="setPositionByMouse">
      <div class="bar" :style="{'width': value + '%', 'border-color': ctheme, 'background-color': ctheme}">
        <cmp-tooltip ref="ttp" :text="tipText" model="hover" position="bottom">
          <span class="btn theme-c" @mousedown="toggleWindowEvent('add')" @touchstart="toggleWindowEvent('add')"></span>
        </cmp-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
  import Tooltip from '../../tooltip/index.js';

  export default {
    name: 'Slider',
    components: {
      'cmpTooltip': Tooltip
    },
    props: {
      value: {
        default: 0
      },
      disabled: {
        default: false
      },
      max: {
        default: 0
      },
      theme: {
        default: 'var(--theme)'
      }
    },
    data () {
      return {
        //
      };
    },
    computed: {
      tipText: function () {
        let maxData = 0;

        try {
          maxData = parseInt(this.max);
        } catch (e) {
          //
        }
        return maxData ? parseInt(this.value / 100 * maxData) : this.value;
      },
      ctheme: function () {
        return this.disabled ? '#c0c4cc' : this.theme;
      }
    },
    beforeDestroy: function () {
      window.removeEventListener('mouseup', this.toggleWindowEvent);
      window.removeEventListener('touchend', this.toggleWindowEvent);
    },
    mounted: function () {
      window.addEventListener('mouseup', this.toggleWindowEvent);
      window.addEventListener('touchend', this.toggleWindowEvent);
    },
    methods: {
      /* 根据鼠标位置设置滑块位置 */
      setPositionByMouse: function (e) {
        let p = this.getMousexOnBar(e);

        this.setPosition(p);
      },
      /* 设置滑块位置 */
      setPosition: function (percent) {
        if (!this.disabled) {
          this.$emit('input', percent);
          this.$refs.ttp.update();
        }
      },
      /* 获取跑道相对位置 */
      getRunwayPosition: function () {
        let domRunway = this.$refs.runway;

        return {
          left: domRunway.offsetLeft,
          top: domRunway.offsetTop
        };
      },
      /* 获取鼠标所在位置所占目标区域的百分比 */
      getMousexOnBar: function (event) {
        let domRunway = this.$refs.runway;
        let rwp = this.getRunwayPosition();
        let mp = this.mousePosition(event);
        let runwayWidth = domRunway.offsetWidth;
        let percent = (mp.x - rwp.left) / runwayWidth * 100;

        percent = percent < 0 ? 0 : percent > 100 ? 100 : percent;
        return Math.round(percent);
      },
      /* 获取鼠标坐标 */
      mousePosition: function (event) {
        let e = event || window.event;

        if (e.type === 'touchmove') {
          e.clientY = e.touches[0].clientY;
          e.clientX = e.touches[0].clientX;
        }
        return {
          x: e.clientX || e.pageX || e.x,
          y: e.clientY || e.pageY || e.y
        };
      },
      toggleWindowEvent: function (type) {
        if (type === 'add') {
          window.addEventListener('mousemove', this.setPositionByMouse);
          window.addEventListener('touchmove', this.setPositionByMouse);
        } else {
          window.removeEventListener('mousemove', this.setPositionByMouse);
          window.removeEventListener('touchmove', this.setPositionByMouse);
        }
      }
    }
  };
</script>

<style type="text/css" scoped>
  .slider {
    position: relative;
    width: 100%;
    user-select: none;
    overflow: hidden;
    opacity: 1!important;
  }

  .slider > .runway {
    position: relative;
    margin: 16px;
    height: 6px;
    border-radius: 4px;
    background-color: #e4e7ed;
  }

  .slider:not([disabled]) > .runway {
    cursor: pointer;
  }

  .slider > .runway > .bar {
    position: relative;
    height: 6px;
    border-style: solid;
    border-width: 0;
    border-radius: inherit;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .slider > .runway > .bar > .btn {
    position: absolute;
    top: -16px;
    right: 0;
    height: 36px;
    width: 36px;
    transform: translateX(50%);
    border: inherit;
    /*border-width: 1px;*/
    cursor: pointer;
    z-index: 1;
  }

  .slider > .runway > .bar > .btn:after {
    content: '';
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 16px;
    height: 16px;
    border: inherit;
    border-width: 2px;
    background-color: #fff;
    border-radius: 50%;
    transition: .2s;
    cursor: grab;
  }

  .slider > .runway > .bar > .btn:active:after {
    cursor: grabbing;
  }

  .slider[disabled] > .runway > .bar > .btn:after {
    cursor: not-allowed;
  }
  </style>