<template>
  <div>
    <button @click="showHide">show\hide</button>|<button @click="optionPrompt.show=!optionPrompt.show">showPrompt\hidePrompt</button>
    <!-- confirm -->
    <cmp-confirm v-bind="option" v-model="option.show" @cbkClk="cbkClk">
      <span slot="title">投票成功</span>
      <span slot="content">你今天还能为其他未投过票的参选者投<font style="color: red;">1</font>票</span>
    </cmp-confirm>
    <!-- prompt -->
    <cmp-prompt v-bind="optionPrompt" v-model="optionPrompt.show" @cbkClk="cbkClkPrompt">
      <span slot="title">投票成功</span>
    </cmp-prompt>
  </div>
</template>

<script>
import {Dialog, Prompt} from '../packages/index.js';

export default {
  name: 'demoDialog',
  data: function () {
    return {
      option: {
        show: false,
        modal: false,
        stl: {
          header: {
            // left|center
            'text-align': 'center'
          },
          section: {
            // left|center|right
            'text-align': 'center'
          },
          footer: {
            // left|center|right
            'text-align': 'center'
          }
        },
        buttons1: [],
        buttons: [{
          text: '放弃修改',
          // primary|success|info|warning|danger|#f56c6c
          theme: 'line'
        }, {
          text: '修改',
          theme: 'warning'
        }]
      },
      optionPrompt: {
        show: false,
        modal: true,
        stl: {
          footer: {
            // left|center|right
            'text-align': 'right'
          }
        },
        buttons2: [],
        buttons: [{
          text: '放弃修改',
          // primary|success|info|warning|danger|#f56c6c
          theme: 'line'
        }, {
          text: '修改',
          theme: 'warning'
        }]
      }
    };
  },
  components: {
    'cmpConfirm': Dialog,
    'cmpPrompt': Prompt
  },
  watch: {
    //
  },
  methods: {
    showHide: function () {
      this.option.show = !this.option.show;
    },
    cbkClk: function (data) {
      this.option.show = false;
      console.log('======cbkClk=====');
      console.log(data);
    },
    cbkClkPrompt: function (data) {
      this.optionPrompt.show = false;
      console.log('======cbkClkPrompt=====');
      console.log(data);
    }
  }
};
</script>

<style scoped>

</style>