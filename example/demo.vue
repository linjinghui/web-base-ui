<template>
  <div style="padding: 50px;">
    <a href="#/demoButton">button</a>
    <a href="#/demoCheckbox">checkbox</a>
    <a href="#/demoDialog">dialog</a>
    <a href="#/demoDropMenu">dropMenu</a>
    <a href="#/demoInput">input</a>
    <a href="#/demoLoading">loading</a>
    <a href="#/demoPagebar">pagebar</a>
    <a href="#/demoRadio">radio</a>
    <a href="#/demoRangeMenu">rangeMenu</a>
    <a href="#/demoSidebar">slidebar</a>
    <a href="#/demoSwitch">switch</a>
    <a href="#/demoTip">texttip</a>
    <a href="#/demoEcharts">echarts</a>
    <a href="#/demoTabel">tabel</a>
    <a href="#/demoScrollTabel">scrollTabel</a>
    <a href="#/demoSelector">selector</a>
    <a href="#/demoVtree">vtree</a>
    <a href="#/demoForm">form</a>
    <a href="#/demoContextmenu">contextmenu</a>
    <a href="#/demoTextarea">textarea</a>
    <a href="#/demoSearch">search</a>
    <a href="#/demoMultiselect">multiselect</a>
    <a href="#/demoBanner">banner</a>
    <a href="#/demoImageCrop">imageCrop</a>
  </div>
</template>

<script>
import {Switch} from '../packages/index.js';

export default {
  name: 'DemoSwitch',
  data: function () {
    return {
      //
    };
  },
  components: {
    'cmpSwitch': Switch
  },
  methods: {
    callback: function (val) {
      console.log(JSON.stringify(val));
    }
  }
};
</script>

<style scoped>
  a {
    display: inline-block;margin-right: 10px;text-decoration: underline;
  }
</style>