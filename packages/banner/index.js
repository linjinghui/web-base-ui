import Banner from './src/main.vue';

/* istanbul ignore next */
Banner.install = function (Vue) {
  Vue.component(Banner.name, Banner);
};

export default Banner;
