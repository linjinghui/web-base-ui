import Echarts from './src/main.vue';
import EchartsPie from './src/pie.vue';

/* istanbul ignore next */
Echarts.install = function (Vue) {
  Vue.component(Echarts.name, Echarts);
};

EchartsPie.install = function (Vue) {
  Vue.component(EchartsPie.name, EchartsPie);
};

export {Echarts, EchartsPie};
