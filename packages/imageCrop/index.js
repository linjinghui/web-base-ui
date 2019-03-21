import ImageCrop from './src/main.vue';
import Cropper from './src/cropper.vue';

/* istanbul ignore next */
ImageCrop.install = function (Vue) {
  Vue.component(ImageCrop.name, ImageCrop);
};

export {ImageCrop, Cropper};
