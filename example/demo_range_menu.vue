<template>
  <!--  -->
  <div>
    <!-- 默认方式 -->
    <cmp-range-menu v-model="list" @add="fun_add"></cmp-range-menu>
    <!-- 如需自定义显示内容，请使用以下方式 -->
    <cmp-range-menu v-model="list2"  @add="fun_add2">
      <template slot-scope="props">{{ props.item.name +  props.item.age}}</template>
    </cmp-range-menu>
  </div>
</template>

<script>
import {RangeMenu} from '../packages/index.js';

export default {
  name: 'demoRangeMenu',
  data: function () {
    return {
      list: [
        '淡淡的',
        '嗖嗖嗖',
        'vvvv',
        '密麻麻'
      ],
      list2: [
        {
          name: 'name1',
          age: 11
        },
        {
          name: 'name2',
          age: 12
        },
        {
          name: 'name3',
          age: 13
        },
        {
          name: 'name4',
          age: 14
        },
        {
          name: 'name5',
          age: 15
        }
      ]
    };
  },
  components: {
    'cmpRangeMenu': RangeMenu
  },
  watch: {
    list: function (val) {
      console.log('========watch list========');
      console.log(val);
    },
    list2: function (val) {
      console.log('========watch list2========');
      console.log(val);
    }
  },
  methods: {
    fun_add: function () {
      this.list.push('item' + this.list.length);
    },
    fun_add2: function () {
      this.list2.push({
        'name': 'name' + this.list2.length,
        'age': this.list2.length
      });
    }
  }
};
</script>

<style scoped>

</style>