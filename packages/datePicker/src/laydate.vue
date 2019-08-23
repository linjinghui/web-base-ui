<!--
功能介绍：
1、
 -->

<template>
  <cmp-input type="text" maxlength="20" :class="id" :placeholder="placeholder+':'+$scopedSlots" v-model="value">
    <template slot="right" v-if="$scopedSlots.right">
      <slot name="right"></slot>
    </template>
    <i class="cicon-calendar-cpt-chr center-v" slot="right" @click.stop style="font-size:26px;" v-else>
      <span></span>
    </i>
  </cmp-input>
</template>

<script type="text/babel">
  import laydate from 'layui-laydate';
  import Input from '../../input/index.js';

  export default {
    name: 'Laydate',
    components: {
      'cmpInput': Input
    },
    data: function () {
      return {
        id: 'laydate_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {
      value: '',
      placeholder: {
        default: '请选择日期'
      },
      option: {
        default: function () {
          return {};
        }
      }
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
      this.initLaydate();
      console.log(this.$scopedSlots.right);
    },
    methods: {
      initLaydate: function () {
        let _this = this;
        let _tar = '.' + _this.id;

        laydate.render(Object.assign(_this.option, {
          elem: _tar + ' input',
          eventElem: _tar + ' .cicon-calendar-cpt-chr',
          trigger: 'click',
          done: function (value, date, endDate) {
            // value 得到日期生成的值，如：2017-08-18
            // date 得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            // endDate 得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
            _this.$emit('input', value);
          }
        }));
      }
    }
  };
</script>

<style lang="scss">
  @import url("layui-laydate/src/theme/default/laydate.css");

  // .layui-laydate {
  //   .layui-laydate-footer span:hover,
  //   .layui-laydate-footer span[lay-type="date"] {
  //     color: var(--theme);
  //   }
  //   .laydate-day-mark::after {
  //     background-color: var(--theme);
  //   }
  // }
</style>
<style scoped lang="scss">
  [class^=cicon-calendar] {
    color: #c0c4cc!important;
    background-color: transparent!important;
  }
</style>