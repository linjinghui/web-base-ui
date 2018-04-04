<template>
  <div>
    <vue-image-crop
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      :field="fileName"
      :width="width"
      :height="height"
      :url="uploadPath"
      :params="params"
      :headers="headers"
      :img-format="imgFormat"
      :noCircle="noCircle"
      :noSquare="noSquare"
      :noRotate="noRotate"></vue-image-crop>

  </div>
</template>

<script type="text/babel">
  import vueImageCrop from 'vue-image-crop-upload';

  export default {
    name: 'ImageCrop',
    components: {
      'vueImageCrop': vueImageCrop
    },
    props: {
      value: {
        'default': false
      },
      fileName: {
        type: String,
        'default': function () {
          return 'imageCrop' + new Date().getTime();
        }
      },
      width: {
        type: Number,
        'default': 300
      },
      height: {
        type: Number,
        'default': 300
      },
      uploadPath: {
        type: String,
        'default': ''
      },
      params: {
        type: Object,
        'default': function () {
          return {};
        }
      },
      headers: {
        type: Object,
        'default': function () {
          return {};
        }
      },
      imgFormat: {
        type: String,
        'default': 'png'
      },
      noCircle: {
        type: Boolean,
        'default': false
      },
      noSquare: {
        type: Boolean,
        'default': false
      },
      noRotate: {
        type: Boolean,
        'default': false
      }
    },
    data: function () {
      return {
        show: false
      };
    },
    watch: {
      value: function (val) {
        this.show = val;
      },
      show: function (val) {
        this.$emit('input', val);
      }
    },
    mounted: function () {
      //
    },
    methods: {
      cropSuccess (imgDataUrl, field) {
        this.$emit('crop-success', imgDataUrl, field);
      },
      cropUploadSuccess (jsonData, field) {
        this.$emit('crop-upload-success', jsonData, field);
      },
      cropUploadFail (status, field) {
        this.$emit('crop-upload-fail', status, field);
      }
    }
  };
</script>

<style scoped lang="scss"></style>