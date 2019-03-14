<template>
  <div>
    DEMO1:<br>
    <cmp-date-picker v-model="dateStr"></cmp-date-picker>
    <br>DEMO2:<br>
    <cmp-flat-date-picker v-model="dateStr2" @callback="callback"></cmp-flat-date-picker>
    <br>DEMO3:<br>
    <cmp-mobile-scroll-date-picker v-model="dateStr3"></cmp-mobile-scroll-date-picker>
    <br>DEMO4:<br>
    <cmp-laydate v-model="dateStr4" :option="option"></cmp-laydate>
  </div>
</template>

<script>
import {DatePicker, FlatDatePicker, MobileScrollDatePicker, Laydate} from '../packages/index.js';

export default {
  name: 'demoDatePicker',
  data: function () {
    return {
      dateStr: '',
      dateStr2: '',
      dateStr3: '',
      dateStr4: '123',
      // 参考API https://www.layui.com/laydate/
      option: {
        // year month time date datetime
        type: 'datetime',
        // 范围选择
        range: false,
        // 日期匹配
        format: 'yyyy-MM-dd HH:mm:ss',
        // 开启公历节日
        calendar: true,
        // 自定义主题色
        theme: '#ff9c23',
        // 自定义节日
        mark: {
          '0-10-14': '生日',
          // 每年的日期
          '0-12-31': '跨年',
          // 每月某天
          '0-0-10': '工资', 
          '0-0-15': '月中',
          // 如果为空字符，则默认显示数字+徽章
          '2017-8-15': '', 
          '2099-10-14': '呵呵'
        },
        min: -7,
        max: 7
      }
    };
  },
  components: {
    'cmpDatePicker': DatePicker,
    'cmpFlatDatePicker': FlatDatePicker,
    'cmpMobileScrollDatePicker': MobileScrollDatePicker,
    'cmpLaydate': Laydate
  },
  watch: {
    dateStr: function (val) {
      console.log('dateStr=' + val);
    },
    dateStr2: function (val) {
      console.log('dateStr2=' + val);
    },
    dateStr3: function (val) {
      console.log('dateStr3=' + val);
    },
    dateStr4: function (val) {
      console.log('dateStr4=' + val);
    }
  },
  mounted: function () {
    let _this = this;

    setTimeout(function () {
      _this.dateStr = '2018-04-30 11:12';
      _this.dateStr3 = '2018-04-10 21:12';
    }, 3000);
  },
  methods: {
    callback: function (data) {
      console.log(data);
    }
  }
};
</script>

<style scoped>

</style>