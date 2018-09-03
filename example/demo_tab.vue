<template>
  <div style="margin-left: 20px;margin-top: 20px;padding: 20px;width: 80%;height: 100px;background-color: #f5f5f5;">
    <cmp-tab></cmp-tab>
  </div>
</template>

<script>
import {Tab} from '../packages/index.js';

export default {
  name: 'demoTab',
  data: function () {
    return {
      //
    };
  },
  components: {
    'cmpTab': Tab
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