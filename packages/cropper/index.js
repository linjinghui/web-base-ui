import Cropper from './src/cropper.vue';

/* istanbul ignore next */
Cropper.install = function (Vue) {
  Vue.component(Cropper.name, Cropper);
};

export default Cropper;
