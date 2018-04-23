<!--
功能介绍：
1、
 -->

<template>
  <div class="wrap-loading">
    <section>
      <i class="cicon-loading move-loop">
        <span></span><span></span><span></span>
      </i>
      xxxxxxx
    </section>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'Loading',
    data: function () {
      return {
        id: 'btn_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {
      //
    },
    watch: {
      //
    },
    computed: {
      //
    },
    beforeDestroy: function () {
      //
    },
    mounted: function () {
      //
    },
    methods: {
      //
    }
  };
</script>

<style scoped lang="scss">

</style>