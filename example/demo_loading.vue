<template>
  <div>
    <button @click="option.modal=!option.modal" style="position: absolute;top:0;left:0;z-index: 2222;">show\hide zz</button>|
    <button @click="option.show=!option.show" style="position: absolute;top:0;left:100px;z-index: 2222;">show\hide loading</button>
    |
    <button @click="clkevent" style="position: absolute;top:0;left:240px;z-index: 2222;">event show\hide</button>
    <!-- 1、text: 自定义提示文本 -->
    <!-- 2、modal: 是否模态窗口，即是否产生遮罩效果 - false默认|true -->
    <!-- 3、eventName：全局触发事件名称 -->
    <cmp-loading v-model="option.show" v-bind="option"></cmp-loading>
  </div>
</template>

<script>
import {Loading} from '../packages/index.js';

export default {
  name: 'demoLoading',
  data: function () {
    return {
      option: {
        show: true,
        text: '请您稍后！',
        modal: false,
        eventName: 'abc'
      }
    };
  },
  components: {
    'cmpLoading': Loading
  },
  mounted: function () {
    let _this = this;

    setTimeout(function () {
      _this.option.modal = true;
    }, 3000);
  },
  watch: {
    //
  },
  methods: {
    // 通过全局事件触发
    clkevent: function () {
      window.EVENTBUS.$emit(this.option.eventName, {
        display: !this.option.show,
        text: '全局事件触发'
      });
    }
  }
};
</script>

<style scoped>

</style>