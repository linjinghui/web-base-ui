<template>
  <vperfect-scrollbar id="rangeMenu" :settings="settings">
    <template v-for="(info, index) in fbData">
      <a v-if="typeof info==='string'">
        <label>{{info}}</label>
        <i class="icon cmpIconfont icon-delete" @click="del(index)"></i>
      </a>
      <a v-else>
        <label>{{info[fbKeyWord]}}</label>
        <i class="icon cmpIconfont icon-delete" @click="del(index)"></i>
      </a>
    </template>
    <a class="add" @click="clk">添加</a>
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
        fbData: this.data,
        fbKeyWord: this.keyword,
        scroll: '',
        settings: {
          // 滚动速度，默认1
          wheelSpeed: 0.5
        }
      };
    },
    props: {
      data: {
        type: Array,
        default: []
      },
      keyword: ''
    },
    watch: {
      data: function (val) {
        this.fbData = val;
      }
    },
    mounted: function () {
      //
    },
    methods: {
      clk: function () {
        this.$emit('click');
      },
      del: function (index) {
        this.fbData.splice(index, 1);
        this.$emit('callback', this.fbData);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../src/style/global';
  $padding: 5px;

  #rangeMenu {
    max-height: 210px;
    padding-top: $padding;
    padding-left: $padding;
    border: solid 1px #ddd;
    border-radius: 4px;
    color: #333;
    background-color: #fff;
    overflow: auto;
    font-size: 12px;
    user-select: none;

    a {
      float: left;
      margin-right: $padding;
      margin-bottom: $padding;
      height: 24px;
      line-height: 24px;
      padding-left: 5px;
      padding-right: 5px;
      border-radius: 4px;
      background-color: #ddd;
      cursor: default;

      label {
        display: inline-block;
        max-width: 84px;
        height: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .cmpIconfont {
        display: inline-block;
        margin-left: $padding;
        height: 20px;
        color: inherit;
        font-size: 14px;
        vertical-align: top;
        cursor: pointer;
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
      background-color: #aaa;
    }

    a:not(.add):active {
      background-color: #bbb;
    }
  }
</style>