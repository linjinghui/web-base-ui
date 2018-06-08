<template>
  <div>
    <button @click="toggle">show\hide</button>
    <cmp-tip v-model="show"></cmp-tip>
  </div>
</template>

<script>
import {Tip} from '../packages/index.js';

export default {
  name: 'demoTip',
  data: function () {
    return {
      show: false
    };
  },
  components: {
    'cmpTip': Tip
  },
  watch: {
    //
  },
  methods: {
    toggle: function () {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>

</style>