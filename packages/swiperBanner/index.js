import SwiperBanner from './src/main.vue';

SwiperBanner.install = function (Vue) {
  Vue.component(SwiperBanner.name, SwiperBanner);
};

export default SwiperBanner;
