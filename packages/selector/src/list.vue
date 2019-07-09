<!-- 
功能介绍：
1、
 -->

<template>
  <li :class="{open:data.opened,active:!multiple&&data.checked}" v-if="showBySearch" @click.stop="clkLine">
    <span class="wrap-arrow"><i class="cicon-triangle" v-if="data.children" @click.stop="clkToggle"></i></span>
    <span class="wrap-check" v-if="!data.nocheckbox&&multiple" @click.stop>
      <cmp-checkbox class="wrap-check" v-model="data.checked" :beforeclk="clkBeforeCheck" @click="clkCheckobx"></cmp-checkbox>
    </span>
    <img class="wrap-avator" v-if="data.img" :src="data.img">
    <span class="wrap-text" v-html="replaceNameBySearch(data.name,data)"></span>
    <ul v-if="data.children&&data.children.length>0" v-show="data.opened">
      <item v-for="(itemData,index) in data.children" :key="itemData.id+'_'+index+'_children'" :data="itemData" :maxCount="maxCount" :results="results" :multiple="multiple" :search="search" @callback_checkbox="clkCheckobx"></item>
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
    props: {
      data: {
        default: function () {
          return [];
        }
      },
      // 最大选择数量
      maxCount: '',
      // 是否多选 true: 是多选(默认) false: 单选
      multiple: '',
      // 搜索关键字
      search: '',
      // 选中的结果
      results: ''
    },
    data: function () {
      return {
        // lineData.
      };
    },
    watch: {
      // 
    },
    computed: {
      showBySearch: function () {
        let show = true;

        if (this.search) {
          show = new RegExp('"name":"[^"]*' + this.search + '[^"]*"').test(JSON.stringify(this.data));
        }
        return show;
      }
    },
    beforeDestroy: function () {
      this.$eventbus.$off('changeResult' + this.data.id, this.eventChangeResult);
    },
    mounted: function () {
      this.$eventbus.$on('changeResult' + this.data.id, this.eventChangeResult);
    },
    methods: {
      // 显示、隐藏子节点
      clkToggle: function () {
        this.$set(this.data, 'opened', !this.data.opened);
      },
      // 点击前判断
      clkBeforeCheck: function () {
        return this.data.checked || !this.maxCount || (this.maxCount > this.results.length);
      },
      // checkbox 点击 
      clkCheckobx: function (data) {
        this.$emit('callback_checkbox', data || this.data);
      },
      // 点击 - 行
      clkLine: function () {
        if (!this.data.disabled && !this.data.nocheckbox && this.clkBeforeCheck()) {
          this.$set(this.data, 'checked', !this.data.checked);
          if (!this.multiple) {
            // 单选的话，先清空已选中
            this.$eventbus.$emit('clearTreeItem');
          }
          this.clkCheckobx(this.data);
        }
      },
      replaceNameBySearch: function (name, data) {
        return this.search ? name.replace(this.search, '<font class="theme-c">' + this.search + '</font>') : name;
      },
      // 接收选中结果变动事件
      eventChangeResult: function (results) {
        let id = this.data.id;
        let str = JSON.stringify(results);
        let rstr = '"id":';

        if (typeof id === 'string') {
          rstr += '"' + id + '"';
        } else {
          rstr += id;
        }
        let checked = str.indexOf(rstr);

        this.$set(this.data, 'checked', checked >= 0);
      }
    }
  };
</script>