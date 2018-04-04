<template>
  <div class="iptWrap" :class="[fbCheckTheme, fbTheme]">
    <cmp-main :type="fbType" :placeholder="fbPlaceholder" :name="fbName" :lenth="fbLenth" :value="fbValue" :autoFocus="fbAutoFocus" :disabled="fbDisabled" :rule="fbRule" :noPaste="noPaste" @callback="callback" @focus="cbFocus" @blur="cbBlur" @enter="cbEnter"></cmp-main>
    <span v-if="fbNeedClear">
      <i class="icon cmpIconfont icon-eraser" v-show="clearShow" @click="clearValue"></i>
    </span>
  </div>
</template>

<script type="text/babel">
  import InputMain from './main.vue';

  export default {
    name: 'Input',
    components: {
      'cmpMain': InputMain
    },
    props: {
      type: '',
      name: '',
      lenth: '',
      value: '',
      autoFocus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      rule: '',
      placeholder: {
        type: String,
        default: '请输入内容'
      },
      // theme-1
      theme: '',
      // focus error succcess
      checkTheme: '',
      needClear: {
        type: Boolean,
        default: true
      },
      noPaste: Boolean
    },
    data: function () {
      return {
        clearShow: false,
        fbType: this.type,
        fbName: this.name,
        fbLenth: this.lenth,
        fbValue: this.value,
        fbAutoFocus: this.autoFocus,
        fbDisabled: this.disabled,
        fbRule: this.rule,
        fbPlaceholder: this.placeholder,
        fbTheme: this.theme,
        fbCheckTheme: this.checkTheme,
        fbNeedClear: this.needClear
      };
    },
    watch: {
      type: function (val) {
        this.fbType = val;
      },
      value: function (val) {
        this.fbValue = val;
      },
      lenth: function (val) {
        this.fbLenth = val;
      },
      placeholder: function (val) {
        this.fbPlaceholder = val;
      },
      disabled: function (val) {
        this.fbDisabled = val;
      },
      fbValue: function (val) {
        this.checkClearShow();
      },
      checkTheme: function (val) {
        let _this = this;

        this.fbCheckTheme = '';
        setTimeout(function () {
          _this.fbCheckTheme = val;
        }, 240);
      }
    },
    mounted: function () {
      this.checkClearShow();
    },
    methods: {
      clearValue: function () {
        let _this = this;

        this.fbAutoFocus = false;
        this.callback('');
        setTimeout(function () {
          _this.fbAutoFocus = true;
        }, 50);
      },
      checkClearShow: function () {
        this.clearShow = this.fbValue && this.fbValue.length > 0;
      },
      callback: function (val) {
        this.fbValue = val;
        this.$emit('callback', val);
      },
      cbFocus: function (data) {
        this.fbCheckTheme = 'focus';
        this.$emit('focus', data);
      },
      cbBlur: function (data) {
        this.fbCheckTheme = '';
        this.$emit('blur', data);
      },
      cbEnter: function () {
        this.$emit('enter');
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../src/style/global';
  $height: 30px;
  $focus: #0079ff;
  $error: #ff5e5e;
  $success: #6cce63;

  .iptWrap {
    position: relative;
    // height: $height;
    height: 100%;
    overflow: hidden;
    background-color: inherit;
    border-style: solid;
    border-width: 1px;
    border-color: #ddd;
    border-radius: 4px;

    input {
      float: left;
      width: calc(100% - #{$height});
      height: 100%;
      min-height: 30px;
      padding-right: 0;
      border: 0;
      color: inherit;
      font: inherit;
      outline: medium;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    input[disabled] {
      cursor: text;user-select: none;
    }

    input::-ms-clear {
      display: none;
    }

    span {
      position: relative;
      float: right;
      width: $height;
      height: 100%;
      min-height: 30px;

      .cmpIconfont {
        @include center();
        width: 22px;
        height: 22px;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
      }
    }

    input[disabled] + span {
      background-color: #f1f1ec;
    }
  }

  .iptWrap:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 1px;
    background-color: transparent;
    transition: width .4s ease-in-out;
  }

  .iptWrap.focus {
    border-color: $focus;
  }

  .iptWrap.error {
    border-color: $error;
  }

  .iptWrap.success {
    border-color: $success;
  }

  .iptWrap[class*='theme'] {
    // position: static;
    border-color: transparent;
  }

  .iptWrap.theme-1.focus:after {
    width: 200%;
    background-color: $focus;
  }

  .iptWrap.theme-1.error:after {
    width: 200%;
    background-color: $error;
  }

  .iptWrap.theme-1.success:after {
    width: 200%;
    background-color: $success;
  }
</style>