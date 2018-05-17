<!-- 
功能介绍：
1、
 -->

<template>
  <div>
    <cmp-input
    
    type="text"
    maxlength="1111"
    placeholder="请输入名称"
    nopaste="false"
    autofocus="true"
    disabled="false"
    clear="false"
    rule="chinese"
    readonly="false">
      <i class="cicon-arrow-bottom center-v" slot="right"></i>
    </cmp-input>
  </div>
</template>

<script type="text/babel">
  import Input from '../../input/index.js';

  export default {
    name: 'Select',
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