<template>
  <div style="height: 400px;padding: 20px;">
    <cmp-editor v-model="content" v-bind="optionEditor"></cmp-editor>
  </div>
</template>

<script>
import {Editor} from '../packages/index.js';

export default {
  name: 'demoEditor',
  data: function () {
    return {
      content: '',
      optionEditor: {
        placeholder: '请输入内容...',
        toolbar: [
          // 标题           
          // [{ font: ['serif', 'monospace'] }], 
          [{ font: ['Microsoft-YaHei', 'Sim-Sun', 'Kai-Ti', 'Sim-Hei', 'Li-Shu', 'Andale-Mono', 'Arial', 'Arial-Black', 'Comic-Sons-Ms', 'Impact', 'Times-New-Roman', 'Sans-Serif'] }], 
          // 文本方向 
          [{ size: ['small', false, 'large', 'huge'] }], 
          // 字体大小 
          [{ header: [1, 2, 3, 4, 5, 6, false] }], 
          // 引用 代码块 
          [{ header: 1 }, { header: 2 }], 
          // 1、2 级标题 
          [{ list: 'ordered' }, { list: 'bullet' }], 
          // 有序、无序列表 
          [{ script: 'sub' }, { script: 'super' }], 
          // 上标/下标 
          [{ indent: '-1' }, { indent: '+1' }], 
          // 加粗 斜体 下划线 删除线
          ['blockquote', 'code-block'], 
          // 清除文本格式 
          ['link', 'image'],
          [{ color: [] }, { background: [] }], 
          // 字体颜色、字体背景颜色 
          ['bold', 'italic', 'underline', 'strike'], 
          // 缩进
          // [{'direction': 'rtl'}], 
          // 字体种类 
          [{ align: [] }],           
          // 链接、图片、视频 , 'video'
          // ['position']
          // 对齐方式 
          ['clean']
        ],
        upImage: this.upImage
      }
    };
  },
  components: {
    'cmpEditor': Editor
  },
  watch: {
    content: function (val) {
      console.log(val);
    }
  },
  mounted: function () {
    // var _this = this;
    
    // setTimeout(function () {
    //   _this.content = '';
    // }, 3000);
  },
  methods: {
    upImage: function (data, callback) {
      console.log('======上传图片=======');      
      var file = data[0].file;
      var size = data[0].size;
      var name = data[0].name;
      var suffix = data[0].suffix;

      console.log(size + ':' + name + ':' + suffix);
      callback({
        code: 200,
        url: 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg'
      });
    }
  }
};
</script>

<style scoped>

</style>