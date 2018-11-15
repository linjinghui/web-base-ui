import Map from './src/main.vue';

/* istanbul ignore next */
Map.install = function (Vue) {
  Vue.component(Map.name, Map);
};

export default Map;
