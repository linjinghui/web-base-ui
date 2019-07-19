<template>
  <div>
    <cmp-game-pt ref="gpt" :h="h" :v="v" :imgUrl="imgs[index]" @callback="callback"></cmp-game-pt>
    <button @click="clkNd(1)">难度一</button>|<button @click="clkNd(2)">难度二</button>|<button @click="clkNd(3)">难度三</button>
    <hr>
    <button @click="clkNext" v-if="result">下一关</button>
  </div>
</template>

<script>
import {GamePt} from '../packages/index.js';

export default {
  name: 'demoGamePt',
  data: function () {
    return {
      index: 0,
      imgs: [
        'https://up.enterdesk.com/edpic_source/ce/2e/81/ce2e811fa84d37c64e30777e70f6f614.jpg',
        'http://www.gjlysy.com/upload/image/20180713/15314762498593031.jpg',
        'https://img2.3lian.com/2014/f2/152/d/45.jpg',
        'http://a3.att.hudong.com/46/71/01300543947353147692713190613.jpg',
        'http://y1.ifengimg.com/dbcc8e45854c158f/2014/0929/rdn_54292115c4785.jpg',
        'http://wow.tgbus.com/UploadFiles_2396/201101/2011011814272296.jpg',
        'http://wow.tgbus.com/UploadFiles_2396/201202/20120220221648339.jpg',
        'http://newsimg.5054399.com/uploads/userup/1308/161456101350.jpg'
      ],
      h: 3,
      v: 3,
      result: false
    };
  },
  components: {
    'cmpGamePt': GamePt
  },
  watch: {
    //
  },
  methods: {
    callback (data) {
      this.result = data;
    },
    clkNd (type) {
      let _this = this;

      this.h = 3 * type;
      this.v = 3 * type; 
      setTimeout(function () {
        _this.$refs.gpt.randomSort();
      }, 100);
    },
    clkNext () {
      let _this = this;
      
      this.index += 1;
      setTimeout(function () {
        _this.$refs.gpt.randomSort();
      }, 100);
    }
  }
};
</script>

<style scoped>

</style>