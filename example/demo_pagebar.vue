<template>
  <div>
    <cmp-pagebar v-model="option.index" v-bind="option" @callback="callback"></cmp-pagebar>
    <br>=====================================================================<br>
    <cmp-pagebar-pagesize v-model="optionPagebarPagesize.index" v-bind="optionPagebarPagesize" @callback="callback2"></cmp-pagebar-pagesize>
  </div>
</template>

<script>
import {Pagebar, PagebarPagesize} from '../packages/index.js';

export default {
  name: 'demoPagebar',
  components: {
    'cmpPagebar': Pagebar,
    'cmpPagebarPagesize': PagebarPagesize
  },
  data: function () {
    return {
      option: {
        theme: '',
        // 当期页
        index: 1,
        pageSize: 10,
        // 总记录数
        totalSize: 101
      },
      optionPagebarPagesize: {
        theme: 'simple',
        // 当期页
        index: 1,
        pagesizes: [
          30, 50, 100
        ],
        pagesize: 30,
        // 总记录数
        totalSize: 321
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
    },
    callback2: function (data) {
      console.log('=========callback2======');
      console.log(data);
      this.optionPagebarPagesize.pagesize = data.pagesize;
      this.optionPagebarPagesize.index = data.currentPage;
    }
  }
};
</script>

<style scoped>

</style>