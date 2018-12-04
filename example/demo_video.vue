<template>
  <div>
    <cmp-video v-model="optVideo.show" v-bind="optVideo"></cmp-video>
    <button @click="toggle">显示、隐藏</button>
    <button @click="clkNew">设置新视频</button>
  </div>
</template>

<script>
import {Video} from '../packages/index.js';

export default {
  name: 'demoVideo',
  data: function () {
    return {
      optVideo: {
        show: '',
        model: false,
        title: '华为主题曲',
        opt: {
          // 封面图片地址
          poster: 'http://pic1.nipic.com/2009-01-07/20091713417344_2.jpg', 
          // 是否自动播放
          autoplay: false, 
          // 是否循环播放
          loop: false, 
          // 默认需要跳转的时间
          seek: 0,
          video: [
            ['http://img.ksbbs.com/asset/Mon_1703/d30e02a5626c066.mp4', 'video/mp4', '英文标清', 0]
          ]
        }
      }
    };
  },
  components: {
    'cmpVideo': Video
  },
  watch: {
    //
  },
  methods: {
    toggle: function () {
      this.optVideo.show = !this.optVideo.show;
    },
    clkNew: function () {
      this.optVideo.opt.video = [
        ['http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4', 'video/mp4', '中文标清', 0]
      ];
    }
  }
};
</script>

<style>
  /*  */
</style>