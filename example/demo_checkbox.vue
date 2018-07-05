<template>
  <div>
    <!-- v-model: 控制是否选中 -->
    <!-- theme: 控制选中后的背景色 -->
    <!-- disabled: 是否禁用 -->
    <!-- beforeClk: 需要二次确认操作 - true|false -->
    <cmp-checkbox v-for="(item, index) in likes" :key="index" v-model="selected" :val="item.val" :beforeclk="beforeClk">
      {{item.name}}
    </cmp-checkbox>
    <hr>
    <cmp-checkbox v-model="selected2" :beforeclk="beforeClk">单选</cmp-checkbox>
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
      selected: [],
      selected2: false
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