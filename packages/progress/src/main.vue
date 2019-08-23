<!--
功能介绍：
1、type: 提供2种进度条类型 - square|circle
2、progress: 进度 1-100
3、theme: 进度条背景颜色
4、themebar: 进度条颜色
 -->

<template>
  <div class="progress circle" v-if="type === 'circle'">
    <svg viewBox="0 0 100 100">
      <path d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" fill="none" stroke-width="6.8" :stroke="theme"></path>
      <path d="M 50 50 m 0 -47 a 47 47 0 1 1 0 94 a 47 47 0 1 1 0 -94" stroke-linecap="round" fill="none" stroke-width="6.8" :stroke="themebar" class="pg-bar" :style="{'stroke-dashoffset': percent + 'px', 'stroke-dasharray': maxValue + 'px, ' + maxValue + 'px'}"></path>
    </svg>
    <p class="text center-hv">{{checkProgressParam(progress)}}%</p>
  </div>
  <div class="progress cylinder" v-else-if="type === 'cylinder'" :style="{'background-color':'rgba('+theme+',0.4)','fill': 'rgba('+theme+',1)'}">
    <svg width="100%" :height="checkProgressParam(progress)+'%'" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0.395c0,0,18.555-2,31.5,3c12.945,5,23.5,4.25,23.5,4.25V125H0V0.395z"/>
      <path d="M29.023,5.895c12.422-6.75,25.977-5,25.977-5V124.5H29.391L29.023,5.895z"/>				
    </svg>
    <p class="text center-hv">{{checkProgressParam(progress)}}%</p>
  </div>
  <div class="progress square" v-else :style="{'background-color': theme}">
    <div class="pg-bar stripe" :style="{'width': checkProgressParam(progress) + '%', 'background-color': themebar}">  <span class="text center-hv">{{checkProgressParam(progress)}}%</span>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'Progress',
    data: function () {
      return {
        id: 'pgrs_' + new Date().getTime() + parseInt(Math.random() * 100),
        maxValue: 300
      };
    },
    props: {
      type: {
        default: 'square'
      },
      theme: {
        default: '#e5e9f2'
      },
      themebar: {
        default: '#20a0ff'
      },
      // 1-100
      progress: {
        default: 0
      }
    },
    watch: {
      //
    },
    computed: {
      percent: function () {
        let result = 0;

        try {
          result = this.maxValue - this.maxValue * this.checkProgressParam(this.progress) / 100;
        } catch (e) {
          //
        }
        return result;
      }
    },
    beforeDestroy: function () {
      //
    },
    mounted: function () {
      //
    },
    methods: {
      checkProgressParam: function (val) {
        let data = '';

        try {
          data = parseInt(val);
          if (data < 0) {
            data = 0;
          } else if (data > 100) {
            data = 100;
          }
        } catch (e) {
          data = 0;
        }
        return data;
      }
    }
  };
</script>

<style scoped lang="scss">
  .progress {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /*圆形进度条*/
  .progress.circle {
    >.text {
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }

    .pg-bar {
      stroke-dashoffset: 0px;
      transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;
    }
  }

  .progress.cylinder {
    position: relative;
    display: inline-block;
    width: 55px;
    height: 115px;
    border-radius: 6px;
    background-color: rgba(59,195,247,0.4);
    fill: rgba(59,195,247,1);
    overflow: hidden;

    svg {
      position: absolute;
      bottom: 0;
      fill: inherit;
      transition: height .6s ease;

      path {
        fill: inherit;
      }
      path:nth-of-type(2) {
        opacity: 0.6;
      }
    }
    >.text {
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
    }
  }

  /*方形进度条*/
  .progress.square {
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);

    >.pg-bar {
      position: relative;
      float: left;
      width: 0;
      height: 100%;
      font-size: 14px;
      line-height: 20px;
      color: #fff;
      text-align: center;
      -webkit-box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
      box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
      -webkit-transition: width .6s ease;
      -o-transition: width .6s ease;
      transition: width .6s ease;

      .text {
        width: 50px;
        height: 20px;
      }
    }

    >.pg-bar.stripe {
      background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
      background-size: 40px 40px;
      animation: pg-bar-stripes 2s linear infinite;
    }

    @keyframes pg-bar-stripes {
      from {
        background-position: 40px 0;
      }
      to {
        background-position: 0 0;
      }
    }
  }

</style>