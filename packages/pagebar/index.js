import Pagebar from './src/main.vue';

/* istanbul ignore next */
Pagebar.install = function (Vue) {
  Vue.component(Pagebar.name, Pagebar);
};

export default Pagebar;
