<template>
  <div style="margin-left: 20px;margin-top: 20px;padding: 20px;width: 80%;height: 100px;background-color: #f5f5f5;">
    <button @click="setActive">setActive</button>
    <cmp-tab v-bind="optionTab" @cbk="callback"></cmp-tab>
  </div>
</template>

<script>
import {Tab} from '../packages/index.js';

export default {
  name: 'demoTab',
  data: function () {
    return {
      optionTab: {
        active: 0,
        list: [
          {
            name: '导航1'
          },
          {
            name: '导航2',
            close: false
          },
          {
            name: '导航3'
          },
          {
            name: '导航4'
          },
          {
            name: '导航5'
          }
        ],
        close: true
      }
    };
  },
  components: {
    'cmpTab': Tab
  },
  watch: {
    'optionTab.index': function (data) {
      console.log('=====watch======');
      console.log(data);
    }
  },
  mounted: function () {
    // 
  },
  methods: {
    callback: function (data) {
      console.log('=====callback======');
      console.log(data);
    },
    setActive: function () {
      this.$set(this.optionTab, 'active', '');
      this.$nextTick(function () {
        this.$set(this.optionTab, 'active', 2);
      });
    }
  }
};
</script>

<style scoped>

</style>