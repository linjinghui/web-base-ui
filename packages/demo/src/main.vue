<!-- 
功能介绍：
1、
 -->

<template>
  <transition name="slide-fade">
    <div class="wrap-demo" :id="id" v-if="value!==''" v-show="value">VIDEO</div>
  </transition>
</template>

<script type="text/babel">
  export default {
    name: 'Demo',
    data: function () {
      return {
        id: 'demo_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {
      value: {
        default: ''
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
      // 
    }
  };
</script>

<style scoped lang="scss">
  .wrap-demo {
    position: fixed;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 800px;
    height: 600px;
    background-color: #fff;
    z-index: 3;
  }

  @keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}
  @keyframes zoomOut{0%{opacity:1}50%{opacity:0;transform:scale3d(.3,.3,.3)}to{opacity:0}}
  
  .slide-fade-enter-active {
    animation: zoomIn .5s;
  }

  .slide-fade-leave-active {
    animation: zoomOut .5s;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    // right: -410px;
  }
</style>