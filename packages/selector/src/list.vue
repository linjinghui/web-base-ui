<!-- 
功能介绍：
1、
 -->

<template>
  <li :class="{open:data.opened}">
    <span class="wrap-arrow" @click="clkToggle(data)"><i class="cicon-triangle" v-if="data.children"></i></span>
    <cmp-checkbox class="wrap-check" v-model="data.checked" :beforeclk="clkBeforeCheck" @click="clkCheck(data)"></cmp-checkbox>
    <img class="wrap-avator" :src="data.img||avatar">
    <span class="wrap-text">{{data.name}}</span>
    <ul v-if="data.children" v-show="data.opened">
      <item v-for="(itemData,index) in data.children" :key="itemData.id+'_'+index+'_children'" :data="itemData" :pdata="data" :avatar="avatar" :maxCount="maxCount" :checkedCount="checkedCount" :returnType="returnType"></item>
    </ul>
  </li>
</template>

<script type="text/babel">
  import Checkbox from '../../checkbox/src/main.vue';

  export default {
    name: 'Item',
    components: {
      'cmpCheckbox': Checkbox
    },
    data: function () {
      return {
        id: 'item_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {
      data: {
        default: function () {
          return [];
        }
      },
      // 父节点
      pdata: {
        default: function () {
          return {};
        }
      },
      avatar: '',
      // 最大选择数量
      maxCount: '',
      // 已选中数量
      checkedCount: '',
      // 返回类型 1: 全部返回 2: 只返还回子节点
      returnType: ''
    },
    watch: {
      'data.checked': {
        deep: true,
        handler: function (val) {
          if (typeof val !== 'undefined') {
            if (!val) {
              // 取消勾选，也要取消父节点的勾选
              this.$set(this.pdata, 'checked', val);
            } else if (this.pdata && this.pdata.children) {
              // 选中时候，判断子节点是否全部选中，如果全部选中，则勾选父节点
              let str = JSON.stringify(this.pdata.children);
              // 已被选中的子节点数量，含所有子节点
              let trueLength = str.match(/"checked":true/g).length;
              // 子节点数量，含所有子节点
              let subLength = str.match(/"name"/g).length;

              if (trueLength === subLength) {
                this.$set(this.pdata, 'checked', true);
              }
            }
            window.EVENTBUS.$emit('checked', this.data);
          }
        }
      }
    },
    computed: {
      // 
    },
    beforeDestroy: function () {
      window.EVENTBUS.$off('initResult');
    },
    mounted: function () {
      let _this = this;

      window.EVENTBUS.$on('initResult', function (data) {
        // 标注已接收到
        window.initResult = 'received';
        let str = JSON.stringify(data);
        let id = _this.data.id;
        let regstr = '"id":' + (typeof id === 'string' ? '"' + id + '"' : id);

        if (str.indexOf(regstr) >= 0) {
          _this.$set(_this.data, 'checked', true);
          _this.clkCheck(_this.data);
        }
      });
    },
    methods: {
      // 开关子节点
      clkToggle: function (info) {
        this.$set(info, 'opened', !info.opened);
      },
      // 点击复选框之前
      clkBeforeCheck: function () {
        return this.data.checked || (this.maxCount > this.checkedCount);
      },
      clkCheck: function (info) {
        // let _this = this;
        let str = JSON.stringify(info.children);
        // 剩余可选中的节点数量
        let sy = this.maxCount - this.checkedCount;

        // 设置所有子节点状态，控制最大选择数量
        str = str.replace(/,"checked":true/g, '').replace(/,"checked":false/g, '');
        if (info.checked && info.children && info.children.length > sy) {
          
          // 方式一：正则
          // str = str.replace(/}/g, function (match, pos, originalText) {
          //   console.log(str.substring(pos - 4, pos));
          //   let fontChart = str.substring(pos - 4, pos);

          //   // 返回类型 1: 全部返回 2: 只返还回子节点
          //   if (_this.returnType === 2 && fontChart === 'null') {
          //     --sy;
          //   } 
          //   if (_this.returnType !== 2) {
          //     --sy;
          //   }
          //   let res = ',"checked":' + info.checked + '}';

          //   if (sy <= (_this.returnType === 2 ? -1 : 0)) {
          //     res = '}';
          //   }
          //   return res;
          // });
          // 方式二：循环
          let darrs = JSON.parse(str);
          let returnType = this.returnType;
          let dp = function (arr) {
            for (let i = 0;i < arr.length;i++) {
              if (sy < -1) {
                break;
              }
              if (returnType === 2 && (!arr[i].children || arr[i].children.length === 0)) {
                --sy;
              } 
              if (returnType !== 2) {
                --sy;
              }
              
              if (sy > (returnType === 2 ? -1 : 0)) {
                arr[i].checked = info.checked;
              }
              if (arr[i].children && arr[i].children.length > 0) {
                dp(arr[i].children);
              }
            }
          };

          dp(darrs);
          str = JSON.stringify(darrs);
        } else {
          str = str.replace(/}/g, ',"checked":' + info.checked + '}');
        }
        this.$set(info, 'children', JSON.parse(str));
      }
    }
  };
</script>