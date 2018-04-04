<template>
  <div style="width: 1000px;height: 900px;background-color: yellow;">
    <button @click="clk">update value</button>
    <cmp-tabel :columns="columns" :dataArr="dataArr" @callback="callback"></cmp-tabel>
  </div>
</template>

<script>
import {Tabel} from '../packages/index.js';

export default {
  name: 'Tabel',
  data: function () {
    return {
      columns: [
        {
          'name': 'checkbox',
          'variable': 'checkbox',
          'asName': ''
        },
        {
          'name': '姓名',
          'variable': 'name',
          'asName': ''
        },
        {
          'name': '手机号码',
          'variable': 'mobile',
          'asName': ''
        },
        {
          'name': '部门',
          'variable': 'depart',
          'asName': ''
        },
        {
          'name': '邀请时间',
          'variable': 'innerHtml',
          'asName': ''
        },
        {
          'name': '操作',
          'variable': 'button',
          'asName': ''
        }
      ],
      dataArr: [
        {
          'name': 'name1',
          'mobile': '13599048001',
          'depart': '部门1',
          'time': '2017-08-02 11:11:11',
          'button': 123,
          'innerHtml': '<a href="http://www.baidu.com">http://www.baidu.com</a>'
        },
        {
          'name': 'name2',
          'mobile': '13599048002',
          'depart': '部门2',
          'time': '2017-08-02 11:11:12',
          'button': [
            {
              'theme': 'cancel',
              'text': '重新邀请'
            },
            {
              'theme': 'del',
              'text': '删除'
            }
          ],
          'innerHtml': '<a href="http://www.baidu.com">http://www.baidu.com</a>'
        },
        {
          'name': 'name3',
          'mobile': '13599048003',
          'depart': '部门3>部门3>部门3>部门3>部门3>部门3>部门3>部门3>部门3>部门3>部门3>部门3>部门3>部门3>部门3',
          'time': '2017-08-02 11:11:13',
          'button': [
            {
              'theme': 'cancel',
              'text': '重新邀请'
            },
            {
              'theme': 'del',
              'text': '删除'
            }
          ],
          'innerHtml': '<a href="http://www.baidu.com">http://www.baidu.com</a>'
        },
        {
          'name': 'name4',
          'mobile': '13599048004',
          'depart': '部门4',
          'time': '2017-08-02 11:11:14',
          'button': [
            {
              'theme': 'cancel',
              'text': '重新邀请'
            },
            {
              'theme': 'del',
              'text': '删除'
            }
          ],
          'innerHtml': '<a href="http://www.baidu.com">http://www.baidu.com</a>'
        },
        {
          'name': 'name5',
          'mobile': '13599048005',
          'depart': '部门5',
          'time': '2017-08-02 11:11:15',
          'button': [
            {
              'theme': 'cancel',
              'text': '重新邀请'
            },
            {
              'theme': 'del',
              'text': '删除'
            }
          ],
          'innerHtml': '<a href="http://www.baidu.com">http://www.baidu.com</a>'
        },
        {
          'name': 'name6',
          'mobile': '13599048006',
          'depart': '部门6',
          'time': '2017-08-02 11:11:16',
          'button': [
            {
              'theme': 'cancel',
              'text': '重新邀请'
            },
            {
              'theme': 'del',
              'text': '删除'
            }
          ],
          'innerHtml': '<a href="http://www.baidu.com">http://www.baidu.com</a>'
        },
        {
          'name': 'name7',
          'mobile': '13599048007',
          'depart': '部门7',
          'time': '2017-08-02 11:11:17',
          'button': [
            {
              'theme': 'cancel',
              'text': '重新邀请'
            },
            {
              'theme': 'del',
              'text': '删除'
            }
          ],
          'innerHtml': '<a href="http://www.baidu.com">http://www.baidu.com</a>'
        },
        {
          'name': 'name8',
          'mobile': '13599048008',
          'depart': '部门8',
          'time': '2017-08-02 11:11:18',
          'button': [
            {
              'theme': 'cancel',
              'text': '重新邀请'
            },
            {
              'theme': 'del',
              'text': '删除'
            }
          ],
          'innerHtml': '<a href="http://www.baidu.com">http://www.baidu.com</a>'
        },
        {
          'name': 'name9',
          'mobile': '13599048009',
          'depart': '部门9',
          'time': '2017-08-02 11:11:19',
          'button': [
            {
              'theme': 'cancel',
              'text': '重新邀请'
            },
            {
              'theme': 'del',
              'text': '删除'
            }
          ],
          'innerHtml': '<a href="http://www.baidu.com">http://www.baidu.com</a>'
        },
        {
          'name': 'name10',
          'mobile': '135990480010',
          'depart': '部门10',
          'time': '2017-08-02 11:11:10',
          'button': [
            {
              'theme': 'cancel',
              'text': '重新邀请'
            },
            {
              'theme': 'del',
              'text': '删除'
            }
          ],
          'innerHtml': '<a href="http://www.baidu.com">http://www.baidu.com</a>'
        }
      ],
      selectReturnVariable: 'mobile'
    };
  },
  components: {
    'cmpTabel': Tabel
  },
  methods: {
    callback: function (result) {
      console.log('callback:' + JSON.stringify(result));
    },
    clk: function () {
      let data = [];

      for (var i = 50 - 1;i >= 0;i--) {
        data.push({
          'name': 'name' + i,
          'mobile': '135990480' + i,
          'depart': '部门' + i,
          'time': '2017-08-02 11:11:' + i,
          'button': [
            {
              'theme': 'cancel',
              'text': '重新邀请' + i
            },
            {
              'theme': 'del',
              'text': '删除' + i
            }
          ]
        });
      }
      this.dataArr = data;
      console.log('mark demo dataArr:' + JSON.stringify(this.dataArr));
    }
  }
};
</script>

<style scoped>

</style>