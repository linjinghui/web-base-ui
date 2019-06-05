<!-- 
功能介绍：
1、
 -->

<template>
  <!-- <cmp-confirm v-bind="option" v-model="option.show"> -->
  <cmp-confirm v-model="show" :modal="modal" :stl="stl" :buttons="buttons" :callback="cbkClk">
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <span slot="content">
      <cmp-input v-model="text" type="text" :maxlength="maxlength" :placeholder="placeholder" autofocus="true" @enter="cbk_enter"></cmp-input>
    </span>
  </cmp-confirm>
</template>

<script type="text/babel">
  import Confirm from '../../confirm/src/confirm.vue';
  import Input from '../../input/index.js';

  export default {
    name: 'Prompt',
    components: {
      'cmpConfirm': Confirm,
      'cmpInput': Input
    },
    data: function () {
      return {
        id: 'pmp_' + new Date().getTime() + parseInt(Math.random() * 100),
        text: this.initText,
        show: this.value
      };
    },
    props: {
      value: '',
      // 是否模态，即是否产生遮罩效果
      modal: {
        default: true
      },
      // 初始文本
      initText: {
        default: ''
      },
      placeholder: '',
      maxlength: '',
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
        this.show = val;
      },
      show: function (val) {
        this.$emit('input', val);
        if (val) {
          this.text = this.initText;
        }
      }
      // initText: function (val) {
      //   this.text = val;
      // }
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
        // this.text = '';
      },
      cbkClk: function (data) {
        data.value = this.text;
        this.callback(data);
        // this.text = '';
      }
    }
  };
</script>

<style scoped lang="scss">
  // 
</style>