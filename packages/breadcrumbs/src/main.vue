<!-- 
面包屑
功能介绍：
1、
 -->

<template>
  <ul class="wrap-bread">
    <li v-for="(item,index) in list" :key="'_brd_'+index" :class="{'disabled':item.disabled}" @click="clkItem(index)">{{item.name}}</li>
  </ul>
</template>

<script type="text/babel">
  export default {
    name: 'Breadcrumbs',
    data: function () {
      return {
        id: 'btn_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {
      list: {
        default: function () {
          return [];
        }
      }
    },
    watch: {
      list: function (val) {
        this.$emit('callback');
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
        if (index !== (this.list.length - 1) && !this.list[index].disabled) {
          var data = this.list;

          data.splice(index + 1, this.list.length);
          this.$emit('input', data);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-bread {
    position: relative;
    width: 100%;
    height: 30px;
    overflow: hidden;
    user-select: none;

    > li {
      float: left;
      height: 100%;
      line-height: 30px;
      color: var(--theme);
      cursor: pointer;
    }

    > li.disabled {
      cursor: text;
    }

    > li:after {
      content: '>';
      margin-left: 4px;
      margin-right: 4px;
    }
    > li:last-of-type {
      color: inherit;
      cursor: text;
    }
    > li:last-of-type:after {
      content: '';
    }
  }
</style>