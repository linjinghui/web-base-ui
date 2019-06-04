<!-- 
功能介绍：
添加标签组件
1、文本为空不能添加
2、重复文本不能添加
3、文本颜色默认为白色
 -->

<template>
  <div class="wrap-add-label" @click.stop>
    <div class="wrap-label">
      <span class="label" v-for="(info,index) in value" :key="'lbl-'+index" :style="'background-color:'+info.bgcolor+''">
        {{info.text}}
        <i class="cicon-cross-cpt" @click="clkDel(info,index)"></i>
        <input type="color" v-model="info.bgcolor" @change="evtChange(info,index)"/>
      </span>
    </div>
    <div class="wrap-bottom">
      <cmp-input v-model="text" :maxlength="maxlength" :placeholder="placeholder" :readonly="value.length>=lablength" @enter="clkConfirm" @keyup="evtKeyup"></cmp-input>
      <cmp-button theme="success" :disabled="btnDisabled" @click="clkConfirm">{{btnName}}</cmp-button>
      <cmp-menu :show="showMenu" :data="cmenuarr" @cbkClkItem="cbkClkItem">
        <span class="mn-lbl" slot="line" slot-scope="props" :style="'background-color:'+props.item.bgcolor+''">{{props.item.text}}</span>
      </cmp-menu>
    </div>
  </div>
</template>

<script type="text/babel">
  import Input from '../../input/index.js';
  import Button from '../../button/index.js';
  import Menu from '../../menu/index.js';

  export default {
    name: 'AddLabel',
    components: {
      'cmpInput': Input,
      'cmpButton': Button,
      'cmpMenu': Menu
    },
    data: function () {
      return {
        id: 'addLabel_' + new Date().getTime() + parseInt(Math.random() * 100),
        text: '',
        showMenu: false
      };
    },
    props: {
      value: {
        type: Array,
        default: function () {
          return [];
        }
      },
      // 历史记录
      hisrecord: {
        type: Array,
        default: function () {
          return [];
        }
      },
      placeholder: {
        default: '请输入标签名称'
      },
      // 输入框内容长度
      maxlength: {
        default: 10
      },
      // 最大标签个数
      lablength: {
        default: 5
      },
      btnName: {
        default: '确定'
      }
    },
    watch: {},
    computed: {
      btnDisabled () {
        return this.value.length >= this.lablength || this.text.length === 0 || JSON.stringify(this.value).indexOf('"' + this.text + '"') >= 0;
      },
      cmenuarr () {
        let _this = this;

        return this.hisrecord.filter(function (item) {
          return JSON.stringify(_this.value).indexOf('"' + item.text + '"') < 0 && item.text.indexOf(_this.text) >= 0;
        });
      }
    },
    beforeDestroy: function () {
      window.removeEventListener('click', this.hideMenu);
    },
    mounted: function () {
      window.addEventListener('click', this.hideMenu);
    },
    methods: {
      clkConfirm (info) {
        let res = JSON.stringify(this.value);

        if (this.value.length < this.lablength && this.text.length > 0 && res.indexOf('"' + this.text + '"') < 0) {
          res = JSON.parse(res);
          res.push(info || {text: this.text, bgcolor: '#409eff'});
          this.$emit('input', res);
          this.text = '';
        }
        this.hideMenu();
      },
      clkDel (info, index) {
        let res = JSON.parse(JSON.stringify(this.value));

        res.splice(index, 1);
        this.$emit('input', res);
      },
      cbkClkItem (data) {
        this.clkConfirm(data[0]);
      },
      evtChange (info, index) {
        let res = JSON.parse(JSON.stringify(this.value));
        
        res.splice(index, 1, info);
        this.$emit('input', res);
      },
      evtKeyup () {
        this.showMenu = true;
      },
      hideMenu () {
        this.showMenu = false;
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-add-label {

    > .wrap-label {
      overflow: hidden;
    
      > .label {
        position: relative;
        display: inline-block;
        margin-right: 25px;
        margin-bottom: 5px;
        height: 30px;
        line-height: 30px;
        padding-left: 5px;
        color: #fff;
        background-color: var(--theme);

        > i {
          display: inline-block;
          font-size: 20px!important;
          vertical-align: middle;
          background-color: transparent!important;
        }

        > input {
          position: absolute;
          top: 0;
          right: -20px;
          padding: 2px 4px;
          // padding-top: 2px;
          // padding-bottom: 2px;
          width: 20px;
          height: 100%;
          border: 0;
          outline: medium;
          background-color: #ddd;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          cursor: pointer;
        }
      }

    }

    > .wrap-bottom {
      position: relative;
      height: 30px;
      // overflow: hidden;

      > .input {
        float: left;
        width: calc(100% - 60px - 5px);
        height: 100%;
      }
      > .button {
        float: left;
        display: inline-block;
        margin-left: 5px;
        width: 60px;
        height: 100%;
      }

      > .wrap-menu {
        position: absolute;
        left: 0;
        top: calc(100% + 2px);
        width: calc(100% - 60px - 5px);
        z-index: 2;
      }      
    }

    .mn-lbl {
      padding: 4px;
      color: #fff;
    }
  }
</style>