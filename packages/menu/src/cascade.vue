<template>
  <div class="wrap-cascade">
    <cmp-menu v-for="(menu, index) in menuArr" :key="index" :show="menu.show" :data="menu.data" v-model="menu.result" @cbkClkItem="cbkClkItem($event, index)">
      <span slot="line" slot-scope="props">{{props.item.text}}</span>
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
        menuArr: [],
        result: []
      };
    },
    props: {
      // 树结构数据
      data: {
        type: Array,
        default: function () {
          return [];
        }
      },
      show: {
        default: false
      }
    },
    watch: {
      data: function (val) {
        this.setMenuItemData(val);
      }
    },
    mounted: function () {
      // setTimeout(function () {}, 3000);
      this.setMenuItemData(this.data);
    },
    methods: {
      setMenuItemData: function (data, index) {
        var obj = {
          data: data,
          show: true,
          result: ''
        };

        if (typeof index === 'undefined') {
          index = 0;
        }
        this.menuArr.splice(index, this.menuArr.length, obj);
        console.log(this.menuArr);
      },
      cbkClkItem: function (data, index) {
        var _data = data[0].child || [];

        if (_data.length > 0) {
          this.setMenuItemData(_data, index + 1);
        }
      }
    }
  };
</script>

<style lang="scss">
  .wrap-cascade {

    >.wrap-menu {
      display: inline-block;
      width: 240px;
      vertical-align: top;

      .ps__scrollbar-x-rail,
      .ps__scrollbar-y-rail {
        z-index: 3;
      }
    }

  }
</style>