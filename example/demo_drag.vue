<template>
  <div>
    <button v-if="!option.dragFlag" @click="clk_order">排序</button>|
    <button v-if="option.dragFlag" @click="clk_save">保存</button>|
    <button @click="clk_cancel_order">取消</button>
    <table style="margin-top: 20px;" @dragover.stop>
      <tbody>
        <template v-for="(info, index) in list">
          <tr style="border:dashed 1px #ccc;" :key="'_'+info.name" v-if="option.dragFlag&&option.dragoverIndex===index&&option.dragDrct==='up'">
            <td></td>
            <td></td>
          </tr>
          <tr :key="info.name" 
            :draggable="option.dragFlag"                  
            v-show="option.dragIndex!==index" 
            @dragstart="dragstart(index,$event)" 
            @dragend="dragend" 
            @dragover="dragover(index,$event)">
            <td>{{index}}</td>
            <td>{{info.name}}</td>
          </tr>
          <tr style="border:dashed 1px #ccc;" :key="'_'+info.name" v-if="option.dragFlag&&option.dragoverIndex===index&&option.dragDrct==='down'">
            <td></td>
            <td></td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import {Button} from '../packages/index.js';

export default {
  name: 'demoButton',
  data: function () {
    return {
      // 源数据
      list: [
        {
          'name': 'name1'
        },
        {
          'name': 'name2'
        },
        {
          'name': 'name3'
        },
        {
          'name': 'name4'
        },
        {
          'name': 'name5'
        },
        {
          'name': 'name6'
        }
      ],
      option: {
        // 备份数据
        backup: [],
        dragFlag: false,
        // start|end
        // dragStatus: 'end',
        dragIndex: '',
        dragoverIndex: '',
        // up|down
        dragDrct: 'down',
        dragY: 0
      }
    };
  },
  components: {
    'cmpButton': Button
  },
  watch: {
    'option.dragY': function (val1, val2) {
      this.option.dragDrct = (val1 > val2) ? 'down' : 'up';
    }
  },
  mounted: function () {
    // alert('ready');
    // 备份拖拽原数据
    this.option.backup = JSON.parse(JSON.stringify(this.list));
    document.body.addEventListener('dragover', this.dragover);
  },
  methods: {
    clk_order: function () {
      this.option.dragFlag = true;
    },
    clk_cancel_order: function () {
      this.option.dragFlag = false;
      this.option.dragIndex = '';
      this.option.dragoverIndex = '';
      // 还原数据
      this.list = this.option.backup;
    },
    clk_save: function () {
      console.log('==clk_save==');
      console.log(JSON.stringify(this.list));
      // 备份最新的拖拽原数据
      this.option.backup = JSON.parse(JSON.stringify(this.list));
      // 取消保存
      this.option.dragFlag = false;
      this.option.dragIndex = '';
      this.option.dragoverIndex = '';
    },
    dragstart: function (index, e) {
      let _this = this;

      e.dataTransfer.setData('infoName',' ');
      setTimeout(function () {
        _this.option.dragIndex = index;
      }, 50);
    },
    dragend: function () {
      console.log('==dragend==');
      if (this.option.dragoverIndex >= 0) {
        // TODO
        // console.log('====把[' + this.option.dragIndex + ']拖拽到[' + this.option.dragoverIndex + ']后面====');
        this.list = this.moveArray(this.list, this.option.dragIndex, this.option.dragoverIndex, (this.option.dragDrct === 'down') ? 1 : 0);
      }
      this.option.dragIndex = '';
      this.option.dragoverIndex = '';
    },
    dragover: function (index, e) {
      this.option.dragoverIndex = index;
      e && (this.option.dragY = e.y);
    },
    drop: function (index, e) {
      console.log('====放下====' + index);
      console.log(e);
    },
    /**
    * 数组中移动元素到指定位置
    * @param {int} moveInd - 目标位置下标
    * @param {int} moveToInd - 移动到指定位置下标
    * @param {int} isBeforAfter - 0：前面插入、1：后面插入（默认）
    */
    moveArray: function (arr, moveInd, moveToInd, isBeforAfter) {
      // console.log(JSON.stringify(arr));
      var _arr = JSON.parse(JSON.stringify(arr));
      var item = _arr.splice(moveInd, 1);
      // console.log('moveInd：' + moveInd);
      // console.log(item[0]);
      if (moveInd > moveToInd) {
        moveToInd += 1;
      }
      if (isBeforAfter === 0) {
        moveToInd -= 1;
      }
      // setTimeout(function () {
      // console.log(JSON.stringify(_arr));
      // console.log('moveToInd：' + moveToInd);
      _arr.splice(moveToInd, 0, item[0]);
      // console.log(item[0]);
      // console.log(JSON.stringify(_arr));
      // }, 0);
      return _arr;
    }
  }
};
</script>

<style scoped>
  table {
    position: relative;
    width: 100%;
    table-layout: fixed;
    user-select: none;
    -moz-user-select: none;
  }
  table > tbody {
    position: relative;
    width: inherit;
  }
  table > tbody > tr {
    width: inherit;
    height: 30px;
  }
  table > tbody > tr > td {
    height: inherit;
    border: solid 1px;
  }

  td:nth-of-type(1) {
    width: 200px;
  }

</style>
<style>
  tr.drag-tag {
    cursor: crosshair!important;
    background-color: blue;
  }
</style>