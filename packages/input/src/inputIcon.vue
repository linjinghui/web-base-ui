<template>
  <div id="wrap-input-icon" :class="[fbTheme, fbIcons]">
    <span class="sl" v-if="fbIcons==='both' || fbIcons==='left'">
      <slot name="icon-1"></slot>
    </span>
    <cmp-input
    :type="fbType"
    :placeholder="fbPlaceholder"
    :name="fbName"
    :lenth="fbLenth"
    :value="fbValue"
    :autoFocus="fbAutoFocus"
    :disabled="fbDisabled"
    :rule="fbRule"
    :theme="fbTheme"
    :checkTheme="fbCheckTheme"
    :needClear="fbNeedClear"
    :noPaste="noPaste"
    @focus="cbFocus"
    @blur="cbBlur"
    @enter="cbEnter"
    @callback="callback"></cmp-input>
    <span class="sr" v-if="fbIcons==='both' || fbIcons==='right'">
      <slot name="icon-2"></slot>
    </span>
  </div>
</template>

<script>
  import Input from './input.vue';
  // rule: number, mobile, fixPhone, chinese, letter, email, url
  export default {
    name: 'InputIcon',
    components: {
      'cmpInput': Input
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
      icons: {
        type: String,
        // left, right, both
        default: 'both'
      },
      theme: '',
      checkTheme: '',
      needClear: '',
      noPaste: Boolean
    },
    data: function () {
      return {
        clearShow: false,
        wrapClass: '',
        fbType: this.type,
        fbName: this.name,
        fbLenth: this.lenth,
        fbValue: this.value,
        fbAutoFocus: this.autoFocus,
        fbDisabled: this.disabled,
        fbRule: this.rule,
        fbPlaceholder: this.placeholder,
        fbIcons: this.icons,
        fbTheme: this.theme,
        fbCheckTheme: this.checkTheme,
        fbNeedClear: this.needClear
      };
    },
    mounted: function () {
      //
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
      checkTheme: function (val) {
        this.fbCheckTheme = val;
      }
    },
    methods: {
      callback: function (val) {
        this.$emit('callback', val);
      },
      cbBlur: function () {
        this.$emit('blur');
        // this.fbCheckTheme = 'error';
      },
      cbFocus: function () {
        this.$emit('focus');
        // this.fbCheckTheme = 'focus';
      },
      cbEnter: function () {
        this.$emit('enter');
        // this.fbCheckTheme = 'focus';
      }
    }
  };
</script>

<style scoped lang="scss">

  #wrap-input-icon {
    position: relative;
    height: 100%;
    overflow: hidden;
    background-color: inherit;
    user-select: none;

    span {
      position: relative;
      display: inline-block;
      float: left;
      width: 34px;
      height: 100%;
      min-height: 32px;
      border: solid 1px #ddd;
      border-radius: 4px;
      background-color: #f5f6f7;
    }

    span.sl {
      border-right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    span.sr {
      border-left: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    div {
      float: left;
      width: calc(100% - 34px - 34px);
      height: 100%;
      border-radius: 0;
    }
  }

  #wrap-input-icon.left,
  #wrap-input-icon.right {
    div {
      width: calc(100% - 34px);
    }
  }

  #wrap-input-icon.theme-1 {
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #ddd;
    * {
      border: 0;
      background-color: transparent;
    }

    .iptWrap {
      position: static;
    }
  }
</style>