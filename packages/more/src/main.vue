<!-- 
功能介绍：
1、
 -->

<template>
  <div class="wrap-more" :id="id">moren</div>
</template>

<script type="text/babel">
  export default {
    name: 'More',
    data: function () {
      return {
        id: 'more_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {
      value: {
        default: ''
      }
    },
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
  .wrap-more {
    
  }
</style>