<template>
  <div class="wrapTable" ref="table" :class="{'fixed': isFixed}">
    <table class="header" :style="{width: tableWidth}" v-show="showHeaderTable">
      <tr>
        <td v-for="cinfo in columns">{{cinfo.name}}</td>
      </tr>
    </table>
    <table class="main">
      <tr v-for="(dinfo, i) in dataList" :class="{'active': active===i}" @mouseup="msdwn($event, i)">
        <template v-for="cinfo in columns">
          <td v-if="cinfo['variable']==='innerHtml'" v-html="dinfo[cinfo['variable']]"></td>
          <td v-else-if="cinfo['variable']==='button'" @mouseup.stop>
            <cmp-button v-for="btnInfo in dinfo[cinfo['variable']]" v-if="btnInfo.theme" :theme="btnInfo.theme" :text="btnInfo.text" @click="clkBtn(btnInfo, dinfo)"></cmp-button>
          </td>
          <td v-else v-text="dinfo[cinfo['variable']]"></td>
        </template>
      </tr>
    </table>
    <footer>
      <cmp-pagebar :index="pbIndex" :totalPage="pbTotal" @click="callbackPagebar"></cmp-pagebar>
    </footer>
    <cmp-contextmenu v-if="needContextmenu" v-bind="pcontextmenu" :pmenu="contextmenuList" @callback="callbackContextmenu"></cmp-contextmenu>
  </div>
</template>

<script>
  import Pagebar from '../../pagebar/index.js';
  import Button from '../../button/src/main.vue';
  import Contextmenu from '../../contextmenu/src/main.vue';

  export default {
    name: 'ScrollTabel',
    components: {
      'cmpPagebar': Pagebar,
      'cmpButton': Button,
      'cmpContextmenu': Contextmenu
    },
    props: {
      columns: {
        default: function () {
          return [];
        }
      },
      dataList: {
        default: function () {
          return [];
        }
      },
      needContextmenu: {
        default: false
      },
      contextmenuList: {
        default: function () {
          return [];
        }
      },
      pbIndex: {
        default: 1
      },
      pbTotal: {
        default: 1
      }
    },
    data () {
      return {
        active: '',
        tableWidth: '',
        isFixed: false,
        showHeaderTable: true,
        pcontextmenu: {
          pshow: '',
          ptop: '',
          pleft: ''
        }
      };
    },
    computed: {
      //
    },
    watch: {
      dataList: function () {
        this.active = '';
      },
      isFixed: function (val) {
        if (val) {
          this.setTableWidth();
        } else {
          this.setTableWidth('100%');
        }
      }
    },
    beforeDestroy: function () {
      this.destroy();
    },
    mounted: function () {
      this.init();
    },
    methods: {
      init: function () {
        // 设置表格宽度
        // this.setTableWidth();
        window.addEventListener('resize', this.setTableWidth);
        // 监听滚动条移动
        this.listenHeaderTable();
        window.addEventListener('scroll', this.listenHeaderTable);
      },
      destroy: function () {
        window.removeEventListener('resize', this.setTableWidth);
        window.removeEventListener('scroll', this.listenHeaderTable);
      },
      msdwn: function (event, index) {
        if (event.button === 2 && this.needContextmenu) {
          let mouseX = 0;
          let mouseY = 0;

          mouseX = event.clientX;
          mouseY = event.clientY;
          if (this.pcontextmenu.pshow) {
            this.pcontextmenu.pshow = '';
          }
          this.$nextTick(function () {
            this.pcontextmenu.ptop = mouseY + 'px';
            this.pcontextmenu.pleft = mouseX + 'px';
            this.pcontextmenu.pshow = true;
          });
          this.active = index;
        }
      },
      // 设置头部宽度
      setTableWidth: function (val) {
        let _this = this;
        let dom = _this.$refs.table;

        if (typeof val === 'string') {
          _this.tableWidth = val;
        } else {
          _this.showHeaderTable = false;
          setTimeout(function () {
            if (dom && dom.offsetWidth) {
              _this.tableWidth = dom.offsetWidth + 'px';
            }
            _this.showHeaderTable = true;
          }, 100);
        }
      },
      listenHeaderTable: function () {
        let target = this.$refs.table;
        let top = target.getBoundingClientRect().top;

        if (top < 2) {
          this.isFixed = true;
        } else {
          this.isFixed = false;
        }
      },
      clkItem: function (data, index) {
        if (!this.needContextmenu) {
          this.active = index;
          this.callback({
            index: index,
            ItemInfo: data
          });
        }
      },
      clkBtn: function (data, data2) {
        this.callback({
          btnInfo: data,
          ItemInfo: data2
        });
      },
      callback: function (data) {
        this.$emit('callback', data);
      },
      callbackPagebar: function (data) {
        this.$emit('callbackPagebar', data);
      },
      callbackContextmenu: function (data) {
        if (data === '') {
          // console.log('点击空白隐藏弹窗');
          this.active = '';
        } else {
          // console.log('点击弹窗内容');
          // console.log(data);
          this.$emit('callbackContextmenu', {
            btnInfo: data,
            ItemInfo: this.dataList[this.active]
          });
        }
        this.pcontextmenu.pshow = false;
      }
    }
  };
</script>

<style lang="scss">
  .pagebar-wrapper {
    float: right!important;
    padding: 0!important;
    border: solid 1px #e0e2e3;
    border-radius: 4px;
    background-color: #f0f0f0;

    >span {
      float: left;
      margin: 0!important;
      width: 33px!important;
      height: 36px!important;
      line-height: 36px!important;
      border-right: inherit;
    }

    >span:last-of-type {
      border: 0;
    }

    >span.active {
      border-radius: 0!important;
      background-color: #0cc2aa!important;
    }
  }
</style>

<style scoped lang="scss">
  $lineheight: 46px;

  .wrapTable {
    width: 100%;
    color: #333;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 -1px 0px rgba(0, 0, 0, 0.02);

    table {
      table-layout: fixed;
      width: 100%;
      border-collapse: collapse;
      background-color: inherit;
      white-space: normal;
      word-wrap: break-word;
    }

    tr {
      width: 100%;
    }

    .header tr {
      font-weight: bold;
    }

    .main tr:nth-child(2n+1) {
      background-color: #f9f9f9;
    }

    .main tr:hover {
      background-color: #f0f0f0;
    }

    .main tr.active {
      color: #fff;
      background-color: #0cc2aa;
    }

    td {
      padding: 10px;
      height: $lineheight;

      .button {
        margin-right: 10px;
      }
    }

    >footer {
      padding: 10px;
      height: 56px;
      border-top: solid 1px #e0e2e3;
    }
  }

  .wrapTable.fixed {
    padding-top: $lineheight;

    >.header {
      position: fixed;
      top: 0;
      border-bottom: solid 1px #eee;
      z-index: 2;
    }
  }

</style>