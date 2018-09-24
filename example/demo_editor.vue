<template>
  <div style="height: 400px;border:solid 1px;">
    <cmp-editor></cmp-editor>
  </div>
</template>

<script>
import {Editor} from '../packages/index.js';

export default {
  name: 'demoEditor',
  data: function () {
    return {
      //
    };
  },
  components: {
    'cmpEditor': Editor
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