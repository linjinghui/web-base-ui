<template>
  <div>
    <button @click="clk">set data</button>,
    <button @click="clkResize">set resize</button>
    <cmp-echarts
    :title="title"
    :yname="yname"
    :ydata="ydata"
    :xdata="xdata"
    :labelText="labelText"
    :value="value"
    :resetData="resetData"
    :resize="resize"></cmp-echarts>
  </div>
</template>

<script>
import {Echarts} from '../packages/index.js';

export default {
  name: 'demoEcharts',
  data: function () {
    return {
      themeColor: '',
      color: '',
      width: '',
      title: '你好世界',
      yname: '人数',
      ydata: [],
      xdata: [],
      labelText: '人数1',
      value: [],
      // 控制数据更新，每次需要传递不同的值才会更新数据
      resetData: 0,
      // 控制重新加载，用于窗口大小改变的时候，每次需要传递不同的值才会更新数据
      resize: 0
    };
  },
  components: {
    'cmpEcharts': Echarts
  },
  methods: {
    clk: function () {
      this.xdata = ['2017/07/11', '2017/07/12', '2017/07/13', '2017/07/14', '2017/07/15'];
      this.value = [61, 62, 63, 64, 51];
      this.resetData = new Date().getTime();
    },
    clkResize: function () {
      this.resize = new Date().getTime();
    }
  }
};
</script>

<style scoped>

</style>