<!--
功能介绍：
1、
 -->

<template>
  <vperfect-scrollbar class="wrap-menu" ref="ps"
    :class="{'cascade': type==='cascade'}"
    :settings="settings"
    v-show="value">
    <div class="line" v-for="(item, index) in data"
      @mouseenter="hover=index"
      @click="clk_item(index)"
      :class="{'hover': hover===index, 'active': active.indexOf(index)!==-1}">
      <slot name="line" :item="item">{{item}}</slot>
      <i class="cicon-tick center-hv" v-if="type==='multi'" v-show="active.indexOf(index)!==-1"></i>
      <i class="cicon-arrow-right center-hv" v-if="type==='cascade'" v-show="item.children&&item.children.length>0"></i>
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
      // multi多选、cascade级联
      type: ''
      // multi: {
      //   default: false
      // }
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
        if (this.type === 'multi') {
          // 多选
          if (this.active.indexOf(index) === -1) {
            // 不存在， 加入
            this.$set(this.active, this.active.length, index);
          } else {
            // 存在， 删除
            this.active.splice(this.active.indexOf(index), 1);
          }
        // } else if (this.type === 'cascade') {
        //   // 级联
        // }
        } else {
          // 单选
          this.active = [];
          this.$set(this.active, 0, index);
        }
        this.$emit('cbk', this.active);
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
      },
      parse_data: function (data, regObj) {
        let result = '';

        try {
          result = JSON.stringify(data);
          if (regObj.name) {
            result = result.replace(new RegExp(regObj.name, 'g'), 'name');
          }
          if (regObj.children) {
            result = result.replace(new RegExp(regObj.children, 'g'), 'children');
          }
          result = JSON.parse(result);
        } catch (e) {
          result = [];
        }
        return result;
      }
    }
  };
</script>

<style lang="scss">
  .wrap-menu {
    .ps__scrollbar-x-rail, .ps__scrollbar-y-rail {
      z-index: 2;
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

      >[class^='cicon-'] {
        position: absolute;
        left: auto;
        right: 10px;
        font-size: 20px;
      }

      >[class^='cicon-arrow'] {
        color: #ddd;
        font-size: 16px;
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

  .wrap-menu.cascade {
    width: 220px;
    >.line.active {
      background-color: #f5f7fa;
    }
  }
</style>