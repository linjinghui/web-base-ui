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