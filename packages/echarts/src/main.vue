<template>
  <div id="main" :style="{'width': bfWidth, 'height': bfHeight}"></div>
</template>

<script type="text/babel">
  import Echarts from 'echarts';

  export default {
    name: 'Echarts',
    data: function () {
      return {
        bfWidth: this.width,
        bfHeight: this.height,
        bfThemeColor: this.themeColor,
        bfColor: this.color,
        bfTitle: this.title,
        bfYname: this.yname,
        bfYdata: this.ydata,
        bfXdata: this.xdata,
        bfLabelText: this.labelText,
        bfValue: this.value
      };
    },
    props: {
      width: {
        default: '100%'
      },
      height: {
        default: '500px'
      },
      themeColor: {
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
      },
      resize: 0,
      resetData: 0
    },
    watch: {
      ydata: function (val) {
        this.bfYdata = val;
      },
      xdata: function (val) {
        this.bfXdata = val;
      },
      value: function (val) {
        this.bfValue = val;
      },
      resetData: function (val) {
        // 更新数据
        this.resetEchart();
      },
      resize: function (val) {
        this.resizeEchart();
      }
    },
    mounted: function () {
      let _this = this;

      this.myChart = Echarts.init(document.getElementById('main'));
      this.resetEchart();
      if (_this.bfWidth === '100%') {
        window.onresize = function () {
          _this.resizeEchart();
        };
      }
    },
    methods: {
      getOption: function () {
        return {
          tooltip: {
            trigger: 'axis'
          },
          calculable: true,
          textStyle: {
            color: this.bfColor
          },
          title: {
            text: this.bfTitle,
            left: 'center',
            textStyle: {
              color: this.bfColor
            }
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: this.bfXdata
            }
          ],
          yAxis: {
            type: 'value',
            data: this.bfYdata,
            name: this.bfYname,
            nameTextStyle: {
              fontSize: 14
            }
          },
          series: [
            {
              name: this.bfLabelText,
              type: 'line',
              symbol: 'circle',
              symbolSize: 10,
              itemStyle: {
                normal: {
                  color: this.bfThemeColor
                }
              },
              lineStyle: {
                normal: {
                  color: this.bfThemeColor
                }
              },
              areaStyle: {
                normal: {
                  color: {
                    type: 'radial',
                    colorStops: [
                      {
                        offset: 1,
                        color: this.bfThemeColor
                      }
                    ],
                    globalCoord: false
                  }
                }
              },
              smooth: true,
              data: this.bfValue
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