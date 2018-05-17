<template>
  <div>
    <cmp-select></cmp-select>
  </div>
</template>

<script>
import {Select} from '../packages/index.js';

export default {
  name: 'demoSelect',
  data: function () {
    return {
      //
    };
  },
  components: {
    'cmpSelect': Select
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