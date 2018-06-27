<template>
  <div>
    <cmp-date-picker v-model="dateStr"></cmp-date-picker>
    <cmp-flat-date-picker v-model="dateStr2" @callback="callback"></cmp-flat-date-picker>
    <cmp-mobile-scroll-date-picker></cmp-mobile-scroll-date-picker>
  </div>
</template>

<script>
import {DatePicker, FlatDatePicker, MobileScrollDatePicker} from '../packages/index.js';

export default {
  name: 'demoDatePicker',
  data: function () {
    return {
      dateStr: '',
      dateStr2: ''
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
    }
  },
  mounted: function () {
    let _this = this;

    setTimeout(function () {
      _this.dateStr = '2018-04-30 11:12';
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