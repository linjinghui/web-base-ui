<template>
  <div style="margin-top: 100px;margin-left: 100px;width: 800px;height:600px;border: solid 1px;">
    <button @click="showHide">显示\隐藏</button>
    <cmp-image-crop
      v-model="optionImageCrop.show"
      v-bind="optionImageCrop"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"></cmp-image-crop>
  </div>
</template>

<script>
import {ImageCrop} from '../packages/index.js';

export default {
  name: 'DemoBanner',
  components: {
    'cmpImageCrop': ImageCrop
  },
  data: function () {
    return {
      optionImageCrop: {
        show: false,
        // 自定义上传的文件名
        fileName: 'file123',
        // 裁剪后的图片宽
        width: 80,
        // 裁剪后的图片高
        height: 80,
        // 图片上传地址
        uploadPath: '',
        // 上传接口参数
        params: {
          name: 'avatar',
          age: 12
        },
        // 上传接口请求头
        headers: {
          token: '123456798'
        },
        // 最终得到的图片格式 jpg/png
        // imgFormat: 'jpg',
        // 关闭圆形预览
        noCircle: true,
        // 关闭方形预览
        noSquare: false,
        // 关闭旋转功能
        noRotate: false
      }
    };
  },
  mounted: function () {
    let _this = this;

    setTimeout(function () {
      _this.optionImageCrop.uploadPath = '/upload22';
    }, 1000);
  },
  methods: {
    showHide: function () {
      this.optionImageCrop.show = !this.optionImageCrop.show;
    },
    cropSuccess: function (imgDataUrl, field) {
      console.log('======cropSuccess=======');
      console.log(imgDataUrl);
      console.log(field);
    },
    cropUploadSuccess: function (jsonData, field) {
      console.log('=====cropUploadSuccess========');
      console.log(jsonData);
      console.log(field);
    },
    cropUploadFail: function (status, field) {
      console.log('=======cropUploadFail======');
      console.log(status);
      console.log(field);
    }
  }
};
</script>

<style scoped>

</style>