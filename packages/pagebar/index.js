import Pagebar from './src/main.vue';
import PagebarPagesize from './src/byPagesize.vue';

/* istanbul ignore next */
Pagebar.install = function (Vue) {
  Vue.component(Pagebar.name, Pagebar);
};

PagebarPagesize.install = function (Vue) {
  Vue.component(PagebarPagesize.name, PagebarPagesize);
};

export {Pagebar, PagebarPagesize};
