<template>
  <div>
    <!--
    可自定义左右两侧的图标
    type: 文本类型 - text|password
    maxlength: 文本长度
    placeholder: 占位符
    nopaste: 不允许粘贴 - true|false
    disabled: 禁用 - 默认false|true
    readonly: 只读 - 默认false|true
    clear: 是否使用清空按钮 - 默认true|false
    rule: number|float|mobile|fix|email|url|letter|chinese
    @focus: 聚焦回调
    @keyup: 按起回调返回keycode
    @enter: 回车回调
     -->
    <cmp-input
    v-model="name"
    type="text"
    maxlength="1111"
    placeholder="请输入名称"
    nopaste="false"
    autofocus="true"
    disabled="false"
    clear="true"
    rule="chinese"
    readonly="false"
    @focus="cbk_focus"
    @blur="cbk_blur"
    @keyup="cbk_keyup"
    @enter="cbk_enter">
      <i class="cicon-tick center-v" slot="left" style="background-color: green;"></i>
      <i class="cicon-search-cpt-chr center-v" slot="right" style="background-color: blue;"></i>
    </cmp-input>

    <cmp-input
    v-model="name"
    type="text"
    maxlength="1111"
    placeholder="请输入年龄"
    nopaste="false"
    autofocus="true"
    disabled="false"
    clear="true"
    rule="float"
    readonly="false"
    @focus="cbk_focus"
    @blur="cbk_blur"
    @keyup="cbk_keyup"
    @enter="cbk_enter">
      <i class="cicon-search-cpt-chr center-v" slot="right" v-if="showIcon" style="background-color: blue;"></i>
    </cmp-input>

    <cmp-input
    v-model="name"
    type="text"
    maxlength="1111"
    placeholder="请输入地址"
    nopaste="false"
    autofocus="true"
    disabled="false"
    clear="true"
    rule="chinese"
    readonly="false"
    @focus="cbk_focus"
    @blur="cbk_blur"
    @keyup="cbk_keyup"
    @enter="cbk_enter">
      <i class="cicon-tick center-v" slot="left" style="background-color: green;"></i>
    </cmp-input>

    <cmp-input
    v-model="name"
    type="text"
    maxlength="1111"
    placeholder="请输入邮箱"
    nopaste="false"
    autofocus="true"
    disabled="false"
    clear="true"
    rule="chinese"
    readonly="false"
    @focus="cbk_focus"
    @blur="cbk_blur"
    @keyup="cbk_keyup"
    @enter="cbk_enter">
      <i class="cicon-tick center-v" slot="left" style="background-color: green;"></i>
    </cmp-input>
  </div>
</template>

<script>
import {Input} from '../packages/index.js';

export default {
  name: 'demoInput',
  data: function () {
    return {
      name: '你好',
      pwd: 123,
      showIcon: false
    };
  },
  components: {
    'cmpInput': Input
  },
  watch: {
    name: function (val) {
      console.log(val);
    }
  },
  mounted: function () {
    let _this = this;

    setTimeout(function () {
      _this.name = '淡淡的';
      _this.showIcon = true;
    }, 3000);
  },
  methods: {
    cbk_focus: function () {
      console.log('====cbk_focus====');
    },
    cbk_blur: function () {
      console.log('===cbk_blur=====');
    },
    cbk_keyup: function (keyCode) {
      console.log('====cbk_keyup====');
      console.log(keyCode);
    },
    cbk_enter: function () {
      console.log('====cbk_enter====');
    }
  }
};
</script>

<style scoped>

</style>