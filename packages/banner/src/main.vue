<!-- 
功能介绍：
1、
 -->

<template>
  <div class="wrap-banner" ref="wrapScrollFullPage" :class="direction+' '+status">
    <nav><a v-for="(item,index) in nav" :key="'nav_a_'+index" :class="{'active':index===active,'point':navType==='point'}" :data-text="item.title" @click="turnPage(index)"></a></nav>
    <div class="wrap-main" :style="{'transform':'translate'+(direction==='hor'?'X':'Y')+'('+active*-100+'%)'}">
      <slot name="page"></slot>
    </div>
  </div>
</template>

<script type="text/babel">
  import {debounce} from 'web-js-tool';

  export default {
    name: 'Banner',
    data: function () {
      return {
        id: 'banner_' + new Date().getTime() + parseInt(Math.random() * 100),
        active: -1,
        // 状态 scrolling|end
        status: 'end'
        // nav: this.nav
      };
    },
    props: {
      nav: {
        type: Array,
        default: function () {
          return [];
        }
      },
      // 导航类型 circle: 圆圈-默认， point：点
      navType: {
        default: ''
      },
      // hor: 横向， 默认纵向
      direction: {
        default: ''
      }
    },
    watch: {},
    computed: {},
    beforeDestroy: function () {
      // 
    },
    mounted: function () {
      let _this = this;

      this.turnPage('next');
      this.$refs.wrapScrollFullPage.addEventListener('wheel', function (e) {
        (e || window.event).stopPropagation();
        _this.turnPage(e.deltaY > 0 ? 'next' : 'prev');
      }, false);
    },
    methods: {
      // 页面切换
      turnPage: debounce(function (index) {
        let _this = this;

        if (index === 'prev') {
          index = this.active - 1;
        } else if (index === 'next') {
          index = this.active + 1;
        } 
        if (index < 0) {
          index = 0;
        } else if (index >= this.nav.length) {
          index = this.nav.length - 1;
        }
        this.status = 'scrolling';
        this.active = index;
        setTimeout(function () {
          _this.status = 'end';
          _this.$emit('callback', index);
        }, 800);
      }, 100, true)
    }
  };
</script>

<style scoped lang="scss">
  .wrap-banner {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    /* 导航样式 */
    > nav {
      position: absolute;
      top: 0;
      right: 2%;
      bottom: 0;
      margin: auto;
      width: 22px;
      height: 100%;
      color: #fff;
      font-size: 18px;
      z-index: 2;
      text-align: center;
      writing-mode: tb-rl;
    }
    > nav > a {
      position: relative;
      display: inline-block;
      margin-bottom: 16px;
      width: 18px;
      height: 18px;
      line-height: 18px;
      border: solid 1px inherit;
      border-radius: 50%;
      white-space: nowrap;
      cursor: pointer;
    }

    > nav > a:hover,
    > nav > a.active {
      background-color: #fff;
    }
    > nav > a:after {
      content: '';
      position: absolute;
      top: -3px;
      right: calc(100% + 10px);
      transform: translate(10px, 0);
      transition: transform .3s;
    }
    > nav > a:hover:after,
    > nav > a.active:after {
      content: attr(data-text);
      transform: translate(0, 0);
      writing-mode: lr-tb;
    }

    /* 主体样式 */
    > .wrap-main {
      position: relative;
      width: 100%;
      height: 100%;
      transform: translateY(-0%);
      transition-property: transform;
      transition-duration: 0.8s;
      transition-timing-function: cubic-bezier(.175,.885,.32,1);
      z-index: 1;
    }
    > .wrap-main > .page {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
    }

    /* 实心点 */
    > nav > a.point {
      width: 8px;
      height: 8px;
      transition-property: all;
      transition-duration: 0.3s;
      transition-timing-function: cubic-bezier(.175,.885,.32,1);
      border-radius: 10px;
      background-color: #fff;
    }
    > nav > .point.active {
      height: 22px;
    }
  }

  /* 水平方向 */
  .wrap-banner.hor {

    > .wrap-main {
      font-size: 0;
      transform: translateX(-0%);
      white-space: nowrap;
      word-wrap: break-word; 
      word-break: normal;

      > .page {
        display: inline-block;
        font-size: 14px;
      }
    }

    > nav {
      top: unset;
      right: 0;
      bottom: 2%;
      width: 100%;
      height: 22px;
      writing-mode: unset;

      > a {
        margin-left: 16px;
        margin-bottom: 0;
      }
      > .point.active {
        width: 22px;
        height: 8px;
      }
      > a:hover:after,
      > a.active:after {
        content: '';
      }
    }
  }
</style>