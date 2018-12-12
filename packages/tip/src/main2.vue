<!--
功能介绍：
1、
 -->

<template>
  <transition name="slide-fade">
    <div :id="id" class="wrap-tip">{{text}}</div>
  </transition>
</template>

<script type="text/babel">
  export default {
    name: 'Tip',
    data: function () {
      return {
        id: 'tip_' + new Date().getTime() + parseInt(Math.random() * 100),
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
      },
      align: {
        default: 'left'
      }
    },
    watch: {
      value: function (val) {
        let _this = this;

        if (val + '' === 'true') {
          // 开始定时
          this.timer = setTimeout(function () {
            _this.clkHide();
          }, this.time);
          // 计算长度
          // setTimeout(function () {
          //   var dom = document.querySelector('.wrap-tip'); 
            
          //   dom.style.marginLeft = '-' + ((dom.offsetWidth || dom.clientWidth) / 2) + 'px';
          //   _this.$nextTick(function () {
          //     dom.style.marginLeft = '-' + ((dom.offsetWidth || dom.clientWidth) / 2) + 'px';
          //   });
          // }, 30);
        } else {
          // 清除定时器
          clearTimeout(this.timer);
        }
      },
      text: function (val) {
        // alert(val);
        // var dom = document.getElementById(this.id).cloneNode();

        // console.log(dom);
        // console.log(dom.innerHTML);
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

        return obj[this.theme] || obj.info;
      }
    },
    beforeDestroy: function () {
      window.removeEventListener('keyup', this.evtKeyup);
    },
    mounted: function () {
      window.addEventListener('keyup', this.evtKeyup);
    },
    methods: {
      clkHide: function () {
        this.$emit('input', false);
      },
      evtKeyup: function (event) {
        let e = event || window.event;
        let keyCode = e.keyCode;

        if (keyCode === 27 && this.value) {
          this.clkHide();
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-tip {
    position: fixed;
    left: 0;
    right: 0;
    top: 20px;
    bottom: auto;
    margin: auto;
    min-width: 160px;
    max-width: 80%;
    height: 50px;
    padding: 0 10px;
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

    // [class^="cicon"] {
    //   font-size: 22px;
    //   color: #fff;
    // }
    // .cicon-cross-crle, .cicon-tick-crle, .cicon-exclamation-crle {
    //   margin-right: 5px;
    //   // font-size: 22px;
    //   overflow: hidden;
    //   // background-color: #fff;
    //   background-color: transparent;
    // }
    // .cicon-tick-crle {
    //   border: solid 1px #13ce66;
    // }
    // .cicon-cross-crle {
    //   border: solid 1px #fe6060;
    // }
    // .cicon-exclamation-crle {
    //   color: #45abff;
    //   border: solid 1px #45abff;
    // }

    // .cicon-cross {
    //   float: right;
    //   margin-top: 14px;
    //   // margin-right: 10px;
    //   margin-left: 10px;
    //   color: #9b9b9b;
    //   cursor: pointer;
    // }

    // .cicon-cross:hover {
    //   color: inherit;
    // }
  }

  @media all and (max-width: 1024px) {
    .wrap-tip {
      
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
</style>