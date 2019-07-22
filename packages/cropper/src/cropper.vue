<template>
  <cmp-dialog class="wrap-cropper" v-model="optionDialog.show" v-bind="optionDialog" @callback="callbackDialog">
    <span slot="title">{{title}}</span>
    <div slot="content">
      <div class="p-l">
        <div class="wrap-select" v-if="!imgUrl">
          <h3>SHOW TIME</h3>
          <p>您可以选择一张本地照片上传编辑</p>
          <cmp-button :fileoption="fileOption" @cbk_file="cbk_file">本地照片</cmp-button>
        </div>
        <img :id="id" :src="imgUrl" v-else>
      </div>
      <div class="p-r">
        <p>预览</p>
        <div class="preview s-30">
          <div></div>
        </div>
        <span>30*30</span>
        <div class="preview s-100">
          <div></div>
        </div>
        <span>100*100</span>
      </div>
    </div>
  </cmp-dialog>
</template>

<script type="text/babel">
  import Cropper from 'cropperjs';
  import Dialog from '../../dialog/src/main.vue';
  import Button from '../../button/src/main.vue';

  export default {
    name: 'ImageCrop',
    components: {
      'cmpButton': Button,
      'cmpDialog': Dialog
    },
    props: {
      value: {
        'default': false
      },
      url: '',
      title: {
        'default': '自定义标题'
      }
    },
    data: function () {
      let fileOption = {
        accept: 'image/*',
        multiple: false
      };

      return {
        id: 'cropper_' + new Date().getTime() + parseInt(Math.random() * 100),
        cropper: '',
        fileOption: fileOption,
        optionDialog: {
          show: this.value,
          modal: true,
          stl: {
            header: {
              // left|center
              'text-align': 'left'
            },
            footer: {
              // left|center|right
              'text-align': 'right'
            }
          },
          buttons: [{
            text: '重新选择',
            theme: 'primary',
            fileOption: fileOption
          }, {
            text: '确认'
            // ,theme: 'primary'
          }, {
            text: '取消',
            // primary|success|info|warning|danger|#f56c6c
            theme: 'line'
          }]
        },
        imgUrl: this.url,
        baseData: '',
        fileName: ''
      };
    },
    watch: {
      url: function (val) {
        this.imgUrl = val;
      },
      value: function (val) {
        let _this = this;

        this.$set(this.optionDialog, 'show', val);
        setTimeout(function () {
          val && _this.imgUrl && _this.init();
        }, 0);
      },
      'optionDialog.show': {
        deep: true,
        handler: function (val) {
          !val && this.$emit('input', val);
        }
      }
    },
    mounted: function () {
      // 
    },
    methods: {
      init: function () {
        let previews = document.querySelectorAll('.wrap-cropper .preview > div');
        let each = function (arr, callback) {
          var length = arr.length;
          var i;

          for (i = 0;i < length;i++) {
            callback.call(arr, arr[i], i, arr);
          }
          return arr;
        };

        this.cropper = new Cropper(document.getElementById(this.id), {
          // 裁剪框的宽高比
          aspectRatio: 1,
          // 裁剪区域大小, 0-1
          autoCropArea: 0.6,
          // 图片显示方式 0：无限制， 1：最小限制不能小于选区，2：最小限制不能小于容器，3: 填充容器
          viewMode: 3,
          // 定义背景图片拖拽方式 crop：拖拽裁剪，move：拖拽移动，none：无效果
          dragMode: 'crop',
          // 显示网格背景
          background: true,
          ready: function () {
            var clone = this.cloneNode();

            clone.className = '';
            clone.style.cssText = (
              'display: block;' +
              'width: 100%;' +
              'min-width: 0;' +
              'min-height: 0;' +
              'max-width: none;' +
              'max-height: none;'
            );

            each(previews, function (elem) {
              elem.innerHTML = '';
              elem.appendChild(clone.cloneNode());
            });
            this.cropper.move(0.1, 0);
            // 显示重新选择按钮
            let domFooter = this.cropper.container.parentNode.parentNode.nextElementSibling;
            let firstButton = domFooter.querySelector('.button');

            firstButton.style.display = 'unset';
          },
          crop (event) {
            var data = event.detail;
            var cropper = this.cropper;
            var imageData = cropper.getImageData();
            var previewAspectRatio = data.width / data.height;

            each(previews, function (elem) {
              var previewImage = elem.getElementsByTagName('img').item(0);
              var previewWidth = elem.offsetWidth;
              var previewHeight = previewWidth / previewAspectRatio;
              var imageScaledRatio = data.width / previewWidth;

              elem.style.height = previewHeight + 'px';
              if (previewImage) {
                previewImage.style.width = imageData.naturalWidth / imageScaledRatio + 'px';
                previewImage.style.height = imageData.naturalHeight / imageScaledRatio + 'px';
                previewImage.style.marginLeft = -data.x / imageScaledRatio + 'px';
                previewImage.style.marginTop = -data.y / imageScaledRatio + 'px';
              }
            });
          }
        });
      },
      callbackDialog: function (data) {
        if (data instanceof Array) {
          // 重新选择
          this.cropper.replace(this.utl_getfileurl(data[0].el));
        } else if (data.text === '确认' && this.cropper) {
          // 确认
          this.baseData = this.cropper.getCroppedCanvas().toDataURL();
          this.$emit('callback', {
            dataUrl: this.baseData,
            file: this.utl_data2blob(this.baseData),
            fileName: this.fileName
          });
          this.$emit('input', false);
        } else {
          this.$emit('input', false);
        }
      },
      cbk_file: function (data) {
        this.fileName = data[0].name;
        this.imgUrl = this.utl_getfileurl(data[0].el);
        this.$nextTick(function () {
          this.init();
        });
      },
      // 根据不同浏览器获取路径
      utl_getfileurl: function (tar) {
        var Sys = {};
        var s;
        var ua = navigator.userAgent.toLowerCase();
        var fileUrl = '';

        s = ua.match(/msie ([\d.]+)/);
        s && (Sys.ie = s[1]);
        s = ua.match(/rv: ([\d.]+)/);
        s && (Sys.ie11 = s[1]);
        s = ua.match(/firefox\/([\d.]+)/);
        s && (Sys.firefox = s[1]);
        s = ua.match(/chrome\/([\d.]+)/);
        s && (Sys.chrome = s[1]);
        s = ua.match(/opera.([\d.]+)/);
        s && (Sys.opera = s[1]);
        s = ua.match(/version\/([\d.]+).*safari/);
        s && (Sys.safari = s[1]);
        
        if (Sys.ie <= 6.0) {
          // ie5.5,ie6.0
          fileUrl = tar.value;
        } else if (Sys.ie >= 7.0) {
          // ie7,ie8
          var file = tar;

          file.select();
          fileUrl = document.selection.createRange().text;
        } else {
          fileUrl = this.utl_getObjectURL(tar.files[0]);
        }
        return fileUrl;
      },
      utl_getObjectURL: function (file) {
        var url = null;

        if (window.createObjectURL) { 
          // basic
          url = window.createObjectURL(file);
        } else if (window.URL) { 
          // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL) { 
          // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      // base64转换blob
      utl_data2blob: function (data, mime) {
        data = data.split(',')[1];
        data = window.atob(data);
        var ia = new Uint8Array(data.length);
        
        for (var i = 0;i < data.length;i++) {
          ia[i] = data.charCodeAt(i);
        }
        // canvas.toDataURL 返回的默认格式就是 image/png
        return new Blob([ia], {
          type: 'image/png'
        });
      }
    }
  };
</script>

<style lang="scss">
  @import 'cropperjs/dist/cropper.css';

  .wrap-cropper {
    width: 600px!important;
    height: 430px!important;

    .button {
      padding-left: 20px!important;
      padding-right: 20px!important;
      border-radius: 2px;
    }

    > section > div {
      height: 100%;

      .p-l {
        position: relative;
        float: left;
        width: calc(100% - 120px);
        height: 100%;

        > .wrap-select {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 280px;
          height: 140px;
          text-align: center;

          > h3 {
            font-size: 20px;
            font-weight: normal;
          }
          > h3:after {
            content: '';
            display: block;
            margin: auto;
            width: 30px;
            height: 3px;
            background-color: #ddd;
          }
          > p {
            margin: 10px 0;
          }
          > .button {
            margin-top: 20px;
            width: 220px;
          }
        }
        
        > img {
          width: 100%;
        }
      }

      .p-r {
        float: left;
        width: 120px;
        height: 100%;
        border-left: solid 1px #eee;
        overflow: hidden;

        > p {
          text-indent: 10px;
        }

        > .preview {
          position: relative;
          margin: 40px auto 5px auto;
          border: solid 1px #eee;
          overflow: hidden;
        }
        > .s-30 {
          margin-top: 30px;
          width: 30px;
          height: 30px;
        }
        > .s-100 {
          width: 100px;
          height: 100px;
        }
        > span {
          display: block;
          text-align: center;
        }
      }
    }

    > footer {
      > .button:first-child {
        display: none;
        float: left;
        margin-top: 8px;
      }
    }
  }
</style>