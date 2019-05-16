<template>
  <div style="position:relative;width:650px;height:600px;">
    <cmp-rotary-table v-model="option.show" v-bind="option" @callback="callback"></cmp-rotary-table>
  </div>
</template>

<script>
import {RotaryTable} from '../packages/index.js';

export default {
  name: 'demoRotarytable',
  data: function () {
    return {
      option: {
        show: true,
        prizes: [
          {name: '未中奖', chances: 60},
          {name: '提高白条额度', chances: 30},
          {name: '免分期服务费', chances: 10},
          {name: '免单5元', chances: 6},
          {name: '免单10元', chances: 6},
          {name: '免单50元', chances: 3},
          {name: '免单4999元', chances: 80}
        ]
      }
    };
  },
  components: {
    'cmpRotaryTable': RotaryTable
  },
  watch: {
    //
  },
  methods: {
    callback: function (data) {
      alert('抽奖结果：' + JSON.stringify(data));
    }
  }
};
</script>

<style>
  .wrap-rotaryTable > .wrap-rotary {
    width: 450px!important;
    height: 450px!important;
    top: -33px!important;
    left: 32px!important;
  }
  .wrap-rotaryTable > .wrap-button {
    width: 174px!important;
    height: 228px!important;
    top: -62px!important;
    left: 34px!important;
  }
</style>