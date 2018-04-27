<template>
  <div>
    <cmp-date-picker></cmp-date-picker>
  </div>
</template>

<script>
import {DatePicker} from '../packages/index.js';

export default {
  name: 'demoDatePicker',
  data: function () {
    return {
      //
    };
  },
  components: {
    'cmpDatePicker': DatePicker
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