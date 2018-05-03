<template>
  <div style="margin-top: 100px;margin-left: 100px;width: 400px;">
    <cmp-textarea v-bind="option"></cmp-textarea>
  </div>
</template>

<script>
import {Textarea} from '../packages/index.js';

export default {
  name: 'DemoTextarea',
  data: function () {
    return {
      option: {
        'placeholder': '请输入内容',
        'rows': '5',
        'maxlength': '10',
        'model': {
          'value': '啦啦阿拉'
        },
        // 不允许粘贴
        'noPaste': true,
        'disabled': true
      }
    };
  },
  components: {
    'cmpTextarea': Textarea
  },
  mounted: function () {
    let _this = this;

    setTimeout(function () {
      alert(_this.option.model.value);
    }, 3000);
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