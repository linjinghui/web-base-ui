<template>
  <div>
    <cmp-video v-model="optVideo.show"></cmp-video>
    <button @click="toggle">显示、隐藏</button>
  </div>
</template>

<script>
import {Video} from '../packages/index.js';

export default {
  name: 'demoVideo',
  data: function () {
    return {
      optVideo: {
        show: ''
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
    }
  }
};
</script>

<style>
  /*  */
</style>