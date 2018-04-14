<template>
  <div>
    <!-- 带图标内容 -->
    <!-- theme: primary|success|info|warning|danger|#333 - 按钮背景主题，也可以自定义 -->
    <!-- disabled: true|false - 是否禁用按钮 -->
    <cmp-button theme="#333311" disabled="false" @click="clk">
      <i class="cicon-arrow-bottom" style="font-size: 20px;"></i> 你好世界
    </cmp-button>
    <hr style="margin: 10px 0;">
    <!-- 纯文本 -->
    <cmp-button theme="danger" disabled="false" @click="clk">你好世界</cmp-button>
    <hr style="margin: 10px 0;">
    <!-- 复制到剪贴板 @click无效 -->
    <cmp-button theme="warning" disabled="false" copyData="啦啦啦" @cbk_copy="cbk_copy">复制到剪贴板</cmp-button>
    <hr style="margin: 10px 0;">
    <!-- 选择文件 @click无效 -->
    <cmp-button theme="warning" disabled="false" :fileOption="fileOption" @cbk_file="cbk_file">选择文件</cmp-button>
    
  </div>
</template>

<script>
import {Button} from '../packages/index.js';

export default {
  name: 'demoButton',
  data: function () {
    return {
      fileOption: {
        // accept: 'image/gif, image/jpeg',
        multiple: true
      }
    };
  },
  components: {
    'cmpButton': Button
  },
  methods: {
    clk: function () {
      alert('click');
    },
    // 复制到剪贴板操作回调
    cbk_copy: function (data) {
      alert(JSON.stringify(data));
    },
    cbk_file: function (data) {
      console.log(data);
    }
  }
};
</script>

<style scoped>

</style>