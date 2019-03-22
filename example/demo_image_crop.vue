<template>
  <div style="margin-top: 100px;margin-left: 100px;width: 800px;height:600px;border: solid 1px;">
    <button @click="showHide1">显示\隐藏裁剪1</button>
    <button @click="showHide2">显示\隐藏裁剪2</button>
    <cmp-image-crop
      v-model="optionImageCrop.show"
      v-bind="optionImageCrop"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"></cmp-image-crop>

      <cmp-cropper v-model="optionCropper.show" v-bind="optionCropper" @callback="cbkcropper"></cmp-cropper>
  </div>
</template>

<script>
import {ImageCrop, Cropper} from '../packages/index.js';

export default {
  name: 'DemoBanner',
  components: {
    'cmpImageCrop': ImageCrop,
    'cmpCropper': Cropper
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
      },
      optionCropper: {
        show: false,
        // 图片地址
        url: ''
        // url: 'https://fengyuanchen.github.io/cropperjs/images/picture.jpg'
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
    showHide1: function () {
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
    },
    showHide2: function () {
      this.optionCropper.show = !this.optionCropper.show;
    },
    cbkcropper: function (data) {
      console.log('=======cbkcropper======');
      console.log(data);
      // 上传表单
      // let formData = new FormData();

      // formData.append('name', this.name);
      // formData.append('age', this.age);
      // formData.append('datafile', this.file, 'avant_' + new Date().getTime() + '.png');

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
      // this.utl_upfile(data.file);
    },
    utl_ajax: function () {
      let createxmlHttpRequest = function () {
        return window.ActiveXObject ? new window.ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
      };
      let convertData = function (data) {
        let convertResult = '';

        if (typeof data === 'object') {
          for (var c in data) {
            convertResult += c + '=' + data[c] + '&';
          }
          convertResult = convertResult.substring(0, convertResult.length - 1);
        } else {
          convertResult = data;
        }
        return convertResult;
      };
      let ajaxData = {
        type: arguments[0].type || 'GET',
        url: arguments[0].url || '',
        timeout: arguments[0].timeout || '',
        async: arguments[0].async || 'true',
        data: arguments[0].data || null,
        dataType: arguments[0].dataType || 'text',
        headers: arguments[0].headers || {},
        beforeSend: arguments[0].beforeSend || function () {
          // 
        },
        success: arguments[0].success || function () {
          // 
        },
        error: arguments[0].error || function () {
          // 
        },
        complete: arguments[0].complete || function () {
          // 
        }
      };
      let timer = '';
      let xhr = createxmlHttpRequest();

      // 处理get请求参数
      if (ajaxData.type.toLowerCase() === 'get' && ajaxData.data) {
        ajaxData.url += '?' + convertData(ajaxData.data);
      }
      // 处理超时
      if (ajaxData.timeout) {
        timer = setTimeout(function () {
          xhr.abort();
        }, ajaxData.timeout);
      }
      xhr.responseType = ajaxData.dataType;
      xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);

      // 请求头设置
      xhr.setRequestHeader("token","header-token-value");
      xhr.setRequestHeader("dingyi","header-dingyi-value");
      // !ajaxData.headers['Content-Type'] && (ajaxData.headers['Content-Type'] = 'application/x-www-form-urlencoded');
      // for (var key in ajaxData.headers) {
      //   // xhr.setRequestHeader('Content-Type', ajaxData.headers[key]);
      //   xhr.setRequestHeader(key, ajaxData.headers[key]);
      // }

      ajaxData.beforeSend(xhr);
      xhr.send(convertData(ajaxData.data));
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          timer && clearTimeout(timer);
          if (xhr.status === 200) {
            let result = '';

            try {
              result = JSON.parse(xhr.response);
            } catch (error) {
              result = xhr.response;
            }
            ajaxData.success(result);
            ajaxData.complete();
          } else {
            ajaxData.error(xhr.status);
            ajaxData.complete();
          }
        }
      };
    },
    utl_upfile: function (file) {
      let formData = new FormData();

      formData.append('datafile', 'datafile.png');
      formData.append('file', file);

      this.utl_ajax({
        type: 'POST',
        url: 'http://47.94.37.132/apidesk/portal/upload/img',
        data: formData,
        timeout: 10000,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTaW1iYUVvc1dlYiIsImF1ZCI6ImVudGVyaWNlIiwibmJmIjoxNTUzMTM3NTkyLCJpc3MiOiJzaXdfdmVyaWZ5IiwiZW50ZXJwcmlzZUlkIjoiMjM1Nzk0IiwiZXhwIjoxNTUzMTQ0NzkyLCJpYXQiOjE1NTMxMzc1OTIsInVzZXJOdW1iZXIiOiI2NjIwODY4OCIsImp0aSI6ImVjNmExZjdmLTQxMWMtNGVlOS1hNTRiLWJjZWY3NWZkZmYxMSJ9.JB-x1lo0-Mg1_CT2SYqwCgHbFqDpPOpRXngoeTzSw-s'
        },
        beforeSend: function () {
          console.log('===beforeSend====');
        },
        success: function () {
          console.log('===success====');
        },
        error: function () {
          console.log('====error===');
        },
        complete: function () {
          console.log('===complete====');
        }
      });
    }
  }
};
</script>

<style scoped>

</style>