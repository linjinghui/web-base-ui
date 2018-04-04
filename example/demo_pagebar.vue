<template>
  <div style="overflow: hidden;background-color: yellow;">
    <cmp-pagebar :index="4" :totalPage="211" @click="callback"></cmp-pagebar>
  </div>
</template>

<script>
import {Pagebar} from '../packages/index.js';

export default {
  name: 'Pagebar',
  data: function () {
    return {
      display: false
    };
  },
  components: {
    'cmpPagebar': Pagebar
  },
  methods: {
    'callback': function (active) {
      alert('点击了:' + active);
    }
  }
};
</script>

<style scoped>

</style>