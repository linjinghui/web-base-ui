<!-- 
功能介绍：
1、
 -->

<template>
  <div class="wrap-gd-map" :id="id" v-if="value"></div>
</template>

<script type="text/babel">
  export default {
    name: 'Map',
    data: function () {
      return {
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
      value: '',
      // 地图初始化配置参数
      option: {
        default: function () {
          return {};
        }
      }
    },
    watch: {
      // 
    },
    computed: {
      // 
    },
    beforeDestroy: function () {
      // 销毁地图，并清空地图容器
      this.map.destroy();
    },
    mounted: function () {
      this.includeGd();
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
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-gd-map {
    width: 800px;
    height: 600px;
    border: solid 1px;
  }
</style>