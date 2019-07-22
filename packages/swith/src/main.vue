<!--
功能介绍：
1、theme: 背景色 - #333|red|green, 支持自定义
2、disabled: 是否禁用 - true|false, 不传默认false
3、beforeclk: 点击前执行方法，返回true才会继续点击
 -->

<template>
  <button class="swith theme-b"
    :disabled="(disabled+'')==='true'"
    :class="(value+'')==='true'?'on':'off'"
    :style="(value+'')==='true'?_style:''"
    @click="clk"></button>
</template>

<script type="text/babel">
  export default {
    name: 'Swith',
    data: function () {
      return {};
    },
    props: {
      disabled: '',
      value: '',
      theme: {
        default: ''
      },
      beforeclk: {
        type: Function
      }
    },
    computed: {
      _style: function () {
        return {
          'backgroundColor': this.theme
        };
      }
    },
    methods: {
      clk: function () {
        if (this.beforeclk) {
          this.beforeclk() && this.$emit('input', !this.value);
        } else {
          this.$emit('input', !this.value);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .swith {
    position: relative;
    width: 40px!important;
    height: 20px;
    border-radius: 20px;
    border: 0;
    color: inherit;
    font: inherit;
    outline: medium;
    vertical-align: middle;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-transform: none;
  }

  .swith:after {
    content: '';
    position: absolute;
    top: 2px;
    width: 14px;
    height: 14px;
    border: solid 1px #e5e5e5;
    border-radius: 50%;
    background-color: #f8f4f4;
    transition: left .3s ease-in;
  }

  .swith.on:after {
    left: calc(100% - 3px - 14px);
  }

  .swith.off {
    background-color: #ddd;
  }

  .swith.off:after {
    left: 2px;
  }

  .swith.off:hover {
    background-color: #d3d3d3;
  }
</style>