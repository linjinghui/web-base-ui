<template>
  <div>
    <cmp-drop-menu v-bind="option" v-model="option.result">
      <!-- <span slot="line" slot-scope="props">{{props.item.name}}</span> -->
    </cmp-drop-menu>
  </div>
</template>

<script>
import {DropMenu} from '../packages/index.js';

export default {
  name: 'demoDropMenu',
  data: function () {
    return {
      data1: ['黄金高222', '双皮奶', '拉希米', '换节奏', '北京烤鸭', '无泡沫', '长达作为', 'vzxwwdasd', '滴答滴答滴答滴答', '跳脱衣舞', 'uirxxxx', '你们vczaqdx', '榴莲皮'],
      data2: [ {name: 'name1', id: 1}, {name: 'name2', id: 2}, {name: 'name3', id: 3}, {name: 'name4', id: 4}, {name: 'name5', id: 5} ],
      option: {
        show: true,
        multi: false,
        disabled: false,
        readonly: true,
        data: ['黄金高222', '双皮奶', '拉希米', '换节奏', '北京烤鸭', '无泡沫', '长达作为', 'vzxwwdasd', '滴答滴答滴答滴答', '跳脱衣舞', 'uirxxxx', '你们vczaqdx', '榴莲皮'],
        result: [1, 3]
      }
    };
  },
  components: {
    'cmpDropMenu': DropMenu
  },
  watch: {
    //
  },
  methods: {
    //
  }
};
</script>

<style scoped>

</style>