import Loading from './src/main.vue';

/* istanbul ignore next */
Loading.install = function (Vue) {
  Vue.component(Loading.name, Loading);
};

export default Loading;
