<template>
  <div class="multi-condition-wrap" ref="mutcw" :class="{'small': isSmall}" v-show="show">
    <cmp-inputsearch ref="iptsc" :lenth="lenth" :placeholder="placeholder" @search="callbackSearch"></cmp-inputsearch>
    <div class="multi-wrap" v-if="multiCondition" v-show="showMultiCondition">
      <div class="main">
        <section id="wrapForm">
          <div class="form-layer horiz" v-if="_conditionList.length>0" v-for="(info, index) in _conditionList">
            <label>{{info.label}}:</label>
            <template v-if="info.type==='text'">
              <!-- <cmp-input :lenth="info.lenth" :placeholder="info.placeholder" @focus="focusIpt(index)" @callback="callbackIpt"></cmp-input> -->
              <cmp-input :lenth="info.lenth" :placeholder="info.placeholder" @callback="callbackIpt($event, info)"></cmp-input>
            </template>
            <template v-else-if="info.type==='radio'">
              <div class="iptWrap">
                <cmp-radio class="radio" v-for="(item, index) in info.items" :name="info.label" :label="item.label" :value="item.value" :checked="item.checked" @callback="callbackRadio($event, info)"></cmp-radio>
              </div>
            </template>
            <template v-else-if="info.type==='checkbox'">
              <div class="iptWrap">
                <cmp-checkbox class="checkbox" v-for="(item, index) in info.items" :name="info.label" :label="item.label" :value="item.value" :checked="item.checked" @click="callbackCheckbox($event, info)"></cmp-checkbox>
              </div>
            </template>
            <template v-else-if="info.type==='dropmenu'">
              <div class="iptWrap">
                <cmp-dropmenu :showMenu="info.showMenu" :menuData="info.data" :placeholder="info.placeholder" :withSearch="info.withSearch" :keyMenuText="info.keyMenuText" :keyIptText="info.keyIptText" :iptDelay="info.iptDelay" :iptValue="info.iptValue" @callback="callbackDropmenu($event, info)"></cmp-dropmenu>
              </div>
            </template>
            <template v-else>
              <cmp-date-picker class="iptWrap" :date="info['value']" :option="getDatePickOption(info)"></cmp-date-picker>
            </template>
          </div>
        </section>
        <footer>
          <a class="no" @click="showMultiCondition=false">取消</a>
          <a class="yes" @click="clkYes">确认</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import {InputSearch, Input} from '../../input/index.js';
  import Radio from '../../radio/index.js';
  import CheckBox from '../../checkBox/index.js';
  import DropMenu from '../../dropMenu/index.js';
  import Datepicker from 'vue-datepicker';

  export default {
    name: 'Search',
    components: {
      'cmpInputsearch': InputSearch,
      'cmpInput': Input,
      'cmpRadio': Radio,
      'cmpCheckbox': CheckBox,
      'cmpDatePicker': Datepicker,
      'cmpDropmenu': DropMenu
    },
    props: {
      'show': {
        default: true
      },
      'lenth': {
        default: 30
      },
      'placeholder': {
        default: '请输入搜索内容'
      },
      // 是否开启多条件
      'multiCondition': {
        default: true
      },
      // 多条件列表
      'conditionList': {
        default: function () {
          return [];
        }
      }
    },
    data: function () {
      return {
        isSmall: true,
        showMultiCondition: false,
        focusIndex: ''
      };
    },
    computed: {
      '_conditionList': function () {
        let arr = this.conditionList;

        arr.forEach(function (info, index) {
          if (info.type === 'date' || info.type === 'datetime' || info.type === 'multiday') {
            info['value'] = { time: '' };
          } else if (info.type === 'dropmenu') {
            info['value'] = {};
          } else {
            info['value'] = '';
          }
        });
        return arr;
      }
    },
    watch: {
      'conditionList': function (val) {
        this.isSmall = true;
      },
      'lenth': function () {
        this.funClear();
      },
      'placeholder': function () {
        this.funClear();
      },
      'multiCondition': function () {
        this.funClear();
      }
    },
    mounted: function () {
      //
    },
    methods: {
      focusIpt: function (index) {
        this.focusIndex = index;
      },
      getDatePickOption: function (info) {
        return {
          type: info.type === 'date' ? 'day' : (info.type === 'datetime' ? 'min' : 'multi-day'),
          week: ['一', '二', '三', '四', '五', '六', '日'],
          month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          format: info.type === 'datetime' ? 'YYYY/MM/DD HH:mm' : 'YYYY/MM/DD',
          placeholder: info.type === 'date' ? '年 / 月 / 日' : (info.type === 'datetime' ? '年 / 月 / 日 时:分' : '[年 / 月 / 日]'),
          inputStyle: {
            'display': 'inline-block',
            'line-height': '22px',
            'border': '0',
            'padding-top': '7px',
            'color': '#333',
            'opacity': '1'
          },
          color: {
            header: '#0cc2aa',
            headerText: '#fff'
          },
          buttons: {
            ok: '确定',
            cancel: '取消'
          },
          overlayOpacity: 0.2,
          dismissible: false
        };
      },
      clkYes: function () {
        let data = JSON.parse(JSON.stringify((this._conditionList)));

        data.forEach(function (info) {
          if (info['type'] === 'date' || info['type'] === 'datetime' || info['type'] === 'multiday') {
            info['value'] = info['value']['time'];
          } else if (info['type'] === 'dropmenu') {
            try {
              info['value'] = JSON.parse(info['value']);
            } catch (e) {
              //
            }
          }
        });
        this.$emit('callback', data);
        this.showMultiCondition = false;
      },
      callbackSearch: function (data) {
        let dom = this.$refs.iptsc;

        if (this.multiCondition) {
          // 开启多条件组合查询
          this.isSmall = true;
          this.showMultiCondition = true;
        } else if (this.isSmall) {
          // 展开搜索框
          this.isSmall = false;
          dom && dom.$el.querySelector('input').focus();
        } else {
          // 搜索
          this.$emit('callback', data);
        }
      },
      callbackIpt: function (data, info) {
        info['value'] = data;
      },
      callbackCheckbox: function (data, info) {
        let vals = [];

        data.result.forEach(function (info) {
          vals[vals.length] = info;
        });
        info['value'] = vals.join(',');
      },
      callbackRadio: function (data, info) {
        info['value'] = data;
      },
      funClear: function (data) {
        let dom = this.$refs.mutcw;
        let domIpts = dom && dom.querySelectorAll('input');

        domIpts.forEach(function (ipt) {
          (function (domipt) {
            setTimeout(function () {
              domipt.value = '';
            }, 100);
          }(ipt));
        });
      },
      callbackDropmenu: function (data, info) {
        info['value'] = JSON.stringify(data.result);
      }
    }
  };
</script>

<style scoped lang="scss">
  .multi-condition-wrap {
    float: right;
    width: 260px;
    height: 100%;
    transition: all .5s;
    overflow: hidden;
  }

  .multi-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;

    >.main {
      margin: 100px auto 0 auto;
      width: 300px;
      border-width: 0px;
      border-style: solid;
      border-color: #ddd;
      background-color: #fff;
      z-index: 2;

      >section {
        padding: 10px;
        border: inherit;
      }

      >footer {
        margin-top: 20px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        border: inherit;
        border-top-width: 1px;

        >a {
          float: left;
          width: 50%;
          height: 100%;
        }

        >a.yes {
          border-left: inherit;
          border-left-width: 1px;
          color: #0cc2aa;
        }
      }
    }
  }
</style>

<style scoped lang="scss">
  $height: 36px;

  .form-layer {
    margin-bottom: 10px;
    border: inherit;
    border-bottom-width: 1px;

    >label {
      display: block;
      height: inherit;
      font-size: 14px;
      line-height: $height;
    }
    >label.star:before {
      content: '* ';
      color: #f3384a;
    }
    .iptWrap {
      height: $height;
    }
    .checkbox,
    .radio {
      margin-top: calc((#{$height} - 20px) / 2);
      margin-left: 10px;
    }
    .dropmenu {
      height: $height;

      a {
        height: $height!important;
        line-height: $height!important;
      }
    }
    .scroll-area {
      height: auto!important;
    }
  }

  .form-layer:last-of-type {
    border: 0;
  }

  /*水平布局*/
  .form-layer.horiz {
    height: $height;

    >label {
      float: left;
      width: 26%;
      text-align: right;
    }
    .iptWrap, .dropmenu {
      float: right;
      width: 72%;
    }
  }
</style>

<style lang="scss">
  .multi-condition-wrap {
    .cov-vue-date .day.checked,
    .hour-box .active,
    .min-box .active {
      background-color: #0cc2aa!important;
    }

    .iptWrap {
      border-top-left-radius: 30px!important;
      border-bottom-left-radius: 30px!important;
    }

    .sr {
      border-top-right-radius: 30px!important;
      border-bottom-right-radius: 30px!important;
    }

    input {
      padding-left: 10px!important;
    }

    .wrap-drop-menu {
      padding-left: 5px;
      height: 100%;
      border-width: 0;
      background-color: transparent;
      .scroll-area {
        top: 100%;
        border-radius: 0;
      }

      >label {
        line-height: 36px;
      }
    }
  }

  .multi-condition-wrap.small {
    width: 36px;

    .iptWrap,
    .sr {
      border-width: 0!important;
    }

    .sr {
      background-color: transparent!important;

      .icon-search {
        color: #333!important;
      }
    }
  }
</style>