<template>
  <div>
    <cmp-map ref="vmap" v-model="optMap.show" @click="clkMap"></cmp-map>
    <button @click="toggle">显示、隐藏</button>
    <button @click="addMark">添加标记</button>
  </div>
</template>

<script>
import {Map} from '../packages/index.js';

export default {
  name: 'demoMap',
  data: function () {
    return {
      optMap: {
        show: ''
      }
    };
  },
  components: {
    'cmpMap': Map
  },
  watch: {
    //
  },
  methods: {
    // 点击地图回调
    clkMap: function (data) {
      // 触发事件的对象 data.target;
      // 触发事件的地理坐标 data.lnglat;
      // 触发事件的像素坐标 data.pixel;
      // 触发事件类型 data.type;
      console.log('======click======');
      console.log(data);
    },
    toggle: function () {
      this.optMap.show = !this.optMap.show;
    },
    addMark: function () {
      this.$refs.vmap.addMark(119.302355, 26.110384, {
        // 自定义窗体
        isCustom: false,
        content: '<div>lalalala</div>'
      });
    }
  }
};
</script>

<style>
  .wrap-gd-map {
    width: 80%!important;
    height: 80%!important;
  }
</style>