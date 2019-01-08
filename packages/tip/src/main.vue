<!--
功能介绍：
1、
 -->

<template>
  <transition name="slide-fade">
    <div class="wrap-tip" :id="id"
      :style="{'background-color': _theme, 'text-align': textAlign, 
      'top': full+''==='true'&&'0', 'width': full+''==='true'&&'100%'}" v-show="value">
      <i class="cicon-cross-crle" v-if="theme==='danger'" :style="{'color': _theme}"></i>
      <i class="cicon-tick-crle" v-else-if="theme==='success'" :style="{'color': _theme}"></i>
      <i class="cicon-exclamation-crle" v-else-if="theme==='warning'"></i>
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
        timer: '',
        id: 'tip_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {
      eventName: {
        default: 'Tip'
      },
      full: {
        default: false
      },
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
      },
      textAlign: {
        default: 'left'
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
          // 计算长度
          setTimeout(function () {
            // var dom = document.getElementById(_this.id);
            var dom = document.querySelector('#' + _this.id); 
            
            dom.style.marginLeft = '-' + parseInt((dom.offsetWidth || dom.clientWidth) / 2) + 'px';
            _this.$nextTick(function () {
              dom.style.marginLeft = '-' + parseInt((dom.offsetWidth || dom.clientWidth) / 2) + 'px';
            });
          }, 30);
        } else {
          // 清除定时器
          clearTimeout(this.timer);
        }
      }
    },
    computed: {
      '_theme': function () {
        let obj = {
          primary: '#f3faff',
          success: '#f4fff9',
          info: '#f3faff',
          warning: '#f3faff',
          danger: '#fdf3f3'
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
  .wrap-tip {
    position: fixed;
    left: 50%;
    top: 20px;
    bottom: auto;
    min-width: 160px;
    max-width: 80%;
    height: 50px;
    padding-left: 20px;
    padding-right: 10px;
    line-height: 50px;
    font-size: 14px;
    color: #666;
    opacity: 0.95;
    border-radius: 4px;
    box-shadow: 1px 2px 8px #ccc;
    white-space: nowrap;
    word-break: break-all;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 2000;

    [class^="cicon"] {
      font-size: 22px;
      color: #fff;
    }
    .cicon-cross-crle, .cicon-tick-crle, .cicon-exclamation-crle {
      margin-right: 5px;
      overflow: hidden;
      background-color: transparent;
    }
    .cicon-tick-crle {
      border: solid 1px #13ce66;
    }
    .cicon-cross-crle {
      border: solid 1px #fe6060;
    }
    .cicon-exclamation-crle {
      color: #45abff;
      border: solid 1px #45abff;
    }

    .cicon-cross {
      float: right;
      margin-top: 13px;
      margin-left: 10px;
      font-size: 24px;
      color: #9b9b9b;
      cursor: pointer;
    }

    .cicon-cross:hover {
      color: inherit;
    }
  }

  .slide-fade-enter-active {
    transition: top .2s ease-in;
  }

  .slide-fade-leave-active {
    transition: top .2s ease-out;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    top: -100px;
  }

  @media all and (max-width: 1024px) {
    .wrap-tip {
      top: 0;
      bottom: 0;
      margin: auto;
      padding: 0;
      min-width: auto;
      max-width: auto;
      width: 140px!important;
      height: 140px!important;
      line-height: inherit;
      text-align: center;
      font-size: 18px;
      border-radius: 8px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.4)!important;

      .cicon-cross {
        display: none;
      }

      .cicon-cross-crle, .cicon-tick-crle, .cicon-exclamation-crle {
        display: block;
        margin: 20px auto 20px auto;
        font-size: 50px;
        border-width: 2px;
        border-color: #fff;
      }
      .cicon-exclamation-crle {
        color: #fff;
      }
    }
    
    @keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}
    @keyframes zoomOut{0%{opacity:1}50%{opacity:0;transform:scale3d(.3,.3,.3)}to{opacity:0}}

    .slide-fade-enter-active {
      animation: zoomIn .2s;
    }

    .slide-fade-leave-active {
      animation: zoomOut .2s;
    }
    .slide-fade-enter, .slide-fade-leave-to {
      top: 0;
    }
  }

  
</style>