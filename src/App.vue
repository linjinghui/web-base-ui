<template>
  <div id="app">
    <router-view></router-view>
    <loading v-model="optionLoading.show" v-bind="optionLoading"></loading>
    <!-- <cmp-dialog v-bind="otnDialog" v-model="otnDialog.show">
      <span slot="text" style="color: red;">等等等等等等</span>
    </cmp-dialog> -->
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'app',
    data () {
      return {
        optionLoading: {
          show: false,
          text: '请您稍后！',
          modal: false
        },
        otnDialog: {}
      };
    },
    mounted () {
      let _this = this;

      Vue.prototype.$loading = function (option) {
        _this.optionLoading = Object.assign(_this.optionLoading, option);
      };
    }
  };
</script>

<style>
  body {
    background-color: #efefef;
  }
</style>
