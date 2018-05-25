<template>
  <div @click.stop>
    <cmp-menu v-bind="option" v-model="option.show" @cbk="callback">
      <!-- <span slot="line" slot-scope="props">{{props.item}}</span> -->
    </cmp-menu>
  </div>
</template>

<script>
import {Menu} from '../packages/index.js';

export default {
  name: 'demoMenu',
  data: function () {
    return {
      option: {
        show: true,
        type: 'multi',
        data: ['黄金高22', '双皮奶', '拉希米', '换节奏', '北京烤鸭', '无泡沫', '长达作为', 'vzxwwdasd', '滴答滴答滴答滴答', '跳脱衣舞', 'uirxxxx', '你们vczaqdx', '榴莲皮']
      }
    };
  },
  components: {
    'cmpMenu': Menu
  },
  watch: {
    //
  },
  methods: {
    callback: function (data) {
      console.log('=========callback=========');
      console.log(data);
    }
  }
};
</script>

<style scoped>

</style>