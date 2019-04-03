import ImageCrop from './src/main.vue';

/* istanbul ignore next */
ImageCrop.install = function (Vue) {
  Vue.component(ImageCrop.name, ImageCrop);
};

export default ImageCrop;
