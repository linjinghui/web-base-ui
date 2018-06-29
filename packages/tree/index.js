import Tree from './src/main.vue';

/* istanbul ignore next */
Tree.install = function (Vue) {
  Vue.component(Tree.name, Tree);
};

export default Tree;
