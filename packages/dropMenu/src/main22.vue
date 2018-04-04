<template>
  <div class="wrap-drop-menu" @click.stop>
    <template v-if="fbWithSearch">
      <cmp-inputmain :placeholder="fbPlaceholder" :value="fbIptValue" @focus="fbShow=true" @callback="callbackIpt"></cmp-inputmain>
    </template>
    <template v-else>
      <label :placeholder="fbPlaceholder" @click="fbShow=!fbShow">{{fbValue}}</label>
    </template>
    <i class="icon cmpIconfont" :class="{'icon-arrow_u': !fbShow, 'icon-arrow_d': fbShow}" @click="fbShow=!fbShow"></i>
    <vperfect-scrollbar class="scroll-area" :settings="settings" v-show="fbShow">
      <template v-for="(info, index) in fbData">
        <a @click="clk(index, info)" v-if="typeof info==='string'" :class="{'active': fbActive===index, 'disabled': fbDisabledIndex===index}">
          {{info}}
        </a>
        <a @click="clk(index, info)" v-else-if="fbKeyWord==='html'" :class="{'active': fbActive===index, 'disabled': (fbDisabledIndex===index||info.disabled)}" v-html="info[fbKeyWord]"></a>
        <a @click="clk(index, info)" v-else :class="{'active': fbActive===index, 'disabled': (fbDisabledIndex===index||info.disabled)}">
          <template v-for="index in fbKeyWord.split(fbFgf).length">
            {{info[fbKeyWord.split(fbFgf)[index-1]]}}
          </template>
        </a>
      </template>
    </vperfect-scrollbar>
  </div>
</template>

<script type="text/babel">
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';
  import InputMain from '../../input/src/main.vue';

  export default {
    name: 'DrapMenu',
    components: {
      'vperfect-scrollbar': VuePerfectScrollbar,
      'cmpInputmain': InputMain
    },
    data: function () {
      return {
        fbWithSearch: this.withSearch,
        fbPlaceholder: this.placeholder,
        fbKeyWord: this.keyword,
        fbActive: '',
        fbDisabledIndex: this.disabledIndex,
        fbShow: this.show,
        fbValue: '',
        fbIptValue: '',
        fbSearchQuery: '',
        fbFgf: '|',
        scroll: '',
        settings: {
          // 滚动速度，默认1
          wheelSpeed: 0.5
        },
        fbSearchSwitch: 'on',
        fbClkTime: ''
      };
    },
    props: {
      withSearch: {
        default: false
      },
      data: {
        type: Array,
        default: []
      },
      placeholder: '',
      keyword: '',
      keyvalue: {
        default: function () {
          return this.keyword;
        }
      },
      keysearch: {
        default: function () {
          return this.keyword;
        }
      },
      ivalue: {
        default: ''
      },
      disabledIndex: '',
      show: {
        type: Boolean,
        default: false
      },
      customSearch: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      fbData: function () {
        let _this = this;
        let result = _this.data;

        if (result.length > 0 && !this.customSearch) {
          result = result.filter(function (info) {
            let str = '';
            let rest = false;

            if (typeof info === 'string') {
              str = info;
              rest = _this.fbSearchQuery ? (str.indexOf(_this.fbSearchQuery) !== -1) : true;
            } else {
              for (let i = 0;i < _this.keysearch.split(_this.fbFgf).length;i++) {
                str = info[_this.keysearch.split(_this.fbFgf)[i]];
                let temp = _this.fbSearchQuery ? ((str + '').indexOf(_this.fbSearchQuery) !== -1) : true;

                rest = rest || temp;
              }
            }
            return rest;
          });
        }
        return result;
      }
    },
    watch: {
      ivalue: function (val) {
        // this.fbActive = val;
        // if (val === '') {
        //   this.clkClear();
        // } else {
        //   this.clk(val, this.data[val]);
        // }
        this.countActive();
      },
      show: function (val) {
        this.fbShow = val;
      }
    },
    beforeDestroy: function () {
      window.removeEventListener('click', this.hideListWrap);
    },
    mounted: function () {
      window.addEventListener('click', this.hideListWrap);
      // if (this.active !== '' && this.data.length > 0) {
      //   this.clk(this.active, this.data[this.active]);
      // }
      if (this.ivalue) {
        this.countActive();
      }
    },
    methods: {
      hideListWrap: function () {
        if (this.fbShow) {
          this.fbShow = false;
        }
      },
      funBlur: function (data) {
        this.$emit('blur', data);
      },
      clkClear: function () {
        this.fbActive = '';
        this.fbValue = '';
        this.fbIptValue = '';
        this.fbShow = true;
        this.$emit('click', '');
      },
      clk: function (index, info) {
        let disabled = this.fbDisabledIndex === index || info.disabled;

        if (!disabled) {
          this.fbActive = index;
          this.fbShow = false;

          let result = '';
          let callbackData = '';

          if (this.fbActive !== '') {
            let activeInfo = callbackData = this.fbData[this.fbActive];

            if (typeof activeInfo === 'string') {
              result = activeInfo;
            } else {
              for (var i = 0;i < this.keyvalue.split(this.fbFgf).length;i++) {
                if (result) {
                  result += ' ' + activeInfo[this.keyvalue.split(this.fbFgf)[i]];
                } else {
                  result = activeInfo[this.keyvalue.split(this.fbFgf)[i]];
                }
              }
            }
          }
          this.$emit('callback', callbackData);
          this.fbValue = result;
          this.fbIptValue = result;
          this.fbClkTime = new Date().getTime();
          this.$nextTick(function () {
            this.fbSearchQuery = '';
          });
        }
      },
      callbackIpt: function (data) {
        let _this = this;
        // 是否通过点击了item进来的
        let isClkItem = new Date().getTime() - this.fbClkTime < 500;

        this.fbSearchQuery = data;
        this.fbIptValue = data;
        // 自定义检索
        if (this.customSearch) {
          if (this.fbSearchSwitch === 'on' && !isClkItem) {
            this.fbSearchSwitch = 'off';
            setTimeout(function () {
              _this.$emit('search', _this.fbSearchQuery);
              _this.fbSearchSwitch = 'on';
            }, 1000);
          }
        } else if (this.withSearch) {
          if (!isClkItem) {
            this.$emit('callback', data);
          }
        }
        if (this.fbSearchQuery === '') {
          this.fbActive = '';
        }
      },
      countActive: function () {
        let data = this.data;
        let index = '';
        let key = this.keyvalue;
        let val = this.ivalue;

        for (var i = data.length - 1;i >= 0;i--) {
          let info = data[i];

          if (typeof info !== 'string') {
            info = info[key];
          }
          if (info === val) {
            index = i;
            break;
          }
        }
        if (index !== '') {
          this.clk(index, this.data[index]);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../src/style/global';
  $height: 30px;
  $padding: 10px;
  @mixin theme() {
    border: solid 1px #ddd;
    border-radius: 4px;
    background-color: #fff;
  }

  div {
    position: relative;
    height: $height;
    line-height: $height;
    padding-left: $padding;
    padding-right: $height;
    @include theme();
    font-size: 12px;
    user-select: none;

    label {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      word-break: break-all;
      text-overflow: ellipsis;
    }

    label[placeholder]:empty:before {
      content: attr(placeholder);
      color: #999;
      opacity: 0.54;
    }

    input {
      display: block;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      border: 0;
      background-color: transparent;
    }

    .cmpIconfont {
      display: block;
      @include center();
      left: auto;
      width: 28px;
      height: 30px;
      font-size: 24px;
      cursor: pointer;
    }

    .icon-eraser {
      font-size: 20px;
    }

    .scroll-area {
      position: absolute;
      left: 0;
      top: calc(100% + 8px);
      width: 100%;
      max-height: 214px;
      @include theme();
      border-width: 0;
      overflow-y: auto;
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
      z-index: 2;

      a {
        display: block;
        width: 100%;
        height: 30px;
        padding-left: $padding;
        padding-right: $padding;
        cursor: pointer;
      }

      a:hover {
        background-color: #e3edf3;
      }

      a.active {
        color: #fff;
        background-color: #0079ff;
      }

      a.disabled {
        color: #999;
        cursor: not-allowed;
      }
    }
  }
</style>