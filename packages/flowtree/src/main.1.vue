<!-- 
功能介绍：
1、
 -->

<template>
  <div class="wrap-flowtree">
    <cmp-flowtreeitem></cmp-flowtreeitem>
  </div>
</template>

<script type="text/babel">
  import FlowtreeItem from './child.vue';

  export default {
    name: 'Flowtree',
    components: {
      'cmpFlowtreeitem': FlowtreeItem
    },
    data: function () {
      return {
        id: 'flowtree_' + new Date().getTime() + parseInt(Math.random() * 100),
        sdata: [
          {
            title: '发起人',
            content: '所有人',
            children: [
              {
                title: '审批人',
                content: '请选择',
                children: [
                  {
                    title: '抄送人',
                    content: '请选择',
                    children: []
                  }
                ]
              },
              {
                title: '审批人2',
                content: '请选择',
                children: [
                  {
                    title: '抄送人2',
                    content: '请选择',
                    children: []
                  }
                ]
              }
            ]
          }
        ]
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
  .wrap-flowtree {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: red;
  }
</style>