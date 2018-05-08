<template>
  <div id="app">
    <router-view></router-view>
    <loading v-model="optionLoading.show" v-bind="optionLoading"></loading>
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
        }
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
