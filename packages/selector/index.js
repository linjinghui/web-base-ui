import Selector from './src/main.vue';

/* istanbul ignore next */
Selector.install = function (Vue) {
  Vue.component(Selector.name, Selector);
};

export default Selector;
