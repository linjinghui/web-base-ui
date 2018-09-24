<template> 
  <div :id="id" class="wrap-qll-editor">
    <cmp-button class="btn-upfile" style="display:none;" :fileoption="fileOption" @cbk_file="cbk_file">选择文件</cmp-button>
    <quill-editor class="qll-editor" v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" 
    @focus="onEditorFocus($event)" @change="onEditorChange($event)"></quill-editor>
  </div> 
</template> 

<script> 
  import Button from '../../button/index.js';
  import { quillEditor } from 'vue-quill-editor'; 
  // quill图片可拖拽改变大小
  import ImageResize from 'quill-image-resize-module';

  window.Quill.register('modules/imageResize', ImageResize);

  export default { 
    components: { 
      quillEditor,
      'cmpButton': Button
    }, 
    props: { 
      // 编辑器的内容 
      value: { 
        type: String 
      },
      placeholder: {  
        default: '您想说点什么？'
      },
      // 这里写你要上传图片方法
      upImage: { 
        type: Function, 
        default: function () { 
          // 
        }
      },
      // 工具栏配置
      toolbar: {
        type: Array,
        default: function () {
          return [ 
            ['bold', 'italic', 'underline', 'strike'], 
            // 加粗 斜体 下划线 删除线
            ['blockquote', 'code-block'], 
            // 引用 代码块 
            [{ header: 1 }, { header: 2 }], 
            // 1、2 级标题 
            [{ list: 'ordered' }, { list: 'bullet' }], 
            // 有序、无序列表 
            [{ script: 'sub' }, { script: 'super' }], 
            // 上标/下标 
            [{ indent: '-1' }, { indent: '+1' }], 
            // 缩进
            // [{'direction': 'rtl'}], 
            // 文本方向 
            [{ size: ['small', false, 'large', 'huge'] }], 
            // 字体大小 
            [{ header: [1, 2, 3, 4, 5, 6, false] }], 
            // 标题 
            [{ color: [] }, { background: [] }], 
            // 字体颜色、字体背景颜色 
            [{ font: [] }], 
            // 字体种类 
            [{ align: [] }], 
            // 对齐方式 
            ['clean'], 
            // 清除文本格式 
            ['link', 'image', 'video'] 
            // 链接、图片、视频 
          ];
        }
      }
    }, 
    data () {
      return { 
        id: 'editor_' + new Date().getTime() + parseInt(Math.random() * 100),
        content: this.value, 
        quillUpdateImg: false, 
        // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示 
        editorOption: { 
          theme: 'snow', 
          // or 'bubble' 
          placeholder: this.placeholder, 
          modules: { 
            imageResize: {},
            toolbar: { 
              container: this.toolbar, 
              // container: '#toolbar', 
              handlers: { 
                image: function (value) {
                  if (value) { 
                    // 触发input框选择图片文件 
                    document.querySelector('.btn-upfile input').click(); 
                  } else {
                    this.quill.format('image', false); 
                  } 
                }
                // ,link: function (value) { 
                //   if (value) { 
                //     var href = prompt('请输入url');

                //     this.quill.format('link', href); 
                //   } else { 
                //     this.quill.format('link', false); 
                //   } 
                // } 
              } 
            } 
          } 
        }, 
        fileOption: {
          accept: 'image/*',
          // 'image/gif, image/jpeg',
          multiple: false
        }
      }; 
    }, 
    watch: {
      // 
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.resize);
    },
    mounted: function () {
      this.resize();
      window.addEventListener('resize', this.resize);
    },
    methods: { 
      onEditorBlur () { 
        // 失去焦点事件 
        this.$emit('blur');
      }, 
      onEditorFocus () { 
        // 获得焦点事件 
        this.$emit('focus');
      }, 
      onEditorChange () { 
        // 内容改变事件 
        this.$emit('input', this.content); 
      }, 
      // 选择文件后回调
      cbk_file: function (data) {
        var _this = this;
        
        this.beforeUpload();
        this.upImage(data, function (result) {
          if (result.code === 200) {
            _this.uploadSuccess({ code: 200, url: result.url });
          } else {
            _this.uploadError();
          }
        });
      },
      // 富文本图片上传前 
      beforeUpload () {
        // 显示loading动画 
        this.quillUpdateImg = true; 
      }, 
      uploadSuccess (res, file) { 
        // res为图片服务器返回的数据 
        // 获取富文本组件实例 
        let quill = this.$refs.myQuillEditor.quill; 
        
        // 如果上传成功 
        if (res.code === 200) { 
          // 获取光标所在位置 
          let length = quill.getSelection().index; 
          
          // 插入图片 res.url为服务器返回的图片地址 
          quill.insertEmbed(length, 'image', res.url); 
          // 调整光标到最后 
          quill.setSelection(length + 1); 
        } else { 
          this.$message.error('图片插入失败'); 
        } 
        // loading动画消失 
        this.quillUpdateImg = false; 
      }, 
      // 富文本图片上传失败 
      uploadError () { 
        // loading动画消失 
        this.quillUpdateImg = false; 
      },
      resize: function () {
        var domWrap = document.getElementById(this.id);
        var domToolbar = domWrap.querySelector('.ql-toolbar');
        
        domWrap.style.height = 'calc(100% - ' + domToolbar.offsetHeight + 'px)';
      }
    } 
  }; 
</script> 

<style lang="scss"> 
  @import "../../../node_modules/quill/dist/quill.core.css";
  @import "../../../node_modules/quill/dist/quill.snow.css";
  @import "../../../node_modules/quill/dist/quill.bubble.css";
  
  .wrap-qll-editor {
    position: relative;
    width: 100%;
  }
  .qll-editor { 
    line-height: normal !important; 
    height: 100%;

    .ql-snow .ql-tooltip[data-mode=link]::before { 
      content: "请输入链接地址:"; 
    } 
    .ql-snow .ql-tooltip.ql-editing a.ql-action::after { 
      border-right: 0px; 
      content: '保存'; 
      padding-right: 0px; 
    } 
    .ql-snow .ql-tooltip[data-mode=video]::before { 
      content: "请输入视频地址:"; 
    } 
    .ql-snow .ql-picker.ql-size .ql-picker-label::before, .ql-snow .ql-picker.ql-size .ql-picker-item::before { 
      content: '14px'; 
    } 
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before { 
      content: '10px'; 
    } 
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before { 
      content: '18px'; 
    } 
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
      content: '32px'; 
    } 
    .ql-snow .ql-picker.ql-header .ql-picker-label::before, .ql-snow .ql-picker.ql-header .ql-picker-item::before { 
      content: '文本'; 
    } 
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before { 
      content: '标题1'; 
    } 
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before { 
      content: '标题2'; 
    } 
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before { 
      content: '标题3'; 
    } 
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before { 
      content: '标题4'; 
    } 
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before { 
      content: '标题5'; 
    } 
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before { 
      content: '标题6'; 
    } 
    .ql-snow .ql-picker.ql-font .ql-picker-label::before, .ql-snow .ql-picker.ql-font .ql-picker-item::before { 
      content: '标准字体'; 
    } 
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before { 
      content: '衬线字体'; 
    } 
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before { 
      content: '等宽字体'; 
    }  
  } 
    
</style>
