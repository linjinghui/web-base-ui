<template>
  <div>
    <h1>banner</h1>
    <div style="position:relative;width:800px;height:600px;border:solid 1px;">
      <cmp-swiper-banner :data="arr" :prevNext="false" :pagination="false" @click="clk"></cmp-swiper-banner>
    </div>
    <hr>
    <h1>nav</h1>
    <div style="position:relative;width:300px;height:140px;border:solid 1px;">
      <cmp-swiper-nav size="4" :between="10" head="推荐" :data="arr2" @click="clk2"></cmp-swiper-nav>
    </div>
  </div>
</template>

<script>
import {SwiperBanner, SwiperNav} from '../packages/index.js';

export default {
  name: 'demoSwiper',
  data: function () {
    return {
      arr: []
    };
  },
  components: {
    'cmpSwiperBanner': SwiperBanner,
    'cmpSwiperNav': SwiperNav
  },
  watch: {
    //
  },
  mounted () {
    var _this = this;

    setTimeout(function () {
      _this.arr = [
        {img: 'http://cmstop.ndsww.com/a/thumb/10001/201905/b757777df9d2229c177b51e368752a7e.jpg@w635_h357.jpg', text: '的打算多1'},
        {img: 'http://cmstop.ndsww.com/a/thumb/10001/201905/bebbfc58700c4fe0f45c6140d368e48c.jpg@w579_h326.jpg', text: ''},
        {img: 'http://cmstop.ndsww.com/a/thumb/10001/201905/b757777df9d2229c177b51e368752a7e.jpg@w635_h357.jpg', text: '的打算多3'}
      ];
      _this.arr2 = [
        {img: 'http://cmstop.ndsww.com/a/thumb/10001/201905/b757777df9d2229c177b51e368752a7e.jpg@w635_h357.jpg', text: '的打算多1'},
        {img: 'http://cmstop.ndsww.com/a/thumb/10001/201905/bebbfc58700c4fe0f45c6140d368e48c.jpg@w579_h326.jpg', text: '的打算多2'},
        {img: 'http://cmstop.ndsww.com/a/thumb/10001/201905/b757777df9d2229c177b51e368752a7e.jpg@w635_h357.jpg', text: '的打算多3'},
        {img: 'http://cmstop.ndsww.com/a/thumb/10001/201905/b757777df9d2229c177b51e368752a7e.jpg@w635_h357.jpg', text: '的打算多4'},
        {img: 'http://cmstop.ndsww.com/a/thumb/10001/201905/bebbfc58700c4fe0f45c6140d368e48c.jpg@w579_h326.jpg', text: '的打算多5'},
        {img: 'http://cmstop.ndsww.com/a/thumb/10001/201905/b757777df9d2229c177b51e368752a7e.jpg@w635_h357.jpg', text: '的打算多6'},
        {img: 'http://cmstop.ndsww.com/a/thumb/10001/201905/b757777df9d2229c177b51e368752a7e.jpg@w635_h357.jpg', text: '的打算多7'},
        {img: 'http://cmstop.ndsww.com/a/thumb/10001/201905/bebbfc58700c4fe0f45c6140d368e48c.jpg@w579_h326.jpg', text: '的打算多8'},
        {img: 'http://cmstop.ndsww.com/a/thumb/10001/201905/b757777df9d2229c177b51e368752a7e.jpg@w635_h357.jpg', text: '的打算多9'},
      ]
    }, 1000);
  },
  methods: {
    clk: function (data) {
      console.log('====', data);
    },
    clk2: function (data) {
      console.log('2====', data);
    }
  }
};
</script>

<style scoped>

</style>