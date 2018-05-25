<!--
功能介绍：
1、
 -->

<template>
  <div class="wrap-cascade">
    <cmp-menu type="cascade" ref="casMenu" :data="data" v-model="show">
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
      parse_data: function (data, parseObj) {
        return this.$refs.casMenu.parse_data(data, parseObj);
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-cascade {}
</style>