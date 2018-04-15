<template>
  <cmp-input v-model="name" type="text" maxlength="11" placeholder="请输入名称" nopaste="false"></cmp-input>
</template>

<script>
import {Input} from '../packages/index.js';

export default {
  name: 'demoInput',
  data: function () {
    return {
      name: '你好'
    };
  },
  components: {
    'cmpInput': Input
  },
  watch: {
    name: function (val) {
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