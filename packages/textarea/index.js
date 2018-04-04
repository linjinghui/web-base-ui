import Textarea from './src/main.vue';

/* istanbul ignore next */
Textarea.install = function (Vue) {
  Vue.component(Textarea.name, Textarea);
};

export default Textarea;
