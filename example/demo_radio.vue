<template>
  <!-- v-model: 控制是否选中 -->
  <!-- theme: 控制选中后的背景色 -->
  <!-- disabled: 是否禁用 -->
  <!-- beforeClk: 需要二次确认操作 - true|false -->
  <div>
    <cmp-radio v-model="selected" val="1" :beforeclk="beforeClk">足球</cmp-radio>
    <cmp-radio v-model="selected" val="2" :beforeclk="beforeClk">篮球</cmp-radio>
    <hr>
    <cmp-radio v-model="food" val="1" :beforeclk="beforeClk">冰激凌</cmp-radio>
    <cmp-radio v-model="food" val="2" :beforeclk="beforeClk">苹果</cmp-radio>
  </div>
</template>

<script>
import {Radio} from '../packages/index.js';

export default {
  name: 'demoRadio',
  components: {
    'cmpRadio': Radio
  },
  data: function () {
    return {
      selected: '1',
      food: '2'
    };
  },
  watch: {
    selected: function (val) {
      alert(val);
    }
  },
  methods: {
    // 确认点击之前 - 不支持异步
    beforeClk: function () {
      let result = window.confirm('确认选中？');

      return result;
    }
  }
};
</script>

<style scoped>

</style>