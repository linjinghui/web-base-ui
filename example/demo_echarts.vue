<template>
  <div style="height: 100%;">
    <button @click="clk">set data</button>,
    <button @click="clk_resize">set resize</button>
    <div style="width: 100%;height: 90%;border: solid 1px;">
      <cmp-echarts ref="echart"
        :title="title"
        :yname="yname"
        :ydata="ydata"
        :xdata="xdata"
        :labelText="labelText"
        :value="value"></cmp-echarts>
    </div>
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
      value: []
    };
  },
  components: {
    'cmpEcharts': Echarts
  },
  methods: {
    clk: function () {
      this.xdata = ['2017/07/11', '2017/07/12', '2017/07/13', '2017/07/14', '2017/07/15'];
      this.value = [61, 62, 63, 64, 51];
      this.$nextTick(function () {
        this.$refs.echart.resetEchart();
      });
    },
    clk_resize: function () {
      this.$refs.echart.resizeEchart();
    }
  }
};
</script>

<style scoped>

</style>