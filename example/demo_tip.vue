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
      // 
    };
  },
  watch: {
    //
  },
  methods: {
    toggle: function () {
      this.$tip({
        text: '点点滴滴',
        show: true,
        // left|center
        textAlign: '',
        // success|info|warning|danger, 移动端不支持：info
        theme: 'success'
      });
    }
  }
};
</script>

<style scoped>

</style>