import RangeMenu from './src/main.vue';

/* istanbul ignore next */
RangeMenu.install = function (Vue) {
  Vue.component(RangeMenu.name, RangeMenu);
};

export default RangeMenu;
