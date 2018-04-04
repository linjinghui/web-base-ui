<template>
  <li :class="'layer' + layer">
    <div class="line"
      :class="{bold: isFolder, active: bfActiveId===model.deptId, disabled: !model.manager}"
      @click="clkLine(model)"
      @dblclick.stop="toggle">
      <span class="ticon">
        <i style="display: none;" class="icon iconfont icon-arrow_u" v-if="isFolder" v-show="bfOpen" @click.stop="bfOpen=false"></i>
        <i style="display: none;" class="icon iconfont icon-arrow_r" v-if="isFolder" v-show="!bfOpen" @click.stop="bfOpen=true"></i>
      </span>
      {{model.deptName}}
    </div>
    <!-- <ul v-show="bfOpen" v-if="isFolder"> -->
    <!-- <ul v-show="bfOpen" v-if="isRender"> -->
    <ul v-if="bfOpen">
      <item
        class="item"
        v-for="model in model.children"
        :model="model"
        :layer="layer + 1"
        :dataLine="getDataLine(model)"
        :activeId="activeId"
        @callback="callback"
        @openParentItem="openParentItemCallback"
        @setActiveId="setActiveIdCallback">
      </item>
    </ul>
  </li>

</template>

<script type="text/babel">
  import {debounce} from '../../../node_modules/web-framework/libs/js/util.js';

  export default {
    name: 'item',
    props: {
      model: Object,
      layer: '',
      activeId: '',
      dataLine: {
        default: function () {
          let tempData = JSON.parse(JSON.stringify(this.model));

          // if (tempData.children) {
          //   delete tempData.children;
          // }
          return [tempData];
        }
      },
      open: {
        default: false
      }
    },
    data: function () {
      let countOpen = this.open;
      let str = '';
      let children = this.model.children || [];
      let activeId = this.activeId;

      if (activeId && this.layer > 1 && children.length > 0) {
        str = '"deptId":"' + activeId + '"';
        countOpen = JSON.stringify(children).indexOf(str) >= 0;
      }
      return {
        isRender: false,
        bfOpen: countOpen,
        bfActiveId: this.activeId
      };
    },
    watch: {
      activeId: function (val) {
        this.bfActiveId = val;
        // console.log('设置激活项：' + val + ', 当前项ID：' + this.model.deptId);
        if (val === this.model.deptId) {
          // console.log('激活项：' + this.model.deptName);
          this.openParentItem();
          this.$emit('callback', this.dataLine);
        }
      },
      bfOpen: function () {
        this.$emit('callback', 'updateScroll');
      }
    },
    computed: {
      isFolder: function () {
        return this.model.children && this.model.children.length;
      }
    },
    mounted: function () {
      //
      // let _this = this;
      // let timelone = (_this.layer - 1) * 50000;

      // setTimeout(function () {
      //   _this.isRender = true;
      // }, timelone < 0 ? 0 : timelone);
    },
    methods: {
      getDataLine: function (data) {
        let tempData = JSON.parse(JSON.stringify(data));
        let temp = JSON.parse(JSON.stringify(this.dataLine));

        // delete tempData.children;
        temp[temp.length] = tempData;
        return temp;
      },
      clkLine: debounce(function () {
        // this.$emit('callback', this.dataLine);
        this.toggle();
        this.setActiveIdCallback(this.model.deptId);
      }, 500, true),
      callback: function (data) {
        this.$emit('callback', data);
      },
      toggle: function () {
        if (this.isFolder) {
          this.bfOpen = !this.bfOpen;
        }
      },
      // changeType: function () {
      //   if (!this.isFolder) {
      //     this.$set(this.model, 'children', []);
      //     this.addChild();
      //     this.bfOpen = true;
      //   }
      // },
      // addChild: function () {
      //   this.model.children.push({
      //     name: 'new stuff'
      //   });
      // },
      openParentItem: function () {
        this.$emit('openParentItem');
      },
      openParentItemCallback: function () {
        // console.log('监听到需要打开父组件：' + this.model.deptName + ', layer:' + this.layer);
        this.bfOpen = true;
        if (this.layer > 1) {
          this.openParentItem();
        }
      },
      setActiveIdCallback: function (data) {
        this.$emit('setActiveId', data);
      }
    }
  };
</script>

<style scoped lang="scss"></style>