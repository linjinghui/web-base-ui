<template>
  <div class="img-container">
    <cmp-img src="https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=2901474275,586921603&fm=202&mola=new&crop=v1" containerClass="img-container"></cmp-img>
    <cmp-img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2028726140,2813284699&fm=173&app=49&f=JPEG?w=640&h=639&s=A0C2944FC01267DE408C8CB70300C001" containerClass="img-container"></cmp-img>
  </div>
</template>

<script>
import {Img} from '../packages/index.js';

export default {
  name: 'demoImg',
  data: function () {
    return {
      //
    };
  },
  components: {
    'cmpImg': Img
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
  img {
    width: 50px;
    height: 50px;
  }
</style>