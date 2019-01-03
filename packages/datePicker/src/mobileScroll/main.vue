<!--
功能介绍：
1、
 -->

<template>
  <cmp-input :id="id" v-model="time" type="text" :placeholder="placeholder" :disabled="disabled" :readonly="readonly">
    <i class="cicon-calendar-cpt-chr center-v" slot="right" style="font-size: 26px;" @click="clkIcon">
      <span></span>
    </i>
  </cmp-input>
</template>

<script type="text/babel">
  import Input from '../../../input/index.js';
  import './js/mobiscroll.custom-2.16.1.min.js';

  const $ = window.$;
  
  export default {
    name: 'MobileScrollDatePicker',
    components: {
      'cmpInput': Input
    },
    data: function () {
      return {
        id: 'mbs_' + new Date().getTime() + parseInt(Math.random() * 100),
        time: ''
      };
    },
    props: {
      value: '',
      placeholder: {
        default: '请选择日期'
      },
      disabled: {
        default: false
      },
      readonly: {
        default: false
      }
    },
    watch: {
      value: function (val) {
        this.setValue(val);
      },
      disabled: function (val) {
        if (val) {
          this.destroy();
        }
      }
    },
    computed: {
      //
    },
    beforeDestroy: function () {
      this.destroy();
    },
    mounted: function () {
      var _this = this;

      if (!this.disabled) {
        // var $ = window.jQuery;
        var client = this.browerVersion();

        this.isMobile = (client.ios || client.android);
        // 设置format
        $.mobiscroll.i18n.zh = $.extend($.mobiscroll.i18n.zh, {
          dateFormat: 'yyyy-mm-dd'
        });
        // 初始化日期插件
        $('#' + this.id).mobiscroll().calendar({
          theme: '',
          mode: 'clickpick',
          display: (client.ios || client.android) ? 'bottom' : 'modal',
          lang: 'zh',
          controls: ['calendar', 'time'],
          // 选择星期
          // selectType: 'week',
          // 多选
          // multiSelect: true,
          onClose: function (event, inst) {
            if (inst === 'set') {
              _this.$emit('input', event);
            }
          }
        });
      }
      this.setValue(this.value);
    },
    methods: {
      browerVersion: function () {
        var u = navigator.userAgent;

        return {
          // IE内核
          trident: u.indexOf('Trident') > -1,
          // opera内核
          presto: u.indexOf('Presto') > -1,
          // 苹果、谷歌内核
          webKit: u.indexOf('AppleWebKit') > -1,
          // 火狐内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
          // 是否为移动终端
          mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
          // ios终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
          // android终端或者uc浏览器
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
          // 是否为iPhone或者QQHD浏览器
          iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
          // 是否iPad
          iPad: u.indexOf('iPad') > -1,
          // 是否web应该程序，没有头部与底部
          webApp: u.indexOf('Safari') === -1,
          // 加mobile和这个属性一起，可以判断uc浏览器
          linux: u.indexOf('linux') > -1,
          // trident IE内核 并且包含WP7标示 windows phone7手机
          wp7: (u.indexOf('WP7') > -1) || (u.indexOf('Windows Phone OS') > -1)
        };
      },
      clkIcon: function () {
        $('#' + this.id).click();
      },
      setValue: function (val) {
        if (val) {
          $('#' + this.id).mobiscroll('setVal', new Date(isNaN(val) ? val : parseInt(val)));
          this.time = val; 
        }
      },
      destroy: function () {
        $('.mbsc-mobiscroll').remove();
      }
    }
  };
</script>

<style>
  @import "./css/mobiscroll.custom-2.16.1.min.css";
</style>
<style scoped lang="scss">
  [class^=cicon-calendar] {
    color: #c0c4cc!important;
    background-color: transparent!important;
  }
</style>