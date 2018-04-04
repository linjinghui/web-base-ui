<template>
  <div style="margin-left: 100px;margin-top: 300px;width: 500px;background-color: red;">
    <cmp-multiselect :keyword="keyword" :selectedData="selectedData" :listData="listData" :showList="showList" @callback="callback"></cmp-multiselect>
  </div>
</template>

<script>
import {Multiselect} from '../packages/index.js';

export default {
  name: 'DemoMultiselect',
  data: function () {
    return {
      // 显示字段，keyword贯穿整个逻辑，应确保唯一
      keyword: 'name',
      // 已选中内容
      selectedData: [],
      // 下拉列表数据
      listData: [],
      // 显示、隐藏下拉框
      showList: ''
    };
  },
  components: {
    'cmpMultiselect': Multiselect
  },
  mounted: function () {
    let _this = this;

    setTimeout(function () {
      _this.selectedData = [
        {
          'id': 1,
          'name': '大王叫我来巡山'
        },
        {
          'id': 2,
          'name': '妖怪师傅八戒悟空大王叫我来巡山'
        }
      ];
      _this.listData = [
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
        {
          'id': 7,
          'name': 'menu7'
        },
        {
          'id': 8,
          'name': 'menu8'
        }
      ];
    }, 3000);
  },
  methods: {
    callback: function (val) {
      console.log('=====multiselect callback=====');
      console.log(JSON.stringify(val));
    }
  }
};
</script>

<style scoped>

</style>