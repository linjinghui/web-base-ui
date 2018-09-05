<template>
  <div style="width: 220px;height: 400px;border:solid 1px;background-color: #222d32;overflow-y: auto;">
    <ul class="aside-nav">
      <li v-for="(item1,index) in navOption.navData" :key="'lay1'+index">
        <a :class="{'active':navOption.activeIndex_1===item1.id, 'open': navOption.openIndex_1===item1.id}" @click="clkNavItem([item1])">
          <i class="i-l">&nbsp;</i>
          <span>{{item1.name}}</span>
          <i class="i-r arrow" v-if="item1.children&&item1.children.length>0"><</i>
        </a>
        <ul :style="{maxHeight:navOption.openIndex_1===item1.id?item1.children.length*34+'px':'0px'}">
          <li v-for="(item2,index) in item1.children" :key="'lay2'+index">
            <a :class="{'active':navOption.activeIndex_2===item2.id}" @click="clkNavItem([item1,item2])">
              <i class="i-l">&nbsp;</i>
              <span>{{item2.name}}</span>
              <i class="i-r arrow" v-if="item2.children&&item2.children.length>0"><</i>
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
      navOption: {
        openIndex_1: '',
        activeIndex_1: '',
        activeIndex_2: '',
        navData: [
          // {
          //   id: '', 
          //   name: '',
          //   icon: '',
          //   url: '',
          //   children: []
          // },
          {
            id: '1',
            name: '主体审核',
            icon: '',
            url: '',
            children: [
              {
                id: '1-1',
                name: '待审核',
                icon: '',
                url: 'https://www.baidu.com?t=1',
                children: []
              },
              {
                id: '1-2',
                name: '历史审核',
                icon: '',
                url: 'https://www.baidu.com?t=2',
                children: []
              }
            ]
          },
          {
            id: '2',
            name: '主体档案巡查',
            icon: '',
            children: [
              {
                id: '2-1',
                name: '主体巡查',
                icon: '',
                url: '',
                children: []
              },
              {
                id: '2-2',
                name: '预警查询',
                icon: '',
                url: '',
                children: []
              },
              {
                id: '2-3',
                name: 'GIS展示',
                icon: '',
                url: '',
                children: []
              }
            ]
          },
          {
            id: '3',
            name: '系统管理',
            icon: '',
            children: [
              {
                id: '3-1',
                name: '组织机构管理',
                icon: '',
                url: 'https://www.baidu.com?t=3',
                children: []
              },
              {
                id: '3-2',
                name: '角色管理',
                icon: '',
                url: 'https://www.baidu.com?t=4',
                children: []
              },
              {
                id: '3-3',
                name: '角色及权限管理',
                icon: '',
                url: 'https://www.baidu.com?t=5',
                children: []
              }
            ]
          }
        ]
      }
    };
  },
  components: {
    'cmpButton': Button
  },
  watch: {
    //
  },
  methods: {
    clkNavItem: function (arr) {
      var current = arr[arr.length - 1];
      var first = arr.length > 1 ? arr[0] : {};

      // 激活节点
      if (current.url) {
        // step1 - 跳转
        console.log('跳转：' + current.url);
        // step2 - 激活当前
        this.navOption.activeIndex_2 = current.id;
        // step3 - 激活最上层
        this.navOption.activeIndex_1 = first.id;
      } else if (current.children && current.children.length > 0) {
        // 开启子节点
        this.navOption.openIndex_1 = this.navOption.openIndex_1 === current.id ? '' : current.id;
        this.navOption.activeIndex_2 = '';
      }
    }
  }
};
</script>

<style scoped>
  /* 全局 */
  .aside-nav {
    position: relative;
    width: 100%;
    color: #b8c7ce;
    font-size: 12px;
    user-select: none;
  }
  .aside-nav li > a {
    display: block;
    padding: 12px 5px 12px 15px;
    cursor: pointer;
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
  .aside-nav li > a.open > .arrow {
    transform: rotate(-90deg);
  }
    
  /* 除了最上层 */
  .aside-nav ul {
    width: 100%;
    overflow: hidden;
    color: #8aa4af;
    /* background-color: #2c3b41; */
    transition: max-height .4s ease;
  }
  .aside-nav ul > li > a {
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .aside-nav ul > li > a.active,
  .aside-nav ul > li > a:hover {
    color: #fff;
  }

  /* 最上层 */
  .aside-nav > li > a {
    border-color: transparent;
    border-left: solid 3px transparent;
  }
  .aside-nav > li > ul > li > a {
    padding-left: 22px;
  }
  .aside-nav > li > ul > li > ul > li > a {
    padding-left: 32px;
  }

  /* theme */
  .aside-nav > li > a.open,
  .aside-nav > li > a:hover {
    color: #fff;
    background-color: #1e282c;
  }
  .aside-nav > li > a.active {
    border-color: #3c8dbc;
  }
</style>