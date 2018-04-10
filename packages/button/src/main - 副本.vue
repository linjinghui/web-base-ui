<template>
  <label class="button" :for="bfFileId" v-if="bfSelectFile" :class="bfTheme" :disabled="bfDisabled">{{bfText}}
    <input type="file" name="sfile" ref="sfile" :id="bfFileId" :accept="bfAccept" :multiple="bfMultiple" @change="fileChange">
  </label>
  <button class="button" v-else-if="copyData" :id="bfId" :data-clipboard-text="copyData" :class="bfTheme" :disabled="bfDisabled">{{bfText}}</button>
  <button class="button" v-else :class="bfTheme" :disabled="bfDisabled" @click="clk">{{bfText}}</button>
</template>

<script type="text/babel">
  import ClipboardJS from 'clipboard';

  export default {
    name: 'Button',
    data: function () {
      let cid = 'copy-btn-' + new Date().getTime();

      return {
        bfId: cid,
        clipboard: '',
        bfTheme: this.theme,
        bfText: this.text,
        bfAfterText: this.afterText,
        bfDisabled: this.disabled,
        bfInterval: this.interval,
        bfSelectFile: this.selectFile,
        bfAccept: this.accept,
        bfMultiple: this.multiple,
        bfFileId: '',
        timer: '',
        localKey: ''
      };
    },
    props: {
      'eventName': {
        default: 'changeBtn'
      },
      'theme': {
        type: String
      },
      'text': {
        type: String,
        default: '按钮1'
      },
      'disabled': {
        type: Boolean,
        default: false
      },
      // 计时相关 ∨
      afterText: {
        type: String,
        default: '后重新获取'
      },
      // 单位秒
      interval: {
        type: Number,
        default: 0
      },
      // 刷新后是否保持计时
      freshDeep: {
        type: Boolean,
        default: false
      },
      // 计时相关 ∧
      // 选择文本相关 ∨
      selectFile: {
        type: Boolean,
        default: false
      },
      copyData: {
        type: String,
        default: ''
      },
      accept: '',
      multiple: {
        type: Boolean,
        default: false
      }
      // 选择文本相关 ∧
    },
    watch: {
      interval: function (val) {
        this.bfInterval = val;
        this.clearTimer();
        this.startTime();
      },
      theme: function (val) {
        this.setBfTheme(val);
      }
    },
    beforeDestroy: function () {
      if (this.clipboard) {
        this.clipboard.destroy();
      }
    },
    mounted: function () {
      // this.addParamsChange();
      // 设置localstorage唯一key
      this.localKey = 'lkey_time';
      // 构造按钮主题
      this.setBfTheme(this.theme);
      // 设置文件选择按钮相关
      if (this.bfSelectFile) {
        this.setBfFileId();
      }
      // 获取本地缓存的计时数据
      let localTime = this.getTimeInLocal();

      if (this.freshDeep && localTime) {
        this.bfInterval = localTime;
        this.clearTimer();
        this.startTime();
      }

      this.initCopyButton();
    },
    methods: {
      // addParamsChange: function () {
      //   let _this = this;

      //   window.EVENTBUS.$on(this.eventName, function (data) {
      //     if (typeof data.display !== 'undefined') {
      //       _this.bfDisplay = data.display;
      //     }
      //     if (data.theme) {
      //       _this.setBfTheme(data.theme);
      //     }
      //     if (data.text) {
      //       _this.bfText = data.text;
      //     }
      //     if (typeof data.disabled !== 'undefined') {
      //       _this.bfDisabled = data.disabled;
      //     }
      //   });
      // },
      setBfTheme: function (theme) {
        var def = ['line', 'cancel', 'del', 'del2', 'success', 'warn', 'fresh'];

        if (theme && def.indexOf(theme) === -1) {
          theme = 'def';
        }
        this.bfTheme = 'thm-' + theme;
      },
      clk: function () {
        this.$emit('click');
      },
      // 开始计时
      startTime: function () {
        let _this = this;
        let time = this.bfInterval;

        if (time) {
          this.bfDisabled = true;
          this.setText(time + 's');
          this.timer = setInterval(function () {
            if (time <= 1) {
              _this.clearTimer();
              _this.freshDeep && _this.clearTimeInLocal();
              _this.$emit('callback');
            } else {
              time -= 1;
              _this.freshDeep && _this.saveTimeInLocal(time);
              _this.setText(time + 's');
            }
          }, 1000);
        }
      },
      // 设置计时文本
      setText: function (newText) {
        if (this.bfAfterText) {
          this.bfText = newText + this.bfAfterText;
        }
      },
      // 保存计时到本地缓存
      saveTimeInLocal: function (data) {
        window.localStorage.setItem(this.localKey, data);
      },
      // 获取本地缓存的计时数据
      getTimeInLocal: function (data) {
        let val = window.localStorage.getItem(this.localKey) || 0;

        return parseInt(val);
      },
      // 清除计时本地缓存
      clearTimeInLocal: function () {
        window.localStorage.removeItem(this.localKey);
      },
      // 清除计时, 还原文本内容
      clearTimer: function () {
        clearInterval(this.timer);
        this.bfDisabled = false;
        this.bfText = this.text;
      },
      getUid: function () {
        let s = [];
        let hexDigits = '0123456789abcdef';

        for (let i = 0;i < 36;i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = '4';
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = '-';
        return s.join('');
      },
      setBfFileId: function () {
        this.bfFileId = this.getUid();
      },
      fileChange: function (e) {
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
        this.$emit('callback', files);
        // 清除input记录
        this.$refs.sfile.value = '';
      },
      initCopyButton: function () {
        let _this = this;

        if (this.bfId && this.copyData) {
          this.clipboard = new ClipboardJS('#' + this.bfId);
          this.clipboard.on('success', function (e) {
            _this.$emit('callbackCopy', 'success');
          });

          this.clipboard.on('error', function (e) {
            _this.$emit('callbackCopy', 'error');
          });
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .button {
    position: relative;display: inline-block;
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
    padding: 0;border: 0;
  }

  .button:not([disabled]):hover {
    background-color: #298fff;
  }

  .button:not([disabled]):active {
    background-color: #0172f0;
  }

  .button.thm-line {
    color: #0079ff;background-color: #fff;border-style: solid;border-width: 1px;border-color: #0079ff;
  }

  .button.thm-line:not([disabled]):hover {
    color: #298fff;border-color: #298fff;background-color: #fff;
  }

  .button.thm-line:not([disabled]):active {
    color: #0068db;border-color: #0068db;background-color: #fff;
  }

  .button.thm-cancel {
    color: #262626;background-color: #fff;border-color: #ddd;
  }

  .button.thm-cancel:not([disabled]):hover {
    background-color: #ddd;
  }

  .button.thm-cancel:not([disabled]):active {
    background-color: #ddd;
  }

  .button.thm-del {
    color: #fff;background-color: #ff5e5e;
  }

  .button.thm-del:not([disabled]):hover {
    background-color: #ed5858;
  }

  .button.thm-del:not([disabled]):active {
    background-color: #ed5858;
  }

  .button.thm-del2 {
    color: #fc454c;background-color: #fff;border-color: #fc454c;
  }

  .button.thm-del2:not([disabled]):hover {
    color: #e64046;background-color: #fff;border-color: #e64046;
  }

  .button.thm-del2:not([disabled]):active {
    color: #c4373d;background-color: #fff;border-color: #c4373d;
  }

  .button.thm-success {
    color: #fff;background-color: #13ce66;
  }

  .button.thm-success:not([disabled]):hover {
    background-color: #22e177;
  }

  .button.thm-success:not([disabled]):active {
    background-color: #0cc65f;
  }

  .button.thm-warn {
    color: #fff;background-color: #f7ba2a;
  }

  .button.thm-warn:not([disabled]):hover {
    background-color: #fac342;
  }

  .button.thm-warn:not([disabled]):active {
    background-color: #f7b71f;
  }

  .button.thm-fresh {
    color: #fff;background-color: #45abff;
  }

  .button.thm-fresh:not([disabled]):hover {
    background-color: #409fed;
  }

  .button.thm-fresh:not([disabled]):active {
    background-color: #409fed;
  }

  label.button {
    -webkit-appearance: inherit;

    input {
      display: none;
    }
  }
</style>