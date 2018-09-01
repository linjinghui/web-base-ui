<template>
  <div class="pagebar-wrapper" :class="theme" v-if="totalPage > 0">
    <span :disabled="active === 1" @click="goIndex('prev')">
      <i class="cicon-arrow-left"></i>
      <small>上一页</small>
    </span>
    <template v-for="(i,index) in arr">
      <span :key="'it_'+index" v-if="typeof i==='object'" @click="showIpt(i)">
        <template v-if="i.type === 1">
          <input type="text" v-model="value1" v-show="display1" @keyup="fun_keyup(i, $event)">{{i.name}}
        </template>
        <template v-else>
          <input type="text" v-model="value2" v-show="display2" @keyup="fun_keyup(i, $event)">{{i.name}}
        </template>
      </span>
      <span :key="'it_'+index" v-else :class="{'active': i === active}" @click="goIndex(i)">{{i}}</span>
    </template>
    <span :disabled="active === totalPage" @click="goIndex('next')">
      <i class="cicon-arrow-right"></i>
      <small>下一页</small>
    </span>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'Pagebar',
    data: function () {
      return {
        display1: false,
        display2: false,
        value1: '',
        value2: '',
        active: 0
      };
    },
    props: {
      // simple
      'theme': {
        default: ''
      },
      'lenth': {
        default: 5
      },
      'asideLenth': {
        default: 2
      },
      'index': {
        default: 0
      },
      'totalPage': {
        default: 0
      }
    },
    mounted: function () {
      this.active = this.index;
    },
    computed: {
      'arr': function () {
        var fh = '...';
        // 构造两边数据
        var leftAsid = [];
        var rightAsid = [];
        var middleMin = '';
        var middleMax = '';

        for (let i = 1;i <= this.asideLenth;i++) {
          if (i <= this.totalPage && i > 0) {
            leftAsid.push(i);
          }
        }
        middleMin = leftAsid[leftAsid.length - 1];
        for (let i = this.asideLenth - 1;i > -1;i--) {
          let val = this.totalPage - i;

          if (val <= this.totalPage && val > 0) {
            rightAsid.push(val);
          }
        }
        middleMax = rightAsid[0];

        // 构造中间数据
        var arr = [];
        var num = this.active - parseInt(this.lenth / 2);

        if (num - middleMin <= 2) {
          num = middleMin + 1;
        } else {
          this.value1 = middleMin + 1;
          leftAsid.push({'name': fh, 'type': 1});
        }

        if ((num + this.lenth) >= middleMax && middleMax - (num + this.lenth) < 2) {
          num = middleMax - this.lenth;
        } else {
          this.value2 = middleMax - 1;
          rightAsid.unshift({'name': fh, 'type': 2});
        }

        for (let i = 0;i < this.lenth;i++) {
          let val = num++;

          if (val <= this.totalPage && val > 0) {
            arr.push(val);
          }
        }

        if (arr.indexOf(1) === -1) {
          arr = leftAsid.concat(arr);
        }

        if (arr.indexOf(this.totalPage) === -1) {
          arr = arr.concat(rightAsid);
        }

        return arr;
      }
    },
    watch: {
      'value1': function (val1, val2) {
        if (isNaN(val1) || val1 < 1 || val1 > this.totalPage || (val1 + '').indexOf('.') >= 0) {
          this.value1 = val2;
        }
      },
      'value2': function (val1, val2) {
        if (isNaN(val1) || val1 < 1 || val1 > this.totalPage || (val1 + '').indexOf('.') >= 0) {
          this.value2 = val2;
        }
      },
      'index': function (val1) {
        this.active = val1;
      },
      'active': function (val1) {
        if (isNaN(val1) || val1 < 1 || val1 > this.totalPage || (val1 + '').indexOf('.') >= 0) {
          this.active = 1;
        }
        this.$emit('callback', this.active);
      }
    },
    methods: {
      'goIndex': function (index) {
        if (index === 'prev') {
          if (this.active > 1) {
            this.active -= 1;
          }
        } else if (index === 'next') {
          if (this.active < this.totalPage) {
            this.active += 1;
          }
        } else {
          this.active = index;
        }
      },
      'fun_keyup': function (info, event) {
        if (event.keyCode === 13) {
          let value = '';

          if (info.type === 1) {
            value = this.value1;
          } else {
            value = this.value2;
          }
          value = parseInt(value);
          if (!isNaN(value)) {
            this.display1 = false;
            this.display2 = false;
            this.goIndex(value);
          }
        }
      },
      'showIpt': function (info) {
        if (info.type === 1) {
          this.display1 = true;
        } else {
          this.display2 = true;
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .pagebar-wrapper {
    float: left;
    font-size: 12px;
    color: #535353;
    user-select: none;

    [disabled] {
      cursor: text;
      color: #ccc;
    }

    [class^="cicon-arrow"] {
      font-size: 14px;
      vertical-align: -3px;
    }

    span {
      position: relative;
      float: left;
      min-width: 26px;
      height: 26px;
      border: solid 1px #ccc;
      border-right-width: 0;
      line-height: 24px;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;

      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        text-align: center;
      }

      .cicon-arrow-left,
      .cicon-arrow-right {
        display: none;
      }
    }

    span:first-of-type {
      padding-left: 10px;
      padding-right: 10px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px; 
    }

    span:last-of-type {
      padding-left: 10px;
      padding-right: 10px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px; 
      border-right-width: 1px;
    }

    span.active {
      color: #fff;
      border: 0;
      background-color: #409eff;
    }
  }

  .pagebar-wrapper.simple {

    span {
      border: 0;

      .cicon-arrow-left,
      .cicon-arrow-right {
        display: inline-block;
      }

      small {
        display: none;
      }
    }

    span:first-of-type,
    span:last-of-type {
      padding: 0;
    }

    span.active {
      border-radius: 50%;
    }
  }
</style>