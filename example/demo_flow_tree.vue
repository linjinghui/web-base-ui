<template>
  <div style="width:800px;height:980px;border:solid 1px;">
    <cmp-flowtree></cmp-flowtree>
  </div>
</template>

<script>
import {Flowtree} from '../packages/index.js';

export default {
  name: 'demoFlowtree',
  data: function () {
    return {
      //
    };
  },
  components: {
    'cmpFlowtree': Flowtree
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