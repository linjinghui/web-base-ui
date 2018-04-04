<template>
  <div>
    <button @click="show">show\hide</button>
    <cmp-loading :display="display" :text="'处理中...'"></cmp-loading>
  </div>
</template>

<script>
import {Loading} from '../packages/index.js';

export default {
  name: 'demoLoading',
  data: function () {
    return {
      'display': false
    };
  },
  components: {
    'cmpLoading': Loading
  },
  methods: {
    'show': function () {
      this.display = !this.display;
    }
  }
};
</script>

<style scoped>

</style>