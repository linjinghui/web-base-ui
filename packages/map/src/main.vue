<!-- 
功能介绍：
1、
 -->

<template>
  <transition name="slide-fade">
    <div class="wrap-gd-map" v-if="value!==''" v-show="value">
      <header>
        <span>{{title}}</span>
        <i class="cicon-cross-cpt-chr" @click="clkClose"></i>
      </header>
      <section :id="id">
        <loading class="map-loading" v-model="optionLoading.show" v-bind="optionLoading"></loading>
      </section>
    </div>
  </transition>
</template>

<script type="text/babel">
  export default {
    name: 'Map',
    data: function () {
      return {
        optionLoading: {
          show: true,
          text: '地图资源加载中...',
          modal: false,
          type: 'line'
        },
        id: 'map_' + new Date().getTime() + parseInt(Math.random() * 100),
        gdmap: {
          name: 'gdmap',
          url: 'https://webapi.amap.com/maps?v=1.4.10',
          key: '3f496cdc9ee86231710554663052a72c',
          callbackName: 'gdmapReady'
        },
        map: ''
      };
    },
    props: {
      value: {
        default: ''
      },
      // 是否模态，即是否产生遮罩效果
      modal: {
        default: true
      },
      title: {
        default: '地图'
      },
      // 地图初始化配置参数
      option: {
        default: function () {
          return {};
        }
      }
    },
    watch: {
      value: function (val, val2) {
        if (val && val2 === '') {
          this.includeGd();
        }
        if (val + '' === 'true') {
          this.creatZz();
        } else {
          this.removeZz();
        }
      }
    },
    computed: {
      // 
    },
    beforeDestroy: function () {
      // 销毁地图，并清空地图容器
      this.map.destroy();
    },
    mounted: function () {
      // 
    },
    methods: {
      includeGd: function () {
        var id = 'id_' + this.gdmap.name;
        var url = this.gdmap.url + '&key=' + this.gdmap.key + '&callback=' + this.gdmap.callbackName;

        if (!document.getElementById(id)) {
          var jsapi = document.createElement('script');
          
          window[this.gdmap.callbackName] = this.gdonload;
          jsapi.charset = 'utf-8';
          jsapi.src = url;
          jsapi.setAttribute('id', id);
          document.head.appendChild(jsapi);
        } else {
          this.gdonload();
        }
      },
      gdonload: function () {
        var _this = this;

        var option = Object.assign({
          // 中心点
          // center: [116.397428, 39.90923],
          // 使用多个图层
          // layers: [
          //   new window.AMap.TileLayer.Satellite(),
          //   new window.AMap.TileLayer.RoadNet()
          // ],
          // 设置地图级别范围
          // zooms: [4, 18],
          // zoom: 13,
          // 设置地图的显示样式
          // mapStyle: 'amap://styles/whitesmoke'
        }, this.option);

        this.map = new window.AMap.Map(this.id, option);
        this.map.on('click', function (ev) {
          _this.$emit('click', ev);
        });


        this.setMapTheme();
        // 删除加载动画
        this.optionLoading.show = false;
      },
      // 添加实时路况图层
      addLayer: function () {
        this.map.add(new window.AMap.TileLayer.Traffic({
          zIndex: 10
        }));
      },
      // 绘制标记到地图 点标记 Marker、文本标记 Text、圆点标记 CircleMarker
      addMark: function (lng, lat, infoWindow) {
        var _this = this;

        if (lng && lat) {
          var marker = new window.AMap.Marker({position: [lng, lat]});

          this.map.add(marker);
          // 设置中心
          this.setMapCenter(lng, lat);
          // 放大
          this.setMapZoom(15);
          if (infoWindow) {
            // 创建信息窗体
            infoWindow = new window.AMap.InfoWindow(Object.assign({
              isCustom: false,
              offset: new window.AMap.Pixel(0, -35)
            }, infoWindow));
            // 默认开启窗体
            infoWindow.open(_this.map, [lng, lat]);
          }
          marker.on('click', function (e) {
            if (infoWindow && infoWindow.fi) {
              infoWindow.close();
            } else if (infoWindow) { 
              infoWindow.open(_this.map, e.target.getPosition());
            }
          });
        }
        // 移除标记 map.remove(marker)
      },
      // 设置地图中心点
      setMapCenter: function (lng, lat) {
        // 传入经纬度，设置地图中心点
        if (lng && lat) {
          this.map.setCenter([lng, lat]); 
        }
        // 获取地图中心点 map.getCenter();
      },
      // 设置地图缩放级别 3 - 18
      setMapZoom: function (zoom) {
        this.map.setZoom(zoom || 13); 
        // 获取地图级别 map.getZoom(); 
      },
      // 设置地图主题 normal macaron graffiti whitesmoke dark fresh darkblue blue light grey
      setMapTheme: function (type) {
        var themes = ['normal', 'macaron', 'graffiti', 'whitesmoke', 'dark', 'fresh', 'darkblue', 'blue', 'light', 'grey'];
        
        this.map.setMapStyle('amap://styles/' + ((type && themes.indexOf(type)) ? type : 'normal'));
      },
      clkClose: function () {
        this.$emit('input', false);
      },
      creatZz: function () {
        if (this.modal + '' === 'true' && this.value + '' === 'true') {
          var dom = document.createElement('div');

          dom.setAttribute('id', 'vdzz_' + this.id);
          dom.setAttribute('class', 'center-hv');
          dom.setAttribute('style', 'position: fixed;background-color: rgba(0, 0, 0, 0.1);z-index: ' + this.zIndex);
          document.body.appendChild(dom);
        }
      },
      removeZz: function () {
        var dom = document.getElementById('vdzz_' + this.id);

        dom && (document.body.removeChild(dom));
      }
    }
  };
</script>

<style>
  .map-loading {
    position: absolute!important;
    color: #666!important;
    background-color: inherit!important;
    box-shadow: none!important;
  }
</style>

<style scoped lang="scss">
  .wrap-gd-map {
    position: fixed;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 800px;
    height: 600px;
    background-color: #fff;
    z-index: 3;

    > header {
      height: 45px;
      border-bottom: solid 1px #eee;

      > span {
        float: left;
        margin-left: 10px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }

      > .cicon-cross-cpt-chr {
        float: right;
        margin-top: 7.5px;
        margin-right: 7.5px;
        font-size: 30px;
        color: #999;
        // background-color: red;
      }
    }

    > section {
      height: calc(100% - 45px);
    }
  }

  @keyframes zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}
  @keyframes zoomOut{0%{opacity:1}50%{opacity:0;transform:scale3d(.3,.3,.3)}to{opacity:0}}
  
  .slide-fade-enter-active {
    animation: zoomIn .5s;
  }

  .slide-fade-leave-active {
    animation: zoomOut .5s;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    //  right: -410px;
  }
</style>