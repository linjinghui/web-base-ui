<!-- 
功能介绍：
1、
 -->

<template>
  <div class="wrap-swiper-banner swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in data" :key="item" @click="clkItem(item)">
        <img width="100%" height="100%" :src="item.img" />
        <p class="text" v-if="!pagination">{{item.text}}</p>
        <p class="num" v-if="!pagination"><span class="theme-c">{{index+1}}</span> /{{data.length}}</p>
      </div>
    </div>   
    <div class="swiper-pagination theme-c" v-if="pagination"></div> 
    <div class="swiper-button-prev theme-c" v-if="prevNext"><i class="cicon-arrow-left"></i></div>
    <div class="swiper-button-next theme-c" v-if="prevNext"><i class="cicon-arrow-right"></i></div>
  </div>
</template>

<script type="text/babel">
  import Swiper from 'swiper';

  export default {
    name: 'SwiperBanner',
    data: function () {
      return {
        id: 'swiperBanner_' + new Date().getTime() + parseInt(Math.random() * 100),
        swiper: ''
      };
    },
    props: {
      data: {
        default: function () {
          return [];
        }
      },
      prevNext: {
        default: false
      },
      pagination: {
        default: false
      }
    },
    watch: {
      data: function () {
        this.init();
      }
    },
    computed: {
      // 
    },
    beforeDestroy: function () {
      // 
    },
    mounted: function () {
      this.init();
    },
    methods: {
      init: function (data) {
        this.swiper && this.swiper.destroy(false);
        this.$nextTick(function () {
          this.swiper = new Swiper('.wrap-swiper-banner', {
            direction: 'horizontal',
            grabCursor: true,
            autoplay: true,
            loop: true,
            resistanceRatio: 0,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            pagination: {
              el: '.swiper-pagination'
            }
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
  .wrap-swiper-banner {
    .swiper-pagination {
      > .swiper-pagination-bullet {
        display: inline-block;
        margin: 0 4px;
        width: 0;
        border: solid 4px;
        border-radius: 4px;
        color: #000;
        opacity: .2;
        transition-property: width;
        transition-duration: 0.3s;
        transition-timing-function: cubic-bezier(.175,.885,.32,1);
      }
      > .swiper-pagination-bullet.swiper-pagination-bullet-active {
        width: 20px;
        opacity: 1;
        color: inherit;
      }
    }
  }
</style>

<style scoped lang="scss">
  @import url('swiper/dist/css/swiper.min.css');

  .wrap-swiper-banner {
    position: relative;
    width: 100%;
    height: 100%;

    .swiper-slide p {
      position: absolute;
      bottom: 0;
      margin: auto;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.4);
    }

    .swiper-slide p.text {
      left: 0;
      width: calc(100% - 50px);
    }
    .swiper-slide p.num {
      right: 0;
      width: 50px;
      text-align: center;
    }

    .swiper-button-prev,
    .swiper-button-next {
      width: 50px;
      background-image: unset;
    }
  }
</style>