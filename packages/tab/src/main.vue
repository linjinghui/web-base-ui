<!-- 
功能介绍：
1、
 -->

<template>
  <ul class="wrap-tab">
    <li>项目1</li>
    <li class="active">项目2</li>
    <li>项目3</li>
  </ul>
</template>

<script type="text/babel">
  export default {
    name: 'Tab',
    data: function () {
      return {
        id: 'tab_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {
      // 
    },
    watch: {
      // 
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
  .wrap-tab {
    position: relative;
    width: 100%;
    height: 100%;
    border-color: #dee2e6;
    border-style: solid;
    border-width: 0;
    border-bottom-width: 1px;
    background-color: #fff;

    >li {
      position: relative;
      float: left;
      padding-left: 14px;
      padding-right: 14px;
      height: 100%;
      // border: inherit;
      // border-width: 1px;
      // border-color: transparent;
      background-color: inherit;
    }
    >li.active {
      // border-color: inherit;
      // border-bottom-color: #fff;
      // z-index: 2;
      // margin-bottom: -11px;
      // border: inherit;
      // border-width: 1px;
      // border-bottom-width: 0;
    }
  }
  // .wrap-tab:after {
  //   content: '';
  //   position: absolute;
  //   bottom: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 1px;
  //   border: inherit;
  //   border-bottom-width: 1px;
  //   z-index: 1;
  // }
</style>