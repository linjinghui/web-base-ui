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
        menuArr: []
      };
    },
    props: {
      value: {
        type: Array,
        default: function () {
          return [];
        }
      },
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
      },
      value: function (val) {
        if (this.menuArr.length <= 1) {
          this.setMenuArrByValue();
        }
      }
    },
    mounted: function () {
      this.setMenuItemData(this.data);
      this.setMenuArrByValue();
    },
    methods: {
      getMenuArrInfo: function (data, result) {
        return {
          data: data,
          show: true,
          result: (typeof result === 'undefined') ? [] : [result]
        };
      },
      setMenuItemData: function (data, index) {
        var obj = this.getMenuArrInfo(data);

        if (typeof index === 'undefined') {
          index = 0;
        }
        this.menuArr.splice(index, this.menuArr.length, obj);
      },
      setMenuArrByValue: function () {
        var data = this.data;
        var result = [];

        for (let i = 0;this.value && i < this.value.length;i++) {
          console.log(this.value[i] + ':' + typeof this.value[i] + ':' + data[this.value[i]]);
          result.push(this.getMenuArrInfo(data, this.value[i]));
          data = data[this.value[i]] && data[this.value[i]].child;
        }
        this.menuArr = result;
      },
      cbkClkItem: function (data, index) {
        var _data = data[0].child || [];
        var _indexArr = [];
        var _resultArr = [];

        if (_data.length > 0) {
          this.setMenuItemData(_data, index + 1);
        }
        for (let i = 0;i < this.menuArr.length;i++) {
          let result = this.menuArr[i].result;

          if (result !== '') {
            _resultArr[_resultArr.length] = this.menuArr[i].data[this.menuArr[i].result[0]];
            _indexArr[_indexArr.length] = result;
          }
        }
        this.$emit('cbkClkItem', _resultArr);
        this.$emit('input', _indexArr);
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