import Tooltip from './src/main.vue';

/* istanbul ignore next */
Tooltip.install = function (Vue) {
  Vue.component(Tooltip.name, Tooltip);
};

export default Tooltip;
