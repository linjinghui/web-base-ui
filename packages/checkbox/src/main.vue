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
      :class="{'cicon-tick-cbdr': value, 'cicon-tick-cbdr-cemt': !value}"
      :style="value?_style:''"></i>
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
      value: '',
      theme: {
        type: String,
        default: '#0079ff'
      },
      beforeclk: {
        type: Function
      }
    },
    computed: {
      _style: function () {
        return {
          borderColor: this.theme,
          backgroundColor: this.theme
        };
      }
    },
    mounted: function () {
      // 
    },
    methods: {
      clk: function () {
        if (this.disabled + '' !== 'true') {
          if (this.beforeclk) {
            this.beforeclk() && this.$emit('input', !this.value); 
          } else {
            this.$emit('input', !this.value); 
          }
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .checkbox {
    display: inline-block;
    user-select: none;
    >i {
      border-radius: 2px;
      font-size: 16px;
      border-color: #dcdfe6;
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