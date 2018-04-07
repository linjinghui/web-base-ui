import Button from './button/index';

import Vue from 'vue';

// 用于组件通信
window.EVENTBUS = new Vue();

const components = [Button];
const install = function (Vue) {
  if (install.installed) return;
  components.map(function (component) {
    Vue.component(component.name, component);
  });
}

export {Button};
