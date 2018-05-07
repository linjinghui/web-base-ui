<template>
  <div>
    <button @click="option.show=!option.show">show sidebar</button>
    <cmp-sidebar v-model="option.show" @callback_sroll="callback_sroll">
      <p slot="title" class="title">{{title}}</p>
      <ul slot="content">
        <li v-for="i in list" style="height: 40px;border-bottom: solid 1px;">{{i}}</li>
      </ul>
      <template slot="footer">
        <cmp-button theme="primary">primary</cmp-button>
        <cmp-button theme="success">success</cmp-button>
        <cmp-button theme="info" @click="option.show=false">取消</cmp-button>
        <cmp-button theme="warning">warning</cmp-button>
        <cmp-button theme="danger">danger</cmp-button>
      </template>
    </cmp-sidebar>
  </div>
</template>

<script>
  import {Sidebar, Button} from '../packages/index.js';

  export default {
    name: 'DemoSidebar',
    components: {
      'cmpSidebar': Sidebar,
      'cmpButton': Button
    },
    data: function () {
      return {
        list: [],
        title: '标题',
        option: {
          show: ''
        }
      };
    },
    mounted: function () {
      let _this = this;

      setTimeout(function () {
        _this.list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20222];
        _this.title = '标题——修改';
      }, 2000);
    },
    methods: {
      callback_sroll: function (data) {
        console.log(data);
        if (data === 'top') {
          // 滚动条滚动到顶部
        } else if (data === 'end') {
          // 滚动条滚动到底部
        }
      }
    }
  };
</script>

<style scoped>
  .title {
    padding-left: 10px;
    padding-right: 10px;
  }

  .button {
    margin-right: 10px;
    padding: 0 10px!important;
    height: 34px;
    line-height: 34px;
  }
</style>