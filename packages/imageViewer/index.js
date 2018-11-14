import ImageViewer from './src/main.vue';

/* istanbul ignore next */
ImageViewer.install = function (Vue) {
  Vue.component(ImageViewer.name, ImageViewer);
};

export default ImageViewer;
