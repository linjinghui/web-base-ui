import Vue from 'vue';
import Router from 'vue-router';
import Demo from '../../example/demo';

import DemoCicon from '../../example/demo_cicon.vue';
import DemoButton from '../../example/demo_button.vue';
import DemoCheckbox from '../../example/demo_checkbox.vue';
import DemoRadio from '../../example/demo_radio.vue';
import DemoInput from '../../example/demo_input.vue';
import DemoSwith from '../../example/demo_swith.vue';
import DemoTooltip from '../../example/demo_tooltip.vue';
import DemoLoading from '../../example/demo_loading.vue';
import DemoProgress from '../../example/demo_progress.vue';
import DemoSlider from '../../example/demo_slider.vue';
import DemoDatePicker from '../../example/demo_date_picker.vue';
import DemoRangeMenu from '../../example/demo_range_menu.vue';
import DemoShuttle from '../../example/demo_shuttle.vue';
import DemoPagebar from '../../example/demo_pagebar.vue';
import DemoEcharts from '../../example/demo_echarts.vue';
import DemoImageCrop from '../../example/demo_image_crop.vue';
import DemoTable from '../../example/demo_table.vue';

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
    },
    {
      path: '/demoTooltip',
      name: 'demoTooltip',
      component: DemoTooltip
    },
    {
      path: '/demoLoading',
      name: 'demoLoading',
      component: DemoLoading
    },
    {
      path: '/demoProgress',
      name: 'demoProgress',
      component: DemoProgress
    },
    {
      path: '/demoSlider',
      name: 'demoSlider',
      component: DemoSlider
    },
    {
      path: '/demoDatePicker',
      name: 'demoDatePicker',
      component: DemoDatePicker
    },
    {
      path: '/demoRangeMenu',
      name: 'demoRangeMenu',
      component: DemoRangeMenu
    },
    {
      path: '/demoShuttle',
      name: 'demoShuttle',
      component: DemoShuttle
    },
    {
      path: '/demoPagebar',
      name: 'demoPagebar',
      component: DemoPagebar
    },
    {
      path: '/demoEcharts',
      name: 'demoEcharts',
      component: DemoEcharts
    },
    {
      path: '/demoImageCrop',
      name: 'demoImageCrop',
      component: DemoImageCrop
    },
    {
      path: '/demoTable',
      name: 'demoTable',
      component: DemoTable
    }
  ]
});
