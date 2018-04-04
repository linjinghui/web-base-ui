<template>
  <div class="wrap-multiselect" @click.stop>
    <cmp-rangemenu :data="selectedData_" :keyword="keyword" @click="addClick" @callback="callback"></cmp-rangemenu>
    <vperfect-scrollbar class="wrap-list" ref="ps" v-if="showList_!==''" v-show="showList_" :settings="settings">
      <ul>
        <li class="cmpIconfont" v-for="(info, index) in listData_" :key="info[keyword]" :class="{'active': info.m_select}" @click="info.m_select=!info.m_select, clkListItem(info, index)">{{info[keyword]}}</li>
      </ul>
    </vperfect-scrollbar>
  </div>
</template>

<script type="text/babel">
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import RangeMenu from '../../rangeMenu/src/main.vue';

  export default {
    name: 'Multiselect',
    components: {
      'vperfect-scrollbar': VuePerfectScrollbar,
      'cmpRangemenu': RangeMenu
    },
    props: {
      keyword: '',
      selectedData: {
        default: function () {
          return [];
        }
      },
      listData: {
        default: function () {
          return [];
        }
      },
      showList: {
        default: function () {
          return '';
        }
      }
    },
    data: function () {
      return {
        // 滚动速度，默认1
        'settings': {
          wheelSpeed: 0.5
        },
        'showList_': this.showList,
        'selectedData_': this.selectedData,
        'listData_': this.funParseListData()
      };
    },
    watch: {
      selectedData: function (val) {
        this.selectedData_ = val;
      },
      listData: function (val) {
        this.listData_ = this.funParseListData();
      },
      showList: function (val) {
        this.showList_ = val;
      }
    },
    beforeDestroy: function () {
      window.removeEventListener('click', this.funHideList);
    },
    mounted: function () {
      window.addEventListener('click', this.funHideList);
    },
    methods: {
      addClick: function () {
        this.showList_ = !this.showList_;
      },
      callback: function (val) {
        let _this = this;
        let resultData = JSON.stringify(val);

        this.listData_.forEach(function (info, index) {
          if (info['m_select'] && resultData.indexOf('"' + info[_this.keyword] + '"') < 0) {
            _this.$set(info, 'm_select', false);
          }
        });
        this.funEmit(val);
      },
      clkListItem: function (info) {
        let _this = this;

        if (info['m_select']) {
          // 添加数据到rangmenu中
          this.selectedData_.push(info);
        } else {
          // rangmenu中删除数据
          this.selectedData_ = this.selectedData_.filter(function (infoData) {
            return infoData[_this.keyword] !== info[_this.keyword];
          });
        }
        this.funEmit(this.selectedData_);
      },
      funParseListData: function () {
        let data = JSON.parse(JSON.stringify(this.listData));
        let selectedData = JSON.stringify(this.selectedData);
        let keyword = this.keyword;

        data.forEach(function (info) {
          if (selectedData.indexOf('"' + info[keyword] + '"') >= 0) {
            info['m_select'] = true;
          } else {
            info['m_select'] = false;
          }
        });
        return data;
      },
      funHideList: function () {
        if (this.showList_ !== '') {
          this.showList_ = false;
        }
      },
      funEmit: function (data) {
        this.$emit('callback', data);
      },
      scrollHanle: function (val1, val2) {
        console.log('=====scrollHanle====');
        console.log(val1);
        console.log(val2);
      }
    }
  };
</script>

<style lang="scss">
  .wrap-multiselect {
    .ps:hover>.ps__scrollbar-y-rail:hover,
    .ps:hover.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail,
    .ps.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail {
      background-color: transparent;
    }

    .ps:hover>.ps__scrollbar-y-rail:hover>.ps__scrollbar-y,
    .ps:hover.ps--in-scrolling>.ps__scrollbar-y-rail:hover>.ps__scrollbar-y {
      width: 6px;
    }
  }

  .wrap-multiselect {
    >.wrap-list li.active:not(:hover):after,
    #rangeMenu a.add {
      color: #0079ff!important;
    }

    >.wrap-list {
      max-height: 172px;
    }
  }

</style>
<style scoped lang="scss">
  .wrap-multiselect {
    position: relative;
    width: 100%;
    font-size: 14px;

    >.wrap-list {
      position: absolute;
      width: 100%;
      // border: solid 1px;
      bottom: calc(100% + 2px);
      font-size: inherit;
      overflow: auto;
      z-index: 2;
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);

      ul {
        font-size: inherit;

        >li {
          position: relative;
          padding-left: 10px;
          padding-right: 10px;
          height: 34px;
          line-height: 34px;
          font-size: inherit;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          cursor: pointer;
        }

        >li:hover {
          background-color: #ddd;
        }

        >li.active {
          padding-right: 34px;
        }

        >li.active:after {
          position: absolute;
          margin: auto;
          top: 0;
          right: 10px;
          bottom: 0;
          content: "\e61d";
          font-size: 22px;
        }

        >li.active:hover:after {
          color: #fff;
        }
      }
    }

    #rangeMenu {
      border: solid 1px #ddd;
    }

    #rangeMenu,
    >.wrap-list {
      color: #333;
      background-color: #fff;
      border-radius: 4px;
      user-select: none;
    }
  }
</style>