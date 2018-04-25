<template>
  <div class="slider">
    <div class="runway" ref="runway" @click="setPositionByMouse">
      <div class="bar" :style="{'width': value + '%', 'border-color': theme, 'background-color': theme}">
        <span class="btn" 
          @mousedown="toggleWindowEvent('add')" 
          @touchstart="toggleWindowEvent('add')"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Slider',
    components: {
      // 
    },
    props: {
      value: {
        default: 0
      },
      theme: {
        default: '#409eff'
      }
    },
    data () {
      return {
        // 
      };
    },
    computed: {
      // 
    },
    watch: {
      // 
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
        // console.log('当前位置:' + p + '%' + ', ' + (p / 100) * max);
      },
      /* 设置滑块位置 */
      setPosition: function (percent) {
        this.$emit('input', percent);
        // if (domBar) {
        //   domBar.style.width = percent + '%';
        // }
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
  }

  .slider > .runway {
    position: relative;
    margin: 16px;
    height: 6px;
    border-radius: 4px;
    cursor: pointer;
    background-color: #e4e7ed;
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
    border-width: 1px;
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
    cursor: pointer;
  }
  </style>