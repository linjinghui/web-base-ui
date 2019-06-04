<template>
  <cmp-add-label v-model="arr" :hisrecord="allLables"></cmp-add-label>
</template>

<script>
import {AddLabel} from '../packages/index.js';

export default {
  name: 'demoButton',
  data: function () {
    return {
      // 历史标签记录
      allLables: [{name: 'name-1', bgcolor: 'green'}, {name: 'name-2', bgcolor: 'purple'}, {name: 'name-3', bgcolor: 'blue'}],
      arr: [{name: 'name-1', bgcolor: 'green'}]
    };
  },
  components: {
    'cmpAddLabel': AddLabel
  },
  watch: {
    arr (val) {
      console.log(val);
    }
  },
  methods: {
    //
  }
};
</script>

<style scoped>

</style>