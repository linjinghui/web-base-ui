import Dialog from './src/main.vue';
import Contact from './src/contact.vue';
import Alert from './src/alert.vue';
import Confirm from './src/confirm.vue';

/* istanbul ignore next */
Dialog.install = function (Vue) {
  Vue.component(Dialog.name, Dialog);
};

export {Dialog, Contact, Alert, Confirm};
