<template>
  <div style="height: 100%;">
    <button @click="setBar">setBar</button>,
    <button @click="setPie">setPie</button>,
    <button @click="setMap">setMap</button>
    
    <div style="width: 100%;height: 300px;border: solid 1px;">
      <cmp-echarts ref="bar" :option="optionBar"></cmp-echarts>
    </div>

    <div style="width: 100%;height: 300px;border: solid 1px;">
      <cmp-echarts ref="pie" :option="optionPie"></cmp-echarts>
    </div>

    <div style="width: 100%;height: 300px;border: solid 1px;">
      <cmp-echarts ref="map" :option="optionMap" :map="map"></cmp-echarts>
    </div>
    
  </div>
</template>

<script>
import {Echarts, EchartsPie} from '../packages/index.js';

export default {
  name: 'demoEcharts',
  data: function () {
    return {
      optionBar: {},
      optionPie: {},
      optionMap: {},
      map: {}
    };
  },
  components: {
    'cmpEcharts': Echarts,
    'cmpEchartsPie': EchartsPie
  },
  mounted: function () {

  },
  methods: {
    setBarOption: function () {
      this.optionBar = {
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
    },
    setPieOption: function () {
      this.optionPie = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        title: {
          text: '产业类型占比',
          left: 'left',
          textStyle: {
            color: '#000000'
          }
        },
        legend: {
          orient: 'horizontal',
          width: 380,
          itemGap: 20,
          x: 'center',
          y: 40,
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
    setMapOption: function () {
      var map = require('../packages/echarts/map/fujian.js').default;

      this.optionMap = {
        title: {
          text: '区域销售'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (p / km2)'
        },
        visualMap: {
          min: 800,
          max: 50000,
          text: ['高', '低'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['#03f', '#00ffff', '#00ff00']
          }
        },
        series: [
          {
            name: '',
            type: 'map',
            // 自定义扩展图表类型
            map: 'FJ',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  color: '#333'
                }
              }
            },
            data: [
              {name: '福州市', value: 20057.34},
              {name: '厦门市', value: 15477.48},
              {name: '漳州市', value: 31686.1},
              {name: '泉州市', value: 6992.6},
              {name: '莆田市', value: 44045.49},
              {name: '宁德市', value: 40689.64},
              {name: '南平市', value: 37659.78},
              {name: '三明市', value: 45180.97},
              {name: '龙岩市', value: 55204.26},
              {name: '平潭', value: 323.26}
            ]
          }
        ]
      };
      this.map = map;
    },
    setBar: function () {
      this.setBarOption();
    },
    setPie: function () {
      this.setPieOption();
    },
    setMap: function () {
      this.setMapOption();
    }
  }
};
</script>

<style scoped>

</style>