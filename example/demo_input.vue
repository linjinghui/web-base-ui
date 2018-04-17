<template>
  <div>
    <cmp-input v-model="name" type="text" maxlength="1111" placeholder="请输入名称" nopaste="false" autofocus="true" disabled="false" clear="true"
    @focus="cbk_focus"
    @blur="cbk_blur"
    @keyup="cbk_keyup"
    @enter="cbk_enter">
      <i class="cicon-tick center-v" slot="left" style="background-color: green;"></i>
      <i class="cicon-search-cpt-chr center-v" slot="right" style="background-color: blue;"></i>
    </cmp-input>
  </div>
</template>

<script>
import {Input} from '../packages/index.js';

export default {
  name: 'demoInput',
  data: function () {
    return {
      name: '你好',
      pwd: 123
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
    cbk_focus: function () {
      console.log('====cbk_focus====');
    },
    cbk_blur: function () {
      console.log('===cbk_blur=====');
    },
    cbk_keyup: function (keyCode) {
      console.log('====cbk_keyup====');
      console.log(keyCode);
    },
    cbk_enter: function () {
      console.log('====cbk_enter====');
    }
  }
};
</script>

<style scoped>

</style>