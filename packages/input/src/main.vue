<!--
功能介绍：
1、支持显示、隐藏清空按钮 - 默认显示
2、支持自定义左右两侧图标 - （右侧图标会覆盖清空按钮）
 -->

<template>
  <span class="input" :class="{'pdlt': _pdlt, 'pdrt': _showClear || _pdrt}">
    <input autoComplete="off"
    ref="ipt"
    v-model.trim="val"
    :id="id"
    :type="type"
    :disabled="(disabled+'')==='true'"
    :maxlength="maxlength"
    :placeholder="placeholder"
    :onpaste="(nopaste+''==='true')?'return false':''"
    :readonly="(readonly+'')==='true'"
    @focus="evn_focus"
    @blur="evn_blur"
    @keyup="evn_keyup"
    @keyup.enter="evn_enter">
    <slot>
      <slot name="left"></slot>
      <slot name="right"></slot>
      <i class="cicon-cross-crle-chr-cpt center-v" v-if="_showClear" @click="clk_del"></i>
    </slot>
  </span>
</template>

<script type="text/babel">
  export default {
    name: 'Input',
    data: function () {
      return {
        val: this.value
      };
    },
    props: {
      id: {
        default: ''
      },
      value: '',
      type: {
        default: 'text'
      },
      maxlength: '',
      readonly: '',
      placeholder: '',
      nopaste: '',
      autofocus: '',
      disabled: '',
      clear: {
        default: true
      },
      // number|mobile|fix|email|url|letter|chinese
      rule: ''
    },
    watch: {
      val: function (val) {
        this.$emit('input', val);
      },
      value: function (val) {
        this.val = val;
      },
      autofocus: function () {
        this.is_auto_focus();
      }
    },
    computed: {
      _showClear: function () {
        let slotLeft = this.$slots.left;
        let slotRight = this.$slots.right;
        let result = '';

        if (slotLeft && slotRight) {
          result = false;
        } else if (slotRight) {
          result = false;
        } else {
          result = ((this.clear + '') !== 'false') && ((this.disabled + '') !== 'true') && this.val.length > 0;
        }
        return result;
      },
      _pdlt: function () {
        return this.$slots.left;
      },
      _pdrt: function () {
        return this.$slots.right;
      }
    },
    beforeDestroy: function () {
      //
    },
    mounted: function () {
      this.is_auto_focus();
    },
    methods: {
      clk_del: function () {
        this.val = '';
        this.do_focus();
      },
      evn_focus: function () {
        this.$emit('focus');
      },
      evn_blur: function () {
        this.do_reg_value();
        this.$emit('blur');
      },
      evn_keyup: function (event) {
        this.$emit('keyup', event.keyCode);
      },
      evn_enter: function () {
        this.$emit('enter');
      },
      do_focus: function () {
        this.$refs.ipt.focus();
      },
      is_auto_focus: function () {
        if (this.autofocus + '' === 'true') {
          this.do_focus();
        }
      },
      do_reg_value: function () {
        let value = this.val;

        if (this.rule === 'number') {
          this.val = value.replace(/[\D]+/g, '');
        } else if (this.rule === 'mobile') {
          value = value.replace(/[\D]+/g, '');
          if (value.indexOf('1') !== 0) {
            this.val = '1' + value.substring(0, 10);
          } else {
            this.val = value.substring(0, 11);
          }
        } else if (this.rule === 'fix') {
          this.val = value.replace(/[^0-9-]+/g, '');
        } else if (this.rule === 'email') {
          value = value.replace(/^@+|@+$/g, '').replace(/\s+/g, '');
          if (value.indexOf('@') < 0) {
            this.val = value + '@qq.com';
          }
        } else if (this.rule === 'url') {
          if (value.indexOf('http://') !== 0 && value.indexOf('https://') !== 0) {
            this.val = 'http://' + value;
          }
        } else if (this.rule === 'letter') {
          this.val = value.replace(/[^a-zA-Z]+/g, '');
        } else if (this.rule === 'chinese') {
          this.val = value.replace(/[^\u4e00-\u9fa5]+/g, '');
        } else if (typeof this.rule === 'string') {
          this.val = value.replace(new RegExp(this.rule, 'g'), '');
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .input {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 34px;

    >input {
      display: block;
      width: 100%;
      height: 100%;
      border-style: solid;
      border-width: 1px;
      border-color: #ddd;
      color: inherit;
      font: inherit;
      outline: medium;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    >input[disabled] {
      cursor: text;
      user-select: none;
    }

    >input::-ms-clear {
      display: none;
    }

    >input:not([readonly]):focus {
      border-color: #0079ff;
    }

    >i {
      position: absolute;
      font-size: 16px;
      color: #fff;
      background-color: #999;
    }
  }

  .input.pdlt {
    >input {
      padding-left: 24px;
    }
    >i:first-of-type {
      left: 5px;
    }
  }

  .input.pdrt {
    >input {
      padding-right: 24px;
    }
    >i:last-of-type {
      right: 5px;
    }
  }
</style>