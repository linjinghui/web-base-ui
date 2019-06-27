<!-- 
功能介绍：
1、 图片占位符
2、 图片预览
 -->

<template>
  <img class="wrap-img" :id="id" :class="containerClass" :src="imgInfo.src" :alt="alt" :width="width" :height="height" :style="preview?'cursor:pointer':''">
</template>

<script type="text/babel">
  import Viewer from '../../imageViewer/js/viewer.min.js';

  export default {
    name: 'Img',
    data: function () {
      return {
        id: 'Img_' + new Date().getTime() + parseInt(Math.random() * 100),
        imgInfo: {
          src: require('../images/default.png')
        },
        viewer: ''
      };
    },
    props: {
      alt: {
        default: ''
      },
      src: {
        default: ''
      },
      width: {
        default: ''
      },
      height: {
        default: ''
      },
      // 自动原始宽高
      autoWh: {
        default: false
      },
      // 预览功能
      preview: {
        default: true
      },
      // 容器class，用于显示容器下的所有图片
      containerClass: {
        default: ''
      }
    },
    watch: {
      src: function (val, val2) {
        this.loadUrl();
      }
    },
    computed: {
      // 
    },
    beforeDestroy: function () {
      this.viewer && this.viewer.destroy();
    },
    mounted: function () {
      this.loadUrl();
      // // 监听页面图片加载错误
      // document.addEventListener('error', function (e) {
      //   var elem = e.target;
      //   if (elem.tagName.toLowerCase() === 'img') {
      //     elem.src = './images/img-default.png';
      //   }
      // }, true);
    },
    methods: {
      loadUrl: function () {
        var _this = this;

        if (this.src) {
          var img = new Image();

          img.src = this.src;
          img.onload = function () {
            // 图片加载完成
            _this.$set(_this.imgInfo, 'src', img.src);
            if (_this.autoWh) {
              _this.$set(_this.imgInfo, 'width', img.width);
              _this.$set(_this.imgInfo, 'height', img.height);
            }
            // 加入查看功能
            if ((_this.preview + '') === 'true') {
              _this.$nextTick(function () {
                var imgs = _this.containerClass ? (document.querySelector('.' + _this.containerClass)) : (document.getElementById(_this.id));

                _this.viewer = new Viewer(imgs, Object.assign({
                  inline: false,
                  // 显示右上角关闭按钮（jQuery 版本无效）
                  button: true, 
                  // 显示缩略图导航
                  navbar: true, 
                  // 显示当前图片的标题（现实 alt 属性及图片尺寸）
                  title: true, 
                  // 显示工具栏
                  toolbar: true, 
                  // 显示缩放百分比
                  tooltip: true, 
                  // 图片是否可移动
                  movable: true, 
                  // 图片是否可缩放
                  zoomable: true, 
                  // 图片是否可旋转
                  rotatable: true, 
                  // 图片是否可翻转
                  scalable: true, 
                  // 使用 CSS3 过度
                  transition: true, 
                  // 播放时是否全屏
                  fullscreen: true, 
                  // 是否支持键盘
                  keyboard: true, 
                  // 播放间隔，单位为毫秒
                  interval: 5000, 
                  // 鼠标滚动时的缩放比例
                  zoomRatio: 0.1, 
                  // 最小缩放比例
                  minZoomRatio: 0.01, 
                  // 最大缩放比例
                  maxZoomRatio: 100, 
                  // 设置图片查看器 modal 模式时的 z-index
                  zIndex: 2015, 
                  // 设置图片查看器 inline 模式时的 z-index
                  zIndexInline: 0, 
                  // url 字符串/函数 src 设置大图片的 url
                  build: function () {
                    // 
                  },
                  built: function () {
                    // 
                  },
                  show: function () {
                    // 
                  },
                  shown: function () {
                    // 
                  },
                  hide: function () {
                    // 
                  },
                  hidden: function () {
                    // 
                  },
                  view: function () {
                    // 
                  },
                  viewed: function () {
                    // 
                  }
                }, _this.opt));
              });
            }
            
          };
          img.onerror = function () {
            _this.$set(_this.imgInfo, 'src', require('../images/404.png'));
          };
        }
      }
    }
  };
</script>

<style lang="scss">
  .viewer-container,.viewer-navbar{background-color:#000;overflow:hidden}.viewer-canvas,.viewer-container,.viewer-footer,.viewer-player{right:0;bottom:0;left:0}.viewer-button,.viewer-canvas,.viewer-container,.viewer-footer,.viewer-list,.viewer-navbar,.viewer-open,.viewer-title,.viewer-toolbar,.viewer-toolbar>li{overflow:hidden}.viewer-close:before,.viewer-flip-horizontal:before,.viewer-flip-vertical:before,.viewer-fullscreen-exit:before,.viewer-fullscreen:before,.viewer-next:before,.viewer-one-to-one:before,.viewer-play:before,.viewer-prev:before,.viewer-reset:before,.viewer-rotate-left:before,.viewer-rotate-right:before,.viewer-zoom-in:before,.viewer-zoom-out:before{font-size:0;line-height:0;display:block;width:20px;height:20px;color:transparent;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAAUCAYAAABWOyJDAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAQPSURBVHic7Zs/iFxVFMa/0U2UaJGksUgnIVhYxVhpjDbZCBmLdAYECxsRFBTUamcXUiSNncgKQbSxsxH8gzAP3FU2jY0kKKJNiiiIghFlccnP4p3nPCdv3p9778vsLOcHB2bfveeb7955c3jvvNkBIMdxnD64a94GHMfZu3iBcRynN7zAOI7TG15gHCeeNUkr8zaxG2lbYDYsdgMbktBsP03jdQwljSXdtBhLOmtjowC9Mg9L+knSlcD8TNKpSA9lBpK2JF2VdDSR5n5J64m0qli399hNFMUlpshQii5jbXTbHGviB0nLNeNDSd9VO4A2UdB2fp+x0eCnaXxWXGA2X0au/3HgN9P4LFCjIANOJdrLr0zzZ+BEpNYDwKbpnQMeAw4m8HjQtM6Z9qa917zPQwFr3M5KgA6J5rTJCdFZJj9/lyvGhsDvwFNVuV2MhhjrK6b9bFiE+j1r87eBl4HDwCF7/U/k+ofAX5b/EXBv5JoLMuILzf3Ap6Z3EzgdqHMCuF7hcQf4HDgeoHnccncqdK/TvSDWffFXI/exICY/xZyqc6XLWF1UFZna4gJ7q8BsRvgd2/xXpo6P+D9dfT7PpECtA3cnWPM0GXGFZh/wgWltA+cDNC7X+AP4GzjZQe+k5dRxuYPeiuXU7e1qwLpDz7dFjXKRaSwuMLvAlG8zZlG+YmiK1HoFqT7wP2z+4Q45TfEGcMt01xLoNZEBTwRqD4BLpnMLeC1A41UmVxsXgXeBayV/Wx20rpTyrpnWRft7p6O/FdqzGrDukPNtkaMoMo3FBdBSQMOnYBCReyf05s126fU9ytfX98+mY54Kxnp7S9K3kj6U9KYdG0h6UdLbkh7poFXMfUnSOyVvL0h6VtIXHbS6nOP+s/Zm9mvyXW1uuC9ohZ72E9uDmXWLJOB1GxsH+DxPftsB8B6wlGDN02TAkxG6+4D3TWsbeC5CS8CDFce+AW500LhhOW2020TRjK3b21HEmgti9m0RonxbdMZeVzV+/4tF3cBpP7E9mKHNL5q8h5g0eYsCMQz0epq8gQrwMXAgcs0FGXGFRcB9wCemF9PkbYqM/Bas7fxLwNeJPdTdpo4itQti8lPMqTpXuozVRVXPpbHI3KkNTB1NfkL81j2mvhDp91HgV9MKuRIqrykj3WPq4rHyL+axj8/qGPmTqi6F9YDlHOvJU6oYcTsh/TYSzWmTE6JT19CtLTJt32D6CmHe0eQn1O8z5AXgT4sx4Vcu0/EQecMydB8z0hUWkTd2t4CrwNEePqMBcAR4mrBbwyXLPWJa8zrXmmLEhNBmfpkuY2102xxrih+pb+ieAb6vGhuA97UcJ5KR8gZ77K+99xxeYBzH6Q3/Z0fHcXrDC4zjOL3hBcZxnN74F+zlvXFWXF9PAAAAAElFTkSuQmCC);background-repeat:no-repeat}.viewer-zoom-in:before{content:'Zoom In';background-position:0 0}.viewer-zoom-out:before{content:'Zoom Out';background-position:-20px 0}.viewer-one-to-one:before{content:'One to One';background-position:-40px 0}.viewer-reset:before{content:'Reset';background-position:-60px 0}.viewer-prev:before{content:'Previous';background-position:-80px 0}.viewer-play:before{content:'Play';background-position:-100px 0}.viewer-next:before{content:'Next';background-position:-120px 0}.viewer-rotate-left:before{content:'Rotate Left';background-position:-140px 0}.viewer-rotate-right:before{content:'Rotate Right';background-position:-160px 0}.viewer-flip-horizontal:before{content:'Flip Horizontal';background-position:-180px 0}.viewer-flip-vertical:before{content:'Flip Vertical';background-position:-200px 0}.viewer-fullscreen:before{content:'Enter Full Screen';background-position:-220px 0}.viewer-fullscreen-exit:before{content:'Exit Full Screen';background-position:-240px 0}.viewer-close:before{content:'Close';background-position:-260px 0}.viewer-container{font-size:0;line-height:0;position:absolute;top:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:rgba(0,0,0,.5);direction:ltr!important;-ms-touch-action:none;touch-action:none;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}.viewer-container ::-moz-selection,.viewer-container::-moz-selection{background-color:transparent}.viewer-container ::selection,.viewer-container::selection{background-color:transparent}.viewer-container img{display:block;width:100%;min-width:0!important;max-width:none!important;height:auto;min-height:0!important;max-height:none!important}.viewer-player,.viewer-tooltip{display:none;position:absolute}.viewer-canvas{position:absolute;top:0}.viewer-canvas>img{width:auto;max-width:90%!important;height:auto;margin:15px auto}.viewer-footer{position:absolute;text-align:center}.viewer-navbar{background-color:rgba(0,0,0,.5)}.viewer-list{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;height:50px;margin:0;padding:1px 0}.viewer-list>li{font-size:0;line-height:0;float:left;overflow:hidden;width:30px;height:50px;cursor:pointer;opacity:.5;color:transparent;filter:alpha(opacity=50)}.viewer-list>li+li{margin-left:1px}.viewer-list>.viewer-active{opacity:1;filter:alpha(opacity=100)}.viewer-player{top:0;cursor:none;background-color:#000}.viewer-player>img{position:absolute;top:0;left:0}.viewer-toolbar{width:280px;margin:0 auto 5px;padding:3px 0}.viewer-toolbar>li{float:left;width:24px;height:24px;cursor:pointer;border-radius:50%;background-color:#000;background-color:rgba(0,0,0,.5)}.viewer-toolbar>li:hover{background-color:#000;background-color:rgba(0,0,0,.8)}.viewer-toolbar>li:before{margin:2px}.viewer-toolbar>li+li{margin-left:1px}.viewer-toolbar>.viewer-play{width:30px;height:30px;margin-top:-3px;margin-bottom:-3px}.viewer-toolbar>.viewer-play:before{margin:5px}.viewer-tooltip{font-size:12px;line-height:20px;top:50%;left:50%;width:50px;height:20px;margin-top:-10px;margin-left:-25px;text-align:center;color:#fff;border-radius:10px;background-color:#000;background-color:rgba(0,0,0,.8)}
  .viewer-title{height:18px;font-size:12px;line-height:1;display:inline-block;max-width:90%;margin:0 5% 5px;white-space:nowrap;text-overflow:ellipsis;opacity:.8;color:#fff;filter:alpha(opacity=80)}
  .viewer-title:hover{opacity:1;filter:alpha(opacity=100)}.viewer-button{position:absolute;top:-40px;right:-40px;width:80px;height:80px;cursor:pointer;border-radius:50%;background-color:#000;background-color:rgba(0,0,0,.5)}.viewer-button:before{position:absolute;bottom:15px;left:15px}.viewer-fixed{position:fixed}.viewer-show{display:block}.viewer-hide{display:none}.viewer-invisible{visibility:hidden}.viewer-move{cursor:move;cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.viewer-fade{opacity:0;filter:alpha(opacity=0)}.viewer-in{opacity:1;filter:alpha(opacity=100)}.viewer-transition{-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out;transition:all .3s ease-out}@media (max-width:767px){.viewer-hide-xs-down{display:none}}@media (max-width:991px){.viewer-hide-sm-down{display:none}}@media (max-width:1199px){.viewer-hide-md-down{display:none}}
</style>
<style scoped lang="scss">
  .wrap-img {}
</style>