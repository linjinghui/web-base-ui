<!--
功能介绍：
1、
 -->

<template>
  <date-picker class="wrap-datePicker" :date="startTime" :option="option" :limit="limit"></date-picker>
</template>

<script type="text/babel">
  import datepicker from 'vue-datepicker';

  export default {
    name: 'DatePicker',
    components: {
      'date-picker': datepicker
    },
    data: function () {
      return {
        startTime: {
          time: this.value
        },
        endtime: {
          time: ''
        },
        option: {
          // 'day', 'min', 'multi-day'
          type: this.type,
          week: ['一', '二', '三', '四', '五', '六', '日'],
          month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          format: this.format,
          placeholder: this.placeholder,
          color: {
            checkedDay: this.theme,
            header: this.theme,
            headerText: '#fff'
          },
          buttons: {
            ok: '确认',
            cancel: '取消'
          },
          overlayOpacity: 0.3,
          dismissible: true
        },
        limit: this.lmt
      };
    },
    props: {
      value: '',
      type: {
        // 'day', 'min', 'multi-day'
        default: 'min'
      },
      theme: {
        default: 'var(--theme)'
      },
      placeholder: {
        default: '请选择日期'
      },
      format: {
        default: 'YYYY-MM-DD HH:mm'
      },
      lmt: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    watch: {
      value: function (val) {
        this.startTime.time = val;
      },
      'startTime.time': function (val) {
        this.$emit('input', val);
      }
    },
    computed: {
      //
    },
    beforeDestroy: function () {
      //
    },
    mounted: function () {
      //
    },
    methods: {
      //
    }
  };
</script>

<style>
  .wrap-datePicker {
    width: 100%;
    color: inherit!important;
  }
  .wrap-datePicker input {
    width: 100%;
    height: 34px;
    border-style: solid;
    border-width: 1px;
    border-color: #ddd;
    color: inherit;
    font: inherit;
    outline: medium;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .wrap-datePicker .active {
    background-color: #d3d3d3!important;
  }
</style>