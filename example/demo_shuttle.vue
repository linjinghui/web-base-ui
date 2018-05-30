<template>
  <div style="width: 100%;height:500px;border: soild 1px;">
    <cmp-shuttle v-model="option.selected" v-bind="option" @callback="callback"></cmp-shuttle>
  </div>
</template>

<script>
import {Shuttle} from '../packages/index.js';

export default {
  name: 'demoShuttle',
  data: function () {
    return {
      option: {
        // 完整数据
        data: [],
        // 两侧标题
        titles: ['title1', 'title2'],
        // 已选中数据下标，不允许重复
        selected: [4, 3, 2]
      },
    };
  },
  components: {
    'cmpShuttle': Shuttle
  },
  watch: {
    'option.selected': function (val) {
      console.log('=======watch option.selected========');
      console.log(val);
    }
  },
  mounted: function () {
    this.setData();
  },
  methods: {
    setData: function () {
      let _this = this;

      this.option.data = [];
      setTimeout(function () {
        for (var i = 0; i < 110; i++) {
          _this.option.data.push({
            'id': i,
            'name': 'namenamenamenamenamenamenamenamename' + i,
            'disabled': false
          });
        }
        _this.option.data[4].disabled = true;
        _this.option.data[24].disabled = true;
      }, 1000);
    },
    callback: function (data) {
      console.log('=======callback========');
      console.log(data);
    }
  }
};
</script>

<style scoped>

</style>