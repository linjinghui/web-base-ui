<!-- 
功能介绍：
1、
 -->

<template>
  <cmp-confirm v-bind="option" v-model="option.show">
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <span slot="content">
      <cmp-input v-model="text" type="text" maxlength="1111" placeholder="请输入名称" autofocus="true" 
        @enter="cbk_enter"></cmp-input>
    </span>
  </cmp-confirm>
</template>

<script type="text/babel">
  import Confirm from './main.vue';
  import Input from '../../input/index.js';

  export default {
    name: 'Prompt',
    components: {
      'cmpConfirm': Confirm,
      'cmpInput': Input
    },
    data: function () {
      var _this = this;

      return {
        id: 'pmp_' + new Date().getTime() + parseInt(Math.random() * 100),
        text: '',
        option: {
          show: this.value,
          modal: this.modal,
          stl: this.stl,
          buttons: this.buttons,
          callback: function (data) {
            _this.cbkClk(data);
          }
        }
      };
    },
    props: {
      value: '',
      // 是否模态，即是否产生遮罩效果
      modal: {
        default: true
      },
      // error|success|warning
      type: '',
      stl: '',
      buttons: '',
      callback: {
        type: Function,
        default: function (data) {
          return function () {
            // 
          };
        }
      }
    },
    watch: {
      value: function (val) {
        this.option.show = val;
      },
      'option.show': function (val) {
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
      cbk_enter: function () {
        this.callback({
          'type': 'enter',
          'value': this.text
        });
        this.text = '';
      },
      cbkClk: function (data) {
        data.value = this.text;
        this.callback(data);
        this.text = '';
      }
    }
  };
</script>

<style scoped lang="scss">
  // 
</style>