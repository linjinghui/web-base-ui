<template>
  <div>
    <!-- v-model: 控制是否选中 -->
    <!-- theme: 控制选中后的背景色 -->
    <!-- disabled: 是否禁用 -->
    <!-- beforeClk: 需要二次确认操作 - true|false -->
    <cmp-checkbox disabled="false" v-model="selected" theme="#0079ff" :beforeClk="beforeClk">旅游</cmp-checkbox>    
  </div>
</template>

<script>
import {Checkbox} from '../packages/index.js';

export default {
  name: 'demoCheckbox',
  data: function () {
    return {
      selected: true
    };
  },
  components: {
    'cmpCheckbox': Checkbox
  },
  watch: {
    selected: function (val) {
      // alert('selected:' + val);
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