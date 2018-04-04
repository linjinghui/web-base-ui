<template>
  <div>
    <header style="height: 100px;background-color: red;"></header>
    <div style="float: left;width: 200px;height: 100%;background-color: blue;">2</div>
    <div style="float: left;width: calc(100% - 200px);padding: 0 20px;background-color: green;">
      <cmp-scroll-tabel v-bind="stabel" @callback="callback" @callbackPagebar="callbackPagebar" @callbackContextmenu="callbackContextmenu"></cmp-scroll-tabel>
    </div>
  </div>
</template>

<script>
import {ScrollTabel} from '../packages/index.js';

export default {
  name: 'Tabel',
  data: function () {
    return {
      stabel: {
        columns: [
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
        dataList: [],
        // 是否开启右击弹窗
        needContextmenu: true,
        contextmenuList: [
          {
            text: '移除2(ctrl + m)',
            cls: 'red del'
          },
          {
            text: '编辑(ctrl + e)',
            cls: 'edit'
          }
        ],
        // 分页栏激活项
        pbIndex: 1,
        // 分页数
        pbTotal: 2
      }
    };
  },
  components: {
    'cmpScrollTabel': ScrollTabel
  },
  mounted: function () {
    let _this = this;

    setTimeout(function () {
      _this.setData();
    }, 3000);
  },
  methods: {
    setData: function () {
      this.stabel.dataList = [
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
      ];
    },
    callback: function (data) {
      console.log('=======callback=======');
      console.log(data);
    },
    callbackPagebar: function (data) {
      console.log('=======callbackPagebar=======');
      console.log(data);
    },
    callbackContextmenu: function (data) {
      console.log('=======callbackContextmenu=======');
      console.log(data);
    }
  }
};
</script>

<style scoped>

</style>