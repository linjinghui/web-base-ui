<!-- 
功能介绍：
1、普通按钮（主题：主要|成功|信息|警告|危险）
2、复制到剪贴版按钮（成功: 返回剪贴内容，错误：error）
3、选择文件按钮
4、计时器按钮
 -->

<template>
  <button class="button" 
  :style="{'background-color': backColor}" 
  :id="id"
  :disabled="disabled"
  :data-clipboard-text="copyData">
    <slot></slot>
  </button>
</template>

<script type="text/babel">
  import ClipboardJS from 'clipboard';

  export default {
    name: 'Button',
    data: function () {
      return {
        id: 'btn_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {
      theme: {
        type: String,
        default: 'primary'
      },
      disabled: {
        default: false
      },
      copyData: ''
    },
    watch: {
      // 
    },
    computed: {
      backColor: function () {
        let obj = {
          primary: '#409eff',
          success: '#67c23a',
          info: '#909399',
          warning: '#e6a23c',
          danger: '#f56c6c'
        };

        return obj[this.theme] || this.theme;
      }
    },
    beforeDestroy: function () {
      // 
    },
    mounted: function () {
      // 初始化剪贴板
      this.initCopyButton();
    },
    methods: {
      initCopyButton: function () {
        let _this = this;

        if (this.copyData) {
          this.clipboard = new ClipboardJS('#' + this.id);
          this.clipboard.on('success', function (e) {
            _this.$emit('cbk_copy', _this.copyData);
          });

          this.clipboard.on('error', function (e) {
            _this.$emit('cbk_copy', 'error');
          });
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .button {
    position: relative;
    display: inline-block;
    padding: 6px 15px;
    color: #fff;
    background-color: #0079ff;
    font-size: 12px;
    text-decoration: none;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    user-select: none;
    border: 1px solid transparent;
    box-sizing: border-box;
    transition-property: all;
    overflow: visible;outline: medium;text-transform: none;-webkit-appearance: button;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);cursor: pointer;
  }

  .button[disabled] {
    cursor: text;
  }

  .button::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  .button:not([disabled]):hover {
    opacity: 0.8;
  }

  .button:not([disabled]):active {
    opacity: 0.9;
  }
</style>