<!--
功能介绍：
1、支持自定义背景色（theme - 'red'）
2、禁用（disabled - true|false）
3、确认点击前执行事件（beforeclk - function）
 -->

<template>
  <label class="radio" :disabled="(disabled+'')==='true'" @click="clk">
    <span :class="{'theme-c':value!==''&&value===val}"><i class="theme-b"></i></span>
    <!-- <i :class="{'selected theme-c theme-b':value!==''&&value===val}"></i> -->
    <slot></slot>
  </label>
</template>

<script type="text/babel">
  export default {
    name: 'Radio',
    data: function () {
      return {};
    },
    props: {
      disabled: '',
      value: '',
      theme: {
        type: String,
        default: 'theme-b'
      },
      beforeclk: {
        type: Function
      },
      val: ''
    },
    watch: {
      //
    },
    computed: {
      // _style: function () {
      //   return {
      //     borderColor: this.theme,
      //     backgroundColor: this.theme
      //   };
      // }
    },
    beforeDestroy: function () {
      //
    },
    mounted: function () {
      //
    },
    methods: {
      clk: function () {
        if (this.disabled + '' !== 'true') {
          if (this.beforeclk) {
            this.beforeclk() && this.$emit('input', this.val);
          } else {
            this.$emit('input', this.val);
          }
        }
      }
    }
  };
</script>
  
<style scoped lang="scss">
  
  .radio {
    display: inline-block;
    margin-right: 10px;
    user-select: none;

    > span {
      position: relative;
      display: inline-block;
      margin-right: 5px;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      border-width: 1px;
      border-style: solid;
      vertical-align: middle;
      font-size: 16px;

      > i {
        display: none;
      }
    }
    > span:not(.theme-c) {
      color: #dcdfe6;
    }

    > span.theme-c > i {
      position: absolute;
      display: block;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 0.5em;
      height: 0.5em;
      border-radius: 50%;
    }

  }

  .radio:not([disabled]) {
    cursor: pointer;
  }

  .radio:not([disabled]):hover > i:not(.selected) {
    border-color: #ccc!important;
  }
</style>