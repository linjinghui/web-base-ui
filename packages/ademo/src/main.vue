<template>
  <div>123</div>
</template>

<script type="text/babel">
  export default {
    name: 'Demo',
    data: function () {
      return {
        bfEventName: this.eventName
      };
    },
    props: {
      eventName: {
        default: 'updateDemoEvent'
      }
    },
    mounted: function () {
      this.$on(this.bfEventName, function (data) {
        this.updateProps(data);
      });
    },
    methods: {
      'updateProps': function (data) {
        console.log('fun');
      }
    }
  };
</script>

<style scoped lang="scss"></style>