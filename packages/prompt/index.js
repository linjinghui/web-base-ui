import Prompt from './src/prompt.vue';

/* istanbul ignore next */
Prompt.install = function (Vue) {
  Vue.component(Prompt.name, Prompt);
};

export default Prompt;
