<!--
功能介绍：
1、
 -->

<template>
  <cmp-input type="text" maxlength="20"
    v-model="value"
    :class="id"
    :placeholder="placeholder"
    :disabled="(disabled+'')==='true'">
    <i class="cicon-calendar-cpt-chr center-v" slot="right" style="font-size: 26px;">
      <span></span>
    </i>
  </cmp-input>
</template>

<script type="text/babel">
  // import flatpickr from 'flatpickr';
  import flatpickr from '../flatpickr/flatpickr.min.js';
  import { Mandarin } from '../flatpickr/l10n/zh.js';
  import Input from '../../input/index.js';

  export default {
    name: 'FlatDatePicker',
    components: {
      'cmpInput': Input
    },
    data: function () {
      return {
        id: 'datepick_' + new Date().getTime() + parseInt(Math.random() * 100),
        fpicker: ''
      };
    },
    props: {
      value: '',
      placeholder: {
        default: '请选择日期'
      },
      disabled: {
        default: false
      }
    },
    watch: {
      value: function (val) {
        this.fpicker && this.fpicker.setDate(val, false);
      },
      disabled: function (val) {
        if (val + '' !== 'true') {
          this.initDatePicker();
        }
      }
    },
    computed: {
      //
    },
    beforeDestroy: function () {
      //
    },
    mounted: function () {
      if (this.disabled + '' !== 'true') {
        this.initDatePicker();
      }
    },
    methods: {
      emtIpt: function (val) {
        this.$emit('input', val);
      },
      callback: function (date, dateStr) {
        this.$emit('callback', {
          date: date,
          str: dateStr
        });
      },
      initDatePicker: function () {
        let _this = this;
        let myInput = document.querySelector('.' + this.id);

        this.fpicker = flatpickr(myInput, {
          locale: Mandarin,
          enableTime: true,
          dateFormat: 'Y-m-d H:i',
          onChange: function (selectedDates, dateStr, instance) {
            _this.emtIpt(dateStr);
            _this.callback(selectedDates, dateStr);
          }
        });
      }
    }
  };
</script>

<style lang="scss">
  // @import "../../../node_modules/flatpickr/dist/flatpickr.min.css";
  @import "../flatpickr/flatpickr.min.css";
</style>
<style scoped lang="scss">
  [class^=cicon-calendar] {
    color: #c0c4cc!important;
    background-color: transparent!important;
  }
</style>