<template>
  <div id="wrapForm">
    <div class="form-layer">
      <label class="star">标签1:</label>
      <cmp-input
      :name="'age'"
      :lenth="335"
      :value="'123abc12321'"
      :autoFocus="false"
      :disabled="false"
      :rule="'url'"
      :theme="'def'"
      :noPaste="true"
      v-on:callback="callback1"></cmp-input>
    </div>
    <div class="form-layer horiz">
      <label class="star">标签标签:</label>
      <cmp-input
      :name="'age'"
      :lenth="335"
      :value="'123abc12321'"
      :autoFocus="false"
      :disabled="false"
      :rule="'url'"
      :theme="'def'"
      :noPaste="true"
      v-on:callback="callback2"></cmp-input>
    </div>
    <div class="form-layer horiz">
      <label>标签1:</label>
      <cmp-input
      :name="'age'"
      :lenth="335"
      :value="'123abc12321'"
      :autoFocus="false"
      :disabled="false"
      :rule="'url'"
      :theme="'def'"
      :noPaste="true"
      v-on:callback="callback3"></cmp-input>
    </div>
    <div class="form-layer horiz">
      <label>复选框:</label>
      <div class="iptWrap">
        <cmp-checkbox class="checkbox" :name="'like'" :label="'是'" :value="1" :checked="false" @click="callbackCkb"></cmp-checkbox>
        <cmp-checkbox class="checkbox" :name="'like'" :label="'否'" :value="0" :checked="true" @click="callbackCkb"></cmp-checkbox>
      </div>
    </div>
    <div class="form-layer horiz">
      <label>单选框:</label>
      <div class="iptWrap">
        <cmp-radio class="radio" :name="'sex'" :label="'男'" :value="1" :checked="false" @callback="callbackRadio"></cmp-radio>
        <cmp-radio class="radio" :name="'sex'" :label="'女'" :value="2" :checked="true" @callback="callbackRadio"></cmp-radio>
      </div>
    </div>
    <div class="form-layer horiz">
      <label>下拉框:</label>
      <cmp-dropmenu class="dropmenu"
      :placeholder="'请选择'"
      :withSearch="true"
      :eventName="'evntdropmenu'"
      :data="menu"
      :keyword="'name'"
      :active="3"
      :show="false"
      @click="callbackDropmenu"></cmp-dropmenu>
    </div>
    <div class="form-layer horiz">
      <label>标签标签:</label>
      <cmp-input
      :name="'age'"
      :lenth="335"
      :value="'123abc12321'"
      :autoFocus="false"
      :disabled="false"
      :rule="'url'"
      :theme="'def'"
      :noPaste="true"
      v-on:callback="callback4"></cmp-input>
    </div>
    <div class="form-layer horiz wrap-textarea">
      <label>多文本框:</label>
      <div class="iptWrap">
        <cmp-textarea :placeholder="'请输入内容'" :rows="'5'" :maxlength="'10'" :model="model" :noPaste="true" :disabled="false"></cmp-textarea>
      </div>
    </div>
    <div class="form-layer horiz">
      <label>多选框:</label>
      <div class="iptWrap">
        <cmp-multiselect :keyword="'name'" :selectedData="selectedData" :listData="listData" :showList="showList" @callback="callback5"></cmp-multiselect>
      </div>
    </div>
  </div>
</template>

<script>
  import {Input, CheckBox, Radio, DrapMenu, Textarea, Multiselect} from '../packages/index.js';

  export default {
    name: 'DemoForm',
    components: {
      'cmpInput': Input,
      'cmpCheckbox': CheckBox,
      'cmpRadio': Radio,
      'cmpDropmenu': DrapMenu,
      'cmpTextarea': Textarea,
      'cmpMultiselect': Multiselect
    },
    data: function () {
      return {
        menu: [
          {
            'id': 1,
            'name': 'menu1',
            'mobile': '13500000011'
          },
          {
            'id': 2,
            'name': 'menu2',
            'mobile': '13500000221'
          },
          {
            'id': 3,
            'name': 'menu3',
            'mobile': '13500235011'
          },
          {
            'id': 4,
            'name': 'menu4',
            'disabled': true,
            'mobile': '13500007781'
          },
          {
            'id': 5,
            'name': 'menu5',
            'mobile': '13512300011'
          },
          {
            'id': 6,
            'name': 'menu6',
            'mobile': '13500098011'
          },
          '字符串',
          {
            'id': 7,
            'name': 'menu7',
            'mobile': '13501110011'
          },
          {
            'id': 8,
            'name': 'menu8',
            'mobile': '13500600011'
          }
        ],
        model: {
          'value': '啦啦阿拉'
        },
        selectedData: [],
        // 下拉列表数据
        listData: [],
        // 显示、隐藏下拉框
        showList: ''
      };
    },
    mounted: function () {
      let _this = this;

      setTimeout(function () {
        _this.selectedData = [
          {
            'id': 1,
            'name': '大王叫我来巡山'
          },
          {
            'id': 2,
            'name': '妖怪师傅八戒悟空大王叫我来巡山'
          }
        ];
        _this.listData = [
          {
            'id': 1,
            'name': '大王叫我来巡山'
          },
          {
            'id': 2,
            'name': '妖怪师傅八戒悟空大王叫我来巡山'
          },
          {
            'id': 3,
            'name': 'menu3'
          },
          {
            'id': 4,
            'name': 'menu4'
          },
          {
            'id': 5,
            'name': 'menu5'
          },
          {
            'id': 6,
            'name': 'menu6'
          },
          {
            'id': 7,
            'name': 'menu7'
          },
          {
            'id': 8,
            'name': 'menu8'
          }
        ];
      }, 3000);
    },
    methods: {
      callback1: function () {
        //
      },
      callback2: function () {
        //
      },
      callback3: function () {
        //
      },
      callback4: function () {
        //
      },
      callback5: function () {
        //
      },
      callbackRadio: function () {
        //
      },
      callbackCkb: function () {
        //
      },
      callbackDropmenu: function () {
        //
      }
    }
  };
</script>

<style scoped lang="scss">
  $height: 36px;

  #wrapForm {
    margin: 50px 300px;
    padding: 0 10px;
    width: 300px;
    height: 600px;
    border: solid 1px;

  }

  .form-layer {
    margin-bottom: 10px;

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
      margin-right: 10px;
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

  /*文本域样式*/
  .form-layer.wrap-textarea {
    height: auto;
    overflow: hidden;

    >.iptWrap {
      height: auto;
    }
  }
</style>