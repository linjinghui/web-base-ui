<!--
功能介绍：
1、
 -->

<template>
  <transition name="slide-fade">
    <div :style="{'background-color': _theme}" v-show="value">
      <i class="cicon-exclamation-crle" :style="{'color': _theme}"></i>
      {{text}}
      <i class="cicon-cross" @click="clk_hide"></i>
    </div>
  </transition>
</template>

<script type="text/babel">
  export default {
    name: 'Tip',
    data: function () {
      return {
        timer: ''
      };
    },
    props: {
      value: {
        default: false
      },
      text: {
        default: '提示内容'
      },
      theme: {
        default: 'success'
      },
      time: {
        type: Number,
        default: 3000
      }
    },
    watch: {
      value: function (val) {
        let _this = this;

        if (val + '' === 'true') {
          // 开始定时
          this.timer = setTimeout(function () {
            _this.clk_hide();
          }, this.time);
        } else {
          // 清除定时器
          clearTimeout(this.timer);
        }
      }
    },
    computed: {
      '_theme': function () {
        let obj = {
          primary: '#409eff',
          success: '#13ce66',
          info: '#909399',
          warning: '#e6a23c',
          danger: '#f56c6c'
        };

        return obj[this.theme] || this.theme;
      }
    },
    beforeDestroy: function () {
      window.removeEventListener('keyup', this.evt_keyup);
    },
    mounted: function () {
      window.addEventListener('keyup', this.evt_keyup);
    },
    methods: {
      clk_hide: function () {
        this.$emit('input', false);
      },
      evt_keyup: function (event) {
        let e = event || window.event;
        let keyCode = e.keyCode;

        if (keyCode === 27 && this.value) {
          this.clk_hide();
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  div {
    position: fixed;
    top: 0px;
    bottom: auto;
    width: 100%;
    height: 50px;
    padding-left: 20px;
    line-height: 50px;
    font-size: 14px;
    color: #fff;
    opacity: 0.95;
    word-break:break-all;
    word-wrap:break-word;
    z-index: 11;

    [class^="cicon"] {
      margin-top: 13px;
      margin-right: 10px;
      font-size: 24px;
      color: #fff;
    }
    .cicon-exclamation-crle {
      float: left;
      overflow: hidden;
    }
    .cicon-exclamation-crle:before {
      background-color: #fff;
    }

    .cicon-cross {
      float: right;
      cursor: pointer;
    }

    .cicon-cross:hover {
      color: inherit;
    }
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