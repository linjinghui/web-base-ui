<template>
  <section class="wrap-app-group" v-if="wValue!==''" v-show="wValue">
    <div class="wrap-main" :class="{'show': mValue}">
      <header>
        <p>标题</p>
        <a class="btn-del icon-cross" @click="clk_hide"></a>
      </header>
      <div class="part-left"></div>
      <div class="right-left"></div>
      <footer>
        <cmp-button :theme="'cancel'" :text="'取消'" @click="clk_hide"></cmp-button>
        <cmp-button :text="'确认'" @click=""></cmp-button>
      </footer>
    </div>
  </section>
</template>

<script type="text/babel">
  import {Button} from 'component-base-ui';

  export default {
    name: 'AppGroup',
    components: {
      cmpButton: Button
    },
    props: {
      value: {
        default: ''
      }
    },
    data: function () {
      return {
        wValue: this.value,
        mValue: this.value
      };
    },
    watch: {
      value: function (val) {
        let _this = this;

        if (!val) {
          // 关闭
          _this.mValue = val;
          setTimeout(function () {
            _this.wValue = val;
          }, 450);
        } else {
          // 显示
          _this.wValue = val;
          setTimeout(function () {
            _this.mValue = val;
          }, 10);
        }
      }
    },
    beforeDestroy: function () {
      //
    },
    mounted: function () {
      //
    },
    methods: {
      clk_hide: function () {
        this.$emit('input', false);
      }
    }
  };
</script>

<style scoped lang="scss" id="iconcss">
  .icon-cross:before,
  .icon-cross:after {
    content: '';
    pointer-events: none;
    margin: auto;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 0px;
    height: 100%;
    border-left: solid 2px;
  }
  .icon-cross:before {
    transform: rotate(45deg);
  }
  .icon-cross:after {
    transform: rotate(135deg);
  }
  .icon-cross:hover:before,
  .icon-cross:hover:after {
    opacity: 0.8;
  }
  .icon-cross:active:before,
  .icon-cross:active:after {
    opacity: 0.5;
  }
</style>

<style scoped lang="scss">
  .wrap-app-group {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;

    >.wrap-main {
      position: absolute;
      top: -300%;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 600px;
      height: 500px;
      font-size: 12px;
      color: #333;
      border-style: solid;
      border-color: #ddd;
      border-width: 0px;
      background-color: #fff;
      box-shadow: 0px 0px 14px 0px #eee;
      transition: top .4s ease-in-out;

      >* {
        float: left;
      }

      >header {
        position: relative;
        padding: 0 16px;
        width: 100%;
        height: 50px;
        border: inherit;
        border-bottom-width: 1px;

        >p {
          line-height: 50px;
          font-size: 14px;
          font-weight: bold;
        }

        .btn-del {
          position: absolute;
          top: 0;
          right: 15px;
          bottom: 0;
          margin: auto;
          width: 16px;
          height: 16px;
          cursor: pointer;
          color: #999;
        }
      }

      >footer {
        padding-top: 14px;
        padding-right: 20px;
        width: 100%;
        height: 60px;
        border: inherit;
        border-top-width: 1px;
        text-align: right;

        >.button {
          border-radius: 2px;
          margin-left: 10px;
        }
      }

      >.part-left, .part-right {
        width: 50%;
        height: calc(100% - 50px - 60px);
      }

      >.part-left {
        border: inherit;
        border-right-width: 1px;
      }
    }

    >.wrap-main.show {
      top: 0;
    }
  }
</style>
