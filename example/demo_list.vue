<template>
  <div style="width:300px;height:600px;border:solid 1px;">
    <cmp-list :data="arr">
      <dt slot="dt">标题</dt>
      <dd slot="dd" slot-scope="props" class="arrow" v-if="props.index===0">单行带箭头</dd>
      <dd slot="dd" slot-scope="props" v-else-if="props.index===1">
        <div>左右等分</div>
        <div>左右等分</div>
      </dd>
      <dd slot="dd" slot-scope="props" v-else-if="props.index===2">
        <div class="text-img">
          <p>上文、下图</p>
          <img width="100%" src="http://cmstop.ndsww.com/a/10001/201904/ad3ea45820779176ce9657a422c12eee.jpeg">
        </div>
      </dd>
      <dd slot="dd" slot-scope="props" v-else-if="props.index===3">
        <div class="text-img">
          <p class="text-eps">上文省略号、下图xxxxxxxxxxxxxxxxxxxxxxxxx</p>
          <img width="100%" src="http://cmstop.ndsww.com/a/10001/201904/ad3ea45820779176ce9657a422c12eee.jpeg">
        </div>
      </dd>
      <dd slot="dd" slot-scope="props" v-else-if="props.index===4">
        <div class="text-img">
          <p>上文、下三图 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
          <img width="30%" height="70px" src="http://cmstop.ndsww.com/a/10001/201904/ad3ea45820779176ce9657a422c12eee.jpeg">
          <img width="30%" height="70px" src="http://cmstop.ndsww.com/a/10001/201904/ad3ea45820779176ce9657a422c12eee.jpeg">
          <img width="30%" height="70px" src="http://cmstop.ndsww.com/a/10001/201904/ad3ea45820779176ce9657a422c12eee.jpeg">
        </div>
      </dd>
      <dd slot="dd" slot-scope="props" v-else-if="props.index===5">
        <div style="flex:80px;">
          <img width="70px" height="70px" src="http://cmstop.ndsww.com/a/10001/201904/ad3ea45820779176ce9657a422c12eee.jpeg">
        </div>
        <div style="flex:calc(100% - 80px);text-align:left;">左图、右文 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
      </dd>
      <dd slot="dd" slot-scope="props" v-else>{{props.item}}</dd>
    </cmp-list>
  </div>
</template>

<script>
import {List} from '../packages/index.js';

export default {
  name: 'demoList',
  data: function () {
    return {
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },
  components: {
    'cmpList': List
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