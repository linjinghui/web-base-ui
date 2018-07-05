<!--
功能介绍：
1、
 -->

<template>
  <div class="wrap-drop-menu" @click.stop>
    <cmp-input type="text" ref="dmIpt" v-model="iptValue" :placeholder="placeholder" :disabled="disabled+''==='true'" :readonly="readonly">
        <i class="cicon-arrow-bottom center-v" :disabled="disabled+''==='true'" :class="{'up': show}" slot="right" @click.stop="clk_arrow"></i>
    </cmp-input>
    <cmp-menu :show="show" :multi="multi" :data="data" v-model="result">
      <template slot="line" slot-scope="props">
        <slot name="line" :item="props.item">{{props.item}}</slot>
      </template>
    </cmp-menu>
  </div>
</template>

<script type="text/babel">
  import Input from '../../input/index.js';
  import {Menu} from '../../menu/index.js';

  export default {
    name: 'DropMenu',
    components: {
      'cmpInput': Input,
      'cmpMenu': Menu
    },
    data: function () {
      return {
        show: false,
        result: this.value,
        iptValue: ''
      };
    },
    props: {
      value: {
        default: function () {
          return [];
        }
      },
      placeholder: {
        default: '请选择内容'
      },
      disabled: {
        default: false
      },
      readonly: {
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
      disabled: function (val) {
        if (val + '' === 'true') {
          this.show = false;
        } else {
          this.show = true;
        }
      }
    },
    computed: {
      //
    },
    beforeDestroy: function () {
      window.removeEventListener('click', this.clk_hide);
    },
    mounted: function () {
      window.addEventListener('click', this.clk_hide);
      this.$refs.dmIpt.$el.addEventListener('click', this.clk_arrow);
    },
    methods: {
      clk_arrow: function () {
        if (this.disabled + '' !== 'true') {
          this.show = !this.show;
        }
      },
      clk_hide: function () {
        if (this.disabled + '' !== 'true') {
          this.show = false;
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-drop-menu {
    position: relative;

    >.input {
      overflow: hidden;

      >.cicon-arrow-bottom {
        color: inherit;
        background-color: transparent;
        cursor: pointer;
        transition: transform .2s;
      }
      .cicon-arrow-bottom.up {
        transform: rotate(270deg);
      }
    }

    >.menu {
      position: absolute;
      left: 0;
      top: calc(34px + 2px);
    }
  }
</style>