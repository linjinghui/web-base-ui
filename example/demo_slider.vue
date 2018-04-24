<template>
  <div style="height: 30px;width: 3000px;border: solid 1px;">
    <cmp-slider></cmp-slider>
  </div>
</template>

<script>
import {Slider} from '../packages/index.js';

export default {
  name: 'demoSlider',
  data: function () {
    return {
      //
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