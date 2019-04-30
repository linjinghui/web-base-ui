<template>
  <div class="wrap-time-turntable" :id="id">
    <div class="circle-month" :style="{transform:'rotate('+(-360/12*crd.month)+'deg)'}">
      <p v-for="index in 12" :key="'month_'+index" :class="{'active':index===crd.month}" :style="{transform:'rotate('+(360/12*index)+'deg)'}">{{chineseNum[index]+months}}</p>
    </div>
    <div class="circle-day" :style="{transform:'rotate('+(-360/crd.monthDays*crd.day)+'deg)'}">
      <p v-for="index in crd.monthDays" :key="'day_'+index" :class="{'active':index===crd.day}" :style="{transform:'rotate('+(360/crd.monthDays*index)+'deg)'}">{{chineseNum[index]+days}}</p>
    </div>
    <div class="circle-week" :style="{transform:'rotate('+(-360/weeks.length*crd.week)+'deg)'}">
      <p v-for="(info,index) in weeks" :key="'week_'+index" :class="{'active':index===crd.week}" :style="{transform:'rotate('+(360/weeks.length*index)+'deg)'}">{{info}}</p>
    </div>
    <div class="circle-hour" :style="{transform:'rotate('+(-360/24*crd.hour)+'deg)'}">
      <p v-for="index in 24" :key="'hour_'+index" :class="{'active':index===crd.hour}" :style="{transform:'rotate('+(360/24*index)+'deg)'}">{{chineseNum[index]+hours}}</p>
    </div>
    <div class="circle-min" :style="{transform:'rotate('+(-360/60*crd.min)+'deg)'}">
      <p v-for="index in 60" :key="'min_'+index" :class="{'active':index===crd.min}" :style="{transform:'rotate('+(360/60*index)+'deg)'}">{{chineseNum[index]+mins}}</p>
    </div>
    <div class="circle-second" :style="{transform:'rotate('+(-360/60*crd.second)+'deg)'}">
      <p v-for="index in 60" :key="'second_'+index" :class="{'active':index===crd.second}" :style="{transform:'rotate('+(360/60*index)+'deg)'}">{{chineseNum[index]+seconds}}</p>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'TimeTurntable',
    data: function () {
      return {
        id: 'ttt_' + new Date().getTime() + parseInt(Math.random() * 100),
        chineseNum: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七', '二十八', '二十九', '三十', '三十一', '三十二', '三十三', '三十四', '三十五', '三十六', '三十七', '三十八', '三十九', '四十', '四十一', '四十二', '四十三', '四十四', '四十五', '四十六', '四十七', '四十八', '四十九', '五十', '五十一', '五十二', '五十三', '五十四', '五十五', '五十六', '五十七', '五十八', '五十九', '六十'],
        months: '月',
        days: '号',
        weeks: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        hours: '点',
        mins: '分',
        seconds: '秒',
        crd: this.getCurrentData()
      };
    },
    props: {
      value: {
        default: ''
      }
    },
    watch: {
      // 'crd': function (val) {
      //   console.log(JSON.stringify(val));
      // }
    },
    beforeDestroy: function () {
      // 
    },
    mounted: function () {
      let _this = this;

      setInterval(function () {
        _this.crd = _this.getCurrentData();
      }, 1000);
    },
    methods: {
      getCurrentData: function () {
        let crd = new Date();
        let year = crd.getFullYear();
        let month = crd.getMonth() + 1;
        let second = crd.getSeconds();

        return {
          // 当月天数
          monthDays: new Date(year, month, 0).getDate(),
          month: month,
          // 号
          day: crd.getDate(),
          // 星期
          week: crd.getDay(),
          hour: crd.getHours(),
          min: crd.getMinutes(),
          second: second === 0 ? 60 : second
        };
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-time-turntable {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: #ffffff;
    background-position: center;
    background-size: cover;
    background-image: url('../images/t.jpg');
  }
  // 圆圈样式
  .wrap-time-turntable > [class^=circle-] {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    // border: solid 1px;
    border-radius: 50%;
    transition: transform .2s;
  }
  .wrap-time-turntable > [class^=circle-]:nth-of-type(1) {
    width: 16.67%;
    height: 16.67%;
  }
  .wrap-time-turntable > [class^=circle-]:nth-of-type(2) {
    width: 33.34%;
    height: 33.34%;
  }
  .wrap-time-turntable > [class^=circle-]:nth-of-type(3) {
    width: 50.01%;
    height: 50.01%;
  }
  .wrap-time-turntable > [class^=circle-]:nth-of-type(4) {
    width: 66.68%;
    height: 66.68%;
  }
  .wrap-time-turntable > [class^=circle-]:nth-of-type(5) {
    width: 83.35%;
    height: 83.35%;
  }
  .wrap-time-turntable > [class^=circle-]:nth-of-type(6) {
    width: 100%;
    height: 100%;
  }

  // 圆圈内文本
  .wrap-time-turntable > [class^=circle-] > p {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 50%;
    height: 30px;
    line-height: 30px;
    text-align: right;
    transform: rotate(0deg);
    transform-origin: 0 50%;
  }
  .wrap-time-turntable > [class^=circle-] > p.active {
    color: #d0edee;
    text-shadow: 0 0 2.2em #12e1e4,
                -0 -0 2.2em #12e1e4;
  }
</style>