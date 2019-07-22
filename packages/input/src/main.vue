<!--
功能介绍：
1、支持显示、隐藏清空按钮 - 默认显示
2、支持自定义左右两侧图标 - （右侧图标会覆盖清空按钮）
 -->

<template>
  <span class="input" :class="{'pdlt': pdlt, 'pdrt': pdrt}" :id="id">
    <input :class="{'theme-bc':focus}"
    autoComplete="off"
    ref="ipt"
    v-model.trim="val"
    :name="name"
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
      <i class="cicon-cross-crle-chr-cpt center-v" v-if="_showClear" @click="clk_del"></i>
      <slot name="right"></slot>
    </slot>
  </span>
</template>

<script type="text/babel">
  export default {
    name: 'Input',
    data: function () {
      return {
        id: 'ipt_' + new Date().getTime() + parseInt(Math.random() * 100),
        val: this.value,
        focus: '',
        pdlt: '',
        pdrt: ''
      };
    },
    props: {
      value: '',
      type: {
        default: 'text'
      },
      name: '',
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
        let result = '';
        
        result = ((this.clear + '') !== 'false') && ((this.disabled + '') !== 'true') && ((this.readonly + '') !== 'true') && this.val && this.val.length > 0 && this.focus;
        return result;
      }
    },
    beforeDestroy: function () {
      //
    },
    mounted: function () {
      var _this = this;

      this.pdlt = this.$slots.left;
      this.pdrt = this.$slots.right;
      this.is_auto_focus();
      // 监控DOM变化
      this.addDomChange(function () {
        _this.pdlt = _this.$slots.left;
        _this.pdrt = _this.$slots.right;
      });
    },
    methods: {
      clk_del: function () {
        this.val = '';
        this.do_focus();
      },
      evn_focus: function () {
        this.$emit('focus');
        this.focus = true;
      },
      evn_blur: function () {
        var _this = this;
        
        this.do_reg_value();
        this.$emit('blur');
        setTimeout(function () { _this.focus = false; }, 200);
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
        let value = this.val || '';

        if (typeof value !== 'string') {
          value += '';
        }

        if (this.rule === 'number') {
          this.val = value.replace(/[\D]+/g, '');
        } else if (this.rule === 'float') {
          let _val = '';
          let _i = 0;

          // 删除非数字.的字符串
          _val = value.replace(/[^0-9.]+/g, '');
          // 去除多余的.
          _val = _val.replace(/\./g, function (a) {
            ++_i;
            return _i === 1 ? a : '';
          });
          this.val = _val;
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
      },
      addDomChange: function (cbk) {
        var target = document.getElementById(this.id);
        var callback = function (records) {
          records.map(function (record) {
            cbk && cbk();
          });
        };
        var mo = new MutationObserver(callback);
        var option = {
          'childList': true,
          'subtree': true
        };

        if (target) {
          mo.observe(target, option);
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
      padding-left: 10px;
      padding-right: 36px;
      width: 100%;
      height: 100%;
      border-style: solid;
      border-width: 1px;
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

    >input:not(.theme-bc) {
      border-color: #ddd;
    }

    >i {
      position: absolute;
      font-size: 16px;
      color: #fff;
      background-color: #999;
    }

    >.cicon-cross-crle-chr-cpt {
      right: 10px;
    }
  }

  .input.pdlt {
    >input {
      padding-left: 36px;
    }
    >i:first-of-type {
      left: 10px;
    }
  }

  .input.pdrt {
    >input {
      padding-right: 62px;
    }
    >i:last-of-type {
      right: 10px;
    }
    >.cicon-cross-crle-chr-cpt {
      right: 36px;
    }
  }
</style>