<template>
  <div style="width: 400px;height:800px;border:solid 1px;">
    <cmp-swap-sort></cmp-swap-sort>
  </div>
</template>

<script>
import {SwapSort} from '../packages/index.js';

export default {
  name: 'demoSwapSort',
  data: function () {
    return {
      //
    };
  },
  components: {
    'cmpSwapSort': SwapSort
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