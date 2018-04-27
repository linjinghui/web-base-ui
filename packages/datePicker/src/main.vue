<!--
功能介绍：
1、
 -->

<template>
  <cmp-input type="text" maxlength="20"
    v-model="value"
    :class="id"
    :placeholder="placeholder">
    <i class="cicon-calendar-cpt-chr center-v" slot="right" style="font-size: 26px;">
      <span></span>
    </i>
  </cmp-input>
</template>

<script type="text/babel">
  import flatpickr from 'flatpickr';
  import { Mandarin } from 'flatpickr/dist/l10n/zh.js';
  import Input from '../../input/index.js';

  export default {
    name: 'DatePicker',
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
      }
    },
    watch: {
      value: function (val) {
        this.fpicker.setDate(val, false);
      }
    },
    computed: {
      //
    },
    beforeDestroy: function () {
      //
    },
    mounted: function () {
      let myInput = document.querySelector('.' + this.id);
      let _this = this;

      this.fpicker = flatpickr(myInput, {
        locale: Mandarin,
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        onChange: function (selectedDates, dateStr, instance) {
          _this.emtIpt(dateStr);
          _this.callback(selectedDates, dateStr);
        }
      });
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
      }
    }
  };
</script>

<style lang="scss">
  @import "../../../node_modules/flatpickr/dist/flatpickr.min.css";
</style>
<style scoped lang="scss">
  [class^=cicon-calendar] {
    color: #c0c4cc!important;
    background-color: transparent!important;
  }
</style>