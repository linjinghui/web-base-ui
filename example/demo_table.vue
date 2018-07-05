<template>
  <div style="width: 100%;height: 500px;">
    <cmp-table v-bind="option" @callback="callback">
      <tr slot="head">
        <td>序号</td><td>姓名</td><td>年龄</td><td>操作</td>
      </tr>
      <tr slot="body" slot-scope="props">
        <td>{{props.item.id}}</td><td>{{props.item.name}}</td><td>{{props.item.age}}</td>
        <td>
          <cmp-button v-if="props.item.state===1" @click="clk_item(props.item)">修改</cmp-button>
          <cmp-button v-if="props.item.state===2" theme="red" @click="clk_del(props.item)">删除</cmp-button>
        </td>
      </tr>
    </cmp-table>
  </div>
</template>

<script>
  import {Table, Button} from '../packages/index.js';

  export default {
    name: 'Table',
    components: {
      'cmpTable': Table,
      'cmpButton': Button
    },
    data: function () {
      return {
        option: {
          data: []
        }
      };
    },
    mounted: function () {
      let _this = this;

      setTimeout(function () {
        _this.setData();
      }, 1000);
    },
    methods: {
      callback: function (data) {
        console.log('=======callback=======');
        console.log(data);
      },
      clk_item: function (info) {
        console.log('=======clk_item=======');
        console.log(info);
        info.name += '_update';
        info.state = 2;
      },
      clk_del: function (info) {
        console.log('=======clk_del=======');
        console.log(info);
      },
      setData: function () {
        for (var i = 0;i < 100;i++) {
          this.option.data.push({
            id: i,
            name: 'name' + i,
            age: i * 10,
            state: 1
          });
        }
      }
    }
  };
</script>

<style scoped>

</style>