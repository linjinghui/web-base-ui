<template>
  <div>
    <!-- 带图标内容 -->
    <!-- theme: primary|success|info|warning|danger|#333 - 按钮背景主题，也可以自定义 -->
    <!-- disabled: true|false - 是否禁用按钮 -->
    <cmp-button theme="#333311">
      <i class="cicon-arrow-bottom" style="font-size: 20px;"></i> 你好世界
    </cmp-button>
    <hr style="margin: 10px 0;">
    <!-- 纯文本 -->
    <cmp-button theme="danger" disabled="false">你好世界</cmp-button>
    <hr style="margin: 10px 0;">
    <!-- 复制到剪贴板 -->
    <cmp-button theme="warning" disabled="true" copyData="啦啦啦" @cbk_copy="cbk_copy">复制到剪贴板</cmp-button>
    <hr style="margin: 10px 0;">
    <!-- 选择文件 -->
    <cmp-button theme="warning" fileOption>选择文件</cmp-button>
    <!-- test -->
    <button>
      <label data-v-679ff0ba="" for="file_btn_152354403845281" class="lbl-file" style="z-index: 2;">
        aaaaaaa
        <input data-v-679ff0ba="" id="file_btn_152354403845281" type="file" style="display: none;">
      </label>
    </button>
  </div>
</template>

<script>
import {Button} from '../packages/index.js';

export default {
  name: 'demoButton',
  data: function () {
    return {
      // 
    };
  },
  components: {
    'cmpButton': Button
  },
  methods: {
    // 复制到剪贴板操作回调
    cbk_copy: function (data) {
      alert(JSON.stringify(data));
    }
  }
};
</script>

<style scoped>

</style>