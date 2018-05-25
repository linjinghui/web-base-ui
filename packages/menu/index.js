import Menu from './src/main.vue';
import Cascade from './src/cascade.vue';

/* istanbul ignore next */
Menu.install = function (Vue) {
  Vue.component(Menu.name, Menu);
};

Cascade.install = function (Vue) {
  Vue.component(Cascade.name, Cascade);
};

export {Menu, Cascade};
