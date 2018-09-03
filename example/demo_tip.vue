<template>
  <div>
    <button @click="toggle">show\hide22</button>
  </div>
</template>

<script>

export default {
  name: 'demoTip',
  data: function () {
    return {
      show: false,
      option: {
        full: '',
        // left|center
        textAlign: '',
        // primary|success|info|warning|danger|自定义
        theme: 'success'
      }      
    };
  },
  watch: {
    //
  },
  methods: {
    toggle: function () {
      this.$tip({
        full: true,
        show: true,
        // left|center
        textAlign: ''
      });
    }
  }
};
</script>

<style scoped>

</style>