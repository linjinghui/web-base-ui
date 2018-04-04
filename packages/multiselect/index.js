import Multiselect from './src/main.vue';

/* istanbul ignore next */
Multiselect.install = function (Vue) {
  Vue.component(Multiselect.name, Multiselect);
};

export default Multiselect;
