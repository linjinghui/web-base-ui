<template>
  <div style="padding: 100px;">
    <cmp-rangemenu :data="menu" :keyword="'name'" @click="addClick" @callback="callback"></cmp-rangemenu>
  </div>
</template>

<script>
import {RangeMenu} from '../packages/index.js';

export default {
  name: 'demoRangeMenu',
  data: function () {
    return {
      menu: [
        {
          'id': 1,
          'name': '大王叫我来巡山'
        },
        {
          'id': 2,
          'name': '妖怪师傅八戒悟空大王叫我来巡山'
        },
        {
          'id': 3,
          'name': 'menu3'
        },
        {
          'id': 4,
          'name': 'menu4'
        },
        {
          'id': 5,
          'name': 'menu5'
        },
        {
          'id': 6,
          'name': 'menu6'
        },
        '字符串',
        {
          'id': 7,
          'name': 'menu7'
        },
        {
          'id': 8,
          'name': 'menu8'
        }
      ]
    };
  },
  components: {
    'cmpRangemenu': RangeMenu
  },
  methods: {
    addClick: function () {
      let id = this.menu.length + 1;

      this.menu.push({
        'id': id + '',
        'name': 'menu' + id
      });
    },
    callback: function (val) {
      console.log(JSON.stringify(val));
    }
  }
};
</script>

<style scoped>

</style>