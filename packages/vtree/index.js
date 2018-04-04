import Vtree from './src/main.vue';

/* istanbul ignore next */
Vtree.install = function (Vue) {
  Vue.component(Vtree.name, Vtree);
};

export default Vtree;
