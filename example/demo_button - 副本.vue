<template>
  <div>
    <cmp-button :eventName="eventName" :theme="btnTheme" :text="'取消'" :disabled="false" @click="clk"></cmp-button><br><br>
    <cmp-button :text="'获取验证码'" :afterText="'后重新获取'" :interval="intval" :freshDeep="true" @click="clkYzm" @callback="endTime"></cmp-button>
    <button @click="clearTimer">clear timer</button><br><br>
    <cmp-button :text="'选择文件1'" :selectFile="true" :accept="fAccept" :multiple="fMultiple" @callback="callbackSelectFile"></cmp-button><br><br>
    <cmp-button :theme="btnTheme" :text="'复制到剪贴板'" :copyData="'你好世界123ddd'" :disabled="false
    " @callbackCopy="callbackCopy"></cmp-button>
  </div>
</template>

<script>
import {Button} from '../packages/index.js';

export default {
  name: 'demoButton',
  data: function () {
    return {
      eventName: 'eventName1',
      btnTheme: 'success',
      likes: [
        {
          'checked': false,
          'value': 1,
          'label': '唱歌'
        },
        {
          'checked': true,
          'value': '2',
          'label': '旅游'
        },
        {
          'checked': true,
          'value': '3',
          'label': '看书'
        }
      ],
      intval: 0,
      fAccept: 'image/*',
      fMultiple: true
    };
  },
  components: {
    'cmpButton': Button
  },
  methods: {
    'clk': function () {
      var params = {};
      var arr = ['line', 'cancel', 'del', 'del2', 'success', 'warn', 'fresh'];
      var num = Math.ceil(Math.random() * arr.length);

      params.theme = arr[num];
      this.btnTheme = arr[num];

      arr = ['确认', '取消', '删除', '再见'];
      num = Math.ceil(Math.random() * arr.length);
      params.text = arr[num];
      // window.EVENTBUS.$emit(this.eventName, params);

    },
    clearTimer: function () {
      this.intval = 0;
      this.$nextTick(function () {
        this.intval = 20;
      });
    },
    callbackSelectFile: function (data) {
      console.log('callbackSelectFile:');
      console.log(data);

      // event.preventDefault();
      // let formData = new FormData();

      // formData.append('name', this.name);
      // formData.append('age', this.age);
      // formData.append('file', this.file);

      // let config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }

      // this.$http.post('/upload', formData, config).then(function (res) {
      //   if (res.status === 2000) {
      //     /*这里做处理*/
      //   }
      // })
    },
    callbackCopy: function (data) {
      console.log('复制结果：' + data);
    },
    clkYzm: function (data) {
      this.$nextTick(function () {
        this.intval = 10;
      });
    },
    endTime: function () {
      this.intval = 0;
    }
  }
};
</script>

<style scoped>

</style>