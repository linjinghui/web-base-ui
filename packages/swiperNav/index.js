import SwiperNav from './src/main.vue';

SwiperNav.install = function (Vue) {
  Vue.component(SwiperNav.name, SwiperNav);
};

export default SwiperNav;
