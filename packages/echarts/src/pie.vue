<template>
  <div id="echartsPie" style="width: 100%;height: 100%;">
    ssss
  </div>
</template>

<script type="text/babel">
  import Echarts from 'echarts';

  export default {
    name: 'EchartsPie',
    data: function () {
      return {
        myChart: ''
      };
    },
    props: {
      
    },
    watch: {
      //
    },
    mounted: function () {
      this.myChart = Echarts.init(document.getElementById('echartsPie'));
      this.myChart.setOption(this.getOption());
    },
    methods: {
      getPieOption: function () {
        return {
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'horizontal',
            width: 380,
            itemGap: 20,
            x: 'center',
            data: [ '水果', '蔬菜', '茶叶', '食用菌', '中草药', '牲畜', '家禽', '屠宰及肉类加工' ]
          },
          color: [ '#00c1ed', '#80c26b', '#ffd503', '#d1d5de', '#3c9bed', '#df4c3a', '#02a75b', '#f39c10' ],
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['30%', '60%'],
              center: ['50%', '65%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                { value: 335, name: '水果' },
                { value: 310, name: '蔬菜' },
                { value: 234, name: '茶叶' },
                { value: 135, name: '食用菌' },
                { value: 1548, name: '中草药' },
                { value: 234, name: '牲畜' },
                { value: 135, name: '家禽' },
                { value: 1548, name: '屠宰及肉类加工' }
              ]
            }
          ]
        };
      },
      getOption: function () {
        return {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            // 坐标轴指示器，坐标轴触发有效
            axisPointer: {
              // 默认为直线，可选为：'line' | 'shadow'
              type: 'shadow'
            }
          },
          title: {
            text: '赋码数量统计',
            left: 'left',
            textStyle: {
              color: '#000000'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['水果', '蔬菜', '茶叶', '食用菌', '中草药', '牲畜', '家禽', '屠宰及肉类加工'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              data: [20, 40, 60, 80, 100, 120, 140],
              name: '',
              nameTextStyle: {
                fontSize: 14
              }
            }
          ],
          series: [
            {
              name: '',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220, 119]
            }
          ],
          toolbox: {
            right: '3.5%',
            feature: {
              magicType: {
                show: true,
                type: ['line', 'bar']
              }
            }
          }
        };
      }
    }
  };
</script>

<style scoped lang="scss"></style>