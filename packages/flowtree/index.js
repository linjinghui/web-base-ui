import Flowtree from './src/main.vue';

/* istanbul ignore next */
Flowtree.install = function (Vue) {
  Vue.component(Flowtree.name, Flowtree);
};

export default Flowtree;
