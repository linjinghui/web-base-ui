<template>
  <div class="wrap-scroll-full-page" ref="wrapScrollFullPage" :class="pageInfo.status">
    <header style="position:fixed;top:0;left:0;width:100%;height:50px;line-height:50px;text-align:center;color:#fff;background-color:rgba(0,0,0,0.2);z-index:2;">头部</header>
    <nav>
      <a v-for="(item,index) in pageInfo.subPages" :key="'nav_a_'+index" :class="{'active':index===pageInfo.index}" :data-text="item.title" @click="turnPage(index)"></a>
    </nav>
    <div class="wrap-main" :style="{'transform':'translateY('+pageInfo.index*-100+'%)'}">
      <div class="page" style="line-height:500px;text-align:center;background:lightblue;">page 1</div>
      <div class="page" style="line-height:500px;text-align:center;background:#ade6c8;">page 2</div>
      <div class="page" style="line-height:500px;text-align:center;background:#94be76;">page 3</div>
      <div class="page" style="line-height:500px;text-align:center;background:#9d76be;">page 4</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'demoScrollFullPage',
  data: function () {
    return {
      pageInfo: {
        index: 0,
        // 状态 scrolling|end
        status: 'end',
        subPages: [
          {title: '首页'},
          {title: '企业概况'},
          {title: '平台能力'},
          {title: '关于我们'}
        ]
      }
    };
  },
  components: {
    // 
  },
  watch: {
    //
  },
  mounted: function () {
    let _this = this;

    this.$refs.wrapScrollFullPage.addEventListener('wheel', function (e) {
      _this.turnPage(e.deltaY > 0 ? 'next' : 'prev');
    }, false);
  },
  methods: {
    // 页面切换
    turnPage: function (index) {
      let _this = this;

      if (index === 'prev') {
        index = this.pageInfo.index - 1;
      } else if (index === 'next') {
        index = this.pageInfo.index + 1;
      } 
      if (index < 0) {
        index = 0;
      } else if (index >= this.pageInfo.subPages.length) {
        index = this.pageInfo.subPages.length - 1;
      }
      this.$set(this.pageInfo, 'status', 'scrolling');
      this.$set(this.pageInfo, 'index', index);
      setTimeout(function () {
        _this.$set(_this.pageInfo, 'status', 'end');
      }, 800);
    }
  }
};
</script>

<style>
  #app {
    height: 100%;
  }
  /* 最外层 */
  .wrap-scroll-full-page {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: red;
  }

  /* 导航样式 */
  .wrap-scroll-full-page > nav {
    position: fixed;
    top: 0;
    right: 70px;
    bottom: 0;
    margin: auto;
    width: 22px;
    height: calc(20px * 4 + 16px * 3);
    color: #fff;
    font-size: 18px;
    z-index: 2;
  }
  .wrap-scroll-full-page > nav > a {
    position: relative;
    display: block;
    margin-bottom: 16px;
    width: 18px;
    height: 18px;
    line-height: 18px;
    border: solid 2px inherit;
    border-radius: 50%;
    white-space: nowrap;
    cursor: pointer;
  }
  .wrap-scroll-full-page > nav > a:hover,
  .wrap-scroll-full-page > nav > a.active {
    background-color: #fff;
  }
  .wrap-scroll-full-page > nav > a:after {
    content: '';
    position: absolute;
    top: -3px;
    right: calc(100% + 10px);
    transform: translate(10px, 0);
    transition: transform .3s;
  }
  .wrap-scroll-full-page > nav > a:hover:after,
  .wrap-scroll-full-page > nav > a.active:after {
    content: attr(data-text);
    transform: translate(0, 0);
  }

  /* 主体样式 */
  .wrap-scroll-full-page > .wrap-main {
    position: relative;
    width: 100%;
    height: 100%;
    transform: translateY(-0%);
    transition-property: transform;
    transition-duration: 0.8s;
    transition-timing-function: cubic-bezier(.175,.885,.32,1);
    z-index: 1;
  }
  .wrap-scroll-full-page > .wrap-main > .page {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>