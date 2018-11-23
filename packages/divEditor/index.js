import DivEditor from './src/main.vue';

/* istanbul ignore next */
DivEditor.install = function (Vue) {
  Vue.component(DivEditor.name, DivEditor);
};

export default DivEditor;
