import Star from './src/main.vue';

/* istanbul ignore next */
Star.install = function (Vue) {
  Vue.component(Star.name, Star);
};

export default Star;
