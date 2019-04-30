<template>
  <div style="margin:50px;width:800px;height:800px;background-color:yellow;">
    <cmp-time-turntable></cmp-time-turntable>
  </div>
</template>

<script>
import {TimeTurntable} from '../packages/index.js';

export default {
  name: 'demoTimeTurntable',
  data: function () {
    return {
      //
    };
  },
  components: {
    'cmpTimeTurntable': TimeTurntable
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