<template>
  <cmp-dialog class="dialog-contact" :eventName="bfEventName" :display="bfDisplay" :title="'联系我们'" :buttons="bfButtons" :needClose="bfNeedClose" v-on:callback="callback">
    <p class="wrap-img">
      <i class="cmpIconfont icon-service"></i>
    </p>
    <p><label>官方网站：</label><a :href="website" target="_blank">{{website}}</a></p>
    <p><label>客服热线：</label>{{hotline}}</p>
    <p><label>商务合作邮箱：</label><a :href="'mailto:' + businessMail">{{businessMail}}</a></p>
    <p><label>技术支持邮箱：</label><a :href="'mailto:' + supporMail">{{supporMail}}</a></p>
    </cmp-dialog>
</template>

<script type="text/babel">
  import Dialog from './main.vue';
  import {WEBSITE_OFFICIAL, HOTLINE, BUSINESSMAIL, SUPPORMAIL} from '../../../node_modules/web-framework/libs/js/constant';

  export default {
    name: 'Contact',
    components: {
      cmpDialog: Dialog
    },
    props: {
      display: '',
      eventName: '',
      needClose: ''
    },
    data: function () {
      return {
        bfEventName: this.eventName,
        bfTitle: this.title,
        bfDisplay: this.display,
        bfButtons: [
          {
            'theme': 'cancel',
            'text': '取消'
          },
          {
            'theme': 'def',
            'text': '确认'
          }
        ],
        bfNeedClose: this.needClose,
        website: WEBSITE_OFFICIAL,
        hotline: HOTLINE,
        businessMail: BUSINESSMAIL,
        supporMail: SUPPORMAIL
      };
    },
    watch: {
      display: function (val) {
        this.bfDisplay = val;
      }
    },
    methods: {
      callback: function (val) {
        this.$emit('callback', val);
      }
    }
  };
</script>

<style scoped lang="scss">

  .wrap-img {
    padding-top: 25px;padding-bottom: 25px;text-align: center;

    .icon-service {
      color: #45abff;font-size: 60px;
    }
  }

  p:not(.wrap-img) {
    text-indent: 152px;font-size: 12px;line-height: 28px;

    label {
      margin-right: 5px;
    }

    a {
      color: #0079ff;
    }
  }
</style>