import Vue from 'vue';
import Router from 'vue-router';
import Demo from '../../example/demo';
import DemoInput from '../../example/demo_input';
import DemoDialog from '../../example/demo_dialog';
import DemoButton from '../../example/demo_button';
import DemoTip from '../../example/demo_tip';
import DemoLoading from '../../example/demo_loading';
import DemoCheckbox from '../../example/demo_checkbox';
import DemoRadio from '../../example/demo_radio';
import DemoSidebar from '../../example/demo_sidebar';
import DemoPagebar from '../../example/demo_pagebar';
import DemoDropMenu from '../../example/demo_dropMenu';
import DemoRangeMenu from '../../example/demo_rangeMenu';
import DemoSwitch from '../../example/demo_switch';
import DemoEcharts from '../../example/demo_echarts';
import DemoTabel from '../../example/demo_tabel';
import DemoScrollTabel from '../../example/demo_scrollTabel';
import DemoSelector from '../../example/demo_selector';
import DemoVtree from '../../example/demo_vtree';
import DemoForm from '../../example/demo_form';
import DemoContextmenu from '../../example/demo_contextmenu';
import DemoTextarea from '../../example/demo_textarea';
import DemoSearch from '../../example/demo_search';
import DemoMultiselect from '../../example/demo_multiselect';
import DemoBanner from '../../example/demo_banner';
import DemoImageCrop from '../../example/demo_imageCrop';

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
      path: '/demoInput',
      name: 'demoInput',
      component: DemoInput
    },
    {
      path: '/demoDialog',
      name: 'demoDialog',
      component: DemoDialog
    },
    {
      path: '/demoButton',
      name: 'demoButton',
      component: DemoButton
    },
    {
      path: '/demoTip',
      name: 'demoTip',
      component: DemoTip
    },
    {
      path: '/demoLoading',
      name: 'demoLoading',
      component: DemoLoading
    },
    {
      path: '/demoCheckbox',
      name: 'demoCheckbox',
      component: DemoCheckbox
    },
    {
      path: '/demoSidebar',
      name: 'demoSidebar',
      component: DemoSidebar
    },
    {
      path: '/demoPagebar',
      name: 'demoPagebar',
      component: DemoPagebar
    },
    {
      path: '/demoDropMenu',
      name: 'demoDropMenu',
      component: DemoDropMenu
    },
    {
      path: '/demoRangeMenu',
      name: 'demoRangeMenu',
      component: DemoRangeMenu
    },
    {
      path: '/demoRadio',
      name: 'demoRadio',
      component: DemoRadio
    },
    {
      path: '/demoSwitch',
      name: 'demoSwitch',
      component: DemoSwitch
    },
    {
      path: '/demoEcharts',
      name: 'demoEcharts',
      component: DemoEcharts
    },
    {
      path: '/demoTabel',
      name: 'demoTabel',
      component: DemoTabel
    },
    {
      path: '/demoSelector',
      name: 'demoSelector',
      component: DemoSelector
    },
    {
      path: '/demoVtree',
      name: 'demoVtree',
      component: DemoVtree
    },
    {
      path: '/demoForm',
      name: 'demoForm',
      component: DemoForm
    },
    {
      path: '/demoContextmenu',
      name: 'demoContextmenu',
      component: DemoContextmenu
    },
    {
      path: '/demoScrollTabel',
      name: 'demoScrollTabel',
      component: DemoScrollTabel
    },
    {
      path: '/demoTextarea',
      name: 'demoTextarea',
      component: DemoTextarea
    },
    {
      path: '/demoSearch',
      name: 'demoSearch',
      component: DemoSearch
    },
    {
      path: '/demoMultiselect',
      name: 'demoMultiselect',
      component: DemoMultiselect
    },
    {
      path: '/demoBanner',
      name: 'demoBanner',
      component: DemoBanner
    },
    {
      path: '/demoImageCrop',
      name: 'demoImageCrop',
      component: DemoImageCrop
    }
  ]
});
