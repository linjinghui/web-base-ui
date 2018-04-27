<template>
  <div>
    <cmp-date-picker v-model="dateStr" @callback="callback"></cmp-date-picker>
  </div>
</template>

<script>
import {DatePicker} from '../packages/index.js';

export default {
  name: 'demoDatePicker',
  data: function () {
    return {
      dateStr: ''
    };
  },
  components: {
    'cmpDatePicker': DatePicker
  },
  watch: {
    dateStr: function (val) {
      console.log('val=' + val);
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