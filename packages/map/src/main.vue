<!-- 
功能介绍：
1、
 -->

<template>
  <div class="wrap-gd-map" :id="id"></div>
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
      // 
    },
    watch: {
      // 
    },
    computed: {
      // 
    },
    beforeDestroy: function () {
      // 
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
        this.map = new window.AMap.Map(this.id);
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