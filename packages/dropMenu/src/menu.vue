<!--
功能介绍：
1、
 -->

<template>
  <vperfect-scrollbar class="wrap-menu" ref="ps"
    :settings="settings"
    v-show="value">
    <div class="line" v-for="(item, index) in data"
      @mouseenter="hover=index"
      @click="clk_item(index)"
      :class="{'hover': hover===index, 'active': active.indexOf(index)!==-1}">
      <slot name="line" :item="item">{{item}}</slot>
      <i class="cicon-tick center-hv" v-if="multi" v-show="active.indexOf(index)!==-1"></i>
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
        default: false
      },
      data: {
        default: function () {
          return [];
        }
      },
      multi: {
        default: false
      }
    },
    watch: {
      value: function (val) {
        if (!val) {
          this.hover = '';
        }
      },
      hover: function (val) {
        let _this = this;

        this.$nextTick(function () {
          let dom = document.querySelector('.wrap-menu > .line.hover');
          let parantDom = document.querySelector('.wrap-menu');
          let isVisible = _this.utl_isVisible(dom, parantDom);

          if ((typeof isVisible === 'boolean') && !isVisible) {
            // dom不在可见范围内，要自动滚动到dom所在位置
            parantDom.scrollTop = dom.offsetTop - parantDom.offsetHeight + dom.offsetHeight;
          }
        });
      }
    },
    computed: {
      //
    },
    beforeDestroy: function () {
      window.removeEventListener('keydown', this.evt_keydown);
      window.removeEventListener('click', this.emt_hide);
    },
    mounted: function () {
      window.addEventListener('keydown', this.evt_keydown);
      window.addEventListener('click', this.emt_hide);
    },
    methods: {
      emt_hide: function () {
        this.$emit('input', false);
      },
      clk_item: function (index) {
        if (this.active.indexOf(index) === -1) {
          // 不存在， 加入
          this.$set(this.active, this.active.length, index);
        } else if (this.multi) {
          // 存在， 删除
          this.active.splice(this.active.indexOf(index), 1);
        }
      },
      evt_keydown: function (event) {
        if (this.value) {
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

      >.cicon-tick {
        position: absolute;
        left: auto;
        right: 10px;
        font-size: 20px;
      }
    }
    >.line.hover {
      background-color: #f5f7fa;
    }
    >.line.active {
      color: #409eff;
      background-color: transparent;
    }
  }

  // .wrap-menu.hidden {
  //   opacity: 0;
  //   transform: scaleY(0);
  // }
</style>