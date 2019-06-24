<!-- 
功能介绍：
1、
 -->

<template>
  <p class="wrap-more" @click="clk" v-html="status==='more'?'加载更多':status==='loading'?'加载中...':'没有更多数据'"></p>
</template>

<script type="text/babel">
  export default {
    name: 'More',
    data: function () {
      return {
        id: 'more_' + new Date().getTime() + parseInt(Math.random() * 100),
        timer: ''
      };
    },
    props: {
      status: {
        // more | loading | nomore
        default: 'more'
      }
    },
    watch: {
      status: function (val) {
        if (val === 'more') {
          this.clearListen();
          this.addListen();
        } else if (val === 'nomore') {
          this.clearListen();
        }
      }
    },
    beforeDestroy: function () {
      this.clearListen();
    },
    mounted: function () {
      this.addListen();
    },
    methods: {
      // 监听wrap-more是否显示在屏幕中
      addListen: function () {
        var _this = this;

        if (this.status === 'more') {
          this.timer = setInterval(function () {
            var dom = document.querySelector('.wrap-more');
            // 元素顶端到可见区域顶端的距离
            var top = dom.getBoundingClientRect().top;
            // 浏览器可见区域高度。
            var se = document.documentElement.clientHeight;

            if (top <= se) {
              _this.clearListen();
              _this.$emit('callback');
            }
          }, 1000);
        }
      },
      clearListen: function () {
        this.timer && clearInterval(this.timer);
      },
      clk: function () {
        if (this.status !== 'nomore') {
          this.$emit('click');
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-more {
    padding: 10px;
    text-align: center;
  }
</style>