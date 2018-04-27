<!--
功能介绍：
1、
 -->

<template>
  <cmp-input v-model="name" type="text" maxlength="20" placeholder="请输入名称">
    <i class="cicon-search-cpt-chr center-v" slot="right" style="background-color: blue;"></i>
  </cmp-input>
</template>

<script type="text/babel">
  import Input from '../../input/index.js';

  export default {
    name: 'DatePicker',
    components: {
      'cmpInput': Input
    },
    data: function () {
      return {
        id: 'btn_' + new Date().getTime() + parseInt(Math.random() * 100)
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
  //
</style>