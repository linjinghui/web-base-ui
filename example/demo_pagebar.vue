<template>
  <div>
    <cmp-pagebar></cmp-pagebar>
  </div>
</template>

<script>
import {Pagebar} from '../packages/index.js';

export default {
  name: 'demoPagebar',
  data: function () {
    return {
      show: false
    };
  },
  components: {
    'cmpPagebar': Pagebar
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