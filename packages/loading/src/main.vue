<!--
功能介绍：
1、text: 自定义提示文本
2、modal: 是否模态窗口，即是否产生遮罩效果 - false默认|true
3、点击esc按键 等同隐藏功能
4、全局监听触发显示、隐藏
 -->

<template>
  <keep-alive>
    <div class="loading center-hv"
      v-if="('true' === value + '')"
      :style="{'z-index': zIndex + 1}">
      <i class="cicon-circle-loading move-loop" v-if="type==='circle'"></i>
      <i class="cicon-loading move-loop" v-if="type==='line'"><span></span><span></span><span></span></i>
      <span>{{ptext}}</span>
    </div>
  </keep-alive>
</template>

<script type="text/babel">
  export default {
    name: 'Loading',
    data: function () {
      return {
        id: 'loading_' + new Date().getTime() + parseInt(Math.random() * 100),
        zIndex: 1000,
        domZz: '',
        ptext: this.text
      };
    },
    props: {
      eventName: {
        default: 'Loading'
      },
      value: '',
      // 是否模态，即是否产生遮罩效果
      modal: {
        default: false
      },
      text: {
        default: '加载中...'
      },
      // circle | line
      type: {
        default: 'circle'
      }
    },
    watch: {
      value: function (val) {
        if (val + '' === 'true') {
          this.creatZz();
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
      },
      text: function (val) {
        this.ptext = val;
      }
    },
    computed: {
      //
    },
    beforeDestroy: function () {
      window.removeEventListener('keydown', this.escEvent);
      this.removeZz();
      window.EVENTBUS && window.EVENTBUS.$off(this.eventName);
    },
    mounted: function () {
      let _this = this;

      window.addEventListener('keydown', this.escEvent);
      this.creatZz();
      if (window.EVENTBUS) {
        window.EVENTBUS.$on(this.eventName, function (data) {
          if (typeof data.show !== 'undefined') {
            _this.changeDisplay(data.show);
          }
          if (data.text) {
            _this.ptext = data.text;
          }
        });
      }
    },
    methods: {
      hideLoading: function () {
        this.removeZz();
        this.changeDisplay(false);
      },
      changeDisplay: function (type) {
        this.$emit('input', type); 
      },
      escEvent: function (e) {
        let event = e || window.event;

        if (event.keyCode === 27) {
          this.hideLoading();
        }
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
      }
    }
  };
</script>

<style scoped lang="scss">
  .loading {
    position: fixed;
    width: 150px;
    height: 40px;
    padding: 0 10px;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
    font-size: 14px;
    user-select: none;
    overflow: hidden;
    color: #333;
    background-color: #fff;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);

    >i {
      font-size: 34px;
      background-color: inherit;
    }

    >span {
      margin-left: 5px;
    }
  }
  // 手机
  @media all and (max-width: 1024px) {
    .loading {
      padding-top: 14px;
      padding-bottom: 6px;
      width: 120px;
      height: 100px;
      color: #fff;
      background-color: #000;
      box-shadow: none;

      >i {
        font-size: 44px;
      }

      >span {
        display: block;
        height: 40px;
        text-align: center;
      }
    }
  }
</style>