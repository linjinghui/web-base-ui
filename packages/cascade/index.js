import Cascade from './src/cascade.vue';

/* istanbul ignore next */
Cascade.install = function (Vue) {
  Vue.component(Cascade.name, Cascade);
};

export default Cascade;
