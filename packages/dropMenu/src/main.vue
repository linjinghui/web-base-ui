<!--
功能介绍：
1、
 -->

<template>
  <div class="wrap-selector" @click.stop>
    <cmp-input
      type="text"
      maxlength="1111"
      placeholder="请输入名称"
      disabled="false"
      readonly="true">
        <i class="cicon-arrow-bottom center-v" :class="{'up': menuOpt.show}" slot="right" @click="clk_arrow"></i>
    </cmp-input>
    <cmp-menu class="menu" v-bind="menuOpt" v-model="menuOpt.show">
      <!-- <span slot="line" slot-scope="props">{{props.item}}</span> -->
    </cmp-menu>
  </div>
</template>

<script type="text/babel">
  import Input from '../../input/index.js';
  import Menu from './menu.vue';

  export default {
    name: 'Option',
    components: {
      'cmpInput': Input,
      'cmpMenu': Menu
    },
    data: function () {
      return {
        id: 'btn_' + new Date().getTime() + parseInt(Math.random() * 100),
        menuOpt: {
          show: false,
          multi: true,
          data: ['黄金高', '双皮奶', '拉希米', '换节奏', '北京烤鸭', '无泡沫', '长达作为', 'vzxwwdasd', '滴答滴答滴答滴答', '跳脱衣舞', 'uirxxxx', '你们vczaqdx', '榴莲皮']
        }
      };
    },
    props: {
      //
    },
    watch: {
      //
    },
    computed: {
      //
    },
    beforeDestroy: function () {
      //
    },
    mounted: function () {
      //
    },
    methods: {
      clk_arrow: function () {
        this.menuOpt.show = !this.menuOpt.show;
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-selector {
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