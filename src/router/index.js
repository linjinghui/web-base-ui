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
import DemoSidebar from '../../example/demo_sidebar.vue';
import DemoTextarea from '../../example/demo_textarea.vue';
import DemoDropMenu from '../../example/demo_drop_menu.vue';
import DemoMenu from '../../example/demo_menu.vue';
import DemoCascade from '../../example/demo_cascade.vue';
import DemoTip from '../../example/demo_tip.vue';
import DemoTree from '../../example/demo_tree.vue';
import DemoDialog from '../../example/demo_dialog.vue';
import DemoDrag from '../../example/demo_drag.vue';
import DemoForm from '../../example/demo_form.vue';
import DemoAsideNav from '../../example/demo_aside_nav.vue';
import DemoTab from '../../example/demo_tab.vue';
import DemoEditor from '../../example/demo_editor.vue';
import DemoStar from '../../example/demo_star.vue';
import DemoBreadcrumbs from '../../example/demo_breadcrumbs.vue';
import DemoImageViewer from '../../example/demo_image_viewer.vue';
import DemoMap from '../../example/demo_map.vue';
import DemoSwapSort from '../../example/demo_swap_sort.vue';
import DemoDivEditor from '../../example/demo_div_editor.vue';
import DemoVideo from '../../example/demo_video.vue';
import DemoImg from '../../example/demo_img.vue';
import DemoFlowtree from '../../example/demo_flow_tree.vue';
import DemoScrollBanner from '../../example/demo_scroll_banner.vue';
import DemoTimeTurntable from '../../example/demo_time_turntable.vue';
import DemoSelector from '../../example/demo_selector.vue';
import RotaryTable from '../../example/demo_rotary_table.vue';
import DemoList from '../../example/demo_list.vue';
import DemoAddLabel from '../../example/demo_add_label.vue';

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
    },
    {
      path: '/demoSidebar',
      name: 'demoSidebar',
      component: DemoSidebar
    },
    {
      path: '/demoTextarea',
      name: 'demoTextarea',
      component: DemoTextarea
    },
    {
      path: '/demoDropMenu',
      name: 'demoDropMenu',
      component: DemoDropMenu
    },
    {
      path: '/demoMenu',
      name: 'demoMenu',
      component: DemoMenu
    },
    {
      path: '/demoCascade',
      name: 'demoCascade',
      component: DemoCascade
    },
    {
      path: '/demoTip',
      name: 'demoTip',
      component: DemoTip
    },
    {
      path: '/demoTree',
      name: 'demoTree',
      component: DemoTree
    },
    {
      path: '/demoDialog',
      name: 'demoDialog',
      component: DemoDialog
    },
    {
      path: '/demoDrag',
      name: 'demoDrag',
      component: DemoDrag
    },
    {
      path: '/demoForm',
      name: 'demoForm',
      component: DemoForm
    },
    {
      path: '/demoAsideNav',
      name: 'demoAsideNav',
      component: DemoAsideNav
    },
    {
      path: '/demoTab',
      name: 'demoTab',
      component: DemoTab
    },
    {
      path: '/demoEditor',
      name: 'demoEditor',
      component: DemoEditor
    },
    {
      path: '/demoStar',
      name: 'demoStar',
      component: DemoStar
    },
    {
      path: '/demoBreadcrumbs',
      name: 'demoBreadcrumbs',
      component: DemoBreadcrumbs
    },
    {
      path: '/demoImageViewer',
      name: 'demoImageViewer',
      component: DemoImageViewer
    },
    {
      path: '/demoMap',
      name: 'demoMap',
      component: DemoMap
    },
    {
      path: '/demoSwapSort',
      name: 'demoSwapSort',
      component: DemoSwapSort
    },
    {
      path: '/demoDivEditor',
      name: 'demoDivEditor',
      component: DemoDivEditor
    },
    {
      path: '/demoVideo',
      name: 'demoVideo',
      component: DemoVideo
    },
    {
      path: '/demoImg',
      name: 'demoImg',
      component: DemoImg
    },
    {
      path: '/demoFlowtree',
      name: 'demoFlowtree',
      component: DemoFlowtree
    },
    {
      path: '/demoScrollBanner',
      name: 'demoScrollBanner',
      component: DemoScrollBanner
    },
    {
      path: '/demoTimeTurntable',
      name: 'demoTimeTurntable',
      component: DemoTimeTurntable
    },
    {
      path: '/demoSelector',
      name: 'demoSelector',
      component: DemoSelector
    },
    {
      path: '/demoRotaryTable',
      name: 'demoRotaryTable',
      component: RotaryTable
    },
    {
      path: '/demoList',
      name: 'demoList',
      component: DemoList
    },
    {
      path: '/demoAddLabel',
      name: 'demoAddLabel',
      component: DemoAddLabel
    }
  ]
});
