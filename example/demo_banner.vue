<template>
  <div style="margin-top: 100px;margin-left: 100px;width: 800px;height:600px;border: solid 1px;">
    <cmp-banner :images="images"></cmp-banner>
  </div>
</template>

<script>
import {Banner} from '../packages/index.js';

export default {
  name: 'DemoBanner',
  data: function () {
    return {
      images: [
        'http://dl.bizhi.sogou.com/images/2015/06/26/1214905.jpg',
        'http://dl.bizhi.sogou.com/images/2013/11/29/425281.jpg'
      ]
    };
  },
  components: {
    'cmpBanner': Banner
  },
  methods: {
    //
  }
};
</script>

<style scoped>

</style>