import Menu from './src/main.vue';

/* istanbul ignore next */
Menu.install = function (Vue) {
  Vue.component(Menu.name, Menu);
};

export default Menu;
