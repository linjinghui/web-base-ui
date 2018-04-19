import Vue from 'vue';
import Router from 'vue-router';
import Demo from '../../example/demo';

import DemoCicon from '../../example/demo_cicon.vue';
import DemoButton from '../../example/demo_button.vue';
import DemoCheckbox from '../../example/demo_checkbox.vue';
import DemoRadio from '../../example/demo_radio.vue';
import DemoInput from '../../example/demo_input.vue';
import DemoSwith from '../../example/demo_swith.vue';

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
      path: '/demoCicon',
      name: 'demoCicon',
      component: DemoCicon
    },
    {
      path: '/demoButton',
      name: 'demoButton',
      component: DemoButton
    },
    {
      path: '/demoCheckbox',
      name: 'demoCheckbox',
      component: DemoCheckbox
    },
    {
      path: '/demoRadio',
      name: 'demoRadio',
      component: DemoRadio
    },
    {
      path: '/demoInput',
      name: 'demoInput',
      component: DemoInput
    },
    {
      path: '/demoSwith',
      name: 'demoSwith',
      component: DemoSwith
    }
  ]
});
