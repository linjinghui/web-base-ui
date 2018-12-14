<template>
  <transition name="slide-fade-sidebar">
    <div class="wrap-aside"
      v-if="(value !== '')"
      v-show="(value + '' === 'true')">
      <header>
        <slot name="title"></slot>
      </header>
      <vperfect-scrollbar class="scroll-area" :settings="settings" @ps-y-reach-end="handle_scroll('end')" @ps-y-reach-start="handle_scroll('top')">
        <slot name="content"></slot>
      </vperfect-scrollbar>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </transition>
</template>


<script type="text/babel">
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';

  export default {
    name: 'Sidebar',
    components: {
      'vperfect-scrollbar': VuePerfectScrollbar
    },
    props: {
      value: {
        default: ''
      }
    },
    data: function () {
      return {
        // 滚动速度，默认1
        settings: {
          wheelSpeed: 0.5
        }
      };
    },
    beforeDestroy: function () {
      window.removeEventListener('keyup', this.evt_keyup, false);
    },
    mounted: function () {
      window.addEventListener('keyup', this.evt_keyup, false);
    },
    watch: {
      //
    },
    methods: {
      evt_keyup: function (event) {
        let e = event || window.event;
        let keyCode = e.keyCode;

        if (keyCode === 27 && this.value !== '') {
          this.emt_show(false);
        }
      },
      emt_show: function (type) {
        this.$emit('input', type);
      },
      handle_scroll: function (type) {
        this.$emit('callback_sroll', type);
      }
    }
  };
</script>

<style scope lang="scss">

  .wrap-aside {
    position: fixed;
    top: 0;
    right: 0;
    width: 400px;
    height: 100%;
    background-color: #fff;
    box-shadow: -2px 0 8px 0 rgba(0, 0, 0, 0.22);
    z-index: 11;

    >header {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      border-bottom: solid 1px #eee;
    }

    >.scroll-area {
      height: calc(100% - 60px - 60px);
      overflow: auto;
    }

    >footer {
      height: 60px;
      line-height: 60px;
      border-top: solid 1px #eee;
      text-align: right;
    }
  }

  .slide-fade-sidebar-enter-active {
    transition: right .3s ease-in;
  }

  .slide-fade-sidebar-leave-active {
    transition: right .3s ease-out;
  }

  .slide-fade-sidebar-enter, .slide-fade-sidebar-leave-to {
    right: -410px;
  }
</style>