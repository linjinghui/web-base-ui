<!--
穿梭框 功能介绍：
1、数据字段：
id: 对象唯一标识
name：显示内容
disabled：是否禁用
 -->

<template>
  <div class="shuttle">
    <div class="p-list">
      <header>
        <cmp-checkbox v-model="leftAllSelt">标题1</cmp-checkbox>
        <span>{{cdata.length}}</span>
      </header>
      <vperfect-scrollbar>
        <a class="line" v-for="item in cdata" :key="item.id" :disabled="item.disabled">
          <cmp-checkbox v-model="item.checked" :disabled="item.disabled">{{item[keyName]}}</cmp-checkbox>
        </a>
      </vperfect-scrollbar>
    </div>
    <div class="p-m">
      <div class="btn-wrap center-hv">
        <span class="btn">
          <i class="cicon-arrow-left"></i>
        </span>
        <span class="btn">
          <i class="cicon-arrow-right"></i>
        </span>
      </div>
    </div>
    <div class="p-list">
      <header></header>
      <vperfect-scrollbar :settings="settings">
        <a class="line" v-for="item in checkedIndexs">
          <cmp-checkbox v-model="cdata[item].checked">{{cdata[item].name}}</cmp-checkbox>
        </a>
      </vperfect-scrollbar>
    </div>
  </div>
</template>

<script type="text/babel">
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import Checkbox from '../../checkbox/index.js';

  export default {
    name: 'Shuttle',
    components: {
      'vperfect-scrollbar': VuePerfectScrollbar,
      'cmpCheckbox': Checkbox
    },
    data: function () {
      return {
        // 滚动速度，默认1
        settings: {
          wheelSpeed: 0.5
        },
        // 左侧全选
        leftAllSelt: false,
        // 以选中的下标数组
        checkedIndexs: [0, 1],
        pdata: this.parseData()
      };
    },
    props: {
      value: {
        default: function () {
          return [];
        }
      },
      data: {
        default: function () {
          return [];
        }
      },
      keyId: {
        default: 'id'
      },
      keyName: {
        default: 'name'
      }
    },
    watch: {
      data: function (val) {
        this.pdata = this.parseData();
      },
      leftAllSelt: function (val) {
        if (val) {
          alert('全选');
        } else {
          alert('全取消');
        }
      }
    },
    computed: {
      cdata: function () {
        console.log('=======cdata=========');
        let _this = this;
        let data = JSON.parse(JSON.stringify(_this.data)) || [];
        // let rpkey = '"' + _this.keyId + '":';

        data = data.filter(function (item, index) {
          if (typeof item['checked'] === 'undefined') {
            item['checked'] = _this.leftAllSelt;
          }
          return _this.checkedIndexs.indexOf(index) === -1;
        });
        console.log(data);
        return data;
      }
    },
    beforeDestroy: function () {
      //
    },
    mounted: function () {
      //
    },
    methods: {
      // 转换data，给他添加 checked属性
      parseData: function () {
        let data = [];
        let rpkey = '"' + this.keyId + '":';

        if (this.data) {
          data = JSON.stringify(this.data);
          data = data.replace(new RegExp(rpkey, 'g'), '"checked":' + this.leftAllSelt + ',' + rpkey);
          data = JSON.parse(data);
        }
        return data;
      },
      // 获取已勾选的值
      getCheckedData: function (data) {
        //
      }
    }
  };
</script>

<style scoped lang="scss">
  .shuttle {
    position: relative;
    width: 100%;
    height: 100%;

    >div {
      float: left;
      height: 100%;
    }

    >.p-m {
      position: relative;
      width: 100px;

      >.btn-wrap {
        width: 100%;
        height: 90px;

        >.btn {
          position: relative;
          margin: 0 auto;
          display: block;
          width: 40px;
          height: 40px;
          line-height: 40px;
          border-radius: 50%;
          text-align: center;
          color: #c0c4cc;
          background-color: #f5f7fa;

          >i {
            font-size: 20px;
          }
        }

        >.btn:first-of-type {
          margin-bottom: 10px;
        }
      }
    }

    >.p-list {
      width: calc((100% - 100px) / 2);
      border: 1px solid #ebebeb;
      border-radius: 4px;
      overflow: hidden;

      >header {
        padding: 0 14px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        background-color: #f5f7fa;

        >.checkbox {
          width: calc(100% - 50px);
        }

        >span {
          float: right;
          width: 50px;
          height: 100%;
          text-align: right;
          font-size: 12px;
          color: #939393;
        }
      }

      >section {
        height: calc(100% - 40px);
        background-color: #fff;

        >.line {
          display: block;
          padding: 0 14px;
          width: 100%;
          height: 40px;
          line-height: 40px;
        }

        >.line:hover {
          background-color: #f5f5f5;
        }

        >.line.active {
          color: #0079ff;
        }
      }
    }
  }
</style>