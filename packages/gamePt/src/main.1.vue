<!-- 
功能介绍：
1、
 -->

<template>
<!-- width:800px;height:600px; -->
  <div class="wrap-game-pt" :class="{'err':!checkOrder}" :style="{'width':width+'px','height':height+'px'}">
    <template v-for="(item,index) in arr">
      <div class="block" :key="'block_'+index+'_l'" :style="{'width':blockWh.width+'px','height':blockWh.height+'px'}" v-if="dragoverIndex===index&&dragDrct==='left'"></div>
      <div class="block" :key="'block_'+index" :style="{
        'width':blockWh.width+'px',
        'background-image': 'url('+imgUrl+')',
        'background-size': width+'px '+height+'px',
        'background-position': blockWh.width*((item-1)%h)*-1+'px '+blockWh.height*parseInt((item-1)/h)*-1+'px',
        'height':blockWh.height+'px'}"
        :draggable="draggable"
        v-show="dragIndex!==index"
        @dragstart="dragstart(index,$event)"
        @dragend="dragend"
        @dragover="dragover(index,$event)">{{item}}</div>
      <div class="block" :key="'block_'+index+'_r'" :style="{'width':blockWh.width+'px','height':blockWh.height+'px'}" v-if="dragoverIndex===index&&dragDrct==='right'"></div>
    </template>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'GamePt',
    data: function () {
      return {
        width: 800,
        height: 600,
        arr: [],
        imgUrl: 'https://up.enterdesk.com/edpic_source/ce/2e/81/ce2e811fa84d37c64e30777e70f6f614.jpg',
        // 'http://www.gjlysy.com/upload/image/20180713/15314762498593031.jpg',
        draggable: true,
        dragIndex: '',
        dragoverIndex: '',
        dragX: 0,
        dragY: 0,
        dragDrct: ''
      };
    },
    props: {
      // 水平方向个数
      h: {
        default: 3
      },
      // 垂直方向个数
      v: {
        default: 2
      }
    },
    watch: {
      h: function () {
        this.initArr();
      },
      v: function () {
        this.initArr();
      },
      dragX: function (val1, val2) {
        this.dragDrct = (val1 > val2) ? 'right' : 'left';
        console.log('==watch dragX==', this.dragDrct);
      }
    },
    computed: {
      // 计算块的长、宽
      blockWh: function () {
        return {
          width: this.width / this.h,
          height: this.height / this.v
        };
      },
      // 校验数组顺序是否正确
      checkOrder: function () {
        let ret = true;

        for (let i = 0;i < this.arr.length;i++) {
          if (this.arr[i] - i !== 1) {
            ret = false;
            break;
          }
        }
        return ret;
      }
    },
    beforeDestroy: function () {
      // 
    },
    mounted: function () {
      this.initArr();
      let _this = this;

      setTimeout(function () {
        _this.randomSort();
      }, 3000);
      // setTimeout(function () {
      //   _this.randomSort();
      // }, 6000);

      // setTimeout(function () {
      //   // 5 -> 15
      //   _this.moveTo(4, 14);
      // }, 3000);
      // setTimeout(function () {
      //   // 11 -> 45
      //   _this.moveTo(9, 44);
      // }, 6000);
      this.loadImg();
    },
    methods: {
      initArr: function () {
        let arr = [];

        for (let i = 1;i <= this.h * this.v;i++) {
          arr.push(i);
        }
        this.arr = arr;
      },
      /** 
       * 移动
       * index: 需要移动的下标
       * toIndex: 移动到 下标处
       * */ 
      moveTo: function (index, toIndex, isBeforAfter) {
        this.arr.splice(isBeforAfter === 1 ? toIndex : (toIndex - 1), 0, this.arr.splice(index, 1)[0]);
      },
      // 随机打乱数组
      randomSort: function () {
        this.arr.sort(function (a, b) {
          return Math.random() > 0.5 ? -1 : 1;
        }); 
      },
      // 加载背景图片
      loadImg: function () {
        var _this = this;

        if (this.imgUrl) {
          var img = new Image();

          img.src = this.imgUrl;
          img.onload = function () {
            // 图片加载完成
            let wh = _this.maxWidthHeight(img.width, img.height);

            _this.width = wh.width;
            _this.height = wh.height;
          };
          // img.onerror = function () {};
        }
      },
      // 设置图片最大宽高
      maxWidthHeight: function (width, height) {
        let maxWidth = 1600;
        let maxHeight = 900;
        let w = '';
        let h = '';

        if (width > maxWidth) {
          w = maxWidth;
          h = maxWidth / width * maxHeight;
        }
        if (height > maxHeight) {
          h = maxHeight;
          w = maxHeight / height * maxWidth;
        }
        return {
          width: w,
          height: h
        };
      },
      dragstart: function (index, e) {
        let _this = this;

        e.dataTransfer.setData('infoName', ' ');
        setTimeout(function () {
          _this.dragIndex = index;
        }, 50);
      },
      dragend: function () {
        console.log('==dragend==' + this.dragIndex, this.dragoverIndex);
        // if (this.option.dragoverIndex >= 0) {
        //   this.list = this.moveArray(this.list, this.option.dragIndex, this.option.dragoverIndex, (this.option.dragDrct === 'down') ? 1 : 0);
        // }
        this.moveTo(this.dragIndex, this.dragoverIndex, this.dragDrct === 'right' ? 1 : 0);
        this.dragIndex = '';
        this.dragoverIndex = '';
      },
      dragover: function (index, e) {
        // console.log('==dragover==', index);
        this.dragoverIndex = index;
        if (e) {
          this.dragX = e.x;
          this.dragY = e.y;
        }
      }
    }
  };
</script>

<style scoped lang="scss">