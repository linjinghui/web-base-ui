<template>
  <div style="position:relative;width:400px;height:300px;border:solid 1px;">
    <cmp-more></cmp-more>
  </div>
</template>

<script>
import {More} from '../packages/index.js';

export default {
  name: 'demoMore',
  data: function () {
    return {
      //
    };
  },
  components: {
    'cmpMore': More
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