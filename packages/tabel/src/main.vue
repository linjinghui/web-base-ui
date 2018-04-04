<template>
  <table class="custom-table" v-if="bfColumns.length>0">
    <thead>
      <tr>
        <td v-for="(info, index) in bfColumns" :class="{'cbx': info.name==='checkbox'}">
          <template v-if="info.name==='checkbox'">
            <cmp-checkbox :name="checkBoxName + '_sla'" :label="' '" :value="'1'" :checked="isSelectAll" @click="clkSelectAllBox"></cmp-checkbox>
          </template>
          <template v-else>
            {{info.name}}
          </template>
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(info, index) in bfDataArr">
        <template v-for="(clmInfo, clmIndex) in bfColumns">
          <td v-if="clmInfo['variable']==='checkbox'">
            <cmp-checkbox :name="checkBoxName" :label="' '" :value="JSON.stringify(info)" :checked="info.checked" @click="clkCheckBox"></cmp-checkbox>
          </td>
          <td v-else-if="clmInfo['variable']==='innerHtml'" v-html="info[clmInfo['variable']]"></td>
          <td v-else-if="(clmInfo['variable']==='button') && (typeof info[clmInfo['variable']]==='object')">
            <cmp-button v-for="btnInfo in info[clmInfo['variable']]" v-if="btnInfo.theme" :theme="btnInfo.theme" :text="btnInfo.text" @click="clkBtn(btnInfo, info)"></cmp-button>
          </td>
          <td v-else>
            {{info[clmInfo['variable']]|trim}}
          </td>
        </template>

      </tr>
    </tbody>
  </table>
</template>

<script type="text/babel">
  import CheckBox from '../../checkBox/src/main.vue';
  import Button from '../../button/src/main.vue';

  export default {
    name: 'Tabel',
    components: {
      'cmpCheckbox': CheckBox,
      'cmpButton': Button
    },
    data: function () {
      return {
        bfColumns: this.columns,
        bfDataArr: this.setDataCheck(this.dataArr, false),
        isSelectAll: false,
        checkBoxName: 'cbn_' + new Date().getTime()
      };
    },
    props: {
      columns: {
        type: Array,
        default: function () {
          return [
            {
              // 头部列表名称
              'name': '姓名',
              // 对应数据对象变量名
              'variable': 'name'
            }
          ];
        }
      },
      dataArr: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    watch: {
      dataArr: function (val) {
        this.bfDataArr = [];
        this.isSelectAll = false;
        this.$nextTick(function () {
          this.bfDataArr = this.setDataCheck(val, false);
        });
      }
    },
    mounted: function () {
      //
    },
    methods: {
      clkSelectAllBox: function (data) {
        this.isSelectAll = data.checked;
        this.setDataCheck(this.bfDataArr, data.checked);
        this.$emit('callback', {
          'selectResult': data.checked ? this.bfDataArr : []
        });
      },
      clkCheckBox: function (data) {
        let info = this.bfDataArr[data.value.index];

        this.$set(info, 'checked', data.checked);
        if (data.checked && (data.result.length === this.bfDataArr.length)) {
          // 勾中全选
          this.isSelectAll = true;
        } else if (!data.checked) {
          // 取消全选
          this.isSelectAll = false;
        }
        this.$emit('callback', {
          'selectResult': data.result
        });
      },
      setDataCheck: function (data, checked) {
        if (!data) {
          data = [];
        }

        for (var i = data.length - 1;i >= 0;i--) {
          data[i].index = i;
          // data[i].checked = checked;
          this.$set(data[i], 'checked', checked);
        }
        return data;
      },
      clkBtn: function (btnInfo, trInfo) {
        this.$emit('callback', {
          'btnInfo': btnInfo,
          'data': trInfo
        });
      }
    },
    filters: {
      trim: function (str) {
        let result = '';

        if (typeof str === 'string') {
          result = str && str.replace(/^\s+|\s+$/gm, '');
        } else {
          result = str;
        }
        return result;
      }
    }
  };
</script>

<style scoped lang="scss">
  .custom-table {
    width: 100%;
    table-layout: fixed;
    font-size: 12px;
    word-wrap: break-word;

    tbody > tr:nth-child(odd) {
      background-color: #f7f7f7;
    }

    thead > tr,
    tbody > tr:nth-child(even) {
      background-color: #fff;
    }

    tbody > tr:hover {
      background-color: #eee;
    }

    td {
      padding-left: 10px;
      padding-top: 5px;
      padding-bottom: 5px;
      height: 32px;
      border-style: solid;
      border-width: 0;
      border-color: transparent;
      border-collapse: collapse;

      .button {
        padding: 4px 15px;
        margin-right: 10px;
        border-radius: 2px;
      }
    }

    td.cbx {
      width: 40px;
    }
  }
</style>