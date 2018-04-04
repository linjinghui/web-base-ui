<template>
  <div class="dialog" v-if="bfDisplay!==''" :class="clsArr">
    <div class="wrapper" :style="{top: top, 'height': fbCssWrapHeight + 'px'}">
      <i class="icon cmpIconfont icon-delete" v-if="bfNeedClose" @click="setDisplay(0)"></i>
      <header v-if="bfTitle">
        {{bfTitle}}
      </header>
      <vperfect-scrollbar class="scroll-area" :settings="settings" :style="{'height': cpuSectionHeight + 'px'}">
        <slot></slot>
      </vperfect-scrollbar>
      <footer v-if="bfButtons.length>0">
        <cmp-button v-for="info in bfButtons" :theme="info.theme" :text="info.text" @click="setDisplay(info)"></cmp-button>
      </footer>
    </div>
  </div>
</template>

<script type="text/babel">
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import Button from '../../button/src/main.vue';

  export default {
    name: 'Dialog',
    components: {
      cmpButton: Button,
      'vperfect-scrollbar': VuePerfectScrollbar
    },
    data: function () {
      return {
        top: '',
        bfTitle: this.title,
        bfDisplay: this.display,
        bfButtons: this.buttons,
        bfCssHeaderHeight: 50,
        bfCssBottomHeight: 60,
        bfNeedClose: this.needClose,
        clsArr: [],
        scroll: '',
        settings: {
          wheelSpeed: 0.5
        }
      };
    },
    props: {
      display: '',
      title: {
        type: String,
        default: ''
      },
      buttons: {
        type: Array,
        default: function () {
          return [];
        }
      },
      eventName: {
        default: 'changeDialog'
      },
      needClose: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      display: function (val) {
        this.bfDisplay = val;
      },
      bfDisplay: function (val) {
        if (val) {
          this.show();
        } else {
          this.hide();
        }
      },
      title: function (val) {
        this.bfTitle = val;
      },
      buttons: function (val) {
        this.bfButtons = val;
      }
    },
    computed: {
      fbCssWrapHeight: function () {
        // fbCssWrapHeight: 340,
        let wrapHeight = 350;

        if (!this.bfTitle && (!this.bfButtons || this.bfButtons.length === 0)) {
          wrapHeight -= this.bfCssBottomHeight;
        }
        return wrapHeight;
      },
      cpuSectionHeight: function () {
        let sectionHeight = this.fbCssWrapHeight;

        if (this.bfTitle) {
          sectionHeight -= this.bfCssHeaderHeight;
        }

        if (this.bfButtons.length > 0) {
          sectionHeight -= this.bfCssBottomHeight;
        }
        return sectionHeight;
      }
    },
    mounted: function () {
      window.addEventListener('keyup', this.fun_keyup, false);
      this.addParamsChange();
    },
    methods: {
      'show': function () {
        var _this = this;
        var top = '0';

        this.clsArr = ['showing'];
        setTimeout(function () {
          _this.top = top;
        }, 0);
      },
      'hide': function () {
        var _this = this;
        var top = '-500%';

        this.top = top;
        setTimeout(function () {
          _this.clsArr = [];
        }, 300);
      },
      'setDisplay': function (info) {
        let data = {
          'btnInfo': info
        };

        this.$emit('callback', data);
      },
      'fun_keyup': function (event) {
        var e = event || window.event;
        var keyCode = e.keyCode;

        if (keyCode === 27 && this.bfDisplay) {
          this.setDisplay(0);
        }
      },
      addParamsChange: function () {
        let _this = this;

        window.EVENTBUS.$on(this.eventName, function (data) {
          if (data && (typeof data.display === 'boolean')) {
            _this.bfDisplay = data.display;
          }
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../src/style/global";

  .icon-delete {
    position: absolute;
    top: 14px;
    right: 10px;
    width: 24px;
    height: 24px;
    color: #999;
    font-size: 22px;
    cursor: pointer;
    z-index: 1;
  }

  .icon-delete:hover {
    color: #ddd;
  }

  .icon-delete:active {
    color: #aaa;
  }

  .dialog {
    display: none;
    position: fixed;top: 0;left: 0;width: 100%;height: 100%;color: #262626;background-color: rgba(0, 0, 0, .3);z-index: 11;

    .wrapper {
      @include center();top: -300%;
      width: 520px;height: 350px;background-color: #fff;transition: top .4s ease-in-out .1s;

      header {
        position: relative;width: 100%;height: 50px;line-height: 50px;background-color: inherit;border-bottom: solid 1px #eee;text-indent: 14px;font-size: 14px;user-select:none;
      }

      section {
        position: relative;width: 100%;min-height: calc(100% - 50px - 60px);padding-left: 14px;padding-right: 14px;
      }

      footer {
        position: relative;width: 100%;height: 60px;background-color: inherit;box-shadow: inset -0px -1px 0 0 #eeeeee;text-align: right;border-top: solid 1px #eee;user-select:none;

        .button {
          margin-right: 10px;margin-top: 14px;padding: 6px 15px;border-radius: 2px;
        }

        .button:last-of-type {
          margin-right: 24px;
        }
      }

    }
  }

  .dialog.showing {
    display: block;
  }
</style>