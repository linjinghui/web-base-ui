<template>
  <div v-show="bfDisplay" :class="bfTheme"><i class="cicon-load move"></i> {{bfText}}</div>
</template>

<script type="text/babel">
  export default {
    name: 'Loading',
    data: function () {
      return {
        bfTheme: this.theme,
        bfText: this.text,
        bfDisplay: this.display
      };
    },
    props: {
      theme: {
        default: 'gray'
      },
      text: {
        default: '处理中...'
      },
      display: {
        type: Boolean,
        default: false
      },
      eventName: {
        default: 'changeLoading'
      }
    },
    watch: {
      display: function (val) {
        this.bfDisplay = val;
      },
      text: function (val) {
        this.bfText = val;
      }
    },
    mounted: function () {
      this.addParamsChange();
      this.addEscListener();
    },
    methods: {
      addParamsChange: function () {
        let _this = this;

        window.EVENTBUS.$on(_this.eventName, function (data) {
          if (typeof data.display !== 'undefined') {
            _this.bfDisplay = data.display;
          }
          if (data.text) {
            _this.bfText = data.text;
          }
          if (data.theme) {
            _this.bfTheme = data.theme;
          }
        });
      },
      addEscListener: function () {
        let _this = this;

        window.addEventListener('keyup', function (event) {
          let e = event || window.event;
          let keyCode = e.keyCode;

          if (keyCode === 27 && _this.bfDisplay) {
            _this.bfDisplay = false;
          }
        }, false);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../src/style/global";

  div {
    width: 120px;height: 40px;line-height: 40px;text-align: center;
    @include center();position: fixed;background-color: #fff;font-size: 14px;z-index: 11;color: #0079ff;border-style: solid;border-width: 1px;border-color: #0079ff;user-select:none;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);

    .cicon-load {
      display: inline-block;position: relative;margin-right: 5px;width: 20px;height: 20px;
      border-radius: 50%;border-style: solid;border-width: 2px;border-color: inherit;vertical-align: -5px;
    }

    .cicon-load:after {
      content: '';width: 5px;height: 5px;border-radius: 50%;background-color: #fff;position: absolute;left: -1px;top: -1px;
    }
  }

  div.gray {
    color: #333;border-color: #ddd;

    .cicon-load {
      border-color: #333;
    }
  }
</style>