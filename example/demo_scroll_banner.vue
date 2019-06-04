<template>
  <div style="position:relative;width:100%;height:100%;border:solid 1px;">
    <cmp-banner :nav="nav" @callback="callback">
      <div slot="page" class="page" style="line-height:500px;text-align:center;background:lightblue;">page 1</div>
      <div slot="page" class="page" style="line-height:500px;text-align:center;background:#ade6c8;">page 2</div>
      <div slot="page" class="page" style="line-height:500px;text-align:center;background:#94be76;">page 3</div>
      <div slot="page" class="page" style="line-height:500px;text-align:center;background:#9d76be;">page 4</div>
    </cmp-banner>
  </div>
</template>

<script>
import {Banner} from '../packages/index.js';

export default {
  name: 'demoScrollFullPage',
  data: function () {
    return {
      nav: [
        {title: '首页'},
        {title: '企业概况'},
        {title: '平台能力'},
        {title: '关于我们'}
      ]
    };
  },
  components: {
    'cmpBanner': Banner
  },
  watch: {
    //
  },
  mounted: function () {},
  methods: {
    callback (data) {
      console.log(data);
    }
  }
};
</script>

<style>
  #app {
    height: 100%;
  }
</style>