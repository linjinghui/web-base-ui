<template>
  <div>
    <button @click="show">show</button>|
    <button @click="hide">hide</button>|
    <button @click="clkevent">全局触发</button>
  </div>
</template>

<script>

export default {
  name: 'demoLoading',
  data: function () {
    return {
      //
    };
  },
  mounted: function () {
    //
  },
  watch: {
    //
  },
  methods: {
    // 通过全局事件触发
    clkevent: function () {
      window.EVENTBUS.$emit('Loading', {
        show: true,
        text: '全局事件触发'
      });
    },
    show: function () {
      this.$loading({
        // 显示、隐藏
        show: true,
        // 显示文本
        text: '加载中...',
        // 遮罩层
        modal: false
      });
    },
    hide: function () {
      this.$loading({
        show: false
      });
    }
  }
};
</script>

<style scoped>

</style>