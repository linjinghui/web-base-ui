<template>
  <div style="margin-left: 50px;">
    <cmp-menu v-bind="option1" v-model="option1.result" @cbkClkItem="cbkClkItem1"></cmp-menu>
    <hr>
    <cmp-cascade v-bind="option2" v-model="option2.result" @cbkClkItem="cbkClkItem2"></cmp-cascade>
  </div>
</template>

<script>
import {Menu, Cascade} from '../packages/index.js';
import geoinfo from '../static/geoinfo.js';

export default {
  name: 'demoMenu',
  data: function () {
    return {
      option1: {
        show: true,
        multi: true,
        data: ['黄金高222', '双皮奶', '拉希米', '换节奏', '北京烤鸭', '无泡沫', '长达作为', 'vzxwwdasd', '滴答滴答滴答滴答', '跳脱衣舞', 'uirxxxx', '你们vczaqdx', '榴莲皮'],
        result: [1, 3]
      },
      option2: {
        show: true,
        data: geoinfo,
        result: [5, 0, 5, 5]
      }
    };
  },
  components: {
    'cmpMenu': Menu,
    'cmpCascade': Cascade
  },
  watch: {
    'option1.result': function (val) {
      console.log('=========option1.result=========');
      console.log(val);
    },
    'option2.result': function (val) {
      console.log('=========option2.result=========');
      console.log(val);
    }
  },
  mounted: function () {
    // console.log(this.option.data);
  },
  methods: {
    cbkClkItem1: function (data) {
      console.log('=========cbkClkItem1=========');
      console.log(data);
    },
    cbkClkItem2: function (data) {
      console.log('=========cbkClkItem2=========');
      console.log(data);
    }
  }
};
</script>

<style scoped>

</style>