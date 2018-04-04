<template>
  <div>
    <button @click="showTip">show</button>
    <cmp-tip :time="3000" :theme="'def'" :content="'1234'" @callback="callback"></cmp-tip>
  </div>
</template>

<script>
import {Tip} from '../packages/index.js';

export default {
  name: 'Tip',
  data: function () {
    return {
      // 'theme': ''
    };
  },
  components: {
    'cmpTip': Tip
  },
  methods: {
    'showTip': function () {
      var arr = ['', 'success', 'warn', 'error'];
      var contentArr = ['内容0', '内容1', '内容2', '内容3'];
      var num = Math.ceil(Math.random() * (arr.length - 1));
      var params = {};

      params.theme = arr[num];
      params.content = contentArr[num];
      params.display = true;
      window.EVENTBUS.$emit('changeTip', params);
    },
    callback: function () {
      this.display = false;
    }
  }
};
</script>

<style scoped>

</style>