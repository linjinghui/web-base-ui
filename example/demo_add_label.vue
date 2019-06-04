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
      allLables: [{text: 'name-1', bgcolor: 'green'}, {text: 'name-2', bgcolor: 'purple'}, {text: 'name-3', bgcolor: 'blue'}],
      arr: [{text: 'name-1', bgcolor: 'green'}]
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