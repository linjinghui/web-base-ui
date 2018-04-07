import Vue from 'vue';
import Router from 'vue-router';
import Demo from '../../example/demo';

import DemoButton from '../../example/demo_button';

Vue.use(Router);

export default new Router({
  mode: 'hash', // history, hash
  routes: [
    {
      path: '/',
      name: 'demo',
      component: Demo
    },
    {
      path: '/demoButton',
      name: 'demoButton',
      component: DemoButton
    }
  ]
});
