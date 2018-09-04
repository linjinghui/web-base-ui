<!-- 
功能介绍：
1、
 -->

<template>
  <ul class="wrap-tab clearfix" style="background-color:#fff;">
    <li :class="{'active': pacitve===index}" v-for="(item,index) in plist" :key="'tab_'+index" @click="clkItem(index)">
      {{item.name}}
      <i class="cicon-cross-chr" v-if="close" @click.stop="clkDel(index)"></i>
    </li>
  </ul>
</template>

<script type="text/babel">
  export default {
    name: 'Tab',
    data: function () {
      return {
        plist: this.list,
        pacitve: this.acitve
      };
    },
    props: {
      // 当前激活项
      acitve: {
        default: 0
      },
      // 菜单数据
      list: {
        type: Array,
        default: function () {
          return [];
        }
      },
      // 是否需要关闭按钮
      close: {
        default: false
      }
    },
    watch: {
      list: function (val) {
        this.plist = val;
      },
      acitve: function (val) {
        this.pacitve = val;
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
      clkItem: function (index) {
        if (index < 0) {
          index = 0;
        }
        this.pacitve = index;
        this.$emit('cbk', this.plist[index]);
      },
      clkDel: function (index) {
        this.plist.splice(index, 1);
        this.clkItem(index - 1);
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-tab {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    border-color: #dee2e6;
    border-style: solid;
    border-width: 0px;
    border-bottom-width: 1px;  
    color: #212529;

    >li {
      position: relative;
      box-sizing: border-box;
      margin-bottom: -1px;
      padding: 8px 20px;
      cursor: pointer;

      .cicon-cross-chr {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        width: 18px;
        height: 18px;
        font-size: 14px;
        color: #999;
      }
    }
    >li.active {
      border: inherit;
      border-width: 1px;
      border-bottom-width: 0px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      background-color: #fff;

      .cicon-cross-chr {
        display: unset; 
      }
    }
  }
</style>