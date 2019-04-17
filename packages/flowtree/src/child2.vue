<!-- 
功能介绍：
1、
 -->

<template>
  <div class="wrap-node">
    <div class="node" v-for="(item,index) in itemData" :key="'idx'+index">{{item.title}}</div>
  </div>
  <flowtreeItem v-if="item&&item.children&&item.children.length>0"></flowtreeItem>
</template>

<script type="text/babel">
  export default {
    name: 'FlowtreeItem',
    data: function () {
      return {
        id: 'flowtreeitem_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {
      itemData: {
        default: function () {
          return [{
            title: '审批人',
            content: '请选择',
            children: [
              {
                title: '抄送人',
                content: '请选择',
                children: []
              }
            ]
          }];
        }
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
      // 
    }
  };
</script>

<style scoped lang="scss">
  .wrap-node {
    position: relative;
    display: inline-flex;
    display: flex;
    align-items:center;
    justify-content:center;

    .node {
      position: relative;
      // width: 100px;
      // height: 60px;
      padding: 10px;
      border: solid 1px;
    }
  }
</style>