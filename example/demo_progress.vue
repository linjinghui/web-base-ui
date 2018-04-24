<template>
  <div>
    <!-- type: 提供2种进度条类型 - square|circle -->
    <!-- progress: 进度 1-100 -->
    <!-- theme: 进度条背景颜色 -->
    <!-- themebar: 进度条颜色 -->
    <div style="height: 150px; width: 150px;background-color: #fff;border: solid 1px;">
      <cmp-progress :progress="progress" themebar="green" type="circle"></cmp-progress>
    </div>
    <br>
    <div style="height: 34px;width: 1000px;">
      <cmp-progress :progress="progress" themebar="green" type="square"></cmp-progress>
    </div>
  </div>
</template>

<script>
import {Progress} from '../packages/index.js';

export default {
  name: 'demoProgress',
  data: function () {
    return {
      progress: 110
    };
  },
  components: {
    'cmpProgress': Progress
  },
  watch: {
    //
  },
  mounted: function () {
    let _this = this;

    setTimeout(function () {
      _this.progress = 70;
    }, 3000);
  },
  methods: {
    //
  }
};
</script>

<style scoped>

</style>