<template>
  <div>
    <cmp-pagebar v-bind="option" @callback="callback"></cmp-pagebar>
  </div>
</template>

<script>
import {Pagebar} from '../packages/index.js';

export default {
  name: 'demoPagebar',
  components: {
    'cmpPagebar': Pagebar
  },
  data: function () {
    return {
      option: {
        // 当期页
        index: 1,
        // 总页数
        totalPage: 10
      }
    };
  },
  watch: {
    //
  },
  methods: {
    callback: function (data) {
      console.log('=========callback======');
      console.log(data);
    }
  }
};
</script>

<style scoped>

</style>