<template>
  <div style="width: 300px;background-color: red;">
    <!--  theme：自定义主题色 -->
    <cmp-slider v-model="percent"></cmp-slider>
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