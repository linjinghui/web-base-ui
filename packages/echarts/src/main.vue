<template>
  <!-- <div id="main" :style="{'width': bfWidth, 'height': bfHeight}"></div> -->
  <div id="main" style="width: 100%;height: 100%;"></div>
</template>

<script type="text/babel">
  import Echarts from 'echarts';

  export default {
    name: 'Echarts',
    data: function () {
      return {
        //
      };
    },
    props: {
      theme: {
        default: '#0079ff'
      },
      color: {
        default: '#333'
      },
      title: '',
      yname: '',
      ydata: {
        default: function () {
          return [];
        }
      },
      xdata: {
        default: function () {
          return [];
        }
      },
      labelText: '',
      value: {
        default: function () {
          return [];
        }
      }
    },
    watch: {
      //
    },
    mounted: function () {
      let _this = this;

      this.myChart = Echarts.init(document.getElementById('main'));
      this.resetEchart();
      window.onresize = function () {
        _this.resizeEchart();
      };
    },
    methods: {
      getOption: function () {
        return {
          tooltip: {
            trigger: 'axis'
          },
          calculable: true,
          textStyle: {
            color: this.color
          },
          title: {
            text: this.title,
            left: 'center',
            textStyle: {
              color: this.color
            }
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: this.xdata
            }
          ],
          yAxis: {
            type: 'value',
            data: this.ydata,
            name: this.yname,
            nameTextStyle: {
              fontSize: 14
            }
          },
          series: [
            {
              name: this.labelText,
              type: 'line',
              symbol: 'circle',
              symbolSize: 10,
              itemStyle: {
                normal: {
                  color: this.theme
                }
              },
              lineStyle: {
                normal: {
                  color: this.theme
                }
              },
              areaStyle: {
                normal: {
                  color: {
                    type: 'radial',
                    colorStops: [
                      {
                        offset: 1,
                        color: this.theme
                      }
                    ],
                    globalCoord: false
                  }
                }
              },
              smooth: true,
              data: this.value
            }
          ],
          toolbox: {
            right: '10%',
            feature: {
              magicType: {
                show: true,
                type: ['line', 'bar']
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          }
        };
      },
      resetEchart: function () {
        let option = this.getOption();

        this.myChart.setOption(option);
      },
      resizeEchart: function () {
        this.myChart.resize();
      }
    }
  };
</script>

<style scoped lang="scss"></style>