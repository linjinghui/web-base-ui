<template>
  <div style="padding: 50px;">
    <a href="#/demoCicon">css icon</a>
    <a href="#/demoButton">button</a>
    <a href="#/demoCheckbox">checkbox</a>
    <a href="#/demoRadio">radio</a>
    <a href="#/demoInput">input</a>
    <a href="#/demoSwith">swith</a>
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