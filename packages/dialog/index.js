import Dialog from './src/main.vue';
import Confirm from './src/confirm.vue';
import Prompt from './src/prompt.vue';

/* istanbul ignore next */
Dialog.install = function (Vue) {
  Vue.component(Dialog.name, Dialog);
};

Confirm.install = function (Vue) {
  Vue.component(Confirm.name, Confirm);
};

Prompt.install = function (Vue) {
  Vue.component(Prompt.name, Prompt);
};

export {Dialog, Confirm, Prompt};
