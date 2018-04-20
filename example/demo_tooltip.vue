<template>
  <div style="padding: 200px;">
    <!-- text 提示文本 -->
    <!-- theme 自定义主题背景 - (默认#303133) -->
    <!-- position 显示方位 - top|right|bottom|left -->
    <!-- model 触发模式 - hover|click -->
    <cmp-tooltip text="我是Tip提示内容我是<br>Tip提示内容我是Tip提示内容">
      <button style="padding: 20px;">111滑过显示提示文本w21</button>
    </cmp-tooltip>
    <cmp-tooltip text="我是Tip提示内容2我是Tip提示内容2我是Tip提示内容2" theme="red" position="right">
      <button style="position: absolute;left: 120px;bottom: 60px;">滑过显示提示文本2</button>
    </cmp-tooltip>
    阿萨德阿萨啊是d
  </div>
</template>

<script>
import {Tooltip} from '../packages/index.js';

export default {
  name: 'demoTooltip',
  data: function () {
    return {
      show: false
    };
  },
  components: {
    'cmpTooltip': Tooltip
  },
  watch: {
    //
  },
  methods: {
    //
  }
};
</script>

<style scoped>

</style>