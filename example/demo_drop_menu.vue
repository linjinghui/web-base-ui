<template>
  <div>
    <cmp-drop-menu v-bind="option" v-model="option.result" @cbkClkItem="cbkClkItem">
      <!-- <span slot="line" slot-scope="props">{{props.item.name}}</span> -->
    </cmp-drop-menu>

    <div style="margin-top: 30px;">
      <p>区域级联</p>
      <cmp-drop-menu ref="city" v-bind="optionCity" v-model="optionCity.result" @cbkClkItem="cbkClkCity">
        <span slot="line" slot-scope="props">{{props.item.text}}</span>
      </cmp-drop-menu>
      <cmp-drop-menu ref="xian" v-bind="optionXian" v-model="optionXian.result" @cbkClkItem="cbkClkXian">
        <span slot="line" slot-scope="props">{{props.item.text}}</span>
      </cmp-drop-menu>
      <cmp-drop-menu ref="xiang" v-bind="optionXiang" v-model="optionXiang.result" @cbkClkItem="cbkClkXiang">
        <span slot="line" slot-scope="props">{{props.item.text}}</span>
      </cmp-drop-menu>
    </div>

    <div style="margin-top: 30px;">
      <p>服务器检索</p>
      <cmp-drop-menu v-bind="optionServer" v-model="optionServer.result" @cbkClkItem="cbkClkServer" @search="search">
        <span slot="line" slot-scope="props">{{props.item.name}}</span>
      </cmp-drop-menu>
    </div>
  </div>
</template>

<script>
import {DropMenu} from '../packages/index.js';
import geoinfo from '../static/geoinfo.js';

export default {
  name: 'demoDropMenu',
  data: function () {
    return {
      data1: ['黄金高222', '双皮奶', '拉希米', '换节奏', '北京烤鸭', '无泡沫', '长达作为', 'vzxwwdasd', '滴答滴答滴答滴答', '跳脱衣舞', 'uirxxxx', '你们vczaqdx', '榴莲皮'],
      data2: [ {name: 'name1', id: 1}, {name: 'name2', id: 2}, {name: 'name3', id: 3}, {name: 'name4', id: 4}, {name: 'name5', id: 5} ],
      option: {
        placeholder: '请选择内容',
        show: true,
        multi: false,
        disabled: false,
        readonly: false,
        data: ['黄金高222', '双皮奶', '拉希米', '换节奏', '北京烤鸭', '无泡沫', '长达作为', 'vzxwwdasd', '滴答滴答滴答滴答', '跳脱衣舞', 'uirxxxx', '你们vczaqdx', '榴莲皮'],
        result: [3]
      },
      optionCity: {
        placeholder: '选择城市',
        show: true,
        data: geoinfo[0].child,
        // result: ['北京']
        result: []
      },
      optionXian: {
        placeholder: '选择区县',
        show: true,
        data: [2],
        // result: ['海淀']
        result: []
      },
      optionXiang: {
        placeholder: '选择乡镇',
        show: true,
        // '福州市', '宁德市', '莆田市', '泉州市', '厦门市', '漳州市', '南平市', '三明市', '龙岩市'
        data: [],
        result: []
      },
      optionServer: {
        placeholder: '回车搜索',
        show: true,
        isSearch: false,
        data: [],
        result: []
      }
    };
  },
  components: {
    'cmpDropMenu': DropMenu
  },
  watch: {
    'option.result': function (val) {
      console.log('====option.result===');
      console.log(val);
    }
  },
  mounted: function ()　{
    var _this = this;

    setTimeout(function () {
      _this.$refs.city.iptValue = '北京';
      _this.$refs.xian.iptValue = '海淀区';
    }, 1000);
  },
  methods: {
    cbkClkItem: function (data) {
      console.log('====cbkClkItem====');
      console.log(data);
    },
    cbkClkCity: function (data) {
      console.log('====cbkClkCity====');
      console.log(data);
      this.optionXian.data = [];
      this.$nextTick(function () {
        this.optionXian.data = data[0].child;
      });
    },
    cbkClkXian: function (data) {
      console.log('====cbkClkXian====');
      console.log(data);
      this.optionXiang.data = [];
      this.$nextTick(function () {
        this.optionXiang.data = data[0].child;
      });
    },
    cbkClkXiang: function (data) {
      console.log('====cbkClkXiang====');
      console.log(data);
    },
    cbkClkServer: function (data) {
      console.log('====cbkClkServer====');
      console.log(data);
    },
    search: function (data) {
      console.log('====search====');
      console.log(data);
      var _this = this;

      this.optionServer.data = [];
      this.optionServer.isSearch = true;
      // 获取数据
      setTimeout(function () {
        _this.optionServer.isSearch = false;
        _this.optionServer.data = _this.data2;
        // _this.optionServer.data = [];
      }, 3000);
    }
  }
};
</script>

<style scoped>

</style>