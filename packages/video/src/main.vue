<!-- 
功能介绍：
https://github.com/niandeng-ckplayer/chplayer
1、
 -->

<template>
  <transition name="slide-fade">
    <div :id="id" class="wrap-video" v-if="value!==''" v-show="value">VIDEO</div>
  </transition>
</template>

<script type="text/babel">
  import '../lib/chplayer/chplayer.js';

  export default {
    name: 'Video',
    data: function () {
      var id = 'vdo_' + new Date().getTime() + parseInt(Math.random() * 100);

      return {
        id: id,
        player: '',
        option: {
          // 容器的ID或className
          container: '#' + id,
          variable: 'player',
          // 默认音量
          volume: 0.6,
          // 封面图片地址
          poster: '../lib/screenshot/wdm.jpg', 
          // 是否自动播放
          autoplay: false, 
          // 是否循环播放
          loop: true, 
          // 是否是直播
          live: false, 
          // 当播放器加载后执行的函数
          loaded: 'loadedHandler', 
          // 默认需要跳转的时间
          seek: 0, 
          // 在flashplayer情况下是否需要支持拖动，拖动的属性是什么
          drag: '', 
          // 前一集按钮动作
          front: 'frontFun', 
          // 下一集按钮动作
          next: 'nextFun', 
          // flashplayer: true, // 强制使用flashplayer
          // html5m3u8:true,// 是否使用hls，默认不选择，如果此属性设置成true，则不能设置flashplayer:true,
          // chtrack: {
          //   src: '../lib/screenshot/srt.srt',
          //   charset: 'utf-8'
          // }, 
          // 字幕文件及编码
          // preview: {
          //   src: ['../lib/screenshot/mydream_en1800_1010_01.jpg', '../lib/screenshot/mydream_en1800_1010_02.jpg'],
          //   scale: 2
          // }, 
          // 预览图片地址数组，src=图片地址数组，scale=图片截取时间间隔，单位：秒
          // prompt: [
          //   {
          //     words: '小女孩跟外公学习弹钢琴',
          //     time: 16
          //   },
          //   {
          //     words: '女主离开家乡',
          //     time: 60
          //   },
          //   {
          //     words: '女主奋斗',
          //     time: 120
          //   }
          // ], 
          // 提示点，words=提示点的内容，time=提示点对应的时间
          video: [
            ['http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4', 'video/mp4', '中文标清', 0],
            ['http://img.ksbbs.com/asset/Mon_1703/d0897b4e9ddd9a5.mp4', 'video/mp4', '中文高清', 0],
            ['http://img.ksbbs.com/asset/Mon_1703/eb048d7839442d0.mp4', 'video/mp4', '英文高清', 0],
            ['http://img.ksbbs.com/asset/Mon_1703/d30e02a5626c066.mp4', 'video/mp4', '英文超清', 0]
          ]
          /* video:[
            ['http:// cdn.theoplayer.com/video/star_wars_episode_vii-the_force_awakens_official_comic-con_2015_reel_(2015)/index.m3u8','','标清',0],
            ['http:// cdn.theoplayer.com/video/star_wars_episode_vii-the_force_awakens_official_comic-con_2015_reel_(2015)/index.m3u8','','高清',10]
          ] */
        }
      };
    },
    props: {
      value: {
        default: ''
      },
      poption: {
        default: function () {
          // 
        }
      }
    },
    watch: {
      value: function (val, val2) {
        if (val && val2 === '') {
          this.$nextTick(function () {
            this.initPlayer();
          });
        }
      }
    },
    computed: {
      //  
    },
    beforeDestroy: function () {
      //  
    },
    mounted: function () {
      // console.log(Chplayer);
    },
    methods: {
      initPlayer: function () {
        console.log(window.chplayer);
        var Chplayer = window.chplayer;
        
        this.player = new Chplayer(this.option);
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-video {
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