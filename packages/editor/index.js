import Editor from './src/main.vue';

/* istanbul ignore next */
Editor.install = function (Vue) {
  Vue.component(Editor.name, Editor);
};

export default Editor;
