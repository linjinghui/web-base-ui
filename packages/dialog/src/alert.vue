<template>
  <cmp-dialog class="dialog-alert" :class="{'hasBtn': bfBtnText}" :eventName="bfEventName" :display="bfDisplay" :needClose="bfNeedClose" @callback="callback">
    <p class="wrap-img">
      <i class="cmpIconfont" :class="('icon-' + bfTheme)"></i>
    </p>
    <p class="title" v-html="bfTitle"></p>
    <p class="subTitle" v-html="bfSubTitle"></p>
    <template v-if="bfBtnText">
      <cmp-button :theme="bfTheme" :text="bfBtnText" @click="callback({'btnInfo': {'theme': bfTheme, 'text': bfBtnText, 'flag': bfBtnFlag}})"></cmp-button>
    </template>
  </cmp-dialog>
</template>

<script type="text/babel">
  import Dialog from './main.vue';
  import Button from '../../button/src/main.vue';

  export default {
    name: 'Contact',
    components: {
      cmpDialog: Dialog,
      cmpButton: Button
    },
    props: {
      display: '',
      eventName: '',
      title: '',
      subTitle: '',
      btnText: '',
      btnFlag: '',
      theme: {
        default: 'warn'
      },
      needClose: ''
    },
    data: function () {
      return {
        bfEventName: this.eventName,
        bfTitle: this.title,
        bfSubTitle: this.subTitle,
        bfDisplay: this.display,
        bfBtnText: this.btnText,
        bfTheme: this.theme,
        bfNeedClose: this.needClose,
        bfBtnFlag: this.btnFlag
      };
    },
    watch: {
      display: function (val) {
        this.bfDisplay = val;
      },
      btnText: function (val) {
        this.bfBtnText = val;
      },
      subTitle: function (val) {
        this.bfSubTitle = val;
      },
      btnFlag: function (val) {
        this.bfBtnFlag = val;
      }
    },
    methods: {
      callback: function (val) {
        this.$emit('callback', val);
      }
    }
  };
</script>

<style lang="scss">
  .dialog-alert {
    .wrapper {
      width: 480px!important;
    }
  }
</style>
<style scoped lang="scss">

  .dialog-alert {
    text-align: center;

    .wrap-img {
      padding-top: 60px;padding-bottom: 20px;

      .cmpIconfont {
        color: #13ce66;font-size: 84px;
      }

      .icon-del:before {
        content: "\e630"; color: #ff5e5e;
      }

      .icon-warn:before {
        content: "\e62a";color: #ffd648;
      }

      .icon-fresh:before {
        content: "\e62c";color: #45abff;
      }
    }

    .title {
      line-height: 26px;font-size: 18px;color: #333;
    }

    .subTitle {
      margin-top: 10px;margin-bottom: 23px;line-height: 26px;font-size: 12px;color: #666;
    }

    .button {
      border-radius: 2px;
    }
  }

  .dialog-alert.hasBtn {

    .wrap-img {
      padding-top: 36px;
    }

    .subTitle {
      margin-bottom: 12px;
    }
  }
</style>