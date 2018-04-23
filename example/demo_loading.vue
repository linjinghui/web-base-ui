<template>
  <div>
    <button @click="option.modal=!option.modal" style="position: absolute;top:0;left:0;z-index: 2222;">show\hide zz</button>|
    <button @click="showLoading=!showLoading" style="position: absolute;top:0;left:100px;z-index: 2222;">show\hide loading</button>
    <!-- 1、text: 自定义提示文本 -->
    <!-- 2、modal: 是否模态窗口，即是否产生遮罩效果 - false默认|true -->
    <cmp-loading v-model="showLoading" v-bind="option"></cmp-loading>
  </div>
</template>

<script>
import {Loading} from '../packages/index.js';

export default {
  name: 'demoLoading',
  data: function () {
    return {
      showLoading: true,
      option: {
        text: '请您稍后！',
        modal: false
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
    // 
  }
};
</script>

<style scoped>

</style>