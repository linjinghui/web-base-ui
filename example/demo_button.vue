<template>
  <div>
    <!-- 带图标内容 -->
    <!-- theme: primary|success|info|warning|danger|line|#333 - 按钮背景主题，也可以自定义 -->
    <!-- disabled: true|false - 是否禁用按钮 -->
    <cmp-button theme="line" disabled="false" @click="clk">
      <i class="cicon-arrow-bottom" style="font-size: 20px;"></i> 自定义背景色
    </cmp-button>
    <hr style="margin: 10px 0;">
    <!-- 纯文本 -->
    <cmp-button theme="danger" disabled="false" @click="clk">你好世界</cmp-button>
    <hr style="margin: 10px 0;">
    <!-- 复制到剪贴板 @click无效 -->
    <cmp-button theme="warning" disabled="false" copydata="啦啦啦" @cbk_copy="cbk_copy">复制到剪贴板</cmp-button>
    <hr style="margin: 10px 0;">
    <!-- 选择文件 @click无效 -->
    <cmp-button theme="info" disabled="false" :fileoption="fileOption" @cbk_file="cbk_file">选择文件</cmp-button>
    <hr style="margin: 10px 0;">
    <!-- 点击后失效 -->
    <cmp-button style="width: 100px;height: 34px;" theme="primary" disabled="false" v-model="second" @click="clk_send">点击发送</cmp-button>
    
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
      },
      second: 0
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
    // 选择文件后回调
    cbk_file: function (data) {
      console.log(data);
      // 上传表单
      // let formData = new FormData();

      // formData.append('name', this.name);
      // formData.append('age', this.age);
      // formData.append('file', this.file);

      // let config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }

      // this.$http.post('/upload', formData, config).then(function (res) {
      //   if (res.status === 2000) {
      //     /*这里做处理*/
      //   }
      // })
    },
    // 计时器回调
    clk_send: function () {
      let _this = this;

      setTimeout(function () {
        _this.second = 10;
      }, 500)
    },
  }
};
</script>

<style scoped>

</style>