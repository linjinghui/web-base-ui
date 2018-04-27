<template>
  <div style="width: 300px;">
    <!--  percent: 百分比位置 -->
    <!--  theme：自定义主题色 -->
    <!-- disabled：是否禁用 -->
    <!-- max：最大值 -->
    <cmp-slider v-model="percent" max="110"></cmp-slider>
  </div>
</template>

<script>
import {Slider} from '../packages/index.js';

export default {
  name: 'demoSlider',
  data: function () {
    return {
      percent: 50
    };
  },
  components: {
    'cmpSlider': Slider
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