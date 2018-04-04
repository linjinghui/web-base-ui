<template>
  <div>
    <button @click='clk()' >show selector-混合</button>
    <button @click='clk2()' >show selector-部门</button>
    <button @click='clk3()' >show selector-人</button>
    <button @click='clk4()' >show selector-群组</button>
    <button @click='clk5()' >show selector-指定范围</button>
    <button @click='clk6()' >show selector-禁用部门（目前只考虑单选情况下禁用）</button>
    <button @click='clk7()' >show selector-指定范围并且只是选择人员</button>
    <button @click='clk8()' >指定部门单选</button>
    <cmp-selector :show='display' :stype='type' :loginUser='loginUser' :inputType="inputType" :callback='callback' @quitselector='funQuitselector' :deptId="deptId" :forbiddenDeptId="forbiddenDeptId"></cmp-selector>
  </div>
</template>

<script>
import {Selector} from '../packages/index.js';
// import {Selector} from '../libs/common.js';

export default {
  name: 'demoSelector',
  data: function () {
    var depts = [{"children":[{}],"deptId":"2","deptName":"Lisa Walker","isLeaf":0,"level":0,"manager":true,"parentDeptId":"1","sortNo":1,"temporaryFlag":0,"show":false},{"children":[{"children":[{"children":[{}],"deptId":"9","deptName":"John Young","isLeaf":0,"level":0,"manager":true,"parentDeptId":"6","sortNo":1,"temporaryFlag":0},{"children":[{}],"deptId":"10","deptName":"Gary Rodriguez","isLeaf":0,"level":0,"manager":true,"parentDeptId":"6","sortNo":2,"temporaryFlag":0}],"deptId":"6","deptName":"Kevin Martinez","isLeaf":0,"level":0,"manager":true,"parentDeptId":"3","sortNo":1,"temporaryFlag":0},{"children":[{}],"deptId":"7","deptName":"Kenneth Lopez","isLeaf":0,"level":0,"manager":true,"parentDeptId":"3","sortNo":2,"temporaryFlag":0},{"children":[{}],"deptId":"8","deptName":"Laura Lee","isLeaf":0,"level":0,"manager":true,"parentDeptId":"3","sortNo":3,"temporaryFlag":0}],"deptId":"3","deptName":"Steven Lewis","isLeaf":0,"level":0,"manager":true,"parentDeptId":"1","sortNo":2,"temporaryFlag":0,"show":false},{"children":[{}],"deptId":"4","deptName":"Jose Martin","isLeaf":0,"level":0,"manager":true,"parentDeptId":"1","sortNo":3,"temporaryFlag":0,"show":false},{"children":[{}],"deptId":"5","deptName":"Thomas Martinez","isLeaf":0,"level":0,"manager":true,"parentDeptId":"1","sortNo":4,"temporaryFlag":0,"show":false}];
    var users = [
      {"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Kenneth Hall","userNumber":1000},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Jennifer Allen","userNumber":1001},
      {"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Sarah Martinez","userNumber":1002},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Frank Garcia","userNumber":1003},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Matthew Young","userNumber":1004},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Richard Gonzalez","userNumber":1005},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Susan Smith","userNumber":1006},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Elizabeth Gonzalez","userNumber":1007},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Kenneth Thompson","userNumber":1008},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Scott Anderson","userNumber":1009},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Brian Wilson","userNumber":1010},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Carol Thompson","userNumber":1011},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Sarah Davis","userNumber":1012},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Cynthia Thompson","userNumber":1013},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Susan Hall","userNumber":1014},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Betty Garcia","userNumber":1015},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Christopher Walker","userNumber":1016},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Kevin Williams","userNumber":1017},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Frank Young","userNumber":1018},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"George Jones","userNumber":1019},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Matthew Martinez","userNumber":1020},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Jason Johnson","userNumber":1021},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"William Garcia","userNumber":1022},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Maria Young","userNumber":1023},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"George Jones","userNumber":1024},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Ronald Lewis","userNumber":1025},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Dorothy Anderson","userNumber":1026},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"David Jones","userNumber":1027},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Maria Harris","userNumber":1028},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Brian Lewis","userNumber":1029},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Helen Garcia","userNumber":1030},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Anthony Anderson","userNumber":1031},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Ronald Taylor","userNumber":1032},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Jennifer Brown","userNumber":1033},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Angela Thompson","userNumber":1034},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Ronald Moore","userNumber":1035},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Barbara Moore","userNumber":1036},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Shirley Jackson","userNumber":1037},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Frank Moore","userNumber":1038},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Helen Jones","userNumber":1039},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Matthew Lewis","userNumber":1040},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Betty Williams","userNumber":1041},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Kenneth Rodriguez","userNumber":1042},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"William Taylor","userNumber":1043},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"John Anderson","userNumber":1044},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Sandra Johnson","userNumber":1045},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Shirley Gonzalez","userNumber":1046},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Robert Moore","userNumber":1047},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Margaret Young","userNumber":1048},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Robert Smith","userNumber":1049},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Timothy Moore","userNumber":1050},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Kimberly Gonzalez","userNumber":1051},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"James Garcia","userNumber":1052},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Paul Robinson","userNumber":1053},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Deborah Lee","userNumber":1054},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Melissa Harris","userNumber":1055},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Kevin Taylor","userNumber":1056},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Amy Hall","userNumber":1057},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"George Harris","userNumber":1058},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Brenda Rodriguez","userNumber":1059},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Paul White","userNumber":1060},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Thomas Martinez","userNumber":1061},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Mary Gonzalez","userNumber":1062},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Amy Johnson","userNumber":1063},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Ronald Miller","userNumber":1064},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Sarah Johnson","userNumber":1065},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Anna Davis","userNumber":1066},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Angela Robinson","userNumber":1067},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Linda Brown","userNumber":1068},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Laura Lee","userNumber":1069},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Amy Young","userNumber":1070},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Barbara Thompson","userNumber":1071},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Donna Gonzalez","userNumber":1072},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Dorothy Thomas","userNumber":1073},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Elizabeth Gonzalez","userNumber":1074},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Brenda Young","userNumber":1075},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Mark Taylor","userNumber":1076},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Mary Walker","userNumber":1077},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Matthew Young","userNumber":1078},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Mark Taylor","userNumber":1079},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Margaret Brown","userNumber":1080},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Anthony Lee","userNumber":1081},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"John Miller","userNumber":1082},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Dorothy Robinson","userNumber":1083},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"David White","userNumber":1084},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Christopher Jones","userNumber":1085},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Jessica Thompson","userNumber":1086},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Laura Clark","userNumber":1087},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Angela Rodriguez","userNumber":1088},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Jose Davis","userNumber":1089},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Angela Thompson","userNumber":1090},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Kenneth White","userNumber":1091},{"avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg","realName":"Jason Rodriguez","userNumber":1092}];

    return {
      display: false,
      forbiddenDeptId: ['692edfdd-197d-3976-5216-f8ec63e5e36c'],
      //  选择器类型 1 全部 2 部门 3 人
      type: 1,
      deptId: '',
      loginUser: {

        'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTaW1iYUVvc1dlYiIsImF1ZCI6ImVudGVyaWNlIiwibmJmIjoxNTIxMDMwMTY1LCJpc3MiOiJzaXdfdmVyaWZ5IiwiZW50ZXJwcmlzZUlkIjoiMjM1NjcwIiwiZXhwIjoxNTIxMDM3MzY1LCJpYXQiOjE1MjEwMzAxNjUsInVzZXJOdW1iZXIiOiI2NjIwODY4OCIsImp0aSI6IjZkZDc2NWY1LTZmYzktNDljNy04MTUwLTIyNDQ0Yzk2YjQwZSJ9.Wjqu0fDmLZQ09UWbH40n5-grq9nC9693c0b-s-Y96nc',
        'enterpriseId': 235784,
        'userNumber': 66208688,
        'superAdmin': 1,
        'enterName': '北京世纪奥通科技'
      },
      depts: [
        {
          "deptId": "3",
          "deptName": "Lisa Walker"
        }
      ],
      users: [
        {
          "avatar": "http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg",
          "realName": "Kenneth White",
          "userNumber": 1000
        },
        {
          "avatar":"http://diy.qqjay.com/u2/2012/0618/ed6982355b1340095aeaf79072bdc1cc.jpg",
          "realName":"Kenneth Hall",
          "userNumber":1031
        }
      ],
      // depts: depts,
      // users: users,
      callback: function (value) {
        console.log(value);
      },
      display2: false,
      type2: 2,
      display3: false,
      type3: 3,
      // true 单选， false 多选
      inputType: false
    };
  },
  components: {
    'cmpSelector': Selector
  },
  mounted: function () {
    // let _this = this;

    // setTimeout(function () {
    //   _this.loginUser = {
    //     'token': '123456',
    //     'enterpriseId': 123456,
    //     'userNumber': 123456,
    //     'avatar': 'http://123.56.206.100/HeadImages/416000/66570070_20160322214805_a.png',
    //     'realName': '郭人和'
    //   }
    // }, 3000);
  },
  methods: {
    clk: function () {
      this.deptId = '';
      this.display = true;
      this.type = 1;
      this.inputType = false;
    },
    clk2: function () {
      this.deptId = '';
      this.display = true;
      this.type = 2;
      this.inputType = false;
    },
    clk3: function () {
      this.deptId = '';
      this.display = true;
      this.type = 3;
      this.inputType = false;
    },
    clk4: function () {
      // 选择全员全人员
      // this.deptId = '';
      // 选择部门群人员
      this.deptId = '4e83ac4546e84971835d286042bc67f7';
      this.display = true;
      this.type = 4;
      this.inputType = false;
    },
    clk5: function () {
      this.deptId = '00574f21-93a3-11e7-8a82-90b11c3e244c';
      this.display = true;
      this.type = 1;
      this.inputType = false;
    },
    clk6: function () {
      this.display = true;
      this.inputType = true;
      this.forbiddenDeptId.push('4e83ac4546e84971835d286042bc67f7');
      this.forbiddenDeptId.push('00574f21-93a3-11e7-8a82-90b11c3e244c');
      this.type = 1;
    },
    clk7: function () {
      this.display = true;
      this.inputType = false;
      this.deptId = 'a00000000ccgt3tn';
      this.type = 5;
    },
    clk8: function () {
      this.display = true;
      this.inputType = true;
      this.deptId = '0';
      this.type = 2;
      this.forbiddenDeptId.push('287544');
    },
    funQuitselector: function () {
      this.display = !this.display;

    }
  }
};
</script>

<style scoped>

</style>