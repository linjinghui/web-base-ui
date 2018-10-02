<template>
  <div>
    <cmp-star v-bind="optionStar" v-model="optionStar.value"></cmp-star>
  </div>
</template>

<script>
import {Star} from '../packages/index.js';

export default {
  name: 'demoStar',
  data: function () {
    return {
      optionStar: {
        value: 0,
        num: 5
      }
    };
  },
  components: {
    'cmpStar': Star
  },
  watch: {
    'optionStar.value': function (data) {
      console.log(data);
    }
  },
  methods: {
    //
  }
};
</script>

<style scoped>

</style>