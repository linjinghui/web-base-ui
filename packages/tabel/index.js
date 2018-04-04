import Tabel from './src/main.vue';
import ScrollTabel from './src/scrollTabel.vue';

/* istanbul ignore next */
Tabel.install = function (Vue) {
  Vue.component(Tabel.name, Tabel);
};

export {Tabel, ScrollTabel};
