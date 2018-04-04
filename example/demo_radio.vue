<template>
  <div>
    <template v-for="sex in sexs">
      <cmp-radio :name="'sex'" :label="sex.label" :value="sex.value" :checked="sexValue" @callback="callback"></cmp-radio>&nbsp;
    </template>
  </div>
</template>

<script>
import {Radio} from '../packages/index.js';

export default {
  name: 'Checkbox',
  data: function () {
    return {
      sexValue: 1,
      sexs: [
        {
          'value': 1,
          'label': '男'
        },
        {
          'value': 2,
          'label': '女'
        }
      ]
    };
  },
  components: {
    'cmpRadio': Radio
  },
  methods: {
    callback: function (val) {
      this.sexValue = val;
      console.log('callback:' + JSON.stringify(val));
    }
  }
};
</script>

<style scoped>

</style>