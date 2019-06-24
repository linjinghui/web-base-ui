<template>
  <div style="padding: 50px;">
    <a href="#/demoCicon">css icon</a>
    <a href="#/demoButton">button</a>
    <a href="#/demoCheckbox">checkbox</a>
    <a href="#/demoRadio">radio</a>
    <a href="#/demoInput">input</a>
    <a href="#/demoSwith">swith</a>
    <a href="#/demoTooltip">tooltip</a>
    <a href="#/demoLoading">loading</a>
    <a href="#/demoProgress">progress</a>
    <a href="#/demoSlider">slider</a>
    <a href="#/demoDatePicker">datePicker</a>
    <a href="#/demoRangeMenu">rangeMenu</a>
    <a href="#/demoShuttle">shuttle</a>
    <a href="#/demoPagebar">pagebar</a>
    <a href="#/demoEcharts">echarts</a>
    <a href="#/demoImageCrop">imageCrop</a>
    <a href="#/demoTable">table</a>
    <a href="#/demoSidebar">sidebar</a>
    <a href="#/demoTextarea">textarea</a>
    <a href="#/demoDropMenu">dropMenu</a>
    <a href="#/demoMenu">menu</a>
    <a href="#/demoCascade">cascade</a>
    <a href="#/demoTip">tip</a>
    <a href="#/demoTree">tree</a>
    <a href="#/demoDialog">dialog</a>
    <a href="#/demoDrag">drag</a>
    <a href="#/demoForm">form</a>
    <a href="#/demoAsideNav">asideNav</a>
    <a href="#/demoTab">tab</a>
    <a href="#/demoEditor">editor</a>
    <a href="#/demoStar">star</a>
    <a href="#/demoBreadcrumbs">breadcrumbs</a>
    <a href="#/demoImageViewer">imageViewer</a>
    <a href="#/demoMap">map</a>
    <!-- <a href="#/demoSwapSort">swapSort</a> -->
    <a href="#/demoDivEditor">divEditor</a>
    <a href="#/demoVideo">video</a>
    <a href="#/demoImg">img</a>
    <a href="#/demoFlowtree">flowtree</a>
    <a href="#/demoScrollBanner">scrollBanner</a>
    <a href="#/demoTimeTurntable">timeTurntable</a>
    <a href="#/demoSelector">selector</a>
    <a href="#/demoRotaryTable">rotaryTable</a>
    <a href="#/demoList2">list2</a>
    <a href="#/demoAddLabel">addLabel</a>
    <a href="#/demoSwiper">siwper</a>
    <a href="#/demoList">list</a>
    <a href="#/demoMore">more</a>
    
  </div>
</template>

<script>

export default {
  name: 'Demo',
  data: function () {
    return {
      //
    };
  },
  components: {
    //
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