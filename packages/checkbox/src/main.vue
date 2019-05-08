<!--
功能介绍：
1、支持自定义背景色（theme - 'red'）
2、禁用（disabled - true|false）
3、确认点击前执行事件（beforeclk - function）
 -->
<template>
  <label class="checkbox"
    :disabled="(disabled+'')==='true'"
    @click="clk">
    <i
      :class="{'cicon-tick-cbdr': _select, 'cicon-tick-cbdr-cemt': !_select}"
      :style="_select?_style:''"></i>
    <slot></slot>
  </label>
</template>

<script type="text/babel">
  export default {
    name: 'Checkbox',
    data: function () {
      return {
        //
      };
    },
    props: {
      disabled: '',
      // value: {
      //   type: Array,
      //   default: []
      // },
      value: '',
      val: '',
      theme: {
        type: String,
        default: 'var(--theme)'
      },
      beforeclk: {
        type: Function
      }
    },
    watch: {
      // value: function (val) {
      //   if (val && (this.disabled + '') === 'true') {
      //     this.$emit('input', false);
      //   }
      // }
    },
    computed: {
      _style: function () {
        return {
          borderColor: this.theme,
          backgroundColor: this.theme
        };
      },
      _select: function () {
        let result = this.value;

        if (typeof this.value === 'boolean') {
          result = this.value;
        } else if (this.value instanceof Array) {
          var index = result.indexOf(this.val);

          result = index >= 0 && result[index] !== '';
          // result = result.indexOf(this.val) >= 0;
        } else {
          result = this.value + '' === 'true';
        }
        return result;
      }
    },
    mounted: function () {
      //
    },
    methods: {
      clk: function () {
        if (this.disabled + '' !== 'true') {
          if (this.beforeclk) {
            if (this.beforeclk()) {
              this.emt(this.val);
              this.$emit('click');
            }
          } else {
            this.emt(this.val);
            this.$emit('click');
          }
        }
      },
      emt: function (val) {
        if (typeof val === 'undefined') {
          this.$emit('input', !this.value);
        } else {
          var arr = JSON.parse(JSON.stringify(this.value));
          var index = arr.indexOf(val);

          if (index >= 0) {
            // 存在，需要删除
            arr.splice(index, 1);
          } else {
            // 不存在，添加
            arr[arr.length] = val;
          }
          this.$emit('input', arr);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .checkbox {
    display: inline-block;
    margin-right: 10px;
    user-select: none;
    
    >i {
      margin-right: 6px;
      border-radius: 2px;
      font-size: 15px;
      border-color: #dcdfe6;
      background-color: #fff;
      vertical-align: -3px;
    }
    >i.cicon-tick-cbdr:before,
    >i.cicon-tick-cbdr:after {
      border-color: #fff;
    }
  }

  .checkbox:not([disabled]) {
    cursor: pointer;
  }

  .checkbox:not([disabled]):hover > i.cicon-tick-cbdr-cemt {
    border-color: #ccc;
  }
</style>