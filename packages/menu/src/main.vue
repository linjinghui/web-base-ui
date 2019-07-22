<!--
功能介绍：
1、
 :key="item.id"
 @mouseenter="hover=index"
      @click="clk_item(index)"
 -->

<template>
  <vperfect-scrollbar class="wrap-menu" ref="ps"
    :settings="settings"
    v-show="show">
    <div class="line" v-for="(item, index) in data" :key="item.id"
      @mousedown="clk_item(index)"
      :class="{'theme-c active': multi?value.indexOf(index)!==-1:value[0]===index}">
      <slot name="line" :item="item">{{item}}</slot><i class="cicon-tick center-hv" v-if="multi"></i>
    </div>
  </vperfect-scrollbar>
</template>

<script type="text/babel">
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';

  export default {
    name: 'Menu',
    components: {
      'vperfect-scrollbar': VuePerfectScrollbar
    },
    data: function () {
      return {
        id: 'btn_' + new Date().getTime() + parseInt(Math.random() * 100),
        // 滚动速度，默认1
        settings: {
          wheelSpeed: 0.5
        },
        hover: '',
        active: []
      };
    },
    props: {
      value: {
        default: function () {
          return [];
        }
      },
      data: {
        default: function () {
          return [];
        }
      },
      show: {
        default: false
      },
      multi: {
        default: false
      }
    },
    watch: {
      // value: function (val) {
      //   if (!val) {
      //     this.hover = '';
      //   }
      // },
      // hover: function (val) {
      //   let _this = this;

      //   this.$nextTick(function () {
      //     let dom = document.querySelector('.wrap-menu > .line.hover');
      //     let parantDom = document.querySelector('.wrap-menu');
      //     let isVisible = _this.utl_isVisible(dom, parantDom);

      //     if ((typeof isVisible === 'boolean') && !isVisible) {
      //       // dom不在可见范围内，要自动滚动到dom所在位置
      //       parantDom.scrollTop = dom.offsetTop - parantDom.offsetHeight + dom.offsetHeight;
      //     }
      //   });
      // }
    },
    computed: {
      //
    },
    beforeDestroy: function () {
      // window.removeEventListener('keydown', this.evt_keydown);
      // window.removeEventListener('click', this.emt_hide);
    },
    mounted: function () {
      // window.addEventListener('keydown', this.evt_keydown);
      // window.addEventListener('click', this.emt_hide);
    },
    methods: {
      emt_hide: function () {
        this.$emit('input', false);
      },
      clk_item: function (index) {
        // 单选的时候，不允许取消选择
        if (this.multi || this.value.indexOf(index) === -1) {
          var _value = JSON.parse(JSON.stringify(this.value));
          var _index = _value.indexOf(index);

          if (_index === -1) {
            // 不存在， 加入
            this.multi ? (_value.push(index)) : (_value = [index]);
          } else {
            // 存在， 删除
            this.multi ? (_value.splice(_index, 1)) : (_value = []);
          }
          this.$emit('input', _value);
          this.$nextTick(function () {
            var result = [];

            for (var i = 0;i < _value.length;i++) {
              result[result.length] = this.data[_value[i]];
            }
            this.$emit('cbkClkItem', result);
          });
        }
      },
      evt_keydown: function (event) {
        if (this.show) {
          event = event || window.event;
          if (event.keyCode === 38 || event.keyCode === 40) {
            this.evt_arrow(event.keyCode);
          } else if (event.keyCode === 13) {
            this.evt_enter();
          } else if (event.keyCode === 27) {
            this.emt_hide();
          }
        }
      },
      evt_arrow: function (keyCode) {
        var num = this.hover === '' ? -1 : this.hover;

        if (keyCode === 38) {
          // 向上
          num -= 1;
        } else if (keyCode === 40) {
          // 向下
          num += 1;
        }
        if (num < 0) {
          num = this.data.length - 1;
        }
        if (num > this.data.length - 1) {
          num = 0;
        }
        this.hover = num;
      },
      evt_enter: function () {
        this.clk_item(this.hover);
      },
      utl_isVisible: function (dom, parantDom) {
        let result = '';

        if (dom && parantDom) {
          result = !(parantDom.scrollTop >= (dom.offsetTop + dom.offsetHeight) || (parantDom.scrollTop + parantDom.offsetHeight) <= (dom.offsetTop + dom.offsetHeight));
        }
        return result;
      }
    }
  };
</script>

<style lang="scss">
  .wrap-menu {
    .ps__scrollbar-x-rail,
    .ps__scrollbar-y-rail {
      z-index: 1;
    }
  }
</style>
<style scoped lang="scss">
  .wrap-menu {
    position: relative;
    padding-top: 5px;
    padding-bottom: 5px;
    width: 100%;
    max-height: 310px;
    border: solid 1px #e4e7ed;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transition: max-height .1s;
    overflow: hidden;
    transform-origin: center top 0px;
    transition: all .2s;

    >.line {
      position: relative;
      padding-left: 10px;
      padding-right: 10px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      user-select: none;

      >.cicon-tick {
        display: none;
        position: absolute;
        left: auto;
        right: 10px;
        font-size: 20px;
      }
    }
    >.line:hover {
      background-color: #f5f7fa;
    }
    >.line:active,
    >.line.active {
      // color: var(--theme);
      background-color: transparent;

      >.cicon-tick {
        display: unset;
      }
    }
  }

  // .wrap-menu.hidden {
  //   opacity: 0;
  //   transform: scaleY(0);
  // }
</style>