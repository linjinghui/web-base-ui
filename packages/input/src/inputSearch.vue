<template>
  <div id="inputSearch">
    <cmp-inputicon
    :placeholder="fbPlaceholder"
    :name="fbName"
    :lenth="fbLenth"
    :value="fbValue"
    :autoFocus="fbAutoFocus"
    :disabled="fbDisabled"
    :rule="fbRule"
    :icons="fbIcons"
    :needClear="fbNeedClear"
    :noPaste="noPaste"
    @focus="cbFocus"
    @blur="cbBlur"
    @enter="cbEnter"
    @callback="callback">
      <i slot="icon-2" class="icon cmpIconfont icon-search" @click="search"></i>
    </cmp-inputicon>
  </div>
</template>

<script>
  import InputIcon from './inputIcon.vue';
  // rule: number, mobile, fixPhone, chinese, letter, email, url
  export default {
    name: 'InputSearch',
    components: {
      'cmpInputicon': InputIcon
    },
    props: {
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
      needClear: '',
      noPaste: Boolean
    },
    data: function () {
      return {
        fbName: this.name,
        fbLenth: this.lenth,
        fbValue: this.value,
        fbAutoFocus: this.autoFocus,
        fbDisabled: this.disabled,
        fbRule: this.rule,
        fbPlaceholder: this.placeholder,
        // left, right, both
        fbIcons: 'right',
        fbNeedClear: this.needClear
      };
    },
    watch: {
      value: function (val) {
        this.fbValue = val;
      },
      lenth: function (val) {
        this.fbLenth = val;
      },
      disabled: function (val) {
        this.fbDisabled = val;
      },
      placeholder: function (val) {
        this.fbPlaceholder = val;
      }
    },
    methods: {
      callback: function (val) {
        this.fbValue = val;
        this.$emit('callback', val);
      },
      cbBlur: function () {
        this.$emit('blur');
      },
      cbFocus: function () {
        this.$emit('focus');
      },
      cbEnter: function () {
        this.$emit('enter', this.fbValue);
      },
      search: function () {
        this.$emit('search', this.fbValue);
      }
    }
  };
</script>

<style type="text/css">
  #inputSearch {
    #wrap-input-icon.right {
      >div {
        border-radius: 4px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }
</style>
<style scoped lang="scss">
  @import '../../../src/style/global';
  #inputSearch {
    height: 100%;
    min-height: 30px;

    .icon-search {
      display: block;
      @include center();
      width: 22px;
      height: 24px;
      font-size: 20px;
      cursor: pointer;
    }
  }
</style>