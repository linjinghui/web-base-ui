<!-- 
功能介绍：
1、
 -->

<template>
  <div class="wrap-swiper-nav swiper-container">
    <p class="list-head" v-if="head">
      <span class="theme-b"></span>
      <label>{{head}}</label>
    </p>
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item) in data" :key="item" @click="clkItem(item)">
        <img width="45px" height="45px" :src="item.img" />
        <p class="text">{{item.text}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import Swiper from 'swiper';

  export default {
    name: 'SwiperNav',
    data: function () {
      return {
        id: 'swiperNav_ new Date().getTime() + parseInt(Math.random() * 100)',
        swiper: ''
      };
    },
    props: {
      data: {
        default: function () {
          return [];
        }
      },
      // 显示个数
      size: {
        default: 5
      },
      // 间隔
      between: {
        default: 0
      },
      head: {
        default: ''
      }
    },
    watch: {
      data: function () {
        this.init();
      }
    },
    mounted: function () {
      this.init();
    },
    methods: {
      init: function (data) {
        this.swiper && this.swiper.destroy(false);
        this.$nextTick(function () {
          this.swiper = new Swiper('.wrap-swiper-nav', {
            direction: 'horizontal',
            grabCursor: true,
            resistanceRatio: 0,
            slidesPerView: this.size,
            spaceBetween: this.between
          });
        });
      },
      clkItem: function (data) {
        this.$emit('click', data);
      }
    }
  };
</script>

<style lang="scss">
  .wrap-swiper-nav {}
</style>

<style scoped lang="scss">
  @import url('swiper/dist/css/swiper.min.css');

  .wrap-swiper-nav {

    .list-head {
      margin: 5px 0;
      padding: 0 10px;
      height: 18px;
      line-height: 18px;
      font-size: 14px;
      font-weight: bold;
    }
    .list-head > span {
      float: left;
      margin-right: 5px;
      width: 4px;
      height: 100%;
    }

    .swiper-slide {
      padding: 10px 0;
      text-align: center;
      font-size: 12px;
    }
    .swiper-slide:active {
      background-color: #f4f4f4;
    }
  }
</style>