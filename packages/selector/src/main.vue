<!-- 
功能介绍：
children: 如果没有子节点，最好设置为null 
opened: 隐藏、显示子节点, 
checked: 是否勾选中, 
nocheckbox: 是否需要复选框,
disabled: 禁选,
required: 必填，无法取消
树型数据格式：{id: 'id需要保持唯一', name: '文本', img: '头像', children: null, opened: false, checked: false, nocheckbox: false, disabled: false, required: false}
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
          <!-- 搜索框 -->
          <cmp-input v-model="keyword" clear="false" :maxlength="maxlength" :placeholder="placeholder" @enter="clkSearch">
            <i class="btn-search" slot="right" @click="clkSearch"><i class="cicon-search-cpt-chr" slot="right"></i></i>
          </cmp-input>
          <!-- 导航 -->
          <ul class="nav" v-if="navData&&navData.length>1">
            <li v-for="(info,index) in navData" :key="'nav_'+index" :class="{'theme-b':active===index}" @click="clkNav(index)" @dblclick="dbclkNav(index)">{{info.text}}</li>
          </ul>
          <!-- 没有找到相关数据 -->
          <div class="empty" v-show="showEmpty"><img :src="empty"><br>没有找到相关数据</div>
          <!-- 数据展示区 -->
          <vperfect-scrollbar class="wrap-tree" v-show="showTree" :settings="{wheelSpeed:0.5}" :style="{height:'calc(100% - 34px - 20px - '+(navData&&navData.length>1?'32px - 10px':'0px')+' - 2px)'}">
            <template v-for="(item,index) in navData_p">
              <!-- 分页类型的 树形结构 -->
              <cmp-ul v-if="item.type==='singleTree'" :key="'tree_data_'+index" v-show="!showEmpty&&!showSearchData&&active===index" :data="item.treeData" :maxCount="maxCount" :results="results" :multiple="multiple" :nextIcon="nextIcon" :search="item.search" :funAsynChild="item.funAsynChild" @callback_checkbox="callbackCheckbox"></cmp-ul>
              <!-- 缩进类型的 树形结构 -->
              <ul v-else :key="'tree_data_'+index" v-show="!showEmpty&&!showSearchData&&active===index">
                <cmp-li v-for="(lineData,index) in item.treeData" :key="lineData.id+'_'+index" :data="lineData" :maxCount="maxCount" :results="results" :multiple="multiple" :search="item.search" @callback_checkbox="callbackCheckbox"></cmp-li>
              </ul>
            </template>
            <!-- 搜索内容区域 <template>
              <cmp-ul v-if="navData_p[active]&&navData_p[active].type==='singleTree'&&searchData" v-show="showSearchData" :data="searchData" :maxCount="maxCount" :results="results" :multiple="multiple" :search="navData_p[active].search" :nextIcon="nextIcon" @callback_checkbox="callbackCheckbox"></cmp-ul>
              <ul v-else-if="searchData" v-show="showSearchData">
                <cmp-li v-for="(lineData,index) in searchData" :key="'search_'+lineData.id+'_'+index" :data="lineData" :maxCount="maxCount" :results="results" :multiple="multiple" :search="navData_p[active].search" @callback_checkbox="callbackCheckbox"></cmp-li>
              </ul>
            </template> -->
          </vperfect-scrollbar>
        </section>
        <section class="p-r">
          已选择
          <template v-if="multiple&&maxCount||maxCount===0"> ({{results.length}}/{{maxCount}}) </template>
          <span class="btn-clear" @click="clkClearResult">清空</span>
          <vperfect-scrollbar :settings="{wheelSpeed:0.5,suppressScrollX:true}">
            <ul class="lst-1"> 
              <li v-for="(item,index) in results" :key="'result_'+index">
                <img v-if="item.img" :src="item.img">
                <span>{{item.name}}</span>
                <i class="cicon-cross-chr" @click="clkDelItem(index)"></i>
              </li>
            </ul>
          </vperfect-scrollbar>
        </section>
      </div>
      <footer>
        <cmp-button class="confirm theme-b" @click="clkConfirm">确认</cmp-button>
        <cmp-button theme="line" @click="clkCancel">取消</cmp-button>
      </footer>
      <!-- 加载中 -->
      <div class="loading" v-show="showLoading">
        <i class="cicon-loading move-loop"><span /><span /><span /></i>
        {{loading}}
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import Button from '../../button/src/main.vue';
  import Input from '../../input/src/main.vue';
  import Checkbox from '../../checkbox/src/main.vue';
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import Li from './list.vue';
  import Ul from './singleList.vue';

  export default {
    name: 'Selector',
    components: {
      'cmpButton': Button,
      'cmpInput': Input,
      'cmpCheckbox': Checkbox,
      'vperfect-scrollbar': VuePerfectScrollbar,
      'cmpLi': Li,
      'cmpUl': Ul
    },
    props: {
      value: {
        default: ''
      },
      headTitle: {
        default: '选择器'
      },
      // 默认头像
      avatar: {
        default: require('./images/avatar.png')
      },
      // 空列表展示图片
      empty: {
        default: require('./images/empty.png')
      },
      // 下级按钮图标字体
      nextIcon: '',
      // 搜索框占位符
      placeholder: {
        default: '请输入关键字查询'
      },
      // 搜索框长度
      maxlength: {
        default: 14
      },
      // 最大选中结果数量
      maxCount: '',
      // 数据加载中 文本提示内容
      loading: {
        default: '加载中...'
      },
      // 是否多选 true: 是多选(默认) false: 单选
      multiple: {
        default: true
      },
      // 导航数组，[{text: '组织架构', funSearch: ''}]
      navData: {
        default: function () {
          return [{
            text: '组织架构', 
            // 异步获取子节点
            funAsynChild: '',
            // 搜索方法 - 为空则表示内部搜索
            funSearch: ''
          }];
        }
      },
      // 已选中结果
      result: {
        default: function () {
          return [];
        }
      },
      // 方法 - 获取树结构数据
      funTreeData: {
        default: function () {
          return function () {
            // 
          };
        }
      }
    },
    data: function () {
      return {
        id: 'selector_' + new Date().getTime() + parseInt(Math.random() * 100),
        navData_p: this.navData,
        // 当前导航激活项
        active: '',
        // 搜索关键字
        keyword: '',
        // 是否显示加载中
        showLoading: false,
        // 是否显示空展示
        showEmpty: false,
        // 是否显示树形
        showTree: true,
        // 是否显示搜索内容
        showSearchData: false,
        // 搜索内容数据
        searchData: [],
        // 选中结果
        results: []
      };
    },
    watch: {
      result: function (val) {
        this.results = this.filterResultData(val);
        this.emitNodeCheckStatus(val);
      }
    },
    computed: {
      // 
    },
    beforeDestroy: function () {
      this.$eventbus.$off('clearTreeItem', this.clkClearResult);
    },
    mounted: function () {
      this.results = this.filterResultData(this.result);
      // 设置默认导航激活项
      this.clkNav(0);
      this.$eventbus.$on('clearTreeItem', this.clkClearResult);
    },
    methods: {
      // 关闭窗口
      clkCancel: function () {
        this.$emit('input', false);
      },
      // 搜索
      clkSearch_bf: function () {
        let _this = this;
        let navItem = this.navData_p[this.active];

        this.showLoading = true;
        if (this.keyword && this.keyword.length > 0 && navItem.funSearch && typeof navItem.funSearch === 'function') {
          // 调用搜索接口
          navItem.funSearch(this.keyword, function (ret) {
            _this.showLoading = false;
            _this.showSearchData = true;
            _this.searchData = ret;
          });
        } else if (this.keyword && this.keyword.length > 0) {
          // 内部搜索
          _this.searchData = (function (data) {
            data = JSON.parse(JSON.stringify(data));
            data.filter(function (item) {
              return item.name.indexOf(_this.keyword) >= 0;
            });
            return data;
          }(navItem.treeData));
          _this.showLoading = false;
        } else {
          // 无关键字
          this.keyword = '';
          this.searchData = [];
          this.showSearchData = false;
          this.showEmpty = false;
          this.showLoading = false;
        }
      },
      // 搜索
      clkSearch: function () {
        let _this = this;
        let navItem = this.navData_p[this.active];

        this.showLoading = true;
        this.showEmpty = false;
        if (this.keyword && this.keyword.length > 0 && navItem.funSearch && typeof navItem.funSearch === 'function') {
          // 调用搜索接口
          navItem.funSearch(this.keyword, function (ret) {
            _this.showLoading = false;
            if (ret) {
              // 备份数据
              if (!navItem.hasOwnProperty('_treeData')) {
                navItem._treeData = navItem.treeData;
              }
              _this.$set(navItem, 'treeData', ret);
              _this.$set(navItem, 'search', _this.keyword);
            } else {
              // 没有匹配到
              _this.showEmpty = true;
            }
          });
        } else if (this.keyword && this.keyword.length > 0) {
          // 内部搜索
          // 先全局匹配下，有的话在进行局类搜索
          if (new RegExp('"name":"[^"]*' + this.keyword + '[^"]*"').test(JSON.stringify(navItem.treeData))) {
            this.$set(navItem, 'search', this.keyword);
          } else {
            // 没有匹配到
            this.showEmpty = true;
          }
          this.showLoading = false;
        } else {
          // 无关键字, 还原数据
          if (navItem.hasOwnProperty('_treeData')) {
            this.$set(navItem, 'treeData', navItem._treeData);
            delete navItem._treeData;
          }          
          this.$set(navItem, 'search', '');
          this.keyword = '';
          this.searchData = [];
          this.showSearchData = false;
          this.showLoading = false;
          this.showEmpty = false;
        }
      },
      // 导航点击切换
      clkNav: function (index) {
        let _this = this;
        let navItem = this.navData_p[index];

        this.keyword = navItem.search || '';
        // this.$set(navItem, 'search', '');
        this.showEmpty = false;
        this.showSearchData = false;
        this.active = index;
        if (navItem.treeData === null) {
          this.showEmpty = true;
        } else if (typeof navItem.treeData === 'undefined') {
          // 没有数据，需要获取
          this.showLoading = true;
          this.funTreeData(navItem, function (data) {
            if (data === null || data.length === 0) {
              _this.showEmpty = true;
            }
            _this.$set(_this.navData_p[index], 'treeData', data || null);
            _this.showLoading = false;
            setTimeout(function () {
              _this.emitNodeCheckStatus(_this.results);
            }, 1000);
          });
        }
      },
      // 双击导航，刷新数据
      dbclkNav: function (index) {
        let _this = this;
        let navItem = this.navData_p[index];

        this.showLoading = true;
        this.funTreeData(navItem, function (data) {
          if (data === null || data.length === 0) {
            _this.showEmpty = true;
          }
          _this.$set(_this.navData_p[index], 'treeData', data || null);
          _this.showLoading = false;
          setTimeout(function () {
            _this.emitNodeCheckStatus(_this.results);
          }, 1000);
        });
      },
      // 清空选中结果
      clkClearResult: function () {
        let arr = JSON.parse(JSON.stringify(this.results));

        this.results = [];
        this.emitNodeCheckStatus(arr);
      },
      // 删除选中结果 - 行
      clkDelItem: function (index) {
        let item = this.results.splice(index, 1);

        this.emitNodeCheckStatus(item);
      },
      // 确认
      clkConfirm: function () {
        this.$emit('callback', this.results);
        this.clkCancel();
      },
      // checkbox点击回调
      callbackCheckbox: function (data) {
        // 删除子节点
        data = JSON.parse(JSON.stringify(data));
        data.children = null;

        if (data.checked) {
          let has = JSON.stringify(this.results).indexOf('"id":' + ((typeof data.id === 'string') ? ('"' + data.id + '"') : data.id));

          has === -1 && this.results.push(data);
        } else {
          this.results = this.results.filter(item => {
            return item.id !== data.id;
          });
        }
      },
      // 通知节点更新选中状态
      emitNodeCheckStatus: function (arr) {
        arr.forEach(item => {
          this.$eventbus.$emit('changeResult' + item.id, this.results);
        });
      },
      // 过滤选中结果数量
      filterResultData: function (results) {
        let ret = results;

        if (!isNaN(this.maxCount)) {
          ret = results.slice(0, this.multiple ? this.maxCount : 1);
        }
        return ret;
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
    // white-space:nowrap;
  }
  .wrap-selector > div > .p-l > .wrap-tree ul {
    float: left;
    min-width: 100%;
  }
  .wrap-selector > div > .p-l > .wrap-tree li {
    position: relative;
    padding-right: 10px;
    // height: 30px;
    white-space: nowrap;
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
    background-color: #cbe3f2;
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
    display: flex;
    flex-shrink: 0;
    margin-bottom: 10px;
    width: calc(100% - 20px);
    border-radius: 4px;
    background-color: #eee;
    overflow: hidden;
  }
  .wrap-selector > div > .p-l > .nav > li {
    flex: 1;
    // float: left;
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
  .wrap-selector > div > .p-l > .empty {
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
  .wrap-selector > div > .p-l > .ps-container > ul {
    padding-bottom: 14px;
  }
  // 加载动画样式
  .wrap-selector > .loading {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 100px;
    height: 100px;
    text-align: center;
    border-radius: 8px;
    font-size: 14px;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    z-index: 11;

    > .cicon-loading {
      display: block;
      margin: 0 auto;
      margin-top: 20px;
      margin-bottom: 6px;
      font-size: 30px;
    }
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