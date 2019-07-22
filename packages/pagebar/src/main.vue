<template>
  <div class="pagebar-wrapper" :class="theme">
    <span :disabled="value<=1" @click="value>1&&clkItem(value-1)">
      <i class="cicon-arrow-left"></i>
      <small>上一页</small>
    </span>
    <template v-for="(item) in arr">
      <span :key="item" v-if="item<=totalPage" :class="{'theme-b active':value===item}" @click="clkItem(item)">{{item}}</span>
    </template>
    <span :disabled="value>=totalPage" @click="value<totalPage&&clkItem(value+1)">
      <i class="cicon-arrow-right"></i>
      <small>下一页</small>
    </span>
    <label class="total">共{{totalSize}}条</label>, 
    <label>前往<input v-model="value2" @keyup.enter="entIpt2">页</label>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'Pagebar',
    data: function () {
      return {
        dspIpt1: false,
        dspIpt2: false,
        value1: '',
        value2: ''
      };
    },
    props: {
      // simple
      'theme': {
        default: ''
      },
      'lenth': {
        default: 5
      },
      // 当前页
      'value': {
        default: 10
      },
      // 每页显示记录数
      'pageSize': {
        default: 8
      },
      // 总记录数
      'totalSize': {
        default: 100
      }
    },
    mounted: function () {
      // 
    },
    computed: {
      // 计算总页数
      totalPage: function () {
        return parseInt((this.totalSize - 1) / this.pageSize + 1);
      },
      arr: function () {
        let first = parseInt((this.value - 1) / this.lenth) * this.lenth;
        let array = [];

        for (let i = 0;i < this.lenth;i++) {
          array[array.length] = ++first;
        }
        return array;
      },
      bfarr: function () {
        // let index = this.value <= 1 ? 2 : this.value;
        // let index = this.value;
        // let num = 2 + ((parseInt((index + 1) / (this.lenth - 2)) - 1) < 0 ? 0 : (parseInt((index + 1) / (this.lenth - 2)) - 1)) * (this.lenth - 2);
        let num = 2 + (this.lenth - 2) * parseInt((this.value - 2) / (this.lenth - 2));
        let array = [];

        for (let i = num;(i < (this.lenth - 2 + num)) && (i < this.totalPage);i++) {
          array[array.length] = i;
        }
        // 2 + (parseInt(11+1/3) - 1) * 3
        // 2 + (this.lenth - 2) * parseInt((13 - 2) / (this.lenth - 2))
        return array;
      }
    },
    watch: {
      // value: function (val) {
      //   this.clkItem(val);
      // }
    },
    methods: {
      clkItem: function (item) {
        this.$emit('input', item);
        this.$emit('callback', item);
      },
      entIpt1: function () {
        this.dspIpt1 = false;
        this.value1 = this.parseIptValue(this.value1);
        this.clkItem(this.value1);
      },
      entIpt2: function () {
        this.dspIpt2 = false;
        this.value2 = this.parseIptValue(this.value2);
        this.clkItem(this.value2);
      },
      parseIptValue: function (val) {
        val = parseInt(val) || 1;
        if (val < 1) {
          val = 1;
        } else if (val > this.totalPage) {
          val = this.totalPage;
        }
        return val;
      }
    }
  };
</script>

<style scoped lang="scss">
  .pagebar-wrapper {
    float: left;
    font-size: 12px;
    color: #535353;
    user-select: none;

    [disabled] {
      cursor: text;
      color: #ccc;
    }

    [class^="cicon-arrow"] {
      font-size: 14px;
      vertical-align: -3px;
    }

    input {
      display: inline-block;
      margin-left: 5px;
      margin-right: 5px;
      width: 30px;
      height: 24px;
      padding: 0;
      text-align: center;
      border: solid 1px #ccc;
    }

    span {
      position: relative;
      float: left;
      min-width: 26px;
      height: 26px;
      border: solid 1px #ccc;
      border-right-width: 0;
      line-height: 24px;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;

      label {
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }

      .cicon-arrow-left,
      .cicon-arrow-right {
        display: none;
      }
    }

    span:first-of-type {
      padding-left: 10px;
      padding-right: 10px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px; 
    }

    span:last-of-type {
      padding-left: 10px;
      padding-right: 10px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px; 
      border-right-width: 1px;
    }

    span.active {
      // color: #fff;
      border: 0;
      // background-color: var(--theme);
    }

    .total {
      padding: 0 10px;
      line-height: 24px;
    }
  }

  .pagebar-wrapper.simple {

    span {
      border: 0;

      .cicon-arrow-left,
      .cicon-arrow-right {
        display: inline-block;
      }

      small {
        display: none;
      }
    }

    span:first-of-type,
    span:last-of-type {
      padding: 0;
    }

    span.active {
      border-radius: 50%;
    }
  }
</style>