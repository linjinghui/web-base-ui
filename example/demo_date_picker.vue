<template>
  <div>
    DEMO1:<br>
    <cmp-date-picker v-model="dateStr"></cmp-date-picker>
    <br>DEMO2:<br>
    <cmp-flat-date-picker v-model="dateStr2" @callback="callback"></cmp-flat-date-picker>
    <br>DEMO3:<br>
    <cmp-mobile-scroll-date-picker v-model="dateStr3"></cmp-mobile-scroll-date-picker>
  </div>
</template>

<script>
import {DatePicker, FlatDatePicker, MobileScrollDatePicker} from '../packages/index.js';

export default {
  name: 'demoDatePicker',
  data: function () {
    return {
      dateStr: '',
      dateStr2: '',
      dateStr3: ''
    };
  },
  components: {
    'cmpDatePicker': DatePicker,
    'cmpFlatDatePicker': FlatDatePicker,
    'cmpMobileScrollDatePicker': MobileScrollDatePicker
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