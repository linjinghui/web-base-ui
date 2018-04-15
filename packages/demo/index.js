import Demo from './src/main.vue';

/* istanbul ignore next */
Demo.install = function (Vue) {
  Vue.component(Demo.name, Demo);
};

export default Demo;
