import Confirm from './src/confirm.vue';

/* istanbul ignore next */
Confirm.install = function (Vue) {
  Vue.component(Confirm.name, Confirm);
};

export default Confirm;
