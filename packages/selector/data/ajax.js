import Vue from 'vue';
import VueResource from 'vue-resource';
import {ssgGetData, ssgSaveData} from '../../../node_modules/web-framework/libs/js/util.js';

let _this = Vue.use(VueResource);
const URL = '/apislt';
const TIMEOUT = 10000;
const ERRORSERVICE = '服务异常，请稍后再试！';
const ERRORTIMEOUT = '连接超时，请稍后再试！';
let LOGINUSER = '';

_this.http.interceptors.push(function (request, next) {
  let token = LOGINUSER ? LOGINUSER.token : '';
  // 设置超时
  let timeout = setTimeout(function () {
    request.abort();
    window.EVENTBUS.$emit('changeTip', {
      'display': true,
      'theme': 'error',
      'content': ERRORTIMEOUT
    });
  }, TIMEOUT);

  // 设置请求头
  request.headers.set('Content-Type', 'application/json;utf-8');
  request.headers.set('Authorization', token);
  // 拦截处理全局ajax回调
  next(function (response) {
    let body = response.body;

    if (typeof body === 'string' && body.indexOf('html') >= 0) {
      window.EVENTBUS.$emit('changeTip', {
      'display': true,
      'theme': 'error',
      'content': ERRORSERVICE
    });
    }
    clearTimeout(timeout);
    return response;
  });
});

// ===============================【通讯录管理相关接口∨】===============================

/**
 * 根据单位查询用户可管理组织架构（部门）
 * @param {object} loginUser - 登录用户信息LOGINUSER = loginUser;
 */
export function ajaxGetManageableTree (loginUser, callback) {
  LOGINUSER = loginUser;
  let params = {
    enterpriseId: loginUser.enterpriseId,
    userNumber: loginUser.userNumber
  };
  let key = 'tree_' + loginUser.enterpriseId + '_' + loginUser.userNumber;
  let data = '';

  data = ssgGetData(key);
  if (data) {
    // 删除未分配人员 节点
    var arr = data.result.children ? JSON.parse(JSON.stringify(data.result.children)) : '';
    if (arr && arr.length > 0) {
      let temp = arr[arr.length - 1];

      if (temp && temp.deptId === '-1') {
        arr.pop();
        data.result.children = arr;
      }
    }
    callback(data);
  } else {
    _this.http.get(URL + '/portal/enterprise/getManageableEnterpriseTree', {params: params}).then(function (successData) {
      data = successData.body;
      if (data.msgCode === 200) {
        // 添加根节点信息
        data.result = {
          'children': data.result,
          'deptId': '0',
          'deptName': loginUser.enterName,
          'isLeaf': 0,
          'level': 0,
          'manager': loginUser.superAdmin === 1 ? true : false,
          'parentDeptId': '0',
          'sortNo': 0,
          'temporaryFlag': 0
        }
        ssgSaveData(key, data);
      }
      callback(data);
    });
  }

}

/**
 * 可管理组织架构（部门）关键字搜索
 * @param {object} loginUser - 登录用户信息
 * @param {string} keyword - 关键字
 */
export function ajaxSearchEnterprise (loginUser, keyword, callback) {
  LOGINUSER = loginUser;
  let params = {
    enterpriseId: loginUser.enterpriseId,
    userNumber: loginUser.userNumber,
    searchKey: keyword
  };
  // let key = 'stree_' + loginUser.enterpriseId + '_' + loginUser.userNumber + '_' + keyword;
  // let data = '';

  // data = ssgGetData(key);
  // if (data) {
  //   setTimeout(function () {
  //     callback(data);
  //   }, 10);
  // } else {
  //   _this.http.get(URL + '/portal/enterprise/searchEnterpriseList', {params: params}).then(function (successData) {
  //     // callback(successData.body);
  //     data = successData.body;
  //     if (data.msgCode === 200 && data.result) {
  //       let departs = data.result.departmentInfoAppointVo;
  //       let users = data.result.enterpriseBuddyAppointVO;

  //       if (departs.length > 0 || users.length > 0) {
  //         ssgSaveData(key, data);
  //       }
  //     }
  //     callback(data);
  //   });
  // }
  if (!keyword) {
    //请输入搜索内容
  } else {
    _this.http.get(URL + '/portal/enterprise/searchEnterpriseList', {params: params}).then(function (successData) {
      // callback(successData.body);
      let data = successData.body;

      // 查询出来的部门都有可管理权限
      if (data.msgCode === 200 && data.result) {
        let departs = data.result.departmentInfoAppointVo;

        if (departs) {
          for (var i = 0;i < departs.length;i++) {
            departs[i]['manager'] = true;
          }
          data.result.departmentInfoAppointVo = departs;
        }
      }
      callback(data);
    });
  }
}

/**
 * 获取部门成员--用于人员选择器
 * @param {object} loginUser - 登录用户信息
 * @param {number} deptId - 部门ID
 */
export function ajaxDepartMembers (loginUser, deptId, callback) {
  LOGINUSER = loginUser;
  let params = {
    enterpriseId: loginUser.enterpriseId,
    departmentId: deptId,
    operateUserNumber: loginUser.userNumber
  };
  // let key = 'tree_depart_member_' + loginUser.enterpriseId + '_' + deptId;
  // let data = '';

  // data = ssgGetData(key);
  // if (data) {
  //   callback(data);
  // } else {
  //   _this.http.get(URL + '/portal/user/getUsersByDeptId', {params: params}).then(function (successData) {
  //     data = successData.body;
  //     if (data.msgCode === 200 && data.result) {
  //       if (data.result.resultList && data.result.resultList.length > 0) {
  //         ssgSaveData(key, data);
  //       }
  //     }
  //     callback(data);
  //   });
  // }
  _this.http.get(URL + '/portal/user/getUsersByDeptId', {params: params}).then(function (successData) {
    callback(successData.body);
  });
}

/**
 * 获取组织列表
 * @param {object} loginUser - 登录用户信息
 */
export function ajaxGetEnterList (loginUser, callback) {
  LOGINUSER = loginUser;
  let params = {
    userNumber: loginUser.userNumber
  };
  let key = 'port_enters_' + loginUser.userNumber;
  let data = '';

  data = ssgGetData(key);
  if (data) {
    callback(data);
  } else {
    _this.http.get(URL + '/index/enters', {params: params}).then(function (successData) {
      data = successData.body;
      if (data.msgCode === 200 && data.result) {
        if (data.result.length > 0) {
          ssgSaveData(key, data);
        }
      }
      callback(data);
    });
  }
}

/**
 * 查询全员群成员
 * @param {object} loginUser - 登录用户信息
 */
export function ajaxGetEnterGroupMember (loginUser, callback) {
  LOGINUSER = loginUser;
  let params = {
    enterpriseId: loginUser.enterpriseId,
    operatorUserNumber: loginUser.userNumber
  };

  _this.http.get(URL + '/portal/group/getEnterpriseGroupMember', {params: params}).then(function (successData) {
    callback(successData.body);
  });
}

/**
 * 查询部门群成员
 * @param {object} loginUser - 登录用户信息
 * @param {string} deptId - 部门ID
 */
export function ajaxGetDeptGroupMember (loginUser, deptId, callback) {
  LOGINUSER = loginUser;
  let params = {
    enterpriseId: loginUser.enterpriseId,
    operatorUserNumber: loginUser.userNumber,
    deptId: deptId
  };

  _this.http.get(URL + '/portal/group/getDeptGroupMember', {params: params}).then(function (successData) {
    callback(successData.body);
  });
}