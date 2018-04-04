<template>
  <div style="margin: 0 100px;">
    <button @click.stop="clearSelect">清空</button>
    <button @click.stop="displayMenu('show')">显示下拉</button>
    <button @click.stop="displayMenu('hide')">隐藏下拉</button>
    <button @click.stop="setIptValue">设置初始值</button>
    <hr>
    <br>
    <cmp-dropmenu v-bind="optionDropMenu" @callback="callback"></cmp-dropmenu>
  </div>
</template>

<script>
import {DrapMenu} from '../packages/index.js';

export default {
  name: 'DemoDrapMenu',
  data: function () {
    return {
      optionDropMenu: {
        disabled: true,
        // 是否显示下拉列表
        showMenu: false,
        // 是否带匹配搜索
        withSearch: true,
        // 列表数据源
        // menuData: [
        //   {
        //     'id': 10,
        //     'name': 'menu0',
        //     'mobile': '135000000111',
        //     'html': '<input type="radio">0'
        //   },
        //   {
        //     'id': 11,
        //     'name': 'menu1',
        //     'mobile': '135000000112',
        //     'html': '<input type="radio">1'
        //   },
        //   {
        //     'id': 22,
        //     'name': 'menu2',
        //     'mobile': '13500000221',
        //     'html': '<input type="radio">2'
        //   },
        //   {
        //     'id': 33,
        //     'name': 'menu3',
        //     'mobile': '13500235011',
        //     'html': '<input type="radio">3'
        //   },
        //   {
        //     'id': 44,
        //     'name': 'menu4',
        //     'disabled': true,
        //     'mobile': '13500007781',
        //     'html': '<input type="radio">4'
        //   },
        //   {
        //     'id': 55,
        //     'name': 'menu5',
        //     'mobile': '13512300011',
        //     'html': '<input type="radio">5'
        //   },
        //   {
        //     'id': 66,
        //     'name': 'menu6',
        //     'mobile': '13500098011',
        //     'html': '<input type="radio">6'
        //   },
        //   '字符串',
        //   {
        //     'id': 77,
        //     'name': 'menu7',
        //     'mobile': '13501110011',
        //     'html': '<input type="radio">7'
        //   },
        //   {
        //     'id': 88,
        //     'name': 'menu8',
        //     'mobile': '13500600011',
        //     'html': '<input type="radio">8'
        //   }
        // ],
        menuData: ['android_min_version', 'aot_audio_conference_server_url', 'aot_audioconference_ws', 'aot_copyright_url', 'aot_live_url'],
        // 列表显示内容关键字 - 必填
        // keyMenuText: 'name',
        // 是否输入框延迟回调 - withSearch为true的时候生效
        iptDelay: false,
        // 自定义输入框显示结果关键字 - withSearch为false的时候生效
        // keyIptText: 'name',
        // 输入框默认值
        iptValue: 'aot_audio_conference_server_url',
        // 输入框占位符
        placeholder: '请选择内容'
      }
    };
  },
  components: {
    'cmpDropmenu': DrapMenu
  },
  mounted: function () {
    //
  },
  methods: {
    callback: function (data) {
      console.log('=====callback=========');
      console.log(data);
      // let _this = this;

      // // 模拟自定义列表数据
      // if (data.source === 'input') {
      //   setTimeout(function () {
      //     _this.setNewData();
      //   }, 500);
      // }
    },
    clearSelect: function () {
      this.optionDropMenu.iptValue = '';
    },
    setIptValue: function () {
      this.optionDropMenu.iptValue = 'aot_live_url';
    },
    setNewData: function () {
      this.optionDropMenu.menuData = [
        'list1',
        {
          'id': 77,
          'name': 'list1',
          'mobile': '13501110011',
          'html': '<input type="radio">7'
        },
        {
          'id': 88,
          'name': 'list2',
          'mobile': '13500600011',
          'html': '<input type="radio">8'
        }
      ]
    },
    displayMenu: function (type) {
      let display = type === 'show';

      this.optionDropMenu.showMenu = '';
      this.$nextTick(function () {
        this.optionDropMenu.showMenu = display;
      });
    }
  }
};
</script>

<style scoped>

</style>