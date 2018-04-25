<template>
  <div style="width: 300px;background-color: red;">
    <cmp-slider v-model="percent" theme="yellow"></cmp-slider>
  </div>
</template>

<script>
import {Slider} from '../packages/index.js';

export default {
  name: 'demoSlider',
  data: function () {
    return {
      percent: 10
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