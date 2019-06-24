<!-- 
功能介绍：
1、
 -->

<template>
  <div class="wrap-list" :id="id">listn</div>
</template>

<script type="text/babel">
  export default {
    name: 'List',
    data: function () {
      return {
        id: 'list_' + new Date().getTime() + parseInt(Math.random() * 100)
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
  .wrap-list {
    
  }
</style>