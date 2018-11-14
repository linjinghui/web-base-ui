<template>
  <div>
    <cmp-image-viewer :opt="imgOption">
      <!-- <ul>
        <li><img src="http://www.w3school.com.cn/ui2017/compatible_firefox.png" alt=""></li>
        <li><img src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2192674209,2157056795&fm=202&mola=new&crop=v1" alt=""></li>
      </ul> -->
      <img src="http://www.w3school.com.cn/ui2017/compatible_firefox.png" alt="">
    </cmp-image-viewer>
  </div>
</template>

<script>
import {ImageViewer} from '../packages/index.js';

export default {
  name: 'demoImageViewer',
  data: function () {
    return {
      imgOption: {
        button: false,
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
  methods: {
    //
  }
};
</script>

<style scoped>

</style>