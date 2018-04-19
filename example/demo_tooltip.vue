<template>
  <div style="padding: 200px;">
    <cmp-tooltip text="我是Tip提示内容">
      <button>滑过显示提示文本1</button>
    </cmp-tooltip>
    <!-- <cmp-tooltip text="我是2" theme="red">
      <button>滑过显示提示文本2</button>
    </cmp-tooltip> -->
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