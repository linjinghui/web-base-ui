<!-- 
功能介绍：
1、普通按钮（主题：主要|成功|信息|警告|危险）
2、复制到剪贴版按钮（成功: 返回剪贴内容，错误：error）
3、选择文件按钮
4、计时器按钮
 -->

<template>
  <button class="button" v-if="typeof fileOption==='undefined'"
    :style="{'background-color': backColor}" 
    :id="id"
    :disabled="_disabled"
    :data-clipboard-text="copyData"
    @click="clk">
    <slot></slot>
  </button>
  <!-- 选择文件专用∨ -->
  <label class="button" v-else
    :style="{'background-color': backColor}" 
    :id="id"
    :disabled="_disabled"
    :for="'file_' + id">
      <input type="file" 
        :id="'file_' + id" 
        :disabled="_disabled"
        :accept="fileOption.accept"
        :multiple="fileOption.multiple"
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
      copyData: '',
      fileOption: ''
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
      },
      _disabled: function () {
        let result = '';

        if (typeof this.disabled === 'string') {
          result = this.disabled === 'true';
        } else {
          result = this.disabled;
        }
        return result;
      }
    },
    beforeDestroy: function () {
      // 
    },
    mounted: function () {
      // 初始化剪贴板
      this.init_copy_btn();
    },
    methods: {
      clk: function () {
        if (!this.copyData) {
          this.$emit('click');
        }
      },
      init_copy_btn: function () {
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