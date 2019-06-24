<template>
  <div style="position:relative;width:400px;height:300px;border:solid 1px;overflow:auto;">
    <ul>
      <li v-for="(item) in arr" :key="item">item-{{item}}</li>
    </ul>
    <cmp-more :status="status" @callback="callback"></cmp-more>
  </div>
</template>

<script>
import {More} from '../packages/index.js';
import { setTimeout } from 'timers';

export default {
  name: 'demoMore',
  data: function () {
    return {
      status: 'more',
      arr: []
    };
  },
  components: {
    'cmpMore': More
  },
  watch: {
    //
  },
  methods: {
    callback: function (data) {
      var _this = this;
      this.status = 'loading';
      setTimeout(function () {
        var _arr = [];
        var i = _this.arr.length;
        for (i = 0;i < 20;i++) {
          _arr[_arr.length] = i;
        }
        _this.arr = _this.arr.concat(_arr);
        _this.status = 'more';
      }, 1500);
    }
  }
};
</script>

<style scoped>

</style>