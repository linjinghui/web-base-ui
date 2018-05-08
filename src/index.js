import './style/main.css';
import Vue from 'vue';
import VueResource from 'vue-resource';
import router from './router';
import App from './App';
import {install} from '../packages/index.js';
// import VueLazyload from 'vue-lazyload';
// import './mock.js';

// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: require('./images/1.jpg'),
//   loading: require('./images/1.jpg'),
//   attempt: 1
// });
Vue.use(VueResource);
// 注册全局组件
install(Vue);


const app = new Vue({
  router,
  ...App
});

// 用于组件通信
window.EVENTBUS = new Vue();

app.$mount('#app');
