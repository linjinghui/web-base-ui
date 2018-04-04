<template>
  <transition name="slide-fade">
    <div class="aside-wrapper" v-if="display!==''" v-show="fbDisplay" @click.stop="clk('empty')">
      <header>
        {{fbTitle}}
      </header>
      <vperfect-scrollbar class="scroll-area" :settings="settings" @ps-y-reach-end="scrollHandle('end')" @ps-y-reach-start="scrollHandle('start')">
        <slot name="content"></slot>
      </vperfect-scrollbar>
      <footer @click.stop>
        <cmp-button v-for="info in fbButtons" :theme="info.theme" :text="info.text" @click="clk(info)"></cmp-button>
      </footer>
    </div>
  </transition>
</template>


<script type="text/babel">
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import Button from '../../button/src/main.vue';

  export default {
    name: 'Sidebar',
    props: {
      display: '',
      title: {
        type: String,
        default: '标题'
      },
      headerLabel: {
        type: String,
        default: ''
      },
      buttons: {
        type: Array,
        default: function () {
          return [
            {
              'theme': 'cancel',
              'text': '取消'
            },
            {
              'theme': 'def',
              'text': '确认'
            }
          ];
        }
      },
      blurHide: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        fbDisplay: this.display,
        fbTitle: this.title,
        scroll: '',
        settings: {
          // 滚动速度，默认1
          wheelSpeed: 0.5
        },
        fbButtons: this.buttons,
        fbBlurHide: this.blurHide
      };
    },
    beforeDestroy: function () {
      window.removeEventListener('keyup', this.fun_keyup, false);
      window.removeEventListener('click', this.fun_blurHide);
    },
    mounted: function () {
      window.addEventListener('keyup', this.fun_keyup, false);
      if (this.fbBlurHide) {
        window.addEventListener('click', this.fun_blurHide);
      }
    },
    components: {
      'cmpButton': Button,
      'vperfect-scrollbar': VuePerfectScrollbar
    },
    watch: {
      display: function (val) {
        this.fbDisplay = val;
      },
      title: function (val) {
        this.fbTitle = val;
      },
      cancelBtnText: function (val) {
        this.fbCancelBtnText = val;
      },
      rightBtnText: function (val) {
        this.fbRightBtnText = val;
      }
    },
    methods: {
      'clk': function (val) {
        this.$emit('callback', val);
      },
      scrollHandle: function (type) {
        //
      },
      'fun_keyup': function (event) {
        var e = event || window.event;
        var keyCode = e.keyCode;

        if (keyCode === 27 && this.fbDisplay) {
          this.clk('no');
        }
      },
      'fun_blurHide': function () {
        if (this.fbDisplay) {
          this.clk('no');
        }
      }
    }
  };
</script>

<style scope lang="scss">

  .aside-wrapper {
    position: fixed;top: 0;right: 0;width: 400px;height: 100%;background-color: #fff;box-shadow: -2px 0 8px 0 rgba(0, 0, 0, 0.22);

    >header {
      height: 60px;line-height: 60px;padding-left: 20px;font-size: 16px;border-bottom: solid 1px #eee;
    }

    >.scroll-area {
      height: calc(100% - 60px - 60px);overflow: auto;
    }

    >footer {
      height: 60px;border-top: solid 1px #eee;text-align: right;

      .button {
        margin-right: 10px;margin-top: 12px;padding: 8px 15px;border-radius: 2px;
      }

      .button:last-of-type {
        margin-right: 24px;
      }
    }
  }

  .slide-fade-enter-active {
    transition: right .3s ease-in;
  }

  .slide-fade-leave-active {
    transition: right .3s ease-out;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    right: -410px;
  }
</style>