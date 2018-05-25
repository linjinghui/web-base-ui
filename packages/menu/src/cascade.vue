<!--
功能介绍：
1、
 -->

<template>
  <div class="wrap-cascade" @click.stop>
    cascade123
    <cmp-menu :data="data" v-model="show">
      <span slot="line" slot-scope="props">{{props.item.name}}</span>
    </cmp-menu>
  </div>
</template>

<script type="text/babel">
  import Menu from './main.vue';

  export default {
    name: 'Cascade',
    components: {
      'cmpMenu': Menu
    },
    data: function () {
      return {
        show: true
      };
    },
    props: {
      data: {
        default: function () {
          return [];
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
      // clk_arrow: function () {
      //   //
      // }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-cascade {}
</style>