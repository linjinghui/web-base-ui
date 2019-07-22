<!--
功能介绍：
1、支持自定义背景色（theme - 'red'）
2、禁用（disabled - true|false）
3、必选（required - true|false）
4、确认点击前执行事件（beforeclk - function）
 -->
<template>
  <label class="checkbox clearfix" :disabled="disabled" :required="required" :class="{'checked':value}" @click="clkCheck">
    <span class="wrap-tick" :class="{'theme-b':value&&!required}">
      <i class="cicon-tick"></i>
    </span>
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
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      },
      // 在beforeclk和click触发的时候回传
      data: '',
      // 点击复选框前执行，返回true 才能继续点击
      beforeclk: {
        type: Function,
        default: function () {
          return function () {
            return true;
          };
        }
      }
    },
    watch: {
      value: function () {
        this.checkRequired();
      },
      required: function () {
        this.checkRequired();
      }
    },
    computed: {},
    mounted: function () {
      this.checkRequired();
    },
    methods: {
      checkRequired: function () {
        if (this.required) {
          this.$emit('input', true);
          this.$emit('click', this.data);
        }
      },
      clkCheck: function (checked) {
        if (!this.disabled && !this.required) {
          if (this.beforeclk(this.data)) {
            this.$emit('input', typeof checked === 'boolean' ? checked : !this.value);
          }
          this.$emit('click', this.data);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .checkbox {
    display: inline-block;
    line-height: 16px;
    user-select: none;
    overflow: hidden;
    cursor: pointer;

    > .wrap-tick {
      position: relative;
      float: left;
      margin-right: 5px;
      width: 16px;
      height: 16px;
      line-height: unset;
      border-radius: 2px;
      border: solid 1px #ccc;
      // background-color: #f4f4f4;

      > .cicon-tick {
        position: absolute;
        display: none;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        color: #fff;
        font-size: 14px;
      } 
    }
  }

  // 选中样式
  .checkbox.checked {

    > .wrap-tick.theme-b {
      border: 0;
    }

    .cicon-tick {
      display: inherit;
    }
  }

  // 必选样式
  .checkbox[required] {
    cursor: text;
    > .wrap-tick {
      background-color: #fff;
    }

    .cicon-tick {
      color: #ccc;
    }
  }
</style>