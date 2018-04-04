<template>
  <div class="selector" v-show="sshow" @click.stop="">
    <div class="s-organization-bg" ></div>
    <main class="s-organization">
      <header>
        <div v-if="type === 1">选择成员和部门</div>
        <div v-if="type === 2">选择部门</div>
        <div v-if="type === 3 || type === 5">选择成员</div>
        <div v-if="type === 4">选择群组人员</div>
        <svg class="icon" aria-hidden="true" @click="quitSelector">
          <use xlink:href="#icon-delete"></use>
        </svg>
      </header>
      <section>
        <div class="left">
          <div class="search">
            <input type="text" placeholder="请输入关键字查询" v-model="search.value" @blur="blur" @focus="focus"/>
            <svg class="icon" aria-hidden="true" v-if="search.show">
              <use xlink:href="#icon-search"></use>
            </svg>
            <svg class="icon delete" aria-hidden="true" v-else-if="!search.show" @click="cancelSearchInput">
              <use xlink:href="#icon-eraser"></use>
            </svg>
          </div>
          <div class="department" v-if="search.show" ref="department">
            <span v-if="inputType && deptId == 0 && type === 2" @click="changeToEnter(0, title[0])">单位通讯录</span>
            <!--<span v-if="inputType && deptId == 0 && type === 2" @click="changeToEnter()">单位通讯录</span>-->
            <template v-for="(item, index) in title">
              <div v-if="index !== 0">></div>
              <!--<span v-on:click="changeEnterToDept(index, item)" v-if="inputType && deptId && type === 2">{{item.deptName}}</span>-->
              <span v-on:click="changeDept(index, item)">{{item.deptName}}</span>
            </template>
          </div>
          <dt v-if="search.content_show && !inputType" :class="!search.show ? 'active' : ''">
            <span class="cbk-wrap">
              <input id="sla" type="checkbox" v-on:change="checkAllBox" v-model="checkAll">
              <label for="sla" class="cmpIconfont"></label>
            </span>
            <label>全选</label>
          </dt>
          <vue-perfect-scrollbar id="vpscrollbar" ref="vpscrollbar" v-show="search.content_show" :class="(!search.show || inputType) ? 'active' : ''">
            <dl v-if="data">
              <dd v-for="item in data.children" :key="item.deptId" v-if="type !== 5">
                <!-- <input type="checkbox" :id="item.deptId" :value="item" v-model="selects" @change="change($event, item)"  v-if="type === 1 || type === 2"/> -->
                <template v-if="type === 1 || type === 2">
                  <span class="cbk-wrap" v-if="!inputType && (item.manager === undefined || item.manager)">
                    <input type="checkbox" :id="item.deptId" :value="item" v-model="selects" @change="change1($event, item)"/>
                    <label :for="item.deptId" class="cmpIconfont"></label>
                  </span>
                  <span class="radio-wrap cs2" v-if="(inputType && forbiddenDeptId.indexOf(item.deptId) < 0) && (item.manager === undefined || item.manager)">
                    <input type="radio" name="radio-wrap" :id="item.deptId" :value="item" v-model="selects2"/>
                    <label :for="item.deptId" class="cmpIconfont" v-on:click="deptNameSelect(item)"></label>
                  </span>
                  <!--<span class="radio-wrap cs" v-else-if="inputType && deptId && type === 2 && (item.manager || item.manager === undefined) && !selectEnterFlag">-->
                    <!--<input type="radio" name="radio-wrap" :id="item.deptId" :value="item" v-model="selects2"/>-->
                    <!--<label :for="item.deptId" class="cmpIconfont" v-on:click="deptNameSelect(item)"></label>-->
                  <!--</span>-->
                  <!--<span class="radio-wrap cs1" v-else-if="inputType && deptId && type === 2 && (item.manager || item.manager === undefined) && selectEnterFlag">-->
                    <!--<input type="radio" name="radio-wrap" :id="item.id" :value="item" v-model="selects2"/>-->
                    <!--<label :for="item.id" class="cmpIconfont" v-on:click="deptNameSelect(item)"></label>-->
                  <!--</span>-->
                </template>

                <i v-if="type === 3 || (inputType && forbiddenDeptId.indexOf(item.deptId) >= 0) || (deptId && type === 4) || (!item.manager && item.manager !== undefined)"></i>
                <svg class="icon" aria-hidden="true" >
                  <use xlink:href="#icon-split"></use>
                </svg>
                <span v-if="(inputType && forbiddenDeptId.indexOf(item.deptId) < 0) && (item.manager === undefined || item.manager) && !selectEnterFlag" v-on:click="deptNameSelect(item)" style="cursor: pointer;">{{item.deptName}}</span>
                <span v-else-if="inputType && deptId == 0 && type === 2 && selectEnterFlag" v-on:click="deptNameSelect(item)" style="cursor: pointer;">{{item.enterName}}</span>
                <span v-else-if="item.parentDeptNameList && item.parentDeptNameList.length > 0 && type === 2">
                  {{reverdata(item.parentDeptNameList)}}
                  {{item.deptName}}
                </span>
                <span v-else>{{item.deptName}}</span>
                <div v-on:click="nextDept(item)" :class="(item.show || item.show === undefined) ? '' : 'unclick'" v-if="(type === 2 && item.children) || type !== 2" v-show="!(inputType && forbiddenDeptId.indexOf(item.deptId) >= 0)">
                  <svg class="icon" aria-hidden="true" v-show="item.show || item.show === undefined">
                    <use xlink:href="#icon-sub1"></use>
                  </svg>
                  <img src="../../../src/images/unclick.png" v-show="!item.show && item.show !== undefined">
                  <span>下级</span>
                </div>
                <div v-on:click="nextDept(item)" :class="(item.show || item.show === undefined) ? '' : 'unclick'" v-else-if="type === 2 && deptId == 0 && inputType && item.children">
                  <svg class="icon" aria-hidden="true" v-show="item.show || item.show === undefined">
                    <use xlink:href="#icon-sub1"></use>
                  </svg>
                  <img src="../../../src/images/unclick.png" v-show="!item.show && item.show !== undefined">
                  <span>下级</span>
                </div>
                <div v-on:click="changeEnterToDept()" :class="(item.show || item.show === undefined) ? '' : 'unclick'" v-else-if="type === 2 && deptId == 0 && inputType && selectEnterFlag">
                  <svg class="icon" aria-hidden="true" v-show="item.show || item.show === undefined">
                    <use xlink:href="#icon-sub1"></use>
                  </svg>
                  <img src="../../../src/images/unclick.png" v-show="!item.show && item.show !== undefined">
                  <span>下级</span>
                </div>
              </dd>

              <dd v-for="item in data.users" v-if="type === 1 || type === 3 || type === 4 || deptId || type === 5" :key="item.userNumber">
                <!-- <input type="checkbox" :id="item.userNumber" :value="item" v-model="selects1" @change="change($event, item)"> -->
                <span class="cbk-wrap" v-if="!inputType">
                  <input type="checkbox" :id="item.userNumber" :value="item" v-model="selects1" @change="change1($event, item)">
                  <label :for="item.userNumber" class="cmpIconfont"></label>
                </span>
                <span class="radio-wrap" v-if="inputType">
                    <input type="radio" name="radio-wrap" :id="item.userNumber" :value="item" v-model="selects2"/>
                    <label :for="item.userNumber" class="cmpIconfont"></label>
                  </span>
                <img :src="item.avatar || defaultUrl"/>
                <span>{{item.realName}}</span>
              </dd>
            </dl>
            <div v-else-if="!data || data.length <= 0">
              <img src="../../../src/images/no-data.jpg">
              <p>没有找到相关数据</p>
            </div>
          </vue-perfect-scrollbar>

        </div>
        <div class="right">
          <p>
            <span v-if="type === 1">已选择的成员和部门</span>
            <span v-if="type === 2">已选择的部门</span>
            <span v-if="type === 3 || type === 5">已选择的成员</span>
            <span v-if="type === 4">已选择的群组成员</span>
            <i @click="clearAllSelect()">清空</i>
          </p>
          <vue-perfect-scrollbar>
            <dl v-if="!inputType">
              <template v-for="(item, index) in selects" >
                <dd>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-split"></use>
                  </svg>
                  <span>{{item.deptName}}</span>
                  <div @click="clearOne('dept', index, item)">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-delete"></use>
                    </svg>
                  </div>
                </dd>
              </template>
              <template v-for="(item, index) in selects1">
                <dd>
                  <img :src="item.avatar || defaultUrl"/>
                  <span>{{item.realName}}</span>
                  <div @click="clearOne('user', index)">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-delete"></use>
                    </svg>
                  </div>
                </dd>
              </template>


            </dl>
            <dl v-else>
              <template v-if="selects2.deptId">
                <dd>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-split"></use>
                  </svg>
                  <span>{{selects2.deptName}}</span>
                  <div @click="clearOne('radio')">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-delete"></use>
                    </svg>
                  </div>
                </dd>
              </template>
              <template v-else-if="selects2.id">
                <dd>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-split"></use>
                  </svg>
                  <span>{{selects2.enterName}}</span>
                  <div @click="clearOne('radio')">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-delete"></use>
                    </svg>
                  </div>
                </dd>
              </template>
              <template v-else-if="selects2.userNumber">
                <dd>
                  <img :src="selects2.avatar || defaultUrl"/>
                  <span>{{selects2.realName}}</span>
                  <div @click="clearOne('radio')">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-delete"></use>
                    </svg>
                  </div>
                </dd>
              </template>


            </dl>
          </vue-perfect-scrollbar>
        </div>
      </section>
      <footer>
        <s-button text="取消" theme="cancel" @click="quitSelector"></s-button>
        <s-button text="确认" @click="confirmSelect"></s-button>
      </footer>
    </main>
  </div>



</template>

<script>
  import '../../../src/fonts/iconfont.js';
  import Button from '../../button/src/main.vue';
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  // import {ajaxGetManageableTree, ajaxSearchEnterprise, ajaxDepartMembers} from '../../../src/util/ajax';
  import {ajaxGetManageableTree, ajaxSearchEnterprise, ajaxDepartMembers, ajaxGetEnterList, ajaxGetEnterGroupMember, ajaxGetDeptGroupMember} from '../data/ajax';
  export default {
    name: 'Selector',
    data () {
      return {
        showCount: 0,
        search: {
          show: true,
          value: '',
          value1: '',
          content_show: true
        },
        type: this.stype,
        sshow: this.show,
        checkAll: false,
        title: [],
        selects: this.depts,
        selects1: this.users,
        selects2: '',
        data: [],
        defaultUrl: require('../images/avatar.png'),
        selectEnterFlag: false,
        searchInterval: ''
      };
    },
    components: {
      VuePerfectScrollbar,
      SButton: Button
    },
    watch: {
      'show' (newVal) {
        this.sshow = newVal;
        if (newVal) {
          this.showCount = this.showCount + 1;
        }
      },
      'loginUser' (newVal) {
        ajaxGetManageableTree(newVal, this.getDeptData);
      },
      'depts' (newVal) {
        this.selects = newVal;
        this.backFill('depts', this.data.children);
      },
      'users' (newVal) {
        this.selects1 = newVal;
        this.backFill('users', this.data.users);
      },
      'inputType' (newVal) {
        var _this = this;

        setTimeout(function () {
          try {
            var container = document.getElementById('vpscrollbar');

            container.classList.add('ps');
            container.classList.add('ps--theme_default');
            if (newVal && _this.type !== 2) {
              _this.changeScrollHeight('2');
            }
          } catch (e) {
            console.log(e);
          }

        }, 20);

      },
      'stype' (newVal) {
        this.type = newVal;
      },
      'showCount' (newVal) {
        this.$nextTick(function () {
          this.title = [];
          this.freshData();
        });
      }
    },
    props: {
      //  显示和隐藏
      show: {
        type: Boolean,
        default: true
      },
      //  选择器类型 1 全部 2 部门 3 人
      stype: {
        type: [Number],
        default: 2
      },
      //  部门单选
      inputType: {
        type: [Boolean],
        default: false
      },
      // 当前用户信息
      loginUser: {
        type: Object,
        default: function () {
          return {};
        }
      },
      callback: Function,
      depts: {
        type: [Array],
        default: function () {
          return [];
        }
      },
      users: {
        type: [Array],
        default: function () {
          return [];
        }
      },
      //  选择部门的范围 并且 type ！== 4
      deptId: [String],
      //  禁用选择部门 不能进入下一级 及 部门勾选
      forbiddenDeptId: [Array]
    },
    methods: {
      checkAllBox () {
        var _this = this;

        if (this.data.deptId === '0' && this.type === 3 && this.search.show) return;
        if (this.checkAll && (this.data.children || this.data.users)) {
          this.checkAllFunc();

        } else {
          this.removeAllFunc();
          this.data.children.forEach(function (element) {
            _this.$set(element, 'show', true);
          });
        }
      },
      change1 (event, item) {

        if (event.srcElement.checked) {
          this.$set(item, 'show', false);
        } else {
          this.$set(item, 'show', true);
        }
        this.isSelectAll();
      },
      clearAllSelect () {
        if (this.inputType) {
          this.selects2 = {};
          return;
        }
        var _this = this;

        if (this.data && this.data.children) {
          this.data.children.forEach(function (element) {
            _this.$set(element, 'show', true);
          });
        }


        this.selects = [];
        this.selects1 = [];
        this.checkAll = false;
      },
      clearOne (type, index, item) {
        if (type === 'radio') {
          this.selects2 = {};
          return;
        }
        if (type === 'dept') {
          this.selects.splice(index, 1);
          var idx = this.data.children.indexOf(item);

          this.data.children[idx].show = true;
        } else if (type === 'user') {
          this.selects1.splice(index, 1);
        }
        this.isSelectAll();
      },
      nextDept (nextdept) {
        if (nextdept.show === false) return;
        if (this.search.show) {
          this.changeScrollHeight();
        }
        this.data = nextdept;
        this.backFill('depts', nextdept.children);
        this.title.push(this.data);
        if (this.type !== 2) {
          ajaxDepartMembers(this.loginUser, nextdept.deptId, this.getUserData);
        }
      },
      changeDept (index, dept) {
        this.data = dept;
        this.title.splice(index + 1);
        this.changeScrollHeight();
        this.backFill('depts', this.data ? this.data.children : []);
        this.backFill('users', this.data ? this.data.users : []);

      },
      confirmSelect () {
        if (this.inputType) {
          this.callback(JSON.stringify(this.selects2));
        } else {
          this.callback(JSON.stringify(this.selects.concat(this.selects1)));
        }
        this.quitSelector();
      },
      searchInput () {
        var _this = this;

        setTimeout(function () {
          if (!_this.search.value) return;
          if (_this.search.content_show) _this.search.content_show = false;
          if (_this.search.show) _this.search.show = false;

          if ((_this.type !== 4 || _this.type !== 5) && !_this.deptId) {
            ajaxSearchEnterprise(_this.loginUser, _this.search.value, _this.getSelectData);
          } else {
            _this.searchInfoNative(_this.search.value);
          }

        }, 20);
      },
      cancelSearchInput () {

        this.data = Object.assign({}, this.tempData);
        this.title = this.titleData;
        this.search.value = '';
        this.search.show = true;
        var _this = this;

        setTimeout(function () {
          try {
            var container = document.getElementById('vpscrollbar');

            container.classList.add('ps');
            container.classList.add('ps--theme_default');
            setTimeout(function () {
              _this.search.content_show = true;
            }, 21);
          } catch (e) {
            console.log(e);
          }

        }, 20);
        this.isSelectAll();

      },
      focus () {
        if (this.search.show) {
          this.tempData = Object.assign({}, this.data);
          this.titleData = new Array(...this.title);
        }
        this.searchInterval = setInterval(() => {
          if (this.search.value !== this.search.value1) {
            this.search.value1 = this.search.value;
            this.searchInput();
          }
        }, 500);
      },
      blur () {
        var _this = this;

        window.clearInterval(this.searchInterval);
        this.search.value1 = '';
        if (this.search.value.length === 0) {
          this.search.show = true;
          this.data = this.tempData;
          this.title = this.titleData;
          setTimeout(function () {
            var container = document.getElementById('vpscrollbar');

            container.classList.add('ps');
            container.classList.add('ps--theme_default');
            setTimeout(function () {
              _this.search.content_show = true;
            }, 21);
          }, 20);
        }
      },
      getDeptData (value) {
        if (value.result) {
          if (this.type === 4) {
            this.$set(this.data, 'children', []);
            this.$set(this.data, 'users', value.result.resultList);
            this.$set(this.data, 'deptName', '选择群组人员');
            this.title.push(this.data);
            this.backFill('users', value.result.resultList);
            this.changeScrollHeight();
          } else if (this.deptId && (this.type === 3 || this.type === 1 || this.type === 5)) {
            this.data = this.filterDeptById(value.result);
            this.title.push(this.data);
            ajaxDepartMembers(this.loginUser, this.deptId, this.getUserData);
          } else if (this.deptId && this.type === 2) {
            if (this.deptId === '0') {
              this.data = value.result;
              this.$set(this.data, 'users', []);
            } else {
              this.data = this.filterDeptById(value.result);
            }
            this.title.push(this.data);
            this.changeScrollHeight('2');
          } else {
            this.data = value.result;
            this.title.push(this.data);
            this.backFill('depts', value.result.children);
            this.changeScrollHeight();
            if (this.type !== 2 && value.result.parentDeptId !== '0') {
              ajaxDepartMembers(this.loginUser, value.result.deptId, this.getUserData);
            }
          }

        } else {
          this.data = [];
        }
      },
      getUserData (value) {
        if (value.result) {
          this.$set(this.data, 'users', value.result.resultList);
          this.backFill('users', value.result.resultList);
        } else {
          this.$set(this.data, 'users', []);
        }
      },
      getSelectData (value) {
        var _this = this;

        if (value.result) {
          this.$set(this.data, 'users', value.result.enterpriseBuddyAppointVO);
          this.backFill('users', value.result.enterpriseBuddyAppointVO);
          if (_this.type !== 3 && _this.type !== 5) {
            this.$set(this.data, 'children', value.result.departmentInfoAppointVo);
            this.backFill('depts', value.result.departmentInfoAppointVo);
          } else {
            this.$set(this.data, 'children', []);
          }
          setTimeout(function () {
            try {
              var container = document.getElementById('vpscrollbar');

              container.classList.add('ps');
              container.classList.add('ps--theme_default');
              setTimeout(function () {
                _this.search.content_show = true;
              }, 21);
            } catch (e) {
              console.log(e);
            }

          }, 20);
        } else {
          this.$set(this.data, 'children', []);
          this.$set(this.data, 'users', []);
        }
      },
      searchInfoNative (value) {
        let _this = this;
        let arrChildren = [];
        let arrUsers = [];
        let condition = value.trim();


        for (let item of _this.data.children) {
          if (item.deptName.indexOf(condition) >= 0) {
            arrChildren.push(item);
          }
        }


        for (let item1 of _this.data.users) {
          if (item1.realName.indexOf(condition) >= 0) {
            arrUsers.push(item1);
          }
        }


        _this.$set(_this.data, 'children', arrChildren);
        _this.$set(_this.data, 'users', arrUsers);
        _this.backFill('depts', arrChildren);
        _this.backFill('users', arrUsers);
        _this.search.content_show = true;
      },
      getEnterData (value) {
        var tempObj = {};
        var that = this;

        for (let enter of value.result) {
          if (that.loginUser.enterpriseId === enter.id) {
            this.$set(tempObj, 'children', [enter]);
          }
        }
        this.title.splice(0, 0, tempObj);
      },
      quitSelector () {

        this.$emit('quitselector');
        this.sshow = false;
        if (this.search.value.length > 0) {
          this.cancelSearchInput();
          this.changeDept(0, this.data);
        } else if (this.deptId === '0' && this.inputType && this.type === 2 && this.selectEnterFlag) {
          this.changeDept(0, this.title[0]);
          this.changeEnterToDept();
        } else {
          this.changeDept(0, this.title[0]);
        }
        this.clearAllSelect();
        this.changeScrollHeight('1');
      },
      backFill (type, allData) {
        var _this = this;

        if (!allData) return;
        if (type === 'depts' && this.type === 3) { _this.selects = [];return; }
        if (type === 'users' && this.type === 2) { _this.selects1 = [];return; }

        if (type === 'depts' && this.type !== 3) {
          _this.selects.forEach(function (element, index) {
            allData.forEach(function (ele) {
              if (element.deptId === ele.deptId) {
                if (!_this.selects.includes(ele)) {
                  ele.show = false;
                  _this.selects.splice(index, 1, ele);
                }
              }
            });
          });
        } else if (type === 'users' && this.type !== 2) {
          _this.selects1.forEach(function (element, index) {
            allData.forEach(function (ele) {
              if (element.userNumber === ele.userNumber) {
                if (!_this.selects1.includes(ele)) {
                  _this.selects1.splice(index, 1, ele);
                }
              }
            });
          });
        }
        this.isSelectAll();

      },
      isSelectAll () {
        var _this = this;

        if (this.data && !this.data.children) {
          this.$set(this.data, 'children', []);
        }
        if (this.data && !this.data.users) {
          this.$set(this.data, 'users', []);
        }
        if ((this.selects.length <= 0 && this.selects1.length <= 0)) {
          this.checkAll = false;
        } else if (_this.data.children.length <= this.selects.length && _this.data.users.length <= this.selects1.length) {
          if (_this.type === 1 || _this.type === 2) {
            for (var i = 0;i < _this.data.children.length;i++) {
              if (!_this.selects.includes(_this.data.children[i])) {
                _this.checkAll = false;
                return;
              }
            }
          }

          if (_this.type === 1 || _this.type === 3 || _this.type === 4) {
            for (var j = 0;j < _this.data.users.length;j++) {
              if (!_this.selects1.includes(_this.data.users[j])) {
                _this.checkAll = false;
                return;
              }
            }
          }

          this.checkAll = true;
        } else {
          this.checkAll = false;
        }

      },
      removeAllFunc () {
        var _this = this;

        if (this.selects.length <= 0 && this.selects1.length <= 0) return;

        for (let i = 0, flag = true, len = _this.selects.length;i < len;flag ? i++ : i) {

          for (let j = 0, len1 = _this.data.children.length;j < len1;j++) {
            if (_this.selects[i] && _this.selects[i].deptId === _this.data.children[j].deptId) {
              _this.selects.splice(i, 1);
              flag = false;
              j = -1;
            } else {
              flag = true;
            }
          }
        }
        for (let i = 0, flag = true, len = _this.selects1.length;i < len;flag ? i++ : i) {

          for (let j = 0, len1 = _this.data.users.length;j < len1;j++) {
            if (_this.selects1[i] && _this.selects1[i].userNumber === _this.data.users[j].userNumber) {
              _this.selects1.splice(i, 1);
              flag = false;
              j = -1;
            } else {
              flag = true;
            }
          }
        }


        this.isSelectAll();
      },
      checkAllFunc () {
        var _this = this;

        if ((this.selects.length <= 0 || !this.selects) && (this.selects1.length <= 0 || !this.selects1)) {
          if (this.type === 1 || this.type === 2) {
            this.data.children.forEach(function (element) {
              _this.$set(element, 'show', false);
            });
          }

          if (this.type === 1) {
            this.selects = new Array(...this.data.children);
            this.selects1 = new Array(...this.data.users);
          } else if (this.type === 2) {
            this.selects = new Array(...this.data.children);
          } else if (this.type === 3 || this.type === 4 || this.type === 5) {
            this.selects1 = new Array(...this.data.users);
          }
          return;
        }

        if (this.selects !== this.data.children && this.selects1 === this.data.users) {
          _this.data.children.forEach(function (ele) {
            if (!_this.selects.includes(ele)) {
              _this.$set(ele, 'show', false);
              _this.selects.push(ele);
            }
          });
        } else if (this.selects === this.data.children && this.selects1 !== this.data.users) {
          _this.data.users.forEach(function (ele) {
            if (!_this.selects1.includes(ele)) {
              _this.selects1.push(ele);
            }
          });
        } else if (this.selects !== this.data.children && this.selects1 !== this.data.users) {
          _this.data.children.forEach(function (ele) {
            if (!_this.selects.includes(ele)) {
              _this.$set(ele, 'show', false);
              _this.selects.push(ele);
            }
          });
          _this.data.users.forEach(function (ele) {
            if (!_this.selects1.includes(ele)) {
              _this.selects1.push(ele);
            }
          });
        }
      },
      changeScrollHeight (type) {
        var _this = this;

        setTimeout(function () {
          var departmentHeight = _this.$refs.department ? _this.$refs.department.clientHeight : 0;


          if (type === '1') { departmentHeight = 57; }
          if (type === '2') { departmentHeight = 19; }
          document.getElementById('vpscrollbar').style.height = (390 - 20 - 34 - 37 - departmentHeight) + 'px';
        }, 0);

      },
      filterDeptById (elements) {
        var deptId = this.deptId;
        let itemData = '';

        function filterDept (arr) {
          for (let item of arr) {
            if (item.deptId === deptId) {
              itemData = item;
              return itemData;
            } else if (item.children !== null) {
              filterDept(item.children);
            }
          }
          if (itemData) {
            return itemData;
          }
          return {};
        }
        return filterDept(elements.children);
      },
      freshData () {
        if (this.type === 4) {
          if (this.deptId) {
            ajaxGetDeptGroupMember(this.loginUser, this.deptId, this.getDeptData);
          } else {
            ajaxGetEnterGroupMember(this.loginUser, this.getDeptData);
          }

        } else {

          ajaxGetManageableTree(this.loginUser, this.getDeptData);
          if (this.deptId && this.inputType && this.type === 2) {
            ajaxGetEnterList(this.loginUser, this.getEnterData);
          }
        }
      },
      deptNameSelect (item) {
        this.selects2 = item;
      },
      changeToEnter (index, item) {
        if (!this.selectEnterFlag) {
          this.selectEnterFlag = !this.selectEnterFlag;
          this.tempEnterData = Object.assign({}, this.title[1]);
          this.changeDept(index, item);
        }
      },
      changeEnterToDept () {
        this.data = this.tempEnterData;
        this.title.push(this.data);
        this.selectEnterFlag = false;
      },
      reverdata (arr) {
        let msg = '';

        arr.forEach(function (element) {
          msg = element + ' > ' + msg;
        });
        return msg;
      }
    },
    mounted () {
      // this.$nextTick(function () {
      //   ajaxGetEnterList(this.loginUser, this.getEnterData);
      //   ajaxGetManageableTree(this.loginUser, this.getDeptData);
      // });
    }
  };
</script>
<style lang="scss" scoped>
 @import "../../../src/fonts/iconfont.css";

  .selector{
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    * {
      box-sizing: unset;
    }
    >.s-organization-bg{
      height: 100%;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: #8a8a8a;
      opacity: 0.7;
    }

    >.s-organization{
      top: 50%;
      transform: translateY(-50%);
      position: relative;
      border-radius: 5px;
      background-color: white;
      height: 500px;
      width: 600px;
      font-size: 12px;
      margin: auto;
      >header{
        height: 49px;
        line-height: 49px;
        border-bottom: 1px solid #eee;
        padding: 0 15px;
        display: flex;
        font-size: 14px;
        >div{
          flex:1;
        }
        >svg{
          width: 20px;
          height: 20px;
          padding: 14.5px 0;
          cursor: pointer;

        }
      }
      >section{
        display: flex;
        height: 390px;
        >div{
          flex: 1;
          padding: 20px 0;
          max-width: 300px;
          &.left{
            border-right: 1px solid #ddd;
            >.search{
              display: flex;
              border: 1px solid #ddd;
              padding-left: 9px;
              border-radius: 5px;
              margin: 0 20px;
              overflow: hidden;
              >input{
                height: 32px;
                width: 215px;
                line-height: 32px;
                flex: 1;
                border-width: 0;
              }
              >svg{
                width: 18px;
                height: 18px;
                padding: 7px;
                border-left: 1px solid #ddd;
                background-color: #f5f6f7;
                cursor: pointer;
                &.delete{
                  border-width: 0;
                  background-color: inherit;
                }
              }
            }
            >.department{
              padding: 20px 0;
              display: flex;
              flex-wrap: wrap;
              margin: 0 20px;
              >span{
                color: #0079ff;
                font-size: 13px;
                padding: 2px 5px 0;
                cursor: pointer;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                max-width: 70px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                &:first-child{
                  padding-left:0;
                  cursor: default;
                }
                &:last-child{
                  max-width: none;
                  color: inherit;
                  cursor: default;
                }
              }
              >div{
                line-height: 17px;
              }
            }
            >dt{
              height: 22px;
              margin: 0 20px 15px;
              >input{
                height: 14px;
                width: 14px;
                margin-right: 10px;
                margin-top: 4px;
              }
              >label{
                color: #0079ff;
              }
              &.active{
                margin-top: 15px;
              }
            }
            >section{
              height: 242px;
              >dl{

                padding: 0 20px;
                >dd{
                  height: 22px;
                  display: flex;
                  margin-bottom: 15px;
                  line-height: 22px;
                  >input{
                    height: 14px;
                    width: 14px;
                    margin-right: 10px;
                    margin-top: 4px;
                  }
                  >i{
                    height: 14px;
                    width: 14px;
                    margin-right: 10px;
                    margin-top: 4px;
                    display: inline-block;
                  }
                  >svg{
                    margin-top: 2px;
                    height: 18px;
                    width: 22px;
                  }
                  >img{
                    height: 22px;
                    width: 22px;
                    border-radius: 50%;
                  }
                  >span{
                    flex: 1;
                    word-wrap: break-word;
                    word-break: break-all;
                    padding-left: 6px;
                    cursor: default;
                  }
                  >div{
                    display: flex;
                    border-left: 1px solid #eee;
                    cursor: pointer;
                    >svg{
                      height: 18px;
                      width: 18px;
                      margin-left: 6px;
                      margin-right: 4px;
                      margin-top: 2px;

                    }
                    >span{
                      color: #0079ff;
                    }
                    &.unclick{
                      display: flex;
                      border-left: 1px solid #eee;
                      cursor: default;
                      >img{
                        height: 18px;
                        width: 18px;
                        margin-left: 6px;
                        margin-right: 4px;
                        margin-top: 2px;

                      }
                      >span{
                        color: #cccccc;
                      }
                    }
                  }
                }
              }
              >div{
                height: 100%;
                color: #e2e2e2;
                text-align: center;
                font-size: 12px;
                >img{
                  margin-top: 50px;
                }
                >p{
                  margin-top: 10px;
                }
              }
              &.active{
                height: 284px;
              }
            }
          }
          &.right{
            >p{
              height: 20px;
              line-height: 20px;
              padding: 0 20px 0 24px;
              display: flex;
              margin-bottom: 20px;
              >span{
                flex: 1;
                cursor: default;
              }
              >i{
                font-style: normal;
                color: #ff5e5e;
                cursor: pointer
              }
            }
            >section {
              height: 330px;
              >dl{
                padding: 0 20px 0 24px;
                >dd{
                  height: 22px;
                  display: flex;
                  margin-bottom: 15px;
                  line-height: 22px;
                  >svg{
                    margin-top: 2px;
                    height: 18px;
                    width: 22px;

                  }
                  >span{
                    flex: 1;
                    margin-left: 10px;
                    cursor: default;
                  }
                  >img{
                    height: 22px;
                    width: 22px;
                    border-radius: 50%;
                  }
                  >div{
                    cursor: pointer;
                    >svg{
                      margin-top: 2px;
                      height: 18px;
                      width: 18px;
                      padding-right: 4px;
                    }
                  }
                }
              }
            }

          }
        }
      }
      >footer{
        border-top: 1px solid #eee;
        height: 43px;
        text-align: right;
        padding-top: 16px;
        padding-right: 20px;
        >button:first-child{
          margin-right: 15px;
        }
      }
    }
  }

  .cbk-wrap {
    position: relative;
    display: inline-block;
    margin-right:10px;
    padding: 0 !important;
    width: 14px;
    height: 14px;
    vertical-align: middle;
    flex: inherit !important;
    user-select: none;
    overflow: hidden;

    >input {
      display: none;
    }

    >label {
      display: block;
      width: calc(100% - 2px);
      height:calc(100% - 2px);
      border: solid 1px #999;
      border-radius: 2px;
      background-color: #fff;
      cursor: pointer;
      line-height: normal;
    }

    >label:hover {
      border-color: #ccc;
    }

    >label:active {
      border-color: #0079ff;
    }

    input:checked + label {
      border-color: #0079ff;
      background-color: #0079ff;
    }

    input:checked + label:after {
      content: '\e61d';
      position: absolute;
      top: -1px;
      left: -1px;
      font-size: 16px;
      color: #fff;
    }
  }

  dd {
    >.cbk-wrap ,>.radio-wrap {
      margin-top: 4px;
    }
  }
  .radio-wrap{
    position: relative;
    display: inline-block;
    margin-right:10px;
    width: 12px;
    height: 12px;
    vertical-align: -2px;
    border-style: solid;
    border-width: 1px;
    border-color: #999;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
    padding: 0 !important;
    flex: inherit !important;
    >label{
      display: block;
      width: 100%;
      height: 100%;
      background-color: #fff;
      cursor: pointer;
      border-radius: 50%;
      line-height: normal;
    }
    >label:hover {
      border-color: #ccc;
    }

    >label:active {
      border-color: #0079ff;
    }
    input{
      display: none;
      position: absolute;
    }
    input:checked + label {
      border-color: #0079ff;
      background-color: #0079ff;
    }
    input:checked + label:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #fff;
    }
    input[type="radio"]{
      margin: 0px;
    }
  }
 #vpscrollbar{
   >.ps__scrollbar-y-rail{
     >.ps__scrollbar-y{
       background-color: #dddddd;
       color: #000;
     }
   }
 }

 .ps:hover{
   >.ps__scrollbar-y-rail:hover{
     >.ps__scrollbar-y{
       background-color: #bbb;
     }
   }
 }

</style>
