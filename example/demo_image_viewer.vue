<template>
  <div>
    <cmp-image-viewer :opt="imgOption" v-if="imgs&&imgs.length>0">
      <ul>
        <li v-for="info in imgs"><img :src="info" alt=""></li>
      </ul>
      <!-- <img src="http://www.w3school.com.cn/ui2017/compatible_firefox.png" alt=""> -->
    </cmp-image-viewer>
  </div>
</template>

<script>
import {ImageViewer} from '../packages/index.js';

export default {
  name: 'demoImageViewer',
  data: function () {
    return {
      imgs: [],
      imgOption: {
        button: true,
        show: function () {
          alert('show'); 
        }
      }
    };
  },
  components: {
    'cmpImageViewer': ImageViewer
  },
  watch: {
    //
  },
  mounted: function () {
    var _this = this;

    setTimeout(function () {
      _this.imgs = ['http://www.w3school.com.cn/ui2017/compatible_firefox.png', 'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2192674209,2157056795&fm=202&mola=new&crop=v1'];
    }, 3000);
    // this.$nextTick(function () {
    //   this.imgs = ['http://www.w3school.com.cn/ui2017/compatible_firefox.png', 'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2192674209,2157056795&fm=202&mola=new&crop=v1'];
    // });
  },
  methods: {
    //
  }
};
</script>

<style scoped>

</style>