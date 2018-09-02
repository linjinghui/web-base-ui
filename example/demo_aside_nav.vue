<template>
  <div style="width: 220px;height: 400px;border:solid 1px;overflow-y: auto;">
    <ul class="aside-nav">
      <li v-for="(item,index) in navData" :key="'lay1'+index">
        <a :class="{'show':item.show}" @click="clkItem(item)">
          <i class="i-l">&nbsp;</i>
          <span>{{item.name}}</span>
          <i class="i-r arrow" v-if="item.children&&item.children.length>0"><</i>
        </a>
        <ul :style="{maxHeight:item.show?item.children.length*34+'px':'0px'}">
          <li v-for="(item,index) in item.children" :key="'lay2'+index">
            <a>
              <i class="i-l">&nbsp;</i>
              <span>{{item.name}}</span>
              <i class="i-r arrow" v-if="item.children&&item.children.length>0"><</i>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import {Button} from '../packages/index.js';

export default {
  name: 'demoButton',
  data: function () {
    return {
      navData: [
        // {
        //   name: '',
        //   icon: '',
        //   children: []
        // },
        {
          name: '主体审核',
          icon: '',
          children: [
            {
              name: '待审核',
              icon: '',
              children: []
            },
            {
              name: '历史审核',
              icon: '',
              children: []
            }
          ]
        },
        {
          name: '主体档案巡查',
          icon: '',
          children: [
            {
              name: '主体巡查',
              icon: '',
              children: []
            },
            {
              name: '预警查询',
              icon: '',
              children: []
            },
            {
              name: 'GIS展示',
              icon: '',
              children: []
            }
          ]
        },
        {
          name: '系统管理',
          icon: '',
          children: [
            {
              name: '组织机构管理',
              icon: '',
              children: []
            },
            {
              name: '角色管理',
              icon: '',
              children: []
            },
            {
              name: '角色及权限管理',
              icon: '',
              children: []
            }
          ]
        }
      ]
    };
  },
  components: {
    'cmpButton': Button
  },
  watch: {
    //
  },
  methods: {
    clkItem: function (info) {
      console.log(info.show);
      var _this = this;

      this.$set(info, 'show', !info.show);
      // 关闭其他
      if (info.show) {
        this.navData.forEach(element => {
          if (element.name !== info.name) {
            _this.$set(element, 'show', false);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
  .aside-nav {
    position: relative;
    width: 100%;
    color: #fff;
    background-color: #222d32;
    font-size: 12px;
    user-select: none;
  }
  .aside-nav li > a {
    display: block;
    padding: 12px 5px 12px 15px;
    cursor: pointer;
  }
  .aside-nav > li > a:hover {
    background-color: #1e282c;
  }
  .aside-nav li > a > * {
    display: inline-block;
    min-width: 20px;
    min-height: 20px;
    font-style: normal;
    vertical-align: middle;
  }
  .aside-nav li > a > .i-l {
    border: solid 1px red;
  }
  .aside-nav li > a > .i-r {
    float: right;
    border: solid 1px green;
  }
  .aside-nav li > a > .arrow {
    transition: transform .4s ease;
  }
  .aside-nav li > a.show > .arrow {
    transform: rotate(-90deg);
  }
    
  .aside-nav ul {
    width: 100%;
    overflow: hidden;
    color: #8aa4af;
    background-color: #2c3b41;
    transition: max-height .4s ease;
  }
  .aside-nav ul > li > a {
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .aside-nav ul > li > a:hover {
    color: #fff;
  }
  .aside-nav > li > ul > li > a {
    padding-left: 22px;
  }
  .aside-nav > li > ul > li > ul > li > a {
    padding-left: 32px;
  }
</style>