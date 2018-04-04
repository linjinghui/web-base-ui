<template>
  <div style="width: 100%;height:100%;">
    <p>右击弹出窗口</p>
    <cmp-contextmenu :ptop="topContextmenu" :pleft="leftContextmenu" :pshow="showContextmenu" :pmenu="menuContextmenu" @callback="callbackContextmenu"></cmp-contextmenu>
  </div>
</template>

<script>
import {Contextmenu} from '../packages/index.js';

export default {
  name: 'DemoContextmenu',
  data: function () {
    return {
      topContextmenu: '',
      leftContextmenu: '',
      showContextmenu: '',
      menuContextmenu: [
      {
        text: '移除(ctrl + m)',
        cls: 'red del'
      },
      {
        text: '编辑(ctrl + e)',
        cls: 'edit'
      }]
    };
  },
  components: {
    'cmpContextmenu': Contextmenu
  },
  beforeDestroy: function () {
    window.removeEventListener('mousedown', this.msdwn);
  },
  mounted: function () {
    window.addEventListener('mousedown', this.msdwn);
  },
  methods: {
    msdwn: function (event) {
      if (event.button === 2) {
        let mouseX = 0;
        let mouseY = 0;

        mouseX = event.clientX;
        mouseY = event.clientY;
        if (this.showContextmenu) {
          this.showContextmenu = '';
        }
        this.$nextTick(function () {
          this.topContextmenu = mouseY + 'px';
          this.leftContextmenu = mouseX + 'px';
          this.showContextmenu = true;
        });
      }
    },
    callbackContextmenu: function (data) {
      console.log('====callbackContextmenu=====');
      if (data === '') {
        console.log('点击空白隐藏弹窗');
      } else {
        console.log('点击弹窗内容');
        console.log(data);
      }
      this.showContextmenu = false;
    }
  }
};
</script>

<style scoped>

</style>