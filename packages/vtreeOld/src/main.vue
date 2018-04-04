<template>
  <vperfect-scrollbar class="scroll-area vtree" ref="ps" :settings="settings" v-if="bfTreeData">
    <ul>
      <item class="item" :model="bfTreeData" :layer="1" :activeId="bfActiveId" :open="bfOpenRoot" @callback="callback" @setActiveId="setActiveIdCallback"></item>
    </ul>
  </vperfect-scrollbar>
</template>

<script type="text/babel">
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import Item from './item.vue';

  export default {
    name: 'Vtree',
    components: {
      'item': Item,
      'vperfect-scrollbar': VuePerfectScrollbar
    },
    data: function () {
      return {
        // 滚动条插件
        settings: {
          wheelSpeed: 0.5
        },
        mark: 0,
        bfTreeData: this.treeData,
        bfOpenRoot: this.openRoot,
        bfActiveId: this.activeId
      };
    },
    props: {
      // 树结构数据
      treeData: {
        default: function () {
          return {};
        }
      },
      // 当前激活项的ID
      activeId: '',
      // 是否默认展开根节点
      openRoot: {
        default: true
      },
      // 是否默认激活根节点
      autoActiveRoot: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      treeData: function (val, val2) {
        this.bfTreeData = val;
        if (val && this.mark === 0) {
          // 第一次设置组织树数据, 判断是否激活根节点
          this.activeRoot();
        }
        this.mark += 1;
      },
      activeId: function (val) {
        this.bfActiveId = val;
      },
      autoActiveRoot: function (val) {
        if (val) {
          // 默认激活根节点
          this.activeRoot();
        }
      }
    },
    mounted: function () {
      // setTimeout(function () {
      //   let firstNode = document.querySelector('.vtree .line');

      //   firstNode.click();
      // }, 3000);
    },
    methods: {
      callback: function (data) {
        if (data === 'updateScroll') {
          // 更新滚动条插件
          this.updateScroll();
        } else {
          // this.bfActiveId = data[data.length - 1].deptId;
          this.$emit('callback', data);
        }
      },
      updateScroll: function () {
        this.$nextTick(function () {
          this.$refs.ps.update();
        });
      },
      activeRoot: function () {
        // this.$nextTick(function () {
        //   let firstNode = document.querySelector('.vtree .line');

        //   if (firstNode) {
        //     firstNode.click();
        //   }
        // });
        this.$nextTick(function () {
          this.bfActiveId = this.treeData.deptId;
        });
      },
      setActiveIdCallback: function (data) {
        this.bfActiveId = data;
      }
    }
  };
</script>

<style lang="scss">
  @import '../../../src/fonts/iconfont.css';

  .vtree {
    width: 100%;
    height: 100%;
    color: #333;
    font-size: 12px;
    user-select: none;

    ul, li {
      float: left;
      min-width: 100%;
    }

    .item {
      position: relative;
      cursor: pointer;
    }

    .line {
      float: left;
      padding-right: 14px;
      min-width: 100%;
      height: 40px;
      line-height: 40px;
      white-space: nowrap;
      word-wrap: break-word;
      word-break: normal;

      .ticon {
        display: inline-block;
        width: 22px;
        height: 100%;
        vertical-align: top;
        color: #999;

        .iconfont {
          font-size: 22px;
        }
      }
    }

    .line:hover {
      background-color: #e3edf3;
    }

    .line.active {
      background-color: #cbe3f3;
    }

    .line.disabled {
      color: #999;
    }

  }

</style>
<style lang="scss">
  // .ps {
  //   .ps__scrollbar-x-rail {
  //     width: calc(100% - 15px) !important;
  //     background-color: red !important;
  //   }
  // }
</style>
<style lang="scss">
  $padl: 20px;

  .ssss-layer2 > .line {
    padding-left: $padl*1;
  }

  .ssss-layer3 > .line {
    padding-left: $padl*2;
  }

  .ssss-layer4 > .line {
    padding-left: $padl*3;
  }

  .ssss-layer5 > .line {
    padding-left: $padl*4;
  }

  .ssss-layer6 > .line {
    padding-left: $padl*5;
  }

  .ssss-layer7 > .line {
    padding-left: $padl*6;
  }

  .ssss-layer8 > .line {
    padding-left: $padl*7;
  }

  .ssss-layer9 > .line {
    padding-left: $padl*8;
  }

  .ssss-layer10 > .line {
    padding-left: $padl*9;
  }

  .ssss-layer11 > .line {
    padding-left: $padl*10;
  }

  .ssss-layer12 > .line {
    padding-left: $padl*11;
  }

  .ssss-layer13 > .line {
    padding-left: $padl*12;
  }

  .ssss-layer14 > .line {
    padding-left: $padl*13;
  }

  .ssss-layer15 > .line {
    padding-left: $padl*14;
  }

  .ssss-layer16 > .line {
    padding-left: $padl*15;
  }

  .ssss-layer17 > .line {
    padding-left: $padl*16;
  }

  .ssss-layer18 > .line {
    padding-left: $padl*17;
  }

  .ssss-layer19 > .line {
    padding-left: $padl*18;
  }

  .ssss-layer20 > .line {
    padding-left: $padl*19;
  }
</style>
<style lang="scss">
  $padl: 16px;

  .layer1 > .line {
    padding-left: $padl*1;
  }

  .layer2 > .line {
    padding-left: $padl*2;
  }

  .layer3 > .line {
    padding-left: $padl*3;
  }

  .layer4 > .line {
    padding-left: $padl*4;
  }

  .layer5 > .line {
    padding-left: $padl*5;
  }

  .layer6 > .line {
    padding-left: $padl*6;
  }

  .layer7 > .line {
    padding-left: $padl*7;
  }

  .layer8 > .line {
    padding-left: $padl*8;
  }

  .layer9 > .line {
    padding-left: $padl*9;
  }

  .layer10 > .line {
    padding-left: $padl*10;
  }

  .layer11 > .line {
    padding-left: $padl*11;
  }

  .layer12 > .line {
    padding-left: $padl*12;
  }

  .layer13 > .line {
    padding-left: $padl*13;
  }

  .layer14 > .line {
    padding-left: $padl*14;
  }

  .layer15 > .line {
    padding-left: $padl*15;
  }

  .layer16 > .line {
    padding-left: $padl*16;
  }

  .layer17 > .line {
    padding-left: $padl*17;
  }

  .layer18 > .line {
    padding-left: $padl*18;
  }

  .layer19 > .line {
    padding-left: $padl*19;
  }

  .layer20 > .line {
    padding-left: $padl*20;
  }
</style>