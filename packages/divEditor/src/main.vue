<!-- 
功能介绍：
 -->

<template>
  <div :id="id" contenteditable="true" class="wrap-divEditor" :placeholder="placeholder" @keydown="enterkey"></div>
</template>

<script type="text/babel">
  export default {
    name: 'DivEditor',
    data: function () {
      return {
        id: 'divEditor_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {
      placeholder: {
        default: '可以在任意文字后面插入图片或者文字哦！'
      }
    },
    watch: {
      // 
    },
    computed: {
      // 
    },
    beforeDestroy: function () {
      // 
    },
    mounted: function () {
      // 
    },
    methods: {
      enterkey: function (e) { 
        e = e || window.event;
        var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        
        if (keyCode === 13 || keyCode === 32) { 
          // 取消此事件的默认操作 
          e.returnValue = false;
          if (document.selection && document.selection.createRange) {
            var myRange = document.selection.createRange();
    
            myRange.pasteHTML('<br />');
          } else if (window.getSelection) {
            // var selection = window.getSelection();
            var range = window.getSelection().getRangeAt(0);

            range.deleteContents();
            var newP = document.createElement('br');

            range.insertNode(newP);
            range.collapse(false);
          }
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .wrap-divEditor {
    position: relative;
    padding: 5px;
    width: 100%;
    min-height: 300px;
    border-style: solid;
    border-width: 1px;
    border-color: #ddd;
    outline: none;
    color: inherit;
    font-size: inherit;
  }

  .wrap-divEditor:focus {
    border-color: var(--theme);
  }
</style>