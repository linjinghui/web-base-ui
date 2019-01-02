<template>
  <div :id="id" style="width: 100%;height: 100%;"></div>
</template>

<script type="text/babel">
  // import Echarts from 'echarts';

  export default {
    name: 'Echarts',
    data: function () {
      return {
        id: 'echarts_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {
      loading: {
        default: true
      },
      option: {
        type: Object,
        default: function () {
          return {};
        }
      },
      map: {
        type: Object,
        default: function () {
          return {};
        }
      }
    },
    watch: {
      option: function () {
        this.setOption();
      },
      map: function () {
        this.setOption();
      }
    },
    mounted: function () {
      let _this = this;

      this.myChart = window.echarts.init(document.getElementById(this.id));
      (this.loading + '' === 'true') && this.myChart.showLoading();
      this.$nextTick(function () {
        this.setOption();
      });

      if (window.EVENTBUS) {
        window.onresize = function () {
          window.EVENTBUS.$emit('echartsResize');
        };

        window.EVENTBUS.$on('echartsResize', function () {
          _this.resizeEchart();
        });
      }
    },
    methods: {
      setOption: function () {
        if (JSON.stringify(this.map) !== '{}') {
          window.echarts.registerMap(this.option.series[0].map, this.map);
          this.myChart.hideLoading();
        }
        if (JSON.stringify(this.option) !== '{}') {
          this.myChart.setOption(this.option);
          this.myChart.hideLoading();
        }
      },
      resizeEchart: function () {
        this.myChart.resize();
      }
    }
  };
</script>

<style scoped lang="scss"></style>