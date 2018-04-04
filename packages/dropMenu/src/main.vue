<template>
  <div class="wrap-drop-menu" @click.stop>
    <template v-if="withSearch">
      <cmp-inputmain :placeholder="placeholder" :value="pIptValue" :disabled="disabled" @focus="pShowMenu=true" @callback="callbackIpt"></cmp-inputmain>
    </template>
    <template v-else>
      <label :placeholder="placeholder" :disabled="disabled" @click="funToggleMenu">{{pIptValue}}</label>
    </template>

    <i class="icon cmpIconfont" :class="{'icon-arrow_u': !pShowMenu, 'icon-arrow_d': pShowMenu}" @click.stop="pShowMenu=!pShowMenu"></i>
    <vperfect-scrollbar class="scroll-area" v-show="pShowMenu">
      <template v-for="(info, index) in pMenuData">
        <a v-if="typeof info==='string'" :class="{'active': pActive===index}" @click.stop="clkItem(info, index)">{{info}}</a>
        <a v-else-if="keyMenuText==='html'" v-html="info[keyMenuText]" :class="{'active': pActive===index}" @click.stop="clkItem(info, index)"></a>
        <a v-else :class="{'active': pActive===index}" @click.stop="clkItem(info, index)">{{info[keyMenuText]}}</a>
      </template>
    </vperfect-scrollbar>
  </div>
</template>

<script type="text/babel">
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import InputMain from '../../input/src/main.vue';

  export default {
    name: 'DropMenu',
    components: {
      'vperfect-scrollbar': VuePerfectScrollbar,
      'cmpInputmain': InputMain
    },
    props: {
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否显示下拉列表
      showMenu: {
        type: Boolean,
        default: false
      },
      // 是否带匹配搜索
      withSearch: {
        type: Boolean,
        default: true
      },
      // 列表数据源
      menuData: {
        default: function () {
          return [];
        }
      },
      // 列表显示内容关键字
      keyMenuText: {
        default: ''
      },
      // 自定义输入框显示结果关键字 - withSearch为false的时候生效
      keyIptText: {
        default: function () {
          return this.keyMenuText;
        }
      },
      // 输入框默认值
      iptValue: {
        default: ''
      },
      // 是否输入框延迟回调 - withSearch为true的时候生效
      iptDelay: {
        type: Boolean,
        default: false
      },
      // 输入框占位符
      placeholder: {
        default: '请选择下拉项'
      }
    },
    data: function () {
      return {
        pActive: '',
        pMarkTime: '',
        pMarkDelaySwitch: 'on',
        pShowMenu: this.showMenu,
        pIptValue: this.iptValue,
        pSearch: '',
        pMenuData: this.menuData
      };
    },
    computed: {
      //
    },
    watch: {
      iptValue: function (val) {
        if (this.pIptValue !== val) {
          this.pMarkTime = new Date().getTime();
          this.pIptValue = val;
          this.pMenuData = JSON.parse(JSON.stringify(this.menuData));
          this.pActive = this.getItemIndexByIptValue(val);
        }
      },
      menuData: function (val) {
        this.pMarkTime = new Date().getTime();
        this.pActive = this.getItemIndexByIptValue(this.pIptValue);
        this.pMenuData = JSON.parse(JSON.stringify(val));
      },
      showMenu: function (val) {
        this.pShowMenu = val;
      }
    },
    beforeDestroy: function () {
      window.removeEventListener('click', this.funHideMenu);
    },
    mounted: function () {
      window.addEventListener('click', this.funHideMenu);
      this.pActive = this.getItemIndexByIptValue(this.pIptValue);
    },
    methods: {
      // 输入框输入回调
      callbackIpt: function (data) {
        let _this = this;
        let fun = function () {
          // let index = _this.getItemIndexByIptValue(_this.pSearch);
          _this.searchData();
          _this.funEmit({
            // 'result': index === '' ? _this.pSearch : _this.menuData[index],
            'result': _this.pIptValue,
            'source': 'input'
          });
        };

        if (new Date().getTime() - this.pMarkTime >= 500) {
          this.pActive = '';
          this.pIptValue = data;

          if (this.withSearch && this.iptDelay && this.pMarkDelaySwitch === 'on') {
            this.pMarkDelaySwitch = 'off';
            setTimeout(function () {
              fun();
              _this.pMarkDelaySwitch = 'on';
            }, 1000);
          }
          if (this.withSearch && !this.iptDelay) {
            fun();
          }
        }
      },
      // 列表点击
      clkItem: function (data, index) {
        if (!this.disabled) {
          this.pMarkTime = new Date().getTime();
          this.pIptValue = '';
          this.$nextTick(function () {
            if (typeof data !== 'string') {
              this.pIptValue = this.withSearch ? data[this.keyIptText] : data[this.keyMenuText];
            } else {
              this.pIptValue = data;
            }
          });
          this.pActive = index;
          this.pShowMenu = false;
          this.funEmit({
            'result': data,
            'source': 'item'
          });
        }
      },
      // 检索数据内容
      searchData: function () {
        let _this = this;
        let result = JSON.parse(JSON.stringify(_this.menuData));

        if (this.withSearch && result.length > 0) {
          result = result.filter(function (info) {
            let str = '';
            let rest = false;

            if (typeof info === 'string') {
              str = info;
              rest = _this.pIptValue ? (str.indexOf(_this.pIptValue) !== -1) : true;
            } else {
              str = info[_this.keyMenuText];
              let temp = _this.pIptValue ? ((str + '').indexOf(_this.pIptValue) !== -1) : true;

              rest = rest || temp;
            }
            return rest;
          });
        }
        this.pMenuData = result;
      },
      // 根据输入框内容获取对应下拉项
      getItemIndexByIptValue: function (value) {
        let items = this.menuData;
        let key = this.keyMenuText;
        let resultIndex = '';

        if (value && items) {
          for (let i = 0;i < items.length;i++) {
            let temp = items[i];

            if (typeof temp !== 'string') {
              temp = temp[key];
            }
            if (temp && (temp === value || temp.indexOf(value) >= 0)) {
              resultIndex = i;
              break;
            }
          }
        }
        return resultIndex;
      },
      // 隐藏下拉列表
      funHideMenu: function (data) {
        this.pShowMenu = false;
      },
      // 回调通知
      funEmit: function (data) {
        this.$emit('callback', data);
      },
      funToggleMenu: function () {
        if (!this.disabled) {
          this.pShowMenu = !this.pShowMenu;
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../src/style/global';
  $height: 30px;
  $padding: 10px;
  @mixin theme() {
    border: solid 1px #ddd;
    border-radius: 4px;
    background-color: #fff;
  }

  div {
    position: relative;
    height: $height;
    line-height: $height;
    padding-left: $padding;
    padding-right: $height;
    @include theme();
    font-size: 12px;
    user-select: none;

    label {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      word-break: break-all;
      text-overflow: ellipsis;
    }

    label[placeholder]:empty:before {
      content: attr(placeholder);
      color: #999;
      opacity: 0.54;
    }

    input {
      display: block;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      border: 0;
      background-color: transparent;
    }

    .cmpIconfont {
      display: block;
      @include center();
      left: auto;
      width: 28px;
      height: 30px;
      font-size: 24px;
      cursor: pointer;
    }

    .icon-eraser {
      font-size: 20px;
    }

    .scroll-area {
      position: absolute;
      left: 0;
      top: calc(100% + 8px);
      width: 100%;
      max-height: 214px;
      @include theme();
      border-width: 0;
      overflow-y: auto;
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
      z-index: 2;

      a {
        display: block;
        width: 100%;
        height: 30px;
        padding-left: $padding;
        padding-right: $padding;
        cursor: pointer;
      }

      a:hover {
        background-color: #e3edf3;
      }

      a.active {
        color: #fff;
        background-color: #0079ff;
      }

      a.disabled {
        color: #999;
        cursor: not-allowed;
      }
    }
  }
</style>