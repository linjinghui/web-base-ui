import Shuttle from './src/main.vue';

/* istanbul ignore next */
Shuttle.install = function (Vue) {
  Vue.component(Shuttle.name, Shuttle);
};

export default Shuttle;
