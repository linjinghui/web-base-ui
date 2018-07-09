<!-- 
功能介绍：
1、
 -->

<template>
  <cmp-confirm v-bind="option" v-model="option.show" @cbkClk="cbkClk">
    <span slot="title">投票成功</span>
    <span slot="content">
      <cmp-input v-model="text" type="text" maxlength="1111" placeholder="请输入名称" autofocus="true" 
        @enter="cbk_enter"></cmp-input>
    </span>
  </cmp-confirm>
</template>

<script type="text/babel">
  import Dialog from './main.vue';
  import Input from '../../input/index.js';

  export default {
    name: 'Prompt',
    components: {
      'cmpConfirm': Dialog,
      'cmpInput': Input
    },
    data: function () {
      return {
        id: 'dlg_' + new Date().getTime() + parseInt(Math.random() * 100),
        text: '',
        option: {
          show: this.value,
          modal: this.modal,
          stl: this.stl,
          buttons: this.buttons
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
      buttons: ''
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
        this.$emit('cbkClk', {
          'type': 'enter',
          'value': this.text
        });
      },
      cbkClk: function (data) {
        this.$emit('cbkClk', data);
      }
    }
  };
</script>

<style scoped lang="scss">
  // 
</style>