<template>
  <transition name="slide-fade">
    <div :class="bfTheme" v-show="bfDisplay">
      <i class="icon cmpIconfont" :class="bfIconTheme"></i>
      {{bfContent}}
      <i class="icon cmpIconfont icon-delete" @click="bfDisplay=false"></i>
    </div>
  </transition>
</template>

<script type="text/babel">
  export default {
    name: 'Tip',
    data: function () {
      return {
        timer: '',
        bfTheme: this.theme,
        bfContent: this.content,
        bfTime: this.time,
        bfDisplay: this.display
      };
    },
    props: {
      theme: {
        // success, warn, error
        default: 'success'
      },
      content: {
        default: '提示内容'
      },
      time: {
        type: Number,
        default: 3000
      },
      display: {
        type: Boolean,
        default: false
      },
      eventName: {
        default: 'changeTip'
      }
    },
    computed: {
      bfIconTheme: function () {
        let val = '';

        if (this.bfTheme === 'success') {
          val = 'icon-success1';
        } else if (this.bfTheme === 'warn') {
          val = 'icon-warm';
        } else if (this.bfTheme === 'error') {
          val = 'icon-error';
        }
        return val;
      }
    },
    watch: {
      bfDisplay: function (val) {
        if (val) {
          // 重启关闭定时器
          this.setTimeoutClose();
        } else {
          clearTimeout(this.timer);
        }
      },
      bfContent: function (val) {
        // 重启关闭定时器
        this.setTimeoutClose();
      }
    },
    mounted: function () {
      this.addParamsChange();
      this.addEscListener();
    },
    methods: {
      setTimeoutClose: function () {
        let _this = this;

        clearTimeout(this.timer);
        if (_this.bfTime) {
          _this.timer = setTimeout(function () {
            _this.bfDisplay = false;
          }, _this.bfTime);
        }
      },
      addParamsChange: function () {
        let _this = this;

        window.EVENTBUS.$on(this.eventName, function (data) {
          if (typeof data.display !== 'undefined') {
            _this.bfDisplay = data.display;
          }
          if (data.theme) {
            _this.bfTheme = data.theme;
          }
          if (data.content) {
            _this.bfContent = data.content;
          }
          if (data.time) {
            _this.bfTime = data.time;
          }
        });
      },
      addEscListener: function () {
        let _this = this;

        window.addEventListener('keyup', function (event) {
          let e = event || window.event;
          let keyCode = e.keyCode;

          if (keyCode === 27 && _this.bfDisplay) {
            _this.bfDisplay = false;
          }
        }, false);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../src/style/global";

  div {
    @include center();
    position: fixed;
    top: 0px;
    bottom: auto;
    width: 100%;
    height: 50px;
    padding-left: 20px;
    line-height: 50px;
    font-size: 14px;
    color: #fff;
    background-color: #13ce66;
    opacity: 0.95;
    word-break:break-all;
    word-wrap:break-word;
    z-index: 11;

    .cmpIconfont {
      float: left;
      margin-right: 10px;
      color: #fff;
      font-size: 22px;
    }

    .cmpIconfont:hover {
      color: #fff;
    }

    .icon-delete {
      // position: absolute;right: 5px;top: 3px;
      float: right;
      cursor: pointer;
    }
    .icon-delete:hover {
      color: inherit;
    }
  }

  .warn {
    background-color: #f7ba2a;
  }

  .error {
    background-color: #ff5e5e;
  }

  .slide-fade-enter-active {
    transition: top .3s ease-in;
  }

  .slide-fade-leave-active {
    transition: top .3s ease-out;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    top: -100px;
  }
</style>