<template>
  <div style="margin-top: 100px;margin-left: 100px;width: 400px;">
    <cmp-textarea v-model="address" v-bind="option"></cmp-textarea>
  </div>
</template>

<script>
import {Textarea} from '../packages/index.js';

export default {
  name: 'DemoTextarea',
  components: {
    'cmpTextarea': Textarea
  },
  data: function () {
    return {
      address: 'ddd',
      option: {
        'placeholder': '请输入内容',
        'rows': '5',
        'maxlength': '10',
        // 不允许粘贴
        'noPaste': false,
        'disabled': false
      }
    };
  },
  watch: {
    address: function (val) {
      console.log('=====watch address=====');
      console.log(val);
    }
  },
  mounted: function () {
    // let _this = this;

    // setTimeout(function () {
    //   alert(_this.option.model.value);
    // }, 3000);
  },
  methods: {
    callback: function (val) {
      console.log(JSON.stringify(val));
    }
  }
};
</script>

<style scoped>

</style>