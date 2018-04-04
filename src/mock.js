import Mock from 'mockjs';

Mock.setup({
  // 表示响应时间介于 1000 和 3000 毫秒之间，默认值是'10-100'。
  timeout: '100-1000'
});

// // 获取部门成员--用于人员选择器
// Mock.mock(/(\/portal\/user\/getUsersByDeptId)/, {
//   'msg': 'im msg',
//   'msgCode': 200,
//   'msgDesc': 'im msgDesc',
//   'result': {
//     'currentPage': 0,
//     'pageSize': 0,
//     'resultList|10-100': [
//       {
//         'avatar': 'http://www.embeddedlinux.org.cn/uploads/allimg/151115/0934120.jpg',
//         'realName': '@name',
//         'userNumber|+1': 61208680
//       }
//     ],
//     'totalSize': 0
//   },
//   'subMsg': 'im subMsg',
//   'subMsgCode': 'im subMsgCode'
// });