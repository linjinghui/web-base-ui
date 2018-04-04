<template>
  <ul id="contextmenu" @click.stop v-if="pshow!==''" :class="{'show': pshow}" :style="{ top: ntop, left: nleft }">
    <li :class="info.cls" v-for="info in pmenu" @click.stop="callback(info)" @mouseup.stop>
      {{info.text}}
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'Contextmenu',
    props: {
      ptop: {
        default: ''
      },
      pleft: {
        default: ''
      },
      pshow: {
        default: ''
      },
      pmenu: {
        default: function () {
          return [{
            text: '新增(ctrl + n)',
            cls: 'new blue'
          },
          {
            text: '移除(ctrl + m)',
            cls: 'red del'
          },
          {
            text: '编辑(ctrl + e)',
            cls: 'edit'
          }];
        }
      }
    },
    data () {
      return {
        nleft: '',
        ntop: ''
      };
    },
    watch: {
      ptop: function (val) {
        // 控制垂直区域
        this.$nextTick(function () {
          let maxTop = this.getMaxTopLeft()['maxTop'];
          let ptop = val.replace('px', '');

          this.ntop = ptop > maxTop ? (maxTop + 'px') : val;
        });
      },
      pleft: function (val) {
        // 控制水平区域
        this.$nextTick(function () {
          let maxLeft = this.getMaxTopLeft()['maxLeft'];
          let pleft = val.replace('px', '');

          this.nleft = pleft > maxLeft ? (maxLeft + 'px') : val;
        });
      }
    },
    computed: {
      //
    },
    beforeDestroy: function () {
      this.destroy();
    },
    mounted: function () {
      this.init();
    },
    methods: {
      init: function () {
        // window.addEventListener('click', this.callback);
        window.addEventListener('mouseup', this.callback);
        // 屏蔽右击弹窗
        document.addEventListener('contextmenu', this.stopContextmenu);
      },
      // 阻止右击弹窗事件
      stopContextmenu: function (event) {
        event && event.preventDefault();
      },
      getMaxTopLeft: function () {
        let dom = document.getElementById('contextmenu');
        let cmwidth = dom.offsetWidth;
        let cmheight = dom.offsetHeight;
        let bodywidth = document.body.clientWidth;
        let bodyheight = document.body.clientHeight;
        let maxLeft = bodywidth - cmwidth;
        let maxTop = bodyheight - cmheight;

        return {
          'maxLeft': maxLeft,
          'maxTop': maxTop
        };
      },
      callback: function (info) {
        // 0 点击， 2 右击
        let type = 0;

        if (info instanceof Event) {
          type = info.button;
          info = '';
        }
        if (type === 0) {
          if (this.pshow === '' || !this.pshow) {
            //
          } else {
            this.$emit('callback', info);
          }
        }
      },
      destroy: function () {
        window.removeEventListener('click', this.callback);
        document.removeEventListener('contextmenu', this.stopContextmenu);
      }
    }
  };
</script>

<style scoped lang="scss">
  #contextmenu {
    position: fixed;
    top: 50%;
    left: 50%;
    color: #fff;
    background-color: #2a2b3c;
    z-index: 2;
    user-select: none;
    animation-duration: .7s;
    animation-fill-mode: both;
    animation-name: bounceOut;

    li {
      padding: 14px 20px;
      cursor: pointer;
    }

    li:hover {
      background-color: #0cc2aa;
    }
    li.blue:hover {
      background-color: #1590f2;
    }
    li.red:hover {
      background-color: #f3384a;
    }
  }

  #contextmenu:after {
    content: '';
    position: absolute;
    top: 0;
    left: -40px;
    width: 40px;
    height: 40px;
    border-right: solid 1px #353535;
    background-color: inherit;
  }

  #contextmenu.show {
    animation-name: bounceIn;
  }

  @keyframes bounceIn {
    0%,33%,66%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}
    0%{
      opacity:0;
      transform:scale3d(.3,.3,.3);
    }
    33%{
      transform:scale3d(1.1,1.1,1.1)
    }
    66%{
      transform:scale3d(.97,.97,.97)
    }
    to{
      opacity:1;transform:scaleX(1)
    }
  }

  @keyframes bounceOut{
    20%{transform:scale3d(.9,.9,.9)}
    50%,55%{opacity:1;transform:scale3d(1.1,1.1,1.1)}
    to{opacity:0;transform:scale3d(0,0,0)}}
</style>