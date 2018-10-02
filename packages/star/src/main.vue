<!-- 
功能介绍：
1、
 -->

<template>
  <div class="wrap-star">
    <small @mouseover="clk(-1)"></small>
    <small v-for="(i,index) in num" :key="'str_'+index" @mouseover="clk(index)">{{index>value-1?'☆':'★'}}</small>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'Star',
    data: function () {
      return {
        id: 'str_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {
      value: {
        default: 1
      },
      num: {
        default: 1
      }
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
      clk: function (index) {
        this.$emit('input', index + 1);
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-star {
    position: relative;
    font-size: 26px;
    user-select: none;
    >small {
      padding: 0 4px;
      cursor: pointer;
    }
  }
</style>