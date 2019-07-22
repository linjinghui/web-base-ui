<!-- 
功能介绍：
1、普通按钮（主题：主要|成功|信息|警告|危险）
2、复制到剪贴版按钮（成功: 返回剪贴内容，错误：error）
3、选择文件按钮（返回文件参数）
4、计时器按钮
5、打印按钮
选择文件夹：webkitdirectory=""
 -->

<template>
  <button class="button" v-if="typeof fileoption==='undefined'"
    :style="cstl" 
    :id="id"
    :disabled="pdisabled"
    :data-clipboard-text="copydata"
    @click="clk">
    <template v-if="value > 0"><span style="font-size: 14px;">{{value}}</span> s</template>
    <slot v-else></slot>
  </button>
  <!-- 选择文件专用∨ -->
  <label class="button" v-else
    :style="cstl" 
    :id="id"
    :disabled="pdisabled"
    :for="'file_' + id">
      <input type="file" 
        :id="'file_' + id" 
        :disabled="pdisabled"
        :accept="fileoption.accept"
        :multiple="fileoption.multiple"
        @change="file_change">
      <slot></slot>
  </label>
  <!-- 选择文件专用∧ -->
</template>

<script type="text/babel">
  import ClipboardJS from 'clipboard';

  export default {
    name: 'Button',
    data: function () {
      return {
        id: 'btn_' + new Date().getTime() + parseInt(Math.random() * 100),
        pdisabled: ''
      };
    },
    props: {
      theme: '',
      disabled: {
        default: false
      },
      copydata: '',
      fileoption: '',
      // 计时器
      value: {
        type: Number,
        default: 0
      },
      // 打印ID
      prnt: ''
    },
    watch: {
      disabled: function (val) {
        this.pdisabled = this.parseDisabled();
      },
      value: function (val) {
        if (val > 0) {
          // 开始计时
          this.pdisabled = true;
          this.sub_count_down();
        } else {
          // 结束计时
          this.pdisabled = false;
        }
      }
    },
    computed: {
      backColor: function () {
        let obj = {
          primary: '#409eff',
          success: '#67c23a',
          info: '#909399',
          warning: '#e6a23c',
          danger: '#f56c6c',
          line: '#fff'
        };

        return obj[this.theme] || this.theme;
      },
      cstl: function () {
        let obj = {
          primary: '#409eff',
          success: '#67c23a',
          info: '#909399',
          warning: '#e6a23c',
          danger: '#f56c6c',
          line: '#fff'
        };

        return {
          'border-color': this.theme === 'line' ? '#ddd' : '',
          'color': this.theme === 'line' ? 'inherit' : '',
          'background-color': obj[this.theme] || this.theme
        };
      }
    },
    beforeDestroy: function () {
      // 
    },
    mounted: function () {
      this.pdisabled = this.parseDisabled();
      // 初始化剪贴板
      this.init_copy_btn();
      if (this.prnt) {
        // window.$ = require('jquery');
        require('../../../static/print/jquery.PrintArea.js');
      }
    },
    methods: {
      clk: function () {
        if (this.prnt) {
          var $ = window.$;
          // iframe|popup 新窗口打开
          var mode = 'iframe';
          var close = true;
          var extraCss = '';
          var keepAttr = ['class', 'id', 'style'];
          var headElements = '<meta charset="utf-8" />,<meta http-equiv="X-UA-Compatible" content="IE=edge"/>';
          var options = { mode: mode, popClose: close, extraCss: extraCss, retainAttr: keepAttr, extraHead: headElements };

          $(this.prnt).printArea(options);
        }
        if (!this.copydata) {
          // 控制复制和倒计时状态不允许点击
          this.$emit('click');
        }
      },
      parseDisabled: function () {
        let result = '';

        if (typeof this.disabled === 'string') {
          result = this.disabled === 'true';
        } else {
          result = this.disabled;
        }
        return result;
      },
      init_copy_btn: function () {
        let _this = this;

        if (this.copydata) {
          this.clipboard = new ClipboardJS('#' + this.id);
          this.clipboard.on('success', function (e) {
            _this.$emit('cbk_copy', _this.copydata);
          });

          this.clipboard.on('error', function (e) {
            _this.$emit('cbk_copy', 'error');
          });
        }
      },
      file_change: function (e) {
        let el = e.target;
        let files = [];

        if (el.files) {
          for (let i = 0;i < el.files.length;i++) {
            let file = el.files[i];
            let name = file.webkitRelativePath || file.relativePath || file.name;
            let suffix = (name && name.split('.').length > 1) ? (name.split('.')[name.split('.').length - 1]) : '';

            files.push({
              size: file.size,
              name: name,
              type: file.type,
              suffix: suffix,
              file,
              el
            });
          }
        }
        this.$emit('cbk_file', files);
        // 清除input记录
        el.value = '';
      },
      sub_count_down: function () {
        let _this = this;

        setTimeout(function () {
          _this.$emit('input', _this.value - 1);
        }, 1000);
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
    background-color:var(--theme);
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
    overflow: visible;
    outline: medium;
    text-transform: none;
    // -webkit-appearance: button;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    cursor: pointer;
    
    input[type='file'] {
      display: none;
    }
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