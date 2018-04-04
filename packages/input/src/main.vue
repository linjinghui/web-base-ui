<template>
  <input
  autoComplete="off"
  ref="ipt"
  type="text"
  :onpaste="noPaste?'return false':''"
  v-model.trim="fbValue"
  :disabled="fbDisabled"
  :name="fbName"
  :maxlength="fbLenth"
  :placeholder="fbPlaceholder"
  @focus="focus"
  @keyup="checkRule"
  @blur="checkBlur"
  @keyup.enter="funEnter">
</template>

<script type="text/babel">
  export default {
    name: 'InputMain',
    data: function () {
      return {
        fbName: this.name,
        fbLenth: this.lenth,
        fbPlaceholder: this.placeholder,
        fbValue: this.value,
        fbAutoFocus: this.autoFocus,
        fbDisabled: this.disabled,
        // number, mobile, fixPhone, chinese, letter, email, url
        fbRule: this.rule,
        fbRuleNumber: /[\D]+/g,
        fbRuleMobile: /[^\d]+/g,
        fbRuleFixPhone: /[^\d]+/g,
        fbRuleChinese: /[^\u4e00-\u9fa5]/g,
        fbRuleLetter: /[^a-zA-Z]/g
      };
    },
    props: {
      type: {
        default: 'text'
      },
      name: '',
      lenth: '',
      value: '',
      placeholder: '',
      autoFocus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      noPaste: {
        type: Boolean,
        default: false
      },
      rule: ''
    },
    watch: {
      type: function (val) {
        this.$refs.ipt.setAttribute('type', val);
      },
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
      },
      fbValue: function (val) {
        // this.checkRule();
        this.$emit('callback', val);
      },
      autoFocus: function (val) {
        this.fbAutoFocus = val;
        this.checkAutoFocus();
      }
    },
    mounted: function () {
      this.$refs.ipt.setAttribute('type', this.type);
      this.checkValueLenth();
    },
    methods: {
      focus: function () {
        this.$emit('focus', this.fbValue);
      },
      checkAutoFocus: function () {
        if (this.autoFocus) {
          this.$refs.ipt.focus();
        }
      },
      checkRule: function () {
        // number, mobile, fixPhone, chinese, letter, email, url
        let rule = '';
        let value = this.fbValue ? JSON.parse(JSON.stringify(this.fbValue)) : '';

        if (value.length === 0) {
          // return '';
        } else if (this.fbRule === 'number') {
          rule = this.fbRuleNumber;
          if (rule && value.match(rule)) {
            this.fbValue = value.replace(rule, function (a) {
              return '';
            });
          }
        } else if (this.fbRule === 'mobile') {
          this.fbLenth = 11;
          rule = this.fbRuleMobile;
          if (value.indexOf('1') !== 0) {
            value = 1 + value.substring(1);
          }

          if (rule && value.match(rule)) {
            value = value.replace(rule, function (a) {
              return '';
            });
          }
          this.fbValue = value;
        } else if (this.fbRule === 'fixPhone') {
          rule = this.fbRuleFixPhone;
          if (value.indexOf('0') === 0) {
            this.fbLenth = 12;
          } else {
            this.fbLenth = 8;
          }
          value = value.replace(rule, function (a) {
            return '';
          });
          value = value.substring(0, this.fbLenth);
          this.fbValue = value;
        } else if (this.fbRule === 'chinese') {
          rule = this.fbRuleChinese;
          value = value.replace(rule, function (a) {
            return '';
          });
          this.fbValue = value;
        } else if (this.fbRule === 'letter') {
          rule = this.fbRuleLetter;
          value = value.replace(rule, function (a) {
            return '';
          });
          this.fbValue = value;
        }
      },
      checkBlur: function () {
        let value = this.fbValue ? JSON.parse(JSON.stringify(this.fbValue)) : '';

        if (value.length === 0) {
          // something
        } else if (this.fbRule === 'email') {
          if (value.indexOf('@') < 0) {
            let half = parseInt(value.length / 2);

            value = value.substring(0, half) + '@' + value.substring(half);
            this.fbValue = value;
          }
        } else if (this.fbRule === 'url') {
          value = value.replace(/:\/+/g, function (a, b) {
            let result = b > 4 ? '' : a;

            return result;
          });
          if (value.indexOf('http://') < 0 && value.indexOf('https://') < 0) {
            value = 'http://' + value;
          }
          this.fbValue = value;
        }
        this.$emit('blur', this.fbValue);
      },
      checkValueLenth: function () {
        if (this.fbLenth && this.fbValue) {
          this.fbValue = (this.fbValue + '').substring(0, this.fbLenth);
        }
      },
      funEnter: function () {
        this.$emit('enter');
      }
    }
  };
</script>

<style scoped>
  input {
    line-height: 1.42857143!important;
    font-size: inherit;
    color: inherit;
    background-color: inherit;
  }
</style>