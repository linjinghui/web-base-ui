<!--
功能介绍：
1、
 -->

<template>
  <div class="wrap-drop-menu" @click.stop>
    <cmp-input type="text" ref="dmIpt" v-model="iptValue" :placeholder="placeholder" :disabled="disabled+''==='true'" 
    :readonly="multi?true:readonly" @keyup="evn_keyup" @enter="evn_enter" @blur="evn_blur">
        <i class="cicon-arrow-bottom center-v" v-if="!isSearch" :disabled="disabled+''==='true'" :class="{'up': show}" slot="right" @click.stop="clk_arrow"></i>
        <i class="cicon-loading move-loop center-v" v-if="isSearch" slot="right" @click.stop="clk_arrow">
          <span></span><span></span><span></span>
        </i>
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
  import Menu from '../../menu/index.js';

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
      },
      isSearch: {
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
      data: function () {
        // alert(1);
        this.$nextTick(function () {
          this.setIptValue();
        });
      },
      value: function (val) {
        this.setIptValue();
      },
      iptValue: function (val) {
        if (!val) {
          this.result = [];
        }
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
      this.$refs.dmIpt.$el.addEventListener('click', this.toggleDropmenu);
      this.setIptValue();
    },
    methods: {
      clk_arrow: function () {
        // if (this.disabled + '' !== 'true') {
        //   this.show = !this.show;
        // }
        this.toggleDropmenu();
        // this.result = '';
      },
      clk_hide: function () {
        // if (this.disabled + '' !== 'true') {
        //   this.show = false;
        // }
        this.toggleDropmenu(false);
      },
      toggleDropmenu: function (status) {
        if (this.disabled + '' !== 'true') {
          if (typeof status === 'undefined') {
            this.show = !this.show;
          } else {
            this.show = status;
          }
        }
        // if (typeof status === 'undefined') {
        //   if (this.disabled + '' !== 'true') {
        //     this.show = !this.show;
        //   }
        // } else {
        //   this.show = status;
        // }
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
        var domMenuItems = domMenu.querySelectorAll('.line');
        var arr = [];

        for (let i = 0;i < indexArr.length;i++) {
          var item = indexArr[i];

          if (isNaN(item)) {
            // 字符串
            arr[arr.length] = (function () {
              var str = '';

              for (let j = 0;j < domMenuItems.length;j++) {
                var innerText = domMenuItems[j] ? domMenuItems[j].innerText : '';

                if (innerText.indexOf(item) >= 0) {
                  str = innerText;
                  break;
                }
              }
              return str;
            }());
          } else {
            // 下标 
            arr[arr.length] = domMenuItems[item] ? domMenuItems[item].innerText : '';
          }
        }
        this.iptValue = arr.join('、');
      },
      evn_keyup: function (evt, key) {
        if (!this.disabled && !this.readonly) {
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
      },
      evn_enter: function () {
        this.$emit('search', this.iptValue);
      },
      evn_blur: function () {
        if (!this.multi) {
          this.show = false;
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
      >.cicon-loading {
        font-size: 20px;
        color: inherit;
        background-color: transparent;
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