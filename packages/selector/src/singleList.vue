<!-- 
功能介绍：

数据格式为对象格式
 -->

<template>
  <div class="wrap-single-list">
    <nav><p v-touchmove>
      <template v-for="(item,index) in nav">
        <a :key="'nav_'+index" @click.stop="clkNav(index)">{{item.name}}</a>
        <i :key="'nav_icon_'+index" v-if="index<nav.length-1" class="cicon-arrow-right"></i>
      </template>
    </p></nav>
    <vperfect-scrollbar :settings="{wheelSpeed:0.5,suppressScrollX:true}">
      <ul v-if="lastNavData.children">
        <li v-if="multiple">
          <span class="wrap-check" @click="clkCheckboxFull"><cmp-checkbox class="wrap-check" v-model="full"></cmp-checkbox></span>
          <span class="wrap-text">全选</span>
        </li>
        <li v-for="(item,index) in lastNavData.children" :key="item.id+'_'+index" @click.stop="clkLine(item)">
          <span class="wrap-check" v-if="!item.nocheckbox&&multiple" @click.stop>
            <cmp-checkbox class="wrap-check" v-if="!item.disabled&&!item.nocheckbox" :required="item.required" v-model="item.checked" @click="clkCheckbox(item)"></cmp-checkbox>
          </span>
          <img class="wrap-avator" v-if="item.img" :src="item.img">
          <p class="wrap-text" :disabled="item.disabled" :style="'width:calc(100% - '+(multiple?'22px':'0px')+' - 20px - 60px)'">{{item.name}}</p>
          <span class="wrap-right theme-c" v-if="item.children&&item.children.length>0" :disabled="!item.required&&item.checked" @click.stop="clkNext(item)">
            <i v-if="nextIcon" :class="nextIcon"></i>
            下级
          </span>
        </li>
      </ul>
    </vperfect-scrollbar>
  </div>
</template>

<script type="text/babel">
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import Checkbox from '../../checkbox/src/main.vue';

  export default {
    name: 'Item',
    components: {
      'vperfect-scrollbar': VuePerfectScrollbar,
      'cmpCheckbox': Checkbox
    },
    props: {
      data: '',
      // 最大选择数量
      maxCount: '',
      // 是否多选 true: 是多选(默认) false: 单选
      multiple: '',
      // 下级按钮图标字体
      nextIcon: '',
      // 选中的结果
      results: ''
    },
    data: function () {
      return {
        full: false,
        nav: []
      };
    },
    watch: {
      data: function (val) {
        this.nav = [val];
      }
    },
    computed: {
      lastNavData: function () {
        let _this = this;
        let data = this.nav[this.nav.length - 1] || {};
        let str = JSON.stringify(this.results);

        if (data && data.children && data.children.length > 0) {
          data.children.forEach(item => {
            let rstr = '"id":';

            if (typeof item.id === 'string') {
              rstr += '"' + item.id + '"';
            } else {
              rstr += item.id;
            }
            item.checked = str.indexOf(rstr) >= 0;
          });

          // 判断是否全选
          let isFull = JSON.stringify(data.children).indexOf('"checked":false') === -1;

          _this.full = isFull;
        }
        
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
      clkNav: function (index) {
        if (index < this.nav.length - 1) {
          this.nav = this.nav.slice(0, index + 1);
        }
      },
      // 下一级
      clkNext: function (itemData) {
        if (!itemData.checked || itemData.required) {
          this.nav.push(itemData);
        }
      },
      // checkbox 全选点击 
      clkCheckboxFull: function () {
        let _this = this;

        this.lastNavData.children.forEach(function (item) {
          if (!item.disabled && !item.nocheckbox) {
            item.checked = _this.full;
            _this.clkCheckbox(item);
          }
        });
      },
      // 点击前判断
      clkBeforeCheck: function (data) {
        return data.checked && this.maxCount && (this.maxCount <= this.results.length);
      },
      // checkbox 点击 
      clkCheckbox: function (data) {
        // 超出最大选择，取消勾选
        if (this.clkBeforeCheck(data)) {
          this.$set(data, 'checked', false);
        }
        this.$emit('callback_checkbox', data);
      },
      // 点击 - 行
      clkLine: function (data) {
        if (!data.disabled && !data.nocheckbox) {
          this.$set(data, 'checked', !data.checked);
          this.clkCheckbox(data);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-single-list {
    position: relative;
    width: 100%;
    height: 100%;

    > nav {
      width: calc(100% - 20px);
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      white-space:nowrap;

      > p {
        float: left;

        > a {
          display: inline-block;
          vertical-align: middle;
          cursor: pointer;
        }
        > i {
          margin-right: 5px;
          font-size: 12px;
          color: #666;
        }
      }
    }

    > .ps-container {
      width: 100%;
      height: calc(100% - 30px);
    }

    ul {
      width: 100%;
    }

    li {
      display: flex;
      padding-right: 0!important;
      padding-top: 5px;
      padding-bottom: 5px;
      width: calc(100% - 20px);
      line-height: 20px;
      font-size: 0;
      white-space: normal!important;

      > .wrap-check {
        // float: left;
        margin-top: 2px;
      }

      > .wrap-text {
        // float: right;
        padding-left: 5px;
        padding-right: 5px;
        width: calc(100% - 22px - 20px - 60px);
        height: auto!important;
        line-height: unset!important;
        font-size: 12px;
      }
      > .wrap-text:disabled {
        color: #ccc;
      }

      > .wrap-right {
        // float: right;
        width: 60px;
        height: 20px;
        text-align: center;
        border-left: solid 1px #ccc;
        font-size: 12px;
        cursor: pointer;

        > i {
          font-size: 14px;
        }
      }
      > .wrap-right[disabled] {
        opacity: 1;
        color: #ccc!important;
        cursor: text!important;
      }
    }

  }
  
</style>