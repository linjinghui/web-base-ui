<template>
  <cmp-dialog class="dialog-confirm" :buttons="bfButtons" :eventName="bfEventName" :display="bfDisplay" :needClose="bfNeedClose" @callback="callback">
    <p class="wrap-img">
      <i class="cmpIconfont" :class="('icon-' + bfTheme)"></i>
    </p>
    <p class="title" v-html="bfTitle"></p>
    <p class="subTitle" v-html="bfSubTitle"></p>
  </cmp-dialog>
</template>

<script type="text/babel">
  import Dialog from './main.vue';
  import Button from '../../button/src/main.vue';

  export default {
    name: 'Confirm',
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
      theme: {
        default: 'warn'
      },
      buttons: {
        type: Array,
        default: function () {
          return [];
        }
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
        bfButtons: this.buttons,
        bfNeedClose: this.needClose
      };
    },
    watch: {
      display: function (val) {
        this.bfDisplay = val;
      },
      subTitle: function (val) {
        this.bfSubTitle = val;
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
  .dialog-confirm {
    .wrapper {
      width: 510px!important;

      footer {
        border-top: 0!important;
      }
    }
  }
</style>
<style scoped lang="scss">

  .dialog-confirm {
    text-align: center;

    .wrap-img {
      padding-top: 70px;padding-bottom: 40px;

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
      margin-top: 10px;line-height: 22px;font-size: 12px;color: #666;
    }

    .button {
      border-radius: 2px;
    }
  }
</style>