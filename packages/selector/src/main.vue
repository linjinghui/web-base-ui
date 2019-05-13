<!-- 
功能介绍：
1、
 -->

<template>
  <transition name="slide-fade">
    <div class="wrap-selector" :id="id" v-if="value!==''" v-show="value">
      <header>
        {{headTitle}}
        <i class="cicon-cross-chr" @click="clkCancel"></i>
      </header>
      <div>
        <section class="p-l">
          <cmp-input v-model="search" clear="false" :maxlength="maxlength" :placeholder="placeholder" @enter="clkSearch">
            <i class="btn-search" slot="right" @click="clkSearch"><i class="cicon-search-cpt-chr" slot="right"></i></i>
          </cmp-input>
          <ul class="nav" v-if="navData">
            <li v-for="(info,index) in navData" :key="'nav_'+index" :class="{'active':active===index}" @click="clkNav(index)">{{info}}</li>
          </ul>
          <div class="empty" v-show="showEmpty"><img :src="empty"><br>没有找到相关数据</div>
          <div class="loading" v-show="showLoading">{{loading}}</div>
          <vperfect-scrollbar class="wrap-tree" v-show="showTree||showSearchData" :settings="{wheelSpeed:0.5}" :style="{height:'calc(100% - 34px - 20px - '+(navData?'32px - 10px':'0px')+' - 2px)'}">
            <!-- 树形数据展示 -->
            <ul v-show="showTree">
              <li class="tree-title" v-if="treeTitle">{{treeTitle}}</li>
              <cmp-li v-for="(itemData,index) in treeData" :key="itemData.id+'_'+index" :data="itemData" :maxCount="maxCount" :checkedCount="results.length" :returnType="returnType" :checkType="checkType" :multiple="multiple"></cmp-li>
            </ul>
            <!-- 搜索结果展示 -->
            <ul class="wrap-seach" v-show="showSearchData">
              <cmp-li v-for="(itemData,index) in searchData" :key="itemData.id+'_'+index+'_shd'" :data="itemData" :maxCount="maxCount" :checkedCount="results.length" :returnType="returnType" :checkType="checkType" :multiple="multiple"></cmp-li>
            </ul>
          </vperfect-scrollbar>
        </section>
        <section class="p-r">
          已选择 ({{results.length}}/{{maxCount}}) <span class="btn-clear" @click="clkClearTreeItem">清空</span>
          <vperfect-scrollbar :settings="{wheelSpeed:0.5,suppressScrollX:true}">
            <ul class="lst-1"> 
              <li v-for="(item,index) in results" :key="JSON.parse(item).id+'_'+index+'_rst'">
                <img v-if="JSON.parse(item).img" :src="JSON.parse(item).img">
                <span>{{JSON.parse(item).name}}</span>
                <i class="cicon-cross-chr" @click="clkDelItem(index)"></i>
              </li>
            </ul>
          </vperfect-scrollbar>
        </section>
      </div>
      <footer>
        <cmp-button class="confirm" @click="clkConfirm">确认</cmp-button>
        <cmp-button theme="line" @click="clkCancel">取消</cmp-button>
      </footer>
    </div>
  </transition>
</template>

<script type="text/babel">
  import Button from '../../button/src/main.vue';
  import Input from '../../input/src/main.vue';
  import Checkbox from '../../checkbox/src/main.vue';
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import Li from './list.vue';

  export default {
    name: 'Selector',
    components: {
      'cmpButton': Button,
      'cmpInput': Input,
      'cmpCheckbox': Checkbox,
      'vperfect-scrollbar': VuePerfectScrollbar,
      'cmpLi': Li
    },
    data: function () {
      return {
        id: 'selector_' + new Date().getTime() + parseInt(Math.random() * 100),
        // 当前导航激活项
        active: '',
        // 搜索内容
        search: '',
        // 搜索结果数据
        searchData: [],
        // 树形数据
        treeData: [],
        // 树形数据 - 备份数据 
        _treeData: [],
        // 是否显示加载中
        showLoading: false,
        // 是否显示空展示
        showEmpty: false,
        // 是否显示树形
        showTree: false,
        // 是否显示搜索内容
        showSearchData: false,
        // 选中结果
        results: [],
        resultSources: []
      };
    },
    props: {
      value: {
        default: ''
      },
      headTitle: {
        default: '选择器'
      },
      // // 默认头像
      // avatar: {
      //   default: require('./images/avatar.png')
      // },
      // 空列表展示图片
      empty: {
        default: require('./images/empty.png')
      },
      placeholder: {
        default: '请输入关键字查询'
      },
      maxlength: {
        default: 14
      },
      // 最大选择数量
      maxCount: {
        default: 100
      },
      // 返回类型 1: 全部返回 2: 只返还回子节点
      returnType: {
        default: 2
      },
      // 勾选类型 1: 允许勾选父节点(默认) 2: 只允许勾选子节点
      checkType: {
        default: 1
      },
      // 是否多选 true: 是多选(默认) false: 单选
      multiple: {
        default: true
      },
      navData: {
        default: ''
      },
      loading: {
        default: '数据载入中...'
      },
      // 树形标题
      treeTitle: {
        default: ''
      },
      // 已选中结果
      result: {
        default: function () {
          return [];
        }
      },
      funSearch: {
        default: function () {
          return function () {
            //
          };
        }
      }
    },
    watch: {
      result: function (val) {
        window.initResult = null;
        this.emitResultEvent(val);
      }
    },
    computed: {
      // 
    },
    beforeDestroy: function () {
      window.initResult = null;
      window.EVENTBUS.$off('checked', this.multiple ? this.toggleResult : this.toggleOneResult);
    },
    mounted: function () {
      let _this = this;

      this.initEventbus();
      this.active = 0;
      setTimeout(function () {
        _this.clkSearch(function () {
          _this.emitResultEvent(_this.result);
        }, 'nav');
      }, 0);
      // 监听
      window.EVENTBUS.$on('checked', this.multiple ? this.toggleResult : this.toggleOneResult);
    },
    methods: {
      initEventbus: function () {
        if (!window.EVENTBUS) {
          let Vue = require('vue');
          
          window.EVENTBUS = new Vue();
        }
      },
      clkCancel: function () {
        this.$emit('input', false);
      },
      clkConfirm: function () {
        this.$emit('callback', JSON.parse(this.utlRemoveCustChart(JSON.stringify(this.resultSources))));
        this.clkCancel();
      },
      clkNav: function (index) {
        this.search = '';
        this.results = [];
        this.resultSources = [];
        this.searchData = [];
        this.active = index;
        this.clkSearch('', 'nav');
      },
      clkSearch: function (callback, from) {
        let _this = this;

        this.showLoading = true;
        this.showTree = false;
        this.showSearchData = false;
        this.showEmpty = false;
        // this.searchData = [];

        if (from !== 'nav' && !this.search) {
          // 还原， 隐藏搜索结果，显示树形数据
          this.showLoading = false;
          this.showEmpty = false;
          this.showSearchData = false;
          this.showTree = true;
          return;
        }

        this.funSearch({ search: this.search, navIndex: this.active }, function (result) {
          _this.showLoading = false;
          if (result.searchData) {
            _this.searchData = result.searchData;
            _this.showSearchData = true;
          }
          if (result.treeData) {
            _this.treeData = result.treeData;
            _this._treeData = JSON.parse(JSON.stringify(result.treeData));
            _this.showTree = true;
          }
          if (_this.search && (!result.searchData || result.searchData.length === 0)) {
            // 搜索结果是空
            _this.showEmpty = true;
          } else if (!_this.search && (!result.treeData || result.treeData.length === 0)) {
            // 树形数据是空
            _this.showEmpty = true;
          }
          (typeof callback === 'function') && callback();
        });
      },
      toggleResult: function (data) {
        let hasChildren = data.children && data.children.length > 0;
        let checked = data.checked;
        let _data = JSON.stringify(data);

        // 返回类型 1: 全部返回 2: 只返还回子节点
        if (this.returnType === 2 && hasChildren) {
          return;
        }
        // 去除checked、opened字段
        _data = this.utlRemoveCustChart(_data);
        
        let index = this.results.indexOf(_data);
        
        if (checked && index < 0) {
          // 添加
          this.results.push(_data);
          this.resultSources.push(data);
        } else if (!checked && index >= 0) {
          // 删除
          this.results.splice(index, 1);
          this.resultSources.splice(index, 1);
        }
      },
      // 单选结果
      toggleOneResult: function (data) {
        let _this = this;
        let checked = data.checked;
        let _data = JSON.stringify(data);

        // 去除checked、opened字段
        _data = this.utlRemoveCustChart(_data);
        
        let index = this.results.indexOf(_data);
        
        if (checked && index < 0) {
          // 添加 this.maxCount  保留最后面n个，其他全部设置checked=false 并移除
          
          this.results.push(_data);
          this.resultSources.push(data);

          let _index = this.results.length - this.maxCount;

          if (_index > 0) {
            this.results.splice(0, _index);
            let delArr = this.resultSources.splice(0, _index);
            
            for (let i = 0;i < delArr.length;i++) {
              _this.$set(delArr[i], 'checked', false);
            }
          }
        } else if (!checked && index >= 0) {
          // 删除
          this.results.splice(index, 1);
          this.resultSources.splice(index, 1);
        }
      },
      clkDelItem: function (index) {
        let itemSource = this.resultSources[index];

        this.$set(itemSource, 'checked', false);

        // if (!this.multiple) {
        this.results.splice(index, 1);
        this.resultSources.splice(index, 1);
        // }
      },
      clkClearTreeItem: function () {
        if (this.results.length < 40) {
          // 一一删除法
          let _this = this;
          let arr = this.resultSources;

          for (let i = 0;i < arr.length;i++) {
            setTimeout(function () { 
              _this.clkDelItem(0); 
              if (arr.length <= 1) {
                // console.log('清除完成');
              }
            }, 10);
          }
        } else {
          // 使用备份数据还原法
          this.treeData = [];
          this.results = [];
          this.resultSources = [];
          this.$nextTick(function () {
            this.treeData = JSON.parse(JSON.stringify(this._treeData));
          });
        }
      },
      // 用户自定义结果集
      emitResultEvent: function (data) {
        if (data && data.length > 0) {
          // 控制最大数量
          if (data.length > this.maxCount) {
            data.splice(this.maxCount);
          }
          let itv = setInterval(function () {
            if (window.initResult === 'received') {
              clearInterval(itv);
            } else {
              window.EVENTBUS.$emit('initResult', data);
            }
          }, 1000);
        }
      },
      utlRemoveCustChart: function (str) {
        return str.replace(/,"checked":true/g, '').replace(/,"checked":false/g, '').replace(/,"opened":true/g, '').replace(/,"opened":false/g, '');
      }
    }
  };
</script>

<style lang="scss">
  .wrap-selector > div > .p-l > .input > input {
    border-radius: 4px;
  }
  .wrap-selector > div > .p-l > .input > input:focus {
    border-color: #ddd!important;
  }
  
  .wrap-selector .checkbox > i {
    background-color: #F8F4F4!important;
  }
  .wrap-selector .checkbox > i.cicon-tick-cbdr {
    border-color: #0079FF!important;
    background-color: #0079FF!important;
  }

  // 列表样式
  .wrap-selector .lst-1 {
    width: 100%;
  }
  .wrap-selector .lst-1 > li {
    position: relative;
    padding: 5px 0;
    padding-right: 18px;
  }
  .wrap-selector .lst-1 > li > img {
    display: inline-block;
    margin-right: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .wrap-selector .lst-1 > li > span {
    display: inline-block;
    width: calc(100% - 20px - 30px);
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
  .wrap-selector .lst-1 > li > .cicon-cross-chr {
    position: absolute;
    margin: auto;
    top: 0;
    right: 18px;
    bottom: 0;
    font-size: 26px;
    color: #ccc;
    cursor: pointer;
  }

  // 左侧树形列表样式
  .wrap-selector > div > .p-l > .wrap-tree {
    white-space:nowrap;
  }
  .wrap-selector > div > .p-l > .wrap-tree ul {
    float: left;
    min-width: 100%;
  }
  .wrap-selector > div > .p-l > .wrap-tree li {
    position: relative;
    // height: 30px;
    overflow: hidden;
  }
  // 层级缩进
  .wrap-selector > div > .p-l > .wrap-tree > ul > li {
    text-indent: 0px;
    // 第2层
    > ul > li { 
      text-indent: 14px; 
      // 第3层
      > ul > li { 
        text-indent: calc(14px * 2);
        // 第4层
        > ul > li { 
          text-indent: calc(14px * 3);
          // 第5层
          > ul > li { 
            text-indent: calc(14px * 4);
            // 第6层
            > ul > li { 
              text-indent: calc(14px * 5);
              // 第7层
              > ul > li { 
                text-indent: calc(14px * 6);
                // 第8层
                > ul > li { 
                  text-indent: calc(14px * 7);
                  // 第9层
                  > ul > li { 
                    text-indent: calc(14px * 8);
                    // 第10层
                    > ul > li { 
                      text-indent: calc(14px * 9);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .wrap-selector > div > .p-l > .wrap-tree li.active:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    z-index: 1;
    background-color: yellow;
  }
  .wrap-selector > div > .p-l > .wrap-tree li > .wrap-arrow {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 30px;
    vertical-align: middle;
    text-indent: 0;
    z-index: 2;
    
    > .cicon-triangle {
      margin-top: 8px;
      font-size: 14px;
      color: #999;
      transition: width .2s;
      cursor: pointer;
    }
  }
  // 搜索内容 列表中去掉箭头样式
  .wrap-selector > div > .p-l > .wrap-tree .wrap-seach > li > .wrap-arrow {
    width: 1px;
  }
  .wrap-selector > div > .p-l > .wrap-tree li > .wrap-check {
    position: relative;
    display: inline-block;
    margin-right: 0;
    width: 22px;
    height: 16px;
    vertical-align: middle;
    text-indent: 0;
    z-index: 2;
  }
  .wrap-selector > div > .p-l > .wrap-tree li > .wrap-avator {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    text-indent: 0;
    border-radius: 50%;
    image-rendering: -webkit-optimize-contrast;
    z-index: 2;
  }
  .wrap-selector > div > .p-l > .wrap-tree li > .wrap-text {
    position: relative;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    text-indent: 0;
    z-index: 2;
  }
  .wrap-selector > div > .p-l > .wrap-tree li.open {
    // height: unset;
    > .wrap-arrow > .cicon-triangle {
      transform: rotate(90deg);
    }
  }
</style>
<style scoped lang="scss">
  .wrap-selector {
    position: fixed;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 600px;
    height: 500px;
    font-size: 12px;
    border-color: #eee;
    background-color: #fff;
    user-select: none;
    // border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 3;
  }

  // 布局
  .wrap-selector > header {
    position: relative;
    padding: 0 20px;
    height: 50px;
    border-bottom: solid 1px;
    border-color: inherit;
  }
  .wrap-selector > div {
    position: relative;
    height: calc(100% - 50px - 60px);
  }
  .wrap-selector > div > section {
    position: relative;
    float: left;
    padding-top: 20px;
    padding-left: 20px;
    width: 50%;
    height: 100%;
  }
  .wrap-selector > div > section:first-of-type {
    width: calc(50% - 1px);
    border-right: solid 1px #ddd;
  }
  .wrap-selector > footer {
    position: relative;
    padding: 0 20px;
    height: 60px;
    border-top: solid 1px;
    border-color: inherit;
  }

  // header样式
  .wrap-selector > header {
    line-height: 50px;
    font-size: 14px;
    font-weight: 400;
  }
  .wrap-selector > header > .cicon-cross-chr {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
    font-size: 36px;
    color: #999;
  }

  // 底部样式
  .wrap-selector > footer {
    text-align: right;
  }
  .wrap-selector > footer > .button {
    margin-left: 10px;
    margin-top: 15px;
    border-radius: 2px;
  }
  .wrap-selector > footer > .button.confirm {
    background-color: #0079FF;
  }

  // 右侧样式
  .wrap-selector > div > .p-r > .btn-clear {
    float: right;
    margin-right: 20px;
    color: #ff5e5e;
    cursor: pointer;
  }
  .wrap-selector > div > .p-r > .btn-clear:hover {
    text-decoration: underline;
  }
  .wrap-selector > div > .p-r > .ps-container {
    margin-top: 14px;
    height: calc(100% - 18px - 14px);
  }

  // 左侧样式
  .wrap-selector > div > .p-l > .input {
    margin-bottom: 20px;
    width: calc(100% - 20px);
  }
  .wrap-selector > div > .p-l > .input > .btn-search {
    position: absolute;
    margin: auto;
    top: 0;
    right: 1px;
    bottom: 0;
    width: 34px;
    height: 32px;
    border-left: solid 1px #ddd;
    border-radius: 0 4px 4px 0;
    background-color: #F5F6F7;
  }
  .wrap-selector > div > .p-l > .input > .btn-search > .cicon-search-cpt-chr {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 24px;
    color: #999;
  }
  // 左侧样式 - 导航样式
  .wrap-selector > div > .p-l > .nav {
    margin-bottom: 10px;
    width: calc(100% - 20px);
    border-radius: 4px;
    background-color: #eee;
    overflow: hidden;
  }
  .wrap-selector > div > .p-l > .nav > li {
    float: left;
    padding: 8px 0;
    width: 33.33%;
    text-align: center;
    cursor: pointer;
  }
  .wrap-selector > div > .p-l > .nav > li.active {
    color: #fff;
    background-color: #0079FF;
  }
  // 左侧样式 - 空列表展示样式
  // 左侧样式 - 加载动画样式
  .wrap-selector > div > .p-l > .empty,
  .wrap-selector > div > .p-l > .loading {
    margin-top: 40px;
    width: calc(100% - 20px);
    text-align: center;
    color: #ddd;
  }
  // 左侧样式 - 树形标题
  .wrap-selector > div > .p-l .tree-title {
    height: 30px;
    line-height: 30px;
    white-space: nowrap;
  }
  // 左侧样式 - 列表样式
  .wrap-selector > div > .p-l > .ps-container {
    padding-bottom: 14px;
  }
  

  @keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}
  @keyframes zoomOut{0%{opacity:1}50%{opacity:0;transform:scale3d(.3,.3,.3)}to{opacity:0}}
  
  .slide-fade-enter-active {
    animation: zoomIn .5s;
  }

  .slide-fade-leave-active {
    animation: zoomOut .5s;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    // right: -410px;
  }
</style>