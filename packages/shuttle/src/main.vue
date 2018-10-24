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
        <cmp-checkbox v-model="leftData.checked" @click="clk_l_sltall">{{titles[0]}}</cmp-checkbox>
        <span>
          {{leftData.checkedNum ? (leftData.checkedNum + '/' + leftData.effNum) : leftData.effNum}}
        </span>
      </header>
      <vperfect-scrollbar :settings="settings">
        <a class="line" v-for="(item, index) in leftData.data"
          :key="item.id"
          v-if="leftData.data.length > 0 && typeof item === 'object'"
          :class="{'disabled': item.disabled}">
          <cmp-checkbox
            v-model="item.checked"
            :disabled="item.disabled"
            @click="clk_l_item(item)">{{item.name}}</cmp-checkbox>
        </a>
      </vperfect-scrollbar>
    </div>
    <div class="p-m">
      <div class="btn-wrap center-hv">
        <cmp-button class="btn" :disabled="rightData.checkedNum === 0" @click="clk_l_arrow">
          <i class="cicon-arrow-left"></i>
        </cmp-button>
        <cmp-button class="btn" :disabled="leftData.checkedNum === 0" @click="clk_r_arrow">
          <i class="cicon-arrow-right"></i>
        </cmp-button>
      </div>
    </div>
    <div class="p-list">
      <header>
        <cmp-checkbox v-model="rightData.checked" @click="clk_r_sltall">{{titles[1]}}</cmp-checkbox>
        <span>
          {{rightData.checkedNum ? (rightData.checkedNum + '/' + rightData.effNum) : rightData.effNum}}
        </span>
      </header>
      <vperfect-scrollbar :settings="settings">
        <a class="line" v-for="item in rightData.data"
          :key="item.id"
          v-if="rightData.data.length > 0"
          :class="{'disabled': item.disabled}">
          <cmp-checkbox
            v-model="item.checked"
            :disabled="item.disabled"
            @click="clk_r_item(item)">{{item.name}}</cmp-checkbox>
        </a>
      </vperfect-scrollbar>
    </div>
  </div>
</template>

<script type="text/babel">
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import Checkbox from '../../checkbox/index.js';
  import Button from '../../button/index.js';

  export default {
    name: 'Shuttle',
    components: {
      'vperfect-scrollbar': VuePerfectScrollbar,
      'cmpCheckbox': Checkbox,
      'cmpButton': Button
    },
    data: function () {
      return {
        // 滚动速度，默认1
        settings: {
          wheelSpeed: 0.5
        },
        // 占位符名称
        placeholder: '__empty__',
        leftData: {
          checked: false,
          data: [],
          effNum: 0,
          checkedNum: 0,
          tempArr: []
        },
        rightData: {
          checked: false,
          data: [],
          effNum: 0,
          checkedNum: 0,
          tempArr: []
        }
      };
    },
    props: {
      // 完整列表数据
      data: {
        default: function () {
          // id|name|disabled
          return [];
        }
      },
      // 已选中数据下标
      value: {
        default: function () {
          return [];
        }
      },
      keyId: {
        default: 'id'
      },
      keyName: {
        default: 'name'
      },
      // 已选中数据下标
      titles: {
        default: function () {
          return ['', ''];
        }
      }
    },
    watch: {
      data: function () {
        this.setDataBySelectArray();
      },
      value: function (val) {
        this.setDataBySelectArray();
      }
    },
    computed: {
      //
    },
    beforeDestroy: function () {
      //
    },
    mounted: function () {
      this.setDataBySelectArray();
    },
    methods: {
      emt: function (val) {
        this.$emit('input', val);
      },
      callback: function (val) {
        let _this = this;

        setTimeout(function () {
          // 去除checked属性
          let leftData = _this.utlRemoveCheckAttr(_this.leftData.data);
          let rightData = _this.utlRemoveCheckAttr(_this.rightData.data);

          leftData = _this.utlRemoveInvalid(leftData);
          _this.$emit('callback', {
            leftData: leftData,
            rightData: rightData
          });
        }, 100);
      },
      clk_l_sltall: function () {
        let _this = this;
        let data = this.utlSetCheckedAttr(this.leftData.data, this.leftData.checked);

        if (data && data.length > 0) {
          this.leftData.data = data;
          setTimeout(function () {
            // 获取选中数量
            _this.leftData.checkedNum = _this.utlGetCheckedNum(data);
          }, 0);
        }
      },
      clk_l_item: function (item) {
        // 获取选中数量
        let num = this.utlGetCheckedNum(this.leftData.data);

        if (item.checked) {
          if (this.leftData.effNum === num) {
            // 全部选中
            this.leftData.checked = true;
          }
        } else {
          // 取消全部选中
          this.leftData.checked = false;
        }
        this.leftData.checkedNum = num;
      },
      clk_r_sltall: function () {
        let _this = this;
        let data = this.utlSetCheckedAttr(this.rightData.data, this.rightData.checked);

        if (data && data.length > 0) {
          this.rightData.data = data;
          setTimeout(function () {
            // 获取选中数量
            _this.rightData.checkedNum = _this.utlGetCheckedNum(data);
          }, 0);
        }
      },
      clk_r_item: function (item) {
        // 获取选中数量
        let num = this.utlGetCheckedNum(this.rightData.data);

        if (item.checked) {
          if (this.rightData.effNum === num) {
            // 全部选中
            this.rightData.checked = true;
          }
        } else {
          // 取消全部选中
          this.rightData.checked = false;
        }
        this.rightData.checkedNum = num;
      },
      clk_l_arrow: function () {
        this.$nextTick(function () {
          let data = this.rightData.data;
          let selectArr = this.value;
          let rgxkey = 'null';

          for (var i = 0;i < data.length;i++) {
            if (data[i].checked && !data[i].disabled) {
              // 已选中
              delete selectArr[i];
            }
          }
          selectArr = JSON.stringify(selectArr);
          selectArr = selectArr.replace(new RegExp('(,' + rgxkey + ')|(' + rgxkey + ',)|' + rgxkey, 'g'), '');
          selectArr = JSON.parse(selectArr);
          this.emt(selectArr);
          this.rightData.checked = false;
          this.rightData.checkedNum = 0;
          this.callback();
        });
      },
      clk_r_arrow: function () {
        this.$nextTick(function () {
          let arr = [];
          let data = this.leftData.data;

          for (var i = 0;i < data.length;i++) {
            if (data[i].checked && !data[i].disabled) {
              arr[arr.length] = i;
            }
          }
          arr = this.value.concat(arr);
          this.emt(arr);
          this.leftData.checked = false;
          this.leftData.checkedNum = 0;
          this.callback();
        });
      },
      // 根据选中的下标数组设置左右侧数据
      setDataBySelectArray: function () {
        let rdata = [];

        this.$nextTick(function () {
          // 给初始数据添加checkd属性
          let data = this.utlAddCheckAttr(this.data);
          let selectArr = this.value;

          if (data && data.length > 0) {
            if (selectArr && selectArr.length > 0) {
              for (var i = 0;i < selectArr.length;i++) {
                let index = selectArr[i];
                let cdata = data[index];

                if (typeof cdata === 'object') {
                  cdata.checked = false;
                  rdata.push(cdata);
                  data[index] = this.placeholder;
                }
              }
              this.rightData.data = rdata;
              this.leftData.data = data;
            } else {
              this.rightData.data = [];
              this.leftData.data = data;
            }
            this.leftData.effNum = this.leftData.data.length - selectArr.length;
            this.rightData.effNum = this.rightData.data.length;
          } else {
            this.rightData.data = [];
            this.leftData.data = [];
            this.leftData.effNum = 0;
            this.rightData.effNum = 0;
          }
        });
      },
      // 给data添加 checked属性
      utlAddCheckAttr: function (data) {
        let result = [];
        let rgxkey = '"' + this.keyId + '":';

        if (data && data.length > 0) {
          result = JSON.stringify(data);
          result = result.replace(new RegExp(rgxkey, 'g'), '"checked":' + this.leftData.checked + ',' + rgxkey);
          result = JSON.parse(result);
        }
        return result;
      },
      // 移除数组中无效的的数据
      utlRemoveInvalid: function (data) {
        let result = [];
        let rgxkey = '"' + this.placeholder + '"';

        if (data && data.length > 0) {
          result = JSON.stringify(data);
          result = result.replace(new RegExp('(,' + rgxkey + ')|(' + rgxkey + ',)|' + rgxkey, 'g'), '');
          result = JSON.parse(result);
        }
        return result;
      },
      // 给data移除 checked属性
      utlRemoveCheckAttr: function (data) {
        let result = [];
        let rgxkey = '"checked":(false|true)';

        if (data && data.length > 0) {
          result = JSON.stringify(data);
          result = result.replace(new RegExp('(,' + rgxkey + ')|(' + rgxkey + ',)', 'g'), '');
          result = JSON.parse(result);
        }
        return result;
      },
      // 设置data中的checked属性
      utlSetCheckedAttr: function (data, checked) {
        let result = [];
        let rgxkey = '"checked":(false|true)';
        let rpkey = '"checked":' + checked;

        if (data && data.length > 0) {
          result = JSON.stringify(data);
          result = result.replace(new RegExp(rgxkey, 'g'), rpkey);
          result = JSON.parse(result);
        }
        return result;
      },
      // 计算已勾选的数量
      utlGetCheckedNum: function (data) {
        let num = 0;
        let regExp = new RegExp('"checked":true', 'g');

        if (data && data.length > 0) {
          num = JSON.stringify(data).match(regExp);
        }
        return num ? num.length : 0;
      },
      // 去除数组中重复的数据
      utlUnique: function (arr) {
        let result = [];
        let hash = {};

        for (var i = 0;i < arr.length;i++) {
          if (!hash[arr[i]]) {
            result.push(arr[i]);
            hash[arr[i]] = true;
          }
        }
        return result;
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
          display: block;
          margin: 0 auto;
          padding: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: #fff;

          >i {
            font-size: 20px;
          }
        }

        >.btn[disabled] {
          border: solid 1px;
          color: #c0c4cc;
          background-color: #f5f5f5!important;
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
          margin-right: 0;
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
          float: left;
          display: block;
          padding: 0 14px;
          min-width: 100%;
          height: 40px;
          line-height: 40px;

          >.checkbox {
            white-space: nowrap;
          }
        }

        >.line:not(.disabled):hover {
          background-color: #f5f5f5;
        }

        >.line.active {
          color: var(--theme);
        }
      }
    }
  }
</style>