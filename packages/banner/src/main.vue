<template>
  <div class="scroll-banner-wrap">
    <ul style="left: 0%;" :style="{width: (images.length + 1) * 100 + '%'}" class="">
      <li :style="{width: 100 / (images.length + 1) + '%'}" v-for="(url, index) in images">
        <img width="100%" height="100%" :src="url">
      </li>
      <li :style="{width: 100 / (images.length + 1) + '%'}" v-if="images.length > 1">
        <img width="100%" height="100%" :src="images[0]">
      </li>
    </ul>
    <ol class="dots">
      <li class="dot" v-for="(url, index) in images" :class="{'active': index === 0}" @click="move(index)"></li>
      <li class="dot" v-if="images.length > 1"></li>
    </ol>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'Banner',
    data: function () {
      return {
        INDEX: 0,
        // 自动轮播下张图片时长
        second: 3000,
        // 动画时长
        moveDuration: 600,
        swtch: 'on',
        activeClassName: 'active',
        noMoveClassName: 'no-move',
        banner: '',
        dots: ''
      };
    },
    props: {
      'images': {
        default: function () {
          return [];
        }
      }
    },
    mounted: function () {
      let _this = this;

      if (this.images.length > 1) {
        this.banner = document.querySelector('.scroll-banner-wrap>ul');
        this.dots = document.querySelectorAll('.scroll-banner-wrap .dot');

        setInterval(function () {
          if (_this.swtch === 'on') {
            _this.INDEX += 1;
            if (_this.INDEX > _this.dots.length - 1) {
              _this.INDEX = 0;
            }
            _this.move(_this.INDEX, 'auto');
          }
        }, _this.second);
      }

    },
    methods: {
      move: function (index, type) {
        let _this = this;

        if (this.images.length > 1) {
          if (!type) {
            // 关闭开关，3秒后打开开关
            _this.swtch = 'off';
            setTimeout(function () {
              _this.swtch = 'on';
            }, _this.second);
          }
          _this.banner.style.left = index * -100 + '%';
          // 删除原激活项
          let dotActive = document.querySelector('.scroll-banner-wrap .dot.active');

          if (dotActive) {
            dotActive.className = dotActive.className.replace(new RegExp('(\\s|^)' + _this.activeClassName + '(\\s|$)'), '');
          }
          // 设置激活项目
          if (_this.dots && _this.dots.length > 0) {
            if (index === _this.dots.length - 1) {
              index = 0;
              setTimeout(function () {
                // 非过程式的移动到首位
                _this.banner.className += ' ' + _this.noMoveClassName;
                _this.banner.style.left = index * -100 + '%';
              }, _this.moveDuration);
            } else {
              _this.banner.className = _this.banner.className.replace(new RegExp('(\\s|^)' + _this.noMoveClassName + '(\\s|$)'), '');
            }
            let dot = _this.dots[index];

            dot.className += ' ' + _this.activeClassName;
          }
          _this.INDEX = index;
        }
      }
    }
  };
</script>

<style scoped lang="scss">

  .scroll-banner-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .scroll-banner-wrap ul,
  .scroll-banner-wrap ol,
  .scroll-banner-wrap li {
    list-style: none;
  }

  .scroll-banner-wrap > ul {
    position: relative;
    height: 100%;
    transition: left ease-in;
    -moz-transition: left ease-in;
    -webkit-transition: left ease-in;
    -o-transition: left ease-in;
    transition-duration: .6s;
    -moz-transition-duration: .6s;
    -webkit-transition-duration: .6s;
    -o-transition-duration: .6s;
  }

  .scroll-banner-wrap > ul.no-move {
    transition-duration: 0s;
    -moz-transition-duration: 0s;
    -webkit-transition-duration: 0s;
    -o-transition-duration: 0s;
  }

  .scroll-banner-wrap > ul > li {
    position: relative;
    float: left;
    height: 100%;
    background-size: cover;
  }

  .scroll-banner-wrap > .dots {
    position: absolute;
    right: 10px;
    bottom: 20px;
    z-index: 2;
  }

  .scroll-banner-wrap > .dots > .dot {
    float: left;
    margin-right: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.65);
    cursor: pointer;
  }

  .scroll-banner-wrap > .dots > .dot:not(:first-of-type):last-of-type {
    display: none;
  }

  .scroll-banner-wrap > .dots > .dot.active {
    background-color: #fff;
  }
  </style>