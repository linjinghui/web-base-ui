<!--
功能介绍：
1、可通过模版自定义显示内容
例如 <template slot-scope="props">{{ props.item.name +  props.item.age}}</template>
 -->

<template>
  <vperfect-scrollbar class="rangeMenu" :settings="settings" :disabled="disabled+''==='true'">
    <a v-for="(item, index) in value" :key="item.id">
      <label>
        <slot :item="item">{{item}}</slot>
      </label>
      <i class="cicon-cross-cpt-crle-chr cross" @click="clk_del(index)"></i>
    </a>
    <a class="add" @click="clk_add">添加</a>
  </vperfect-scrollbar>
</template>

<script type="text/babel">
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';

  export default {
    name: 'RangeMenu',
    components: {
      'vperfect-scrollbar': VuePerfectScrollbar
    },
    data: function () {
      return {
        id: 'btn_' + new Date().getTime() + parseInt(Math.random() * 100),
        // 滚动速度，默认1
        settings: {
          wheelSpeed: 0.5
        }
      };
    },
    props: {
      value: {
        default: function () {
          return [];
        }
      },
      disabled: {
        default: false
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
      emtVal: function (val) {
        this.$emit('input', val);
      },
      clk_add: function () {
        if (this.disabled + '' !== 'true') {
          this.$emit('add');
        }
      },
      clk_del: function (index) {
        if (this.disabled + '' !== 'true') {
          let data = '';

          try {
            data = JSON.parse(JSON.stringify(this.value));
            data.splice(index, 1);
            this.emtVal(data);
          } catch (e) {
            //
          }
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  $padding: 5px;

  .rangeMenu {
    max-height: 210px;
    padding-top: $padding;
    padding-left: $padding;
    border: solid 1px #ddd;
    border-radius: 4px;
    color: #333;
    overflow: auto;
    font-size: 14px;
    user-select: none;

    a {
      float: left;
      margin-right: $padding;
      margin-bottom: $padding;
      height: 24px;
      line-height: 24px;
      padding-left: $padding;
      padding-right: $padding;
      border-radius: 4px;
      color: #909399;
      background-color: #f0f2f5;
      cursor: default;

      label {
        display: inline-block;
        max-width: 84px;
        height: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .cross {
        color: inheirt;
        font-size: 14px;
        vertical-align: 4px;
      }

      .cross:hover {
        color: #fff;
        background-color: #c0c4cc;
      }
    }

    a.add {
      color: #0079ff;
      background-color: transparent;
      cursor: pointer;
    }

    a.add:hover {
      color: #45abff;
    }

    a.add:active {
      color: #1072ba;
    }

    a:not(.add):hover {
      background-color: #e6e6e6;
    }
  }
</style>