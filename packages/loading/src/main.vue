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
      <i class="cicon-loading move-loop"><span></span><span></span><span></span></i>
      <span>{{text}}</span>
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
        domZz: ''
      };
    },
    props: {
      value: '',
      // 是否模态，即是否产生遮罩效果
      modal: {
        default: false
      },
      text: {
        default: '加载中...'
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
        if (val + '' === 'true') {
          this.creatZz();
        } else {
          this.removeZz();
        }
      }
    },
    computed: {
      //
    },
    beforeDestroy: function () {
      window.removeEventListener('keydown', this.escEvent);
      this.removeZz();
    },
    mounted: function () {
      window.addEventListener('keydown', this.escEvent);
      this.creatZz();
    },
    methods: {
      hideLoading: function () {
        this.removeZz();
        this.$emit('input', false);
      },
      escEvent: function (e) {
        let event = e || window.event;

        if (event.keyCode === 27) {
          this.hideLoading();
        }
      },
      creatZz: function () {
        if (this.modal + '' === 'true') {
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
    color: #fff;
    background-color: #000;
    border-radius: 4px;
    user-select: none;
    overflow: hidden;

    >i {
      font-size: 34px;
    }
  }
  // 手机
  @media all and (max-width: 1024px) {
    .loading {
      padding-top: 14px;
      padding-bottom: 6px;
      width: 120px;
      height: 100px;
      font-size: 14px;

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