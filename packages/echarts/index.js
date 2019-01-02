import Echarts from './src/main.vue';

/* istanbul ignore next */
Echarts.install = function (Vue) {
  Vue.component(Echarts.name, Echarts);
};


export default Echarts;
