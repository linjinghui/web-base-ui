<template>
  <div>
    <!-- v-model: 控制是否选中 -->
    <!-- theme: 控制选中后的背景色 -->
    <!-- disabled: 是否禁用 -->
    <!-- beforeClk: 需要二次确认操作 - true|false -->
    <!-- <cmp-checkbox v-for="(item, index) in likes" :key="index" v-model="selected" :val="item.val" :beforeclk="beforeClk">
      {{item.name}}
    </cmp-checkbox> -->
    <hr>
    <cmp-checkbox v-model="selected1">单选</cmp-checkbox>
    <hr>
    <cmp-checkbox v-model="selected2" data="555" :beforeclk="beforeClk">确认勾选</cmp-checkbox>
    <hr>
    <cmp-checkbox v-model="selected2" data="123" @click="clkCheckbox">点击事件</cmp-checkbox>
    <hr>
    <cmp-checkbox v-model="selected3" required="true">必填</cmp-checkbox>
    <hr>
    <cmp-checkbox v-model="selected4" disabled="true">禁用</cmp-checkbox>
  </div>
</template>

<script>
import {Checkbox} from '../packages/index.js';

export default {
  name: 'demoCheckbox',
  data: function () {
    return {
      likes: [
        {
          'name': '看书',
          'val': 'book'
        },
        {
          'name': '徒步',
          'val': 'foot'
        },
        {
          'name': '美食',
          'val': 'food'
        }
      ],
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: true
    };
  },
  components: {
    'cmpCheckbox': Checkbox
  },
  watch: {
    selected: function (val) {
      console.log(val);
    },
    selected2: function (val) {
      console.log(val);
    }
  },
  mounted () {
    let _this = this;

    setTimeout(function () {
      _this.selected3 = false;
    }, 3000);
  },
  methods: {
    // 确认点击之前 - 不支持异步
    beforeClk: function (data) {
      let result = window.confirm('确认选中？' + data);

      return result;
    },
    clkCheckbox: function (data) {
      alert('click:' + data);
    }
  }
};
</script>

<style scoped>

</style>