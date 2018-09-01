<!--
功能介绍：
1、
 -->

<template>
  <div class="wrap-drop-menu" @click.stop>
    <cmp-input type="text" ref="dmIpt" v-model="iptValue" :placeholder="placeholder" :disabled="disabled+''==='true'" :readonly="multi?true:readonly" @keyup="evn_keyup">
        <i class="cicon-arrow-bottom center-v" :disabled="disabled+''==='true'" :class="{'up': show}" slot="right" @click.stop="clk_arrow"></i>
    </cmp-input>
    <cmp-menu ref="dmmeu" :show="show" :multi="multi" :data="data" v-model="result" @cbkClkItem="cbkClkItem">
      <template slot="line" slot-scope="props">
        <slot name="line" :item="props.item">{{props.item}}</slot>
      </template>
    </cmp-menu>
  </div>
</template>

<script type="text/babel">
  import Input from '../../input/index.js';
  import {Menu} from '../../menu/index.js';

  export default {
    name: 'DropMenu',
    components: {
      'cmpInput': Input,
      'cmpMenu': Menu
    },
    data: function () {
      return {
        show: false,
        result: this.value,
        iptValue: ''
      };
    },
    props: {
      value: {
        default: function () {
          return [];
        }
      },
      placeholder: {
        default: '请选择内容'
      },
      disabled: {
        default: false
      },
      readonly: {
        default: false
      },
      data: {
        default: function () {
          return [];
        }
      },
      multi: {
        default: false
      }
    },
    watch: {
      disabled: function (val) {
        if (val + '' === 'true') {
          this.show = false;
        } else {
          this.show = true;
        }
      },
      result: function (val) {
        this.$emit('input', val);
      },
      value: function (val) {
        this.setIptValue();
      },
      show: function (val) {
        if (val) {
          // 清除隐藏
          this.evn_keyup('', '');
        }
      }
    },
    computed: {
      //
    },
    beforeDestroy: function () {
      window.removeEventListener('click', this.clk_hide);
    },
    mounted: function () {
      window.addEventListener('click', this.clk_hide);
      this.$refs.dmIpt.$el.addEventListener('click', this.clk_arrow);
      this.setIptValue();
    },
    methods: {
      clk_arrow: function () {
        if (this.disabled + '' !== 'true') {
          this.show = !this.show;
        }
      },
      clk_hide: function () {
        if (this.disabled + '' !== 'true') {
          this.show = false;
        }
      },
      cbkClkItem: function (data) {
        this.$emit('cbkClkItem', data);
        if (!this.multi) {
          this.show = false;
        }
      },
      setIptValue: function () {
        var indexArr = this.value;
        var domMenu = this.$refs.dmmeu.$el;
        var domMenuItems = domMenu.childNodes;
        var arr = [];
        
        for (let i = 0;i < indexArr.length;i++) {
          arr[arr.length] = domMenuItems[indexArr[i]].innerText;
        }
        this.iptValue = arr.join('、');
      },
      evn_keyup: function (evt, key) {
        this.show = true;
        var _key = typeof key === 'undefined' ? this.iptValue : key;
        var domMenu = this.$refs.dmmeu.$el;
        var domMenuItems = domMenu.childNodes;

        for (let i = 0;i < domMenuItems.length;i++) {
          var dom = domMenuItems[i];
          var domText = dom.innerText;
          var isMatch = domText.indexOf(_key) > -1;
          
          dom.style.display = isMatch ? '' : 'none';
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-drop-menu {
    position: relative;
    vertical-align: middle;

    >.input {
      overflow: hidden;

      >.cicon-arrow-bottom {
        color: inherit;
        background-color: transparent;
        cursor: pointer;
        transition: transform .2s;
      }
      .cicon-arrow-bottom.up {
        transform: rotate(270deg);
      }
    }

    >.wrap-menu {
      position: absolute;
      left: 0;
      top: calc(34px + 2px);
      z-index: 2;
    }
  }
</style>