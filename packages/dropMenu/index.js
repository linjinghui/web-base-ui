import DrapMenu from './src/main.vue';

/* istanbul ignore next */
DrapMenu.install = function (Vue) {
  Vue.component(DrapMenu.name, DrapMenu);
};

export default DrapMenu;
