<template>
  <div>
    <button @click.stop="display=!display">show sidebar</button>
    <cmp-sidebar :display="display" :blurHide="true" :buttons="buttons" @callback="callback">
      <ul class="content" slot="content">
        <li v-for="i in list" style="height: 40px;border-bottom: solid 1px;">{{i}}</li>
      </ul>
    </cmp-sidebar>
  </div>
</template>

<script>
import {Sidebar} from '../packages/index.js';

export default {
  name: 'DemoSidebar',
  data: function () {
    return {
      display: '',
      list: [],
      // 'line', 'cancel', 'del', 'del2', 'success', 'warn', 'fresh'
      buttons: [
        {
          'theme': 'cancel',
          'text': '取消'
        },
        {
          'theme': 'def',
          'text': '保存'
        },
        {
          'theme': 'def',
          'text': '保存并继续'
        },
        {
          'theme': 'del',
          'text': '离职'
        },
        {
          'theme': 'del2',
          'text': '删除'
        }
      ]
    };
  },
  components: {
    'cmpSidebar': Sidebar
  },
  mounted: function () {
    this.list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20222];
  },
  methods: {
    callback: function (val) {
      console.log(JSON.stringify(val));
      if (val === 'empty') {
        alert('点击空白处');
      } else {
        this.display = false;
      }
    },
    getList: function () {
      let list = [];

      for (let i = 0;i < 100;i++) {
        list.push('abcd' + i);
      }
      this.list = list;
      alert(this.list);
    }
  }
};
</script>

<style scoped>

</style>