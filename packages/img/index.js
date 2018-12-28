import Img from './src/main.vue';

/* istanbul ignore next */
Img.install = function (Vue) {
  Vue.component(Img.name, Img);
};

export default Img;
