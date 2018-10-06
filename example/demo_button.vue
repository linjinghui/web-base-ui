<template>
  <div>
    <!-- 带图标内容 -->
    <!-- theme: primary|success|info|warning|danger|line|#333 - 按钮背景主题，也可以自定义 -->
    <!-- disabled: true|false - 是否禁用按钮 -->
    <cmp-button theme="line" disabled="false" @click="clk">
      <i class="cicon-arrow-bottom" style="font-size: 20px;"></i> 自定义背景色
    </cmp-button>
    <hr style="margin: 10px 0;">
    <!-- 纯文本 -->
    <cmp-button theme="danger" disabled="false" @click="clk">你好世界</cmp-button>
    <hr style="margin: 10px 0;">
    <!-- 复制到剪贴板 @click无效 -->
    <cmp-button theme="warning" disabled="false" copydata="啦啦啦" @cbk_copy="cbk_copy">复制到剪贴板</cmp-button>
    <hr style="margin: 10px 0;">
    <!-- 选择文件 @click无效 -->
    <cmp-button theme="info" disabled="false" :fileoption="fileOption" @cbk_file="cbk_file">选择文件</cmp-button>
    <hr style="margin: 10px 0;">
    <!-- 点击后失效 -->
    <cmp-button style="width: 100px;height: 34px;" theme="primary" disabled="false" v-model="second" @click="clk_send">点击发送</cmp-button>
    <hr style="margin: 10px 0;">
    <!-- 打印按钮 -->
    <cmp-button theme="line" prnt="#prtdiag>section">点击打印</cmp-button>
    <div id="tbl">
      <table style="table-layout:fixed;border-collapse:collapse;width:100%;">
        <thead style="font-weight:bold;">
          <tr>
            <td style="border: solid 1px;">班级</td>
            <td style="border: solid 1px;">学生姓名</td>
            <td style="border: solid 1px;">性别</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 10">
            <td style="border: solid 1px;">班级{{n}}</td>
            <td style="border: solid 1px;">学生姓名{{n}}</td>
            <td style="border: solid 1px;">性别{{n}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <cmp-dialog id="prtdiag" v-model="optionDialog.show" v-bind="optionDialog" @callback="callbackDialog">
      <span slot="title">{{optionDialog.heading}}</span>
      <div slot="content">
        <table style="table-layout:fixed;border-collapse:collapse;width:100%;text-align:center;word-wrap:break-word;word-break:break-all;">
          <tr><td style="padding: 5px 0;font-size: 16px;color: #000;border: solid 1px #ccc" colspan="8">福建省农产品质量安全追溯信息<br>（种植类产品）</td></tr>
          <tr><td style="padding: 5px 0;width: 20%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2">主体名称</td><td style="padding: 5px 0;border: solid 1px #ccc" colspan="6">{{dialogDataInfo.entInfo.entName}}</td></tr>
          <tr><td style="padding: 5px 0;width: 20%;font-weight: bold;color: #000;;border: solid 1px #ccc" colspan="2">主体代码</td><td style="padding: 5px 0;border: solid 1px #ccc" colspan="6">{{dialogDataInfo.entInfo.entUnicode}}</td></tr>
          <tr><td style="padding: 5px 0;width: 20%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2">经营场所</td><td style="padding: 5px 0;border: solid 1px #ccc" colspan="6">{{dialogDataInfo.entInfo.busiPlace}}</td></tr>
          <tr><td style="padding: 5px 0;width: 20%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2">主体性质</td><td style="padding: 5px 0;border: solid 1px #ccc" colspan="6">{{dialogDataInfo.entInfo.entProperty}}</td></tr>
          <tr><td style="padding: 5px 0;width: 20%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2">负责人姓名</td><td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{dialogDataInfo.entInfo.principalName}}</td><td style="padding: 5px 0;width: 20%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2">负责人手机</td><td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{dialogDataInfo.entInfo.principalMobile}}</td></tr>
          <tr><td style="padding: 5px 0;width: 20%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2">电子邮箱</td><td style="padding: 5px 0;border: solid 1px #ccc" colspan="6">{{dialogDataInfo.entInfo.principalEmail}}</td></tr>
        </table>
        <table style="margin:20px 0 10px 0;table-layout:fixed;border-collapse:collapse;width:100%;text-align:center;word-wrap:break-word;word-break:break-all;">
          <tr><td style="padding: 5px 0;width: 20%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2">产业类型</td><td style="padding: 5px 0;border: solid 1px #ccc" colspan="6">{{dialogDataInfo.doc.industryType}}</td></tr>
          <tr><td style="padding: 5px 0;width: 20%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2">产品名称</td><td style="padding: 5px 0;width: 30%;border: solid 1px #ccc" colspan="2">{{dialogDataInfo.doc.productName}}</td><td style="padding: 5px 0;width: 20%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2">生产基地</td><td style="padding: 5px 0;width: 30%;border: solid 1px #ccc" colspan="2">{{dialogDataInfo.doc.placeName}}</td></tr>
          <tr><td style="padding: 5px 0;width: 20%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2">起种日期</td><td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{dialogDataInfo.doc.beginDate}}</td><td style="padding: 5px 0;width: 20%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2">种植面积</td><td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{dialogDataInfo.doc.scaleNum}}{{dialogDataInfo.doc.scaleUnit}}</td></tr>
          <tr><td style="padding: 5px 0;width: 20%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2" rowspan="2">产品认证</td><td style="padding: 5px 0;border: solid 1px #ccc" colspan="6">{{dialogDataInfo.cert.certType}}</td></tr>
          <tr><td style="padding: 5px 0;font-weight: bold;color: #000;width: 15%;border: solid 1px #ccc" class="lab">发证日期</td><td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{dialogDataInfo.cert.certIssueDate}}</td><td style="padding: 5px 0;width: 15%;font-weight: bold;color: #000;border: solid 1px #ccc" class="lab">有效期至</td><td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{dialogDataInfo.cert.certValidEndDate}}</td></tr>
          <tr>
            <td style="padding: 5px 0;width:8%;font-weight: bold;color: #000;border: solid 1px #ccc" :rowspan="1+dialogDataInfo.feeds.length" class="lab">施<br>肥</td>
            <td style="padding: 5px 0;width: 26.7%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2" class="lab">肥料名称</td>
            <td style="padding: 5px 0;width: 20%;font-weight: bold;color: #000;border: solid 1px #ccc" class="lab">施肥数量</td>
            <td style="padding: 5px 0;width: 24%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2" class="lab">施肥方式</td>
            <td style="padding: 5px 0;width: 24%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2" class="lab">施肥日期</td>
          </tr>
          <tr v-for="(item,index) in dialogDataInfo.feeds" :key="'fed_'+index">
            <td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{item.materialInfo}}</td>
            <td>{{item.feedNum}}</td>
            <td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{item.feedType}}</td>
            <td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{item.feedStartDate}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;width:8%;font-weight: bold;color: #000;border: solid 1px #ccc" :rowspan="1+dialogDataInfo.drugs.length" class="lab">农<br>药</td>
            <td style="padding: 5px 0;width: 26.7%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2" class="lab">农药名称</td>
            <td style="padding: 5px 0;width: 20%;font-weight: bold;color: #000;border: solid 1px #ccc" class="lab">用药数量</td>
            <td style="padding: 5px 0;width: 24%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2" class="lab">用药方式</td>
            <td style="padding: 5px 0;width: 24%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2" class="lab">用药日期</td>
          </tr>
          <tr v-for="(item,index) in dialogDataInfo.drugs" :key="'drug_'+index">
            <td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{item.drugName}}</td>
            <td>{{item.mediNum}}{{item.mediUnit}}</td>
            <td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{item.useType}}</td>
            <td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{item.useDate}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;width:8%;font-weight: bold;color: #000;border: solid 1px #ccc" :rowspan="1+dialogDataInfo.works.length" class="lab">其<br>他<br>农<br>事<br>活<br>动</td>
            <td style="padding: 5px 0;width:26.7%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2" class="lab">农事活动</td>
            <td style="padding: 5px 0;width:41%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="3" class="lab">活动内容</td>
            <td style="padding: 5px 0;width:24%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2" class="lab">活动日期</td>
          </tr>
          <tr v-for="(item,index) in dialogDataInfo.works" :key="'work_'+index">
            <td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{item.workTitle}}</td>
            <td style="padding: 5px 0;border: solid 1px #ccc" colspan="3">{{item.workDescription}}</td>
            <td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{item.workDate}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;width:8%;font-weight: bold;color: #000;border: solid 1px #ccc" :rowspan="1+dialogDataInfo.checks.length" class="lab">质<br>保</td>
            <td style="padding: 5px 0;width:68%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="5" class="lab">质保方式</td>
            <td style="padding: 5px 0;width:24%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2" class="lab">质保日期</td>
          </tr>
          <tr v-for="(item,index) in dialogDataInfo.checks" :key="'check_'+index">
            <td style="padding: 5px 0;border: solid 1px #ccc" colspan="5">xxx</td>
            <td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">xxx</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;width:8%;font-weight: bold;color: #000;border: solid 1px #ccc" :rowspan="1+dialogDataInfo.harvests.length" class="lab">收<br>货</td>
            <td style="padding: 5px 0;width:68%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="5" class="lab">收货数量</td>
            <td style="padding: 5px 0;width:24%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2" class="lab">收货日期</td>
          </tr>
          <tr v-for="(item,index) in dialogDataInfo.harvests" :key="'hvt_'+index">
            <td style="padding: 5px 0;border: solid 1px #ccc" colspan="5">{{item.harvNum}}</td>
            <td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{item.harvDate}}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;width:8%;font-weight: bold;color: #000;border: solid 1px #ccc" :rowspan="1+dialogDataInfo.makes.length" class="lab">初<br>加<br>工</td>
            <td style="padding: 5px 0;width:26.7%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2" class="lab">工序名称</td>
            <td style="padding: 5px 0;width:41%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="3" class="lab">产出数量</td>
            <td style="padding: 5px 0;width:24%;font-weight: bold;color: #000;border: solid 1px #ccc" colspan="2" class="lab">操作日期</td>
          </tr>
          <tr v-for="(item,index) in dialogDataInfo.makes" :key="'mark_'+index">
            <td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{item.makeTitle}}</td>
            <td style="padding: 5px 0;border: solid 1px #ccc" colspan="3">{{item.produceNum}}{{item.unit}}</td>
            <td style="padding: 5px 0;border: solid 1px #ccc" colspan="2">{{item.harvDate}}</td>
          </tr>
        </table>
        <p style="color:red;font-size:12px;">注：以上信息由生产主体按生产记录诚信档案内容录入上传，主体对信息真实性负责。</p>
      </div>
    </cmp-dialog>
  </div>
</template>

<script>
import {Button, Dialog} from '../packages/index.js';

export default {
  name: 'demoButton',
  data: function () {
    return {
      fileOption: {
        // accept: 'image/gif, image/jpeg',
        multiple: true
      },
      second: 0,
      optionDialog: {
        heading: '产品溯源信息',
        show: false,
        modal: false,
        stl: {},
        buttons: [{text: '取消', theme: 'line'}, {text: '打印', theme: 'primise', prnt: '#prtdiag>section'}]
      },
      dialogDataInfo: {
        entInfo: {},
        doc: {},
        cert: {},
        feeds: [],
        drugs: [],
        works: [],
        checks: [],
        harvests: [],
        makes: []
      }
    };
  },
  components: {
    'cmpButton': Button,
    'cmpDialog': Dialog
  },
  mounted: function () {
    this.$nextTick(function () {
      this.optionDialog.show = true;
    });
  },
  methods: {
    clk: function () {
      alert('click');
    },
    // 复制到剪贴板操作回调
    cbk_copy: function (data) {
      alert(JSON.stringify(data));
    },
    // 选择文件后回调
    cbk_file: function (data) {
      console.log(data);
      // 上传表单
      // let formData = new FormData();

      // formData.append('name', this.name);
      // formData.append('age', this.age);
      // formData.append('file', this.file);

      // let config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }

      // this.$http.post('/upload', formData, config).then(function (res) {
      //   if (res.status === 2000) {
      //     /*这里做处理*/
      //   }
      // })
    },
    // 计时器回调
    clk_send: function () {
      let _this = this;

      setTimeout(function () {
        _this.second = 10;
      }, 500)
    },
    callbackDialog: function () {
      this.optionDialog = false;
    }
  }
};
</script>

<style lang="scss">
  /* @import url("../static/prnt/css.css") prnt; */
  /* @media prnt {
    .content {
      background-color: red;
    }
  } */
  #prtdiag {
    width: 600px;
    height: 650px;
    >section {
      padding: 0 20px;
    }
  }
  
</style>