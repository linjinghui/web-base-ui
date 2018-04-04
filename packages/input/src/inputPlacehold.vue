<template>
  <div id="wrap-input-placeholder" ref="wphld">
    <p :class="{'placeholder': isPlaceholder}" @click="clkPhd">{{placeholder}}</p>
    <cmp-input
    :type="fbType"
    :name="fbName"
    :lenth="fbLenth"
    :value="fbValue"
    :placeholder="''"
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

  export default {
    name: 'InputPlaceholder',
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
        isPlaceholder: this.value.length === 0,
        wrapClass: '',
        fbType: this.type,
        fbName: this.name,
        fbLenth: this.lenth,
        fbValue: this.value,
        fbAutoFocus: this.autoFocus,
        fbDisabled: this.disabled,
        fbRule: this.rule,
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
        if (val.length > 0) {
          this.isPlaceholder = false;
        }
      },
      lenth: function (val) {
        this.fbLenth = val;
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
      cbBlur: function (data) {
        if (data && data.length > 0) {
          this.isPlaceholder = false;
        } else {
          this.isPlaceholder = true;
        }
        this.$emit('blur');
      },
      cbFocus: function () {
        this.isPlaceholder = false;
        this.$emit('focus');
      },
      cbEnter: function () {
        this.$emit('enter');
      },
      clkPhd: function () {
        let dom = this.$refs.wphld;
        let domIpt = dom.querySelector('input');

        if (this.isPlaceholder) {
          domIpt.focus();
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  $height: 28px;

  #wrap-input-placeholder {
    position: relative;
    height: 100%;
    padding-top: $height;
    overflow: hidden;
    background-color: inherit;
    user-select: none;

    >p {
      position: absolute;
      left: 5px;
      top: 0;
      height: $height;
      line-height: $height;
      color: inherit;
      font-size: 12px;
      transition: all .3s;
      z-index: 2;
      cursor: text;
    }

    >p.placeholder {
      top: 50%;
      font-size: 14px;
      color: #999;
      opacity: 0.54;
    }
  }

</style>