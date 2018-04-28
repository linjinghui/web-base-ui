<template>
  <!-- <div style="margin-left:10px;width: 800px;height: 600px;">
    <cmp-shuttle></cmp-shuttle>
  </div> -->
  <cmp-shuttle :data="dataList"></cmp-shuttle>
</template>

<script>
import {Shuttle} from '../packages/index.js';

export default {
  name: 'demoShuttle',
  data: function () {
    return {
      dataList: ''
    };
  },
  components: {
    'cmpShuttle': Shuttle
  },
  watch: {
    //
  },
  mounted: function () {
    this.setData();
  },
  methods: {
    setData: function () {
      let _this = this;

      this.dataList = [];
      setTimeout(function () {
        for (var i = 0; i < 20; i++) {
          _this.dataList.push({
            'id': i,
            'name': 'name' + i,
            'disabled': false
          });
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>

</style>