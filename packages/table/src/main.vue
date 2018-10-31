<template>
  <vperfect-scrollbar class="wrap-table" :class="{'order': order}" ref="wrapTable" :settings="settings">
    <table>
      <thead :class="{'fix': scrollTop > 0}">
        <slot name="head"></slot>
      </thead>
      <tbody>
        <slot name="body" :item="item" :index="index" v-for="(item, index) in data"></slot>
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
      },
      order: {
        default: false
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
      },
      setOrder: function (arr, orderBy) {
        if (this.order) {
          arr.sort(function (a, b) {
            var p1 = a[orderBy];
            var p2 = b[orderBy];
            var result = '';
            
            if (window.orderMark) {
              if (isNaN(p1) || isNaN(p2)) {
                result = (p1 + '').localeCompare(p2 + '');
              } else {
                result = p1 - p2;
              }
            } else if (isNaN(p1) || isNaN(p2)) {
              result = (p2 + '').localeCompare(p1 + '');
            } else {
              result = p2 - p1;
            }
            return result;
          });
          window.orderMark = !window.orderMark;
        }
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
  
  .wrap-table.order {
    table thead {
      td:not(.no-order) {
        user-select: none;
        cursor: pointer;
      }
      td:not(.no-order):hover:after {
        content: (' ↑↓');
      }
    }
  }
</style>