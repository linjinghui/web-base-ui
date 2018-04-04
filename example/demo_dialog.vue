<template>
  <div>
    <button @click="showDialog">show dialog</button><br>
    <button @click="showContact">show contact</button><br>
    <button @click="showAlert">show alert</button><br>
    <button @click="showConfirm">show Confirm</button><br>
    <cmp-dialog :eventName="eventName" :display="display" :title="'请填写标题'" :buttons="buttons" v-on:callback="callback">
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p><p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
      <p>asdlaskdlasdjksadjsakdsdasds</p>
    </cmp-dialog>
    <cmp-contact :eventName="eventNameContact" :display="displayContact" @callback="callbackContact"></cmp-contact>
    <cmp-alert :eventName="eventNameAlert" :display="displayAlert" :title="titleAlert" :subTitle="subTitleAlert" :btnText="btnTextAlert" :btnFlag="btnFlagAlert" :theme="themeAlert" v-on:callback="callbackAlert"></cmp-alert>
    <cmp-confirm :eventName="eventNameConfirm" :display="displayConfirm" :title="titleConfirm" :subTitle="subTitleConfirm" :theme="themeConfirm" :buttons="buttonsConfirm" @callback="callbackConfirm"></cmp-confirm>
  </div>
</template>

<script>
  import {Dialog, Contact, Alert, Confirm} from '../packages/index.js';

  export default {
    name: 'demoDialog',
    components: {
      'cmpDialog': Dialog,
      'cmpContact': Contact,
      'cmpAlert': Alert,
      'cmpConfirm': Confirm
    },
    data: function () {
      return {
        display: '',
        eventName: 'dialog1',
        // 'line', 'cancel', 'del', 'del2', 'success', 'warn', 'fresh'
        buttons: [
          {
            'theme': 'cancel',
            'text': '取消a123'
          },
          {
            'theme': 'def',
            'text': '确认a3123'
          },
          {
            'theme': 'del',
            'text': '确认a3123'
          }
        ],
        displayContact: '',
        eventNameContact: 'dialog2',
        displayAlert: '',
        eventNameAlert: 'dialog3',
        titleAlert: '警告1',
        subTitleAlert: '确认警告123',
        btnTextAlert: '确认1',
        btnFlagAlert: 'abc',
        themeAlert: 'del',
        displayConfirm: '',
        eventNameConfirm: 'dialog4',
        titleConfirm: '上传数据完成',
        subTitleConfirm: '该窗口关闭后，可以通过导出/导入查看处理进度.',
        themeConfirm: 'success',
        buttonsConfirm: [
          {
            'theme': 'cancel',
            'text': '关闭'
          },
          {
            'theme': 'def',
            'text': '查看处理结果'
          }
        ]
      };
    },
    methods: {
      showDialog: function () {
        // window.EVENTBUS.$emit(this.eventName, {'display': true});
        this.display = true;
      },
      callback: function (data) {
        console.log('callback:' + JSON.stringify(data.btnInfo));
        // window.EVENTBUS.$emit(this.eventName, {'display': false});
        this.display = false;
      },
      showContact: function () {
        // window.EVENTBUS.$emit(this.eventNameContact, {'display': true});
        this.displayContact = true;
      },
      callbackContact: function (data) {
        console.log('callbackContact:' + JSON.stringify(data));
        // window.EVENTBUS.$emit(this.eventNameContact, {'display': false});
        this.displayContact = false;
      },
      // <cmp-alert :eventName="eventNameAlert" :display="displayAlert" :title="titleAlert" :subTitle="subTitleAlert" :btnText="btnTextAlert" :theme="themeAlert" v-on:callback="callbackAlert"></cmp-alert>
      showAlert: function () {
        // window.EVENTBUS.$emit(this.eventNameAlert, {'display': true});
        this.displayAlert = true;
      },
      callbackAlert: function (data) {
        console.log('callbackAlert:' + JSON.stringify(data));
        // window.EVENTBUS.$emit(this.eventNameAlert, {'display': false});
        this.displayAlert = false;
        this.btnFlagAlert = new Date().getTime() + '';
      },
      showConfirm: function () {
        // window.EVENTBUS.$emit(this.eventNameConfirm, {'display': true});
        this.displayConfirm = true;
      },
      callbackConfirm: function (data) {
        console.log('callbackConfirm:' + JSON.stringify(data));
        // window.EVENTBUS.$emit(this.eventNameConfirm, {'display': false});
        this.displayConfirm = false;
      }
    }
  };
</script>

<style scoped>

</style>