<!-- 
功能介绍：
 -->

<template>
  <div :id="id" contenteditable="true" class="wrap-divEditor" :maxlength="maxlength" :placeholder="placeholder" @input="aipt($event)"></div>
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
        default: '请输入内容'
      },
      maxlength: {
        default: 20
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
      // @keydown="enterkey"
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
      },
      aipt: function (event) {
        let tar = event.target;
        let len = tar.getAttribute('maxlength');
        let val = tar.innerText;
        
        if (val.length > len) {
          tar.innerText = val.slice(0, len); 
          window.getSelection().removeAllRanges();
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
    min-height: 100px;
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