<template>
  <div style="padding: 10px;">
    <cmp-div-editor></cmp-div-editor>
  </div>
</template>

<script>
import {DivEditor} from '../packages/index.js';

export default {
  name: 'demoDivEditor',
  data: function () {
    return {
      //
    };
  },
  components: {
    'cmpDivEditor': DivEditor
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