import Tab from './src/main.vue';

/* istanbul ignore next */
Tab.install = function (Vue) {
  Vue.component(Tab.name, Tab);
};

export default Tab;
