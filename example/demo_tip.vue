<template>
  <div>
    <button @click="toggle">show\hide</button>
    <cmp-tip v-model="show" v-bind="option"></cmp-tip>
  </div>
</template>

<script>
import {Tip} from '../packages/index.js';

export default {
  name: 'demoTip',
  data: function () {
    return {
      show: false,
      option: {
        // left|center
        textAlign: '',
        // primary|success|info|warning|danger|自定义
        theme: 'success'
      }      
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