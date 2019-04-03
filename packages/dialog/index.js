import Dialog from './src/main.vue';

/* istanbul ignore next */
Dialog.install = function (Vue) {
  Vue.component(Dialog.name, Dialog);
};

export default Dialog;
