<template>
  <div>
    <cmp-dialog class="class-1" v-model="optionDialog.show" v-bind="optionDialog" @callback="callbackDialog">
      <span slot="title">自定义标题</span>
      <div slot="content">
        <p>dddddddddddddddd</p>
        <p>dddddddddddddddd</p>
        <p>dddddddddddddddd</p>
        <p>dddddddddddddddd</p>
        <p>dddddddddddddddd</p>
        <p>dddddddddddddddd</p>
        <p>dddddddddddddddd</p>
        <p>dddddddddddddddd</p>
        <p>dddddddddddddddd</p>
        v
        <p>dddddddddddddddd</p>
        v
        <p>dddddddddddddddd</p>

        <p>dddddddddddddddd</p>
      </div>
    </cmp-dialog>
    <button @click="showDialog">showDialog</button>
    <button @click="showConfirm">showConfirm</button>
    <button @click="showBigConfirm">showBigConfirm</button>
    <button @click="showPrompt">showPrompt</button>
  </div>
</template>

<script>
import {Dialog} from '../packages/index.js';

export default {
  name: 'demoDialog',
  data: function () {
    return {
      optionDialog: {
        show: false,
        modal: true,
        stl: {
          header: {
            // left|center
            'text-align': 'left'
          },
          footer: {
            // left|center|right
            'text-align': 'right'
          }
        },
        buttons2: [],
        buttons3: [{
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
    'cmpDialog': Dialog
  },
  watch: {
    //
  },
  methods: {
    callbackDialog: function (data) {
      this.optionDialog.show = false;
      console.log('=======callbackDialog========');
      console.log(data);
    },
    showDialog: function () {
      this.optionDialog.show = true;
    },
    showConfirm: function () {
      var _this = this;

      this.$confirm({
        show: true,
        modal: true,
        heading: '投票',
        content: '你今天还能为其他未投过票的参选者投<font style="color: red;">1</font>票',
        // error|success|warning
        type: 'success',
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
        }],
        callback: function (data) {
          _this.$confirm({ show: false });
          console.log('======confirm callback=====');
          console.log(data);
        }
      });
    },
    showBigConfirm: function () {
      var _this = this;

      this.$confirm({
        show: true,
        modal: true,
        heading: '投票',
        content: '你今天还能为其他未投过票的参选者投<font style="color: red;">1</font>票',
        // error|success|warning|bigsuccess|bigerror|bigwarning
        type: 'bigwarning',
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
        }],
        callback: function (data) {
          _this.$confirm({ show: false });
          console.log('======confirm callback=====');
          console.log(data);
        }
      });
    },
    showPrompt: function () {
      var _this = this;

      this.$prompt({
        show: true,
        modal: true,
        heading: '自定义标题123',
        initText: 'ddd',
        placeholder: 'lala',
        stl: {
          footer: {
            // left|center|right
            'text-align': 'right'
          }
        },
        maxlength: 10,
        buttons: [{
          text: '放弃修改1',
          // primary|success|info|warning|danger|#f56c6c
          theme: 'success'
        }, {
          text: '修改2',
          theme: 'danger'
        }],
        callback: function (data) {
          _this.$prompt({ show: false });
          console.log('======Prompt callback=====');
          console.log(data);
        }
      });
    }
  }
};
</script>

<style scoped>
  .class-1 {
    width: 620px!important;
    height: 450px!important;
  }
</style>