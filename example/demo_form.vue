<template>
  <div style="width: 800px;height:600px;background-color:#f0f0f0;">
    <div class="wrap-form">
      <div class="form-layer">
        <label class="star">垂直布局:</label>
        <cmp-input class="f-dom"
        :name="'age'"
        :lenth="335"
        :value="'123abc12321'"
        :autoFocus="false"
        :disabled="false"
        :rule="'url'"
        :theme="'def'"
        :noPaste="true"></cmp-input>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer horiz">
        <label>水平布局:</label>
        <cmp-input class="f-dom"
        :name="'age'"
        :lenth="335"
        :value="'123abc12321'"
        :autoFocus="false"
        :disabled="false"
        :rule="'url'"
        :theme="'def'"
        :noPaste="true"></cmp-input>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer">
        <label>性别:</label>
        <span class="f-dom">
          <cmp-radio v-model="sex" val="1">足球</cmp-radio>
          <cmp-radio v-model="sex" val="2">篮球</cmp-radio>
        </span>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer horiz">
        <label>性别:</label>
        <span class="f-dom">
          <cmp-radio v-model="sex" val="1">足球</cmp-radio>
          <cmp-radio v-model="sex" val="2">篮球</cmp-radio>
        </span>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer">
        <label>爱好:</label>
        <span class="f-dom">
          <cmp-checkbox v-model="selected" :val="1">看书</cmp-checkbox>
          <cmp-checkbox v-model="selected" :val="2">写字</cmp-checkbox>
          <cmp-checkbox v-model="selected" :val="3">画画</cmp-checkbox>
        </span>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer horiz">
        <label>爱好:</label>
        <span class="f-dom">
          <cmp-checkbox v-model="selected" :val="1">看书</cmp-checkbox>
          <cmp-checkbox v-model="selected" :val="2">写字</cmp-checkbox>
        </span>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer">
        <label>下拉框:</label>
        <cmp-drop-menu class="f-dom" v-bind="optionDropMenu" v-model="optionDropMenu.result" @cbkClkItem="cbkClkItem"></cmp-drop-menu>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer horiz">
        <label>下拉框:</label>
        <cmp-drop-menu class="f-dom" v-bind="optionDropMenu" v-model="optionDropMenu.result" @cbkClkItem="cbkClkItem"></cmp-drop-menu>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer">
        <label>地址:</label>
        <cmp-textarea class="f-dom" v-model="optionTextarea.value" v-bind="optionTextarea"></cmp-textarea>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer horiz">
        <label>地址:</label>
        <cmp-textarea class="f-dom" v-model="optionTextarea.value" v-bind="optionTextarea"></cmp-textarea>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer">
        <label>地址:</label><br>
        <cmp-swith class="f-dom" v-model="swith" theme="green"></cmp-swith><br>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer horiz">
        <label>地址:</label>
        <cmp-swith class="f-dom" v-model="swith" theme="green"></cmp-swith><br>
        <small class="tip">姓名不能为空</small>
      </div>
    </div>
    <div class="wrap-form horiz" style="width: 400px;">
      <div class="form-layer">
        <label>垂直布局:</label>
        <cmp-input class="f-dom"
        :name="'age'"
        :lenth="335"
        :value="'123abc12321'"
        :autoFocus="false"
        :disabled="false"
        :rule="'url'"
        :theme="'def'"
        :noPaste="true"></cmp-input>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer vert">
        <label>水平布局:</label>
        <cmp-input class="f-dom"
        :name="'age'"
        :lenth="335"
        :value="'123abc12321'"
        :autoFocus="false"
        :disabled="false"
        :rule="'url'"
        :theme="'def'"
        :noPaste="true"></cmp-input>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer">
        <label>性别:</label>
        <span class="f-dom">
          <cmp-radio v-model="sex" val="1">足球</cmp-radio>
          <cmp-radio v-model="sex" val="2">篮球</cmp-radio>
        </span>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer vert">
        <label>性别:</label>
        <span class="f-dom">
          <cmp-radio v-model="sex" val="1">足球</cmp-radio>
          <cmp-radio v-model="sex" val="2">篮球</cmp-radio>
        </span>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer">
        <label>爱好:</label>
        <span class="f-dom">
          <cmp-checkbox v-model="selected" :val="1">看书</cmp-checkbox>
          <cmp-checkbox v-model="selected" :val="2">写字</cmp-checkbox>
          <cmp-checkbox v-model="selected" :val="3">画画</cmp-checkbox>
        </span>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer vert">
        <label>爱好:</label>
        <span class="f-dom">
          <cmp-checkbox v-model="selected" :val="1">看书</cmp-checkbox>
          <cmp-checkbox v-model="selected" :val="2">写字</cmp-checkbox>
        </span>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer">
        <label>下拉框:</label>
        <cmp-drop-menu class="f-dom" v-bind="optionDropMenu" v-model="optionDropMenu.result" @cbkClkItem="cbkClkItem"></cmp-drop-menu>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer vert">
        <label>下拉框:</label>
        <cmp-drop-menu class="f-dom" v-bind="optionDropMenu" v-model="optionDropMenu.result" @cbkClkItem="cbkClkItem"></cmp-drop-menu>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer">
        <label>地址:</label>
        <cmp-textarea class="f-dom" v-model="optionTextarea.value" v-bind="optionTextarea"></cmp-textarea>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer vert">
        <label>地址:</label>
        <cmp-textarea class="f-dom" v-model="optionTextarea.value" v-bind="optionTextarea"></cmp-textarea>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer">
        <label>地址:</label>
        <cmp-swith class="f-dom" v-model="swith" theme="green"></cmp-swith><br>
        <small class="tip">姓名不能为空</small>
      </div>
      <div class="form-layer vert">
        <label>地址:</label><br>
        <cmp-swith class="f-dom" v-model="swith" theme="green"></cmp-swith><br>
        <small class="tip">姓名不能为空</small>
      </div>
    </div>
  </div>
  
</template>

<script>
  import {Input, Checkbox, Radio, DropMenu, Textarea, Swith} from '../packages/index.js';

  export default {
    name: 'DemoForm',
    components: {
      'cmpInput': Input,
      'cmpCheckbox': Checkbox,
      'cmpRadio': Radio,
      'cmpDropMenu': DropMenu,
      'cmpTextarea': Textarea,
      'cmpSwith': Swith
    },
    data: function () {
      return {
        sex: '1',
        selected: [2],
        optionDropMenu: {
          placeholder: '请选择内容',
          show: true,
          multi: false,
          disabled: false,
          readonly: false,
          data: ['黄金高222', '双皮奶', '拉希米', '换节奏', '北京烤鸭', '无泡沫', '长达作为', 'vzxwwdasd', '滴答滴答滴答滴答', '跳脱衣舞', 'uirxxxx', '你们vczaqdx', '榴莲皮'],
          result: [3]
        },
        optionTextarea: {
          'placeholder': '请输入内容',
          'rows': '5',
          'maxlength': '10',
          // 不允许粘贴
          'noPaste': false,
          'disabled': false
        },
        swith: true
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
      cbkClkItem: function (data) {
        console.log('====cbkClkItem====');
        console.log(data);
      }
    }
  };
</script>
<style lang="scss">
  $iptHeight: 46px;

  // 默认垂直布局
  .wrap-form {

    // 单层
    >.form-layer {

      >label {
        line-height: 30px;
      }

      >label.star:before {
        content: '*';
        color: red;
      }

      >.f-dom {
        display: inline-block;
        width: 100%;
      }

      >.tip {
        color: red;
        line-height: 20px;
      }
    }
    
    // 单层水平
    >.form-layer.horiz {
      position: relative;
      
      >label {
        display: inline-block;
        margin-right: 10px;
        width: 100px;
        text-align: right;
      }

      >.f-dom {
        width: calc(100% - 100px - 5px - 10px);
      }
    }
  }

  // 水平布局
  .wrap-form.horiz {

    // 单层
    >.form-layer {
      position: relative;
      margin-bottom: 14px;
      
      >label {
        display: inline-block;
        margin-right: 10px;
        width: 100px;
        text-align: right;
      }

      >.f-dom {
        width: calc(100% - 100px - 5px - 10px);
      }

      >.tip {
        position: absolute;
        top: 0;
        left: calc(100% + 10px);
        line-height: 30px;
        white-space: nowrap;
        word-wrap: break-word;
        word-break: normal;
        z-index: 1;
      }
    }

    // 单层垂直
    >.form-layer.vert {

      >label {
        display: unset;
        margin-right: unset;
        width: unset;
        text-align: unset;
      }

      >.f-dom {
        width: 100%;
      }

      >.tip {
        top: 30px;
      }
    }
  }
</style>
<style scoped lang="scss">
  

  .wrap-form {
    float: left;
    padding: 0 10px;
    width: 300px;
    border: solid 1px;

  }


</style>