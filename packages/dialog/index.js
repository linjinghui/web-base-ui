import Dialog from './src/main.vue';
import Prompt from './src/prompt.vue';

/* istanbul ignore next */
Dialog.install = function (Vue) {
  Vue.component(Dialog.name, Dialog);
};

Prompt.install = function (Vue) {
  Vue.component(Prompt.name, Prompt);
};

export {Dialog, Prompt};
