<!--
  功能：
  theme: 自定义背景色 - #333|red|green, 不传默认#13ce66
  disabled: 是否禁用 - true|false, 不传默认false
  beforeclk: 点击前执行方法，返回true才会继续点击
  -->
<template>
  <cmp-swith v-model="swith" theme="green" disabled="false"></cmp-swith>
</template>

<script>
import {Swith} from '../packages/index.js';

export default {
  name: 'demoButton',
  data: function () {
    return {
      swith: true
    };
  },
  components: {
    'cmpSwith': Swith
  },
  watch: {
    swith: function (val) {
      // alert(val);
    }
  },
  methods: {
    beforeclk: function () {
      let result = window.confirm('确认选中？');

      return result;
    }
  }
};
</script>

<style scoped>

</style>