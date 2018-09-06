<template>
  <cmp-cascade v-bind="option" v-model="option.result" @cbkClkItem="cbkClkItem"></cmp-cascade>
</template>

<script>
import {Cascade} from '../packages/index.js';
import geoinfo from '../static/geoinfo.js';

export default {
  name: 'demoCascade',
  data: function () {
    return {
      option: {
        show: true,
        data: geoinfo,
        result: [5, 0, 5, 5]
      }
    };
  },
  components: {
    'cmpCascade': Cascade
  },
  watch: {
    'option.result': function (val) {
      console.log('=========option.result=========');
      console.log(val);
    }
  },
  mounted: function () {
    // 
  },
  methods: {
    cbkClkItem: function (data) {
      console.log('=========cbkClkItem=========');
      console.log(data);
      console.log(JSON.stringify(data));
    }
  }
};
</script>

<style scoped>

</style>