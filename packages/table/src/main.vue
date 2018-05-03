<template>
  <vperfect-scrollbar class="wrap-table" ref="wrapTable" :settings="settings">
    <table>
      <thead :class="{'fix': scrollTop > 0}">
        <slot name="head"></slot>
      </thead>
      <tbody>
        <slot name="body" :item="item" v-for="item in data"></slot>
      </tbody>
    </table>
  </vperfect-scrollbar>
</template>

<script type="text/babel">
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';

  export default {
    name: 'Table',
    components: {
      'vperfect-scrollbar': VuePerfectScrollbar
    },
    data: function () {
      return {
        // 滚动速度，默认1
        settings: {
          wheelSpeed: 1
        },
        scrollTop: 0
      };
    },
    props: {
      data: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    watch: {
      //
    },
    mounted: function () {
      this.$refs.wrapTable.$el.addEventListener('scroll', this.scrollHandle);
    },
    methods: {
      scrollHandle: function (e) {
        let dmHead = e.target.querySelector('thead');

        this.scrollTop = e.target.scrollTop;
        dmHead.style.transform = 'translateY(' + e.target.scrollTop + 'px)';
      }
    }
  };
</script>

<style lang="scss">
  .wrap-table {
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 12px;
    overflow: auto;

    table {
      width: 100%;
      table-layout: fixed;
      word-wrap: break-word;

      thead.fix {
        box-shadow: 0 1px 1px #e3e3e3;
      }

      tbody > tr:nth-child(odd) {
        background-color: #f7f7f7;
      }

      thead > tr,
      tbody > tr:nth-child(even) {
        background-color: #fff;
      }

      tbody > tr:hover {
        background-color: #eee;
      }

      td {
        padding-left: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        height: 32px;
        border-style: solid;
        border-width: 0;
        border-color: transparent;
        border-collapse: collapse;

        .button {
          position: unset;
        }
      }
    }
  }
</style>