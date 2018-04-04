<template>
  <div style="height: 34px;background-color: #fff;">
    <button @click="setSingleSearch">单条件搜索</button> \ <button @click="setMulSearch">多条件搜索</button>
    <cmp-search v-bind="option" @callback="callback"></cmp-search>
  </div>

</template>

<script>
import {Search} from '../packages/index.js';

export default {
  name: 'DemoSwitch',
  data: function () {
    return {
      option: {
        // 'show': false,
        // 单搜索框长度
        'lenth': 20,
        'placeholder': '占位符',
        // 是否开启多条件
        'multiCondition': true,
        // 多条件项
        'conditionList': [
          {
            'label': '描述信息',
            'placeholder': '占位符',
            'lenth': 10,
            'type': 'text'
          },
          {
            'label': '性别',
            'type': 'radio',
            'items': [
              {
                'value': 10,
                'label': '男'
              },
              {
                'value': 21,
                'label': '女'
              }
            ]
          },
          {
            'label': '爱好',
            'type': 'checkbox',
            'items': [
              {
                'checked': false,
                'value': '31',
                'label': '唱歌'
              },
              {
                'checked': false,
                'value': '32',
                'label': '旅游'
              },
              {
                'checked': false,
                'value': '33',
                'label': '看书'
              }
            ]
          },
          {
            'label': '下拉选框',
            'type': 'dropmenu',
            'data': [
              {
                'id': 10,
                'name': 'menu0',
                'mobile': '13500000011',
                'html': '<input type="radio">0'
              },
              {
                'id': 11,
                'name': 'menu1',
                'mobile': '13500000011',
                'html': '<input type="radio">1'
              },
              {
                'id': 22,
                'name': 'menu2',
                'mobile': '13500000221',
                'html': '<input type="radio">2'
              },
              {
                'id': 33,
                'name': 'menu3',
                'mobile': '13500235011',
                'html': '<input type="radio">3'
              },
              {
                'id': 44,
                'name': 'menu4',
                'disabled': true,
                'mobile': '13500007781',
                'html': '<input type="radio">4'
              },
              {
                'id': 55,
                'name': 'menu5',
                'mobile': '13512300011',
                'html': '<input type="radio">5'
              },
              {
                'id': 66,
                'name': 'menu6',
                'mobile': '13500098011',
                'html': '<input type="radio">6'
              },
              {
                'id': 77,
                'name': 'menu7',
                'mobile': '13501110011',
                'html': '<input type="radio">7'
              },
              {
                'id': 88,
                'name': 'menu8',
                'mobile': '13500600011',
                'html': '<input type="radio">8'
              }
            ],
            'data_': ['aaaaaaaaaaaaa', 'bbbbbbbbbbbbbb', 'ccccccccc'],
            // 是否显示下拉列表
            'showMenu': false,
            // 是否带匹配搜索
            'withSearch': true,
            // 列表显示内容关键字 - 必填
            'keyMenuText': 'name',
            // 是否输入框延迟回调 - withSearch为true的时候生效
            'iptDelay': false,
            // 自定义输入框显示结果关键字 - withSearch为false的时候生效
            'keyIptText': 'name',
            // 输入框占位符
            'placeholder': '请选择内容',
            // 输入框默认值
            'iptValue': ''
          },
          {
            'label': '开始时间',
            'placeholder': '年/月/日',
            'type': 'date'
          },
          {
            'label': '结束时间',
            'placeholder': '年/月/日 时:分',
            'type': 'datetime'
          }
          // 插件原因，取消多选项功能，会报错，暂时屏蔽
          // ,{
          //   'label': '时间区域',
          //   'placeholder': '[年/月/日,年/月/日]',
          //   'type': 'multiday'
          // }
        ]
      }
    };
  },
  components: {
    'cmpSearch': Search
  },
  methods: {
    callback: function (val) {
      console.log(val);
    },
    setSingleSearch: function () {
      this.option.lenth = 100;
      this.option.placeholder = '单条件搜索123';
      this.option.multiCondition = false;
    },
    setMulSearch: function () {
      this.option.lenth = 200;
      this.option.placeholder = '多条件搜索456';
      this.option.multiCondition = true;
      this.option.conditionList = [
        {
          'label': '描述信息',
          'placeholder': '占位符888',
          'lenth': 10,
          'type': 'text'
        },
        {
          'label': '描述2',
          'lenth': 30,
          'type': 'text'
        },
        // {
        //   'label': '开始时间',
        //   'placeholder': '年/月/日',
        //   'type': 'date'
        // },
        {
          'label': '结束时间',
          'placeholder': '年/月/日 时:分',
          'type': 'datetime'
        },
        {
          'label': '时间区域',
          'placeholder': '[年/月/日,年/月/日]',
          'type': 'multiday'
        }
      ]
    }
  }
};
</script>

<style scoped>

</style>