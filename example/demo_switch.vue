<template>
  <div style="padding: 100px;">
    <cmp-switch :turn="true" :disabled="false" @callback="callback"></cmp-switch>
  </div>
</template>

<script>
import {Switch} from '../packages/index.js';

export default {
  name: 'DemoSwitch',
  data: function () {
    return {
      //
    };
  },
  components: {
    'cmpSwitch': Switch
  },
  methods: {
    callback: function (val) {
      console.log(JSON.stringify(val));
    }
  }
};
</script>

<style scoped>

</style>