<!-- 
功能介绍：
1、
 -->

<template>
  <div class="wrap-game-pt">game-pt</div>
</template>

<script type="text/babel">
  export default {
    name: 'GamePt',
    data: function () {
      return {
        id: 'gamePt_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {},
    watch: {},
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
  .wrap-game-pt {
    
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