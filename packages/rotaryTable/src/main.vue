<!-- 
功能介绍：
1、
 -->

<template>
  <div class="wrap-rotaryTable" v-if="value!==''" v-show="value" :style="'background-image:url('+bgdimg+')'">
    <div class="wrap-rotary" :style="{'transform':'rotate('+rotate+'deg)','background-image':'url('+rbgdimg+')'}"></div>
    <div class="wrap-button" :style="'background-image:url('+bbgdimg+')'" @click="clkBtn"></div>
  </div>
</template>

<script type="text/babel">
  import {debounce} from 'web-js-tool';

  export default {
    name: 'RotaryTable',
    data: function () {
      return {
        id: 'rotaryTable_' + new Date().getTime() + parseInt(Math.random() * 100),
        rotate: 0,
        disabled: false
      };
    },
    props: {
      value: {
        default: ''
      },
      // 最底下背景
      bgdimg: {
        default: require('./image/zp-1.jpg')
      },
      // 中间转盘
      rbgdimg: {
        default: require('./image/zp-2.png')
      },
      // 按钮
      bbgdimg: {
        default: require('./image/zp-3.png')
      },
      // 奖品
      prizes: {
        default: function () {
          return [];
        }
      }
    },
    watch: {
      value: function (val, val2) {
        if (val && val2 === '') {
          // 第一次加载
        }
      }
    },
    computed: {
      // 
    },
    beforeDestroy: function () {
      // 
    },
    mounted: function () {
      // 
    },
    methods: {
      // 获取随机数
      getRandom: function (num) {
        return Math.floor(Math.random() * num);
      },
      // 获取转盘角度随机数
      setRotateRandom: function (deg, result) {
        let _this = this;
        // 转10圈加随机角度
        let lastDeg = this.rotate % 360;

        this.rotate += 360 - lastDeg + deg + 360 * 10;
        // 动画停止后返回结果
        setTimeout(function () {
          _this.disabled = false;
          _this.$emit('callback', result);
        }, 3000);
      },
      clkBtn: function () {
        if (this.disabled) {
          this.$emit('callback', {'error': '正在抽奖！'});
        } else {
          this.countDeg();
        }
      },
      countDeg: debounce(function () {
        this.disabled = true;
        let num = 0;
        let total = 0;
        let arr = JSON.parse(JSON.stringify(this.prizes));
        let tag = '';
        let min = 0;
        let max = 0;
        let index = '';
        // 每个模块的角度
        let deg = 360 / this.prizes.length;

        // 按 chances 降序排序
        arr.sort(function (a, b) {
          return a.chances < b.chances;
        });
        // 统计总概率
        for (let i = 0;i < arr.length;i++) {
          total += arr[i].chances;
        }
        // 获取随机数
        num = this.getRandom(total);

        for (let j = 0;j < arr.length;j++) {
          max += arr[j].chances;
          if (min <= num && num < max) {
            tag = arr[j];
            break;
          } else {
            min += arr[j].chances;
          }
        }

        for (let z = 0;z < this.prizes.length;z++) {
          if (JSON.stringify(tag) === JSON.stringify(this.prizes[z])) {
            index = z;
            break;
          }
        }

        this.setRotateRandom(360 - index * deg - deg / 2, tag);
      }, 1000, true)
    }
  };
</script>

<style scoped lang="scss">
  .wrap-rotaryTable,
  .wrap-rotaryTable > .wrap-rotary,
  .wrap-rotaryTable > .wrap-button {
    position: relative;
    width: 100%;
    height: 100%;
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .wrap-rotaryTable > .wrap-rotary {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 2;
    transition: transform 3s;
  }
  .wrap-rotaryTable > .wrap-button {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 3;
    cursor: pointer;
  }
</style>