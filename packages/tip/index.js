import Tip from './src/main.vue';

/* istanbul ignore next */
Tip.install = function (Vue) {
  Vue.component(Tip.name, Tip);
};

export default Tip;
