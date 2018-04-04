<template>
  <div>
    <div style="height: 50px;background-color: yellow;">
      <cmp-input
      :name="'age'"
      :lenth="335"
      :value="'123abc12321'"
      :autoFocus="false"
      :disabled="false"
      :rule="'url'"
      :theme="'theme-1'"
      :noPaste="true"
      v-on:callback="callback"></cmp-input>
    </div>

    <div style="height: 50px;background-color: #fff;">
      <cmp-input
      :type="'password'"
      :name="'age'"
      :lenth="335"
      :value="'123abc12321'"
      :autoFocus="false"
      :disabled="false"
      :rule="'url'"
      :theme="'theme-1'"
      :needClear="false"
      v-on:callback="callback"></cmp-input>
    </div>

    <div style="margin-top: 10px;height: 50px;background-color: green;">
      <cmp-inputicon :name="'name'" v-on:callback="callback2"></cmp-inputicon>
    </div>

    <div style="margin-top: 10px;height: 50px;background-color: green;">
      <cmp-inputicon :type="'password'" :name="'name'" :needClear="false" v-on:callback="callback2"></cmp-inputicon>
    </div>

    <div style="margin-top: 10px;height: 50px;">
      <cmp-inputicon :name="'name'" :icons="'left'" :theme="'theme-1'" :checkTheme="bfCheckTheme" @focus="callback2Focus" @blur="callback2Blur" @callback="callback2"></cmp-inputicon>
    </div>

    <div style="margin-top: 10px;height: 50px;background-color: red;">
      <cmp-inputsearch :name="'sex'" :rule="'number'" :lenth="1" :noPaste="true" v-on:callback="callback3" v-on:search="callbackSearch"></cmp-inputsearch>
    </div>

    <div style="height: 70px;color: #999;background-color: yellow;">
      <cmp-inputPlaceholder
      :name="'age'"
      :lenth="335"
      :placeholder="'Email'"
      :value="inputPlaceholderValue"
      :autoFocus="false"
      :disabled="false"
      :rule="'url'"
      :theme="'theme-1'"
      :noPaste="true"
      v-on:callback="callback"></cmp-inputPlaceholder>
    </div>
  </div>
</template>

<script>
import {Input, InputIcon, InputSearch, InputPlaceholder} from '../packages/index.js';
// rule: number, mobile, fixPhone, chinese, letter, email, url
export default {
  name: 'demoInput',
  components: {
    'cmpInput': Input,
    'cmpInputicon': InputIcon,
    'cmpInputsearch': InputSearch,
    'cmpInputPlaceholder': InputPlaceholder
  },
  data: function () {
    return {
      bfCheckTheme: '',
      inputPlaceholderValue: 'aaa'
    };
  },
  mounted: function () {
    let _this = this;

    setTimeout(function () {
      _this.inputPlaceholderValue = 'dddd';
    }, 3000);
  },
  methods: {
    callback: function (val) {
      console.log('callback: ' + val);
    },
    callback2: function (val) {
      console.log('callback2: ' + val);
    },
    callback2Focus: function (val) {
      this.bfCheckTheme = 'focus';
      console.log('callback2Focus: ' + val);
    },
    callback2Blur: function (val) {
      this.bfCheckTheme = 'error';
      console.log('callback2Blur: ' + val);
    },
    callback3: function (val) {
      console.log('callback3: ' + val);
    },
    callbackSearch: function (val) {
      console.log('callbackSearch: ' + val);
    }
  }
};
</script>

<style scoped>

</style>