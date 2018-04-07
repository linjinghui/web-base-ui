<template>
  <div style="padding: 50px;">
    <a href="#/demoButton">button</a>
  </div>
</template>

<script>

export default {
  name: 'Demo',
  data: function () {
    return {
      //
    };
  },
  components: {
    // 
  },
  methods: {
    callback: function (val) {
      console.log(JSON.stringify(val));
    }
  }
};
</script>

<style scoped>
  a {
    display: inline-block;margin-right: 10px;text-decoration: underline;
  }
</style>