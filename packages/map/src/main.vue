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
      this.map && this.map.destroy();
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

        this.map.plugin('AMap.Geolocation', function () {
          var geolocation = new window.AMap.Geolocation({
            // 是否使用高精度定位，默认:true
            enableHighAccuracy: true,
            // 超过10秒后停止定位，默认：无穷大
            timeout: 10000,          
            // 定位结果缓存0毫秒，默认：0
            maximumAge: 0,           
            // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            convert: true,           
            // 显示定位按钮，默认：true
            showButton: true,        
            // 定位按钮停靠位置，默认：'LB'，左下角
            buttonPosition: 'LB',    
            // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            buttonOffset: new window.AMap.Pixel(10, 20),
            // 定位成功后在定位到的位置显示点标记，默认：true
            showMarker: true,        
            // 定位成功后用圆圈表示定位精度范围，默认：true
            showCircle: true,        
            // 定位成功后将定位到的位置作为地图中心点，默认：true
            panToLocation: true,     
            // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            zoomToAccuracy: true      
          });

          _this.map.addControl(geolocation);
          geolocation.getCurrentPosition();
          // 返回定位信息
          window.AMap.event.addListener(geolocation, 'complete', function (data) {
            // 
          });
          // 返回定位出错信息
          window.AMap.event.addListener(geolocation, 'error', function (data) {
            // 
          });
        });

        var marker2 = new window.AMap.Marker({
          map: this.map,
          draggable: true,
          animation: 'AMAP_ANIMATION_DROP'
        });

        marker2.on('dragend', function (e) {
          _this.aMapSearchNearBy([e.lnglat.lng, e.lnglat.lat], '');
        });
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
      // 高德地图查询周边
      aMapSearchNearBy: function (centerPoint, city) {
        window.AMap.service(['AMap.PlaceSearch'], function () {
          var placeSearch = new window.AMap.PlaceSearch({
            pageSize: 50,
            pageIndex: 1,
            city: city
          });

          // 第一个参数是关键字，这里传入的空表示不需要根据关键字过滤
          // 第二个参数是经纬度，数组类型
          // 第三个参数是半径，周边的范围
          // 第四个参数为回调函数
          placeSearch.searchNearBy('', centerPoint, 1000, function (status, result) {
            if (result.info === 'OK') {
              // 周边地标建筑列表
              // var locationList = result.poiList.pois;
            }
          });
        });
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