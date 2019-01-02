<template> 
  <div :id="id" class="wrap-qll-editor">
    <cmp-map ref="vmap" v-model="optMap.show" @click="clkMap"></cmp-map>
    <cmp-button class="btn-upfile" style="display:none;" :fileoption="fileOption" @cbk_file="cbk_file">选择文件</cmp-button>
    <quill-editor class="qll-editor" v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" 
    @focus="onEditorFocus($event)" @change="onEditorChange($event)"></quill-editor>
  </div> 
</template> 

<script> 
  import Button from '../../button/index.js';
  import Quill from 'quill';
  import { quillEditor } from 'vue-quill-editor'; 
  import Map from '../../map/index.js';
  
  // 注入图片大小伸缩功能
  window.Quill = Quill;
  Quill.register('modules/imageResize', require('quill-image-resize-module').default);

  // 将自定义字体加入到白名单 
  var Font = Quill.import('formats/font');  
  
  Font.whitelist = ['serif', 'monospace', 'Microsoft-YaHei', 'Sim-Sun', 'Kai-Ti', 'Sim-Hei', 'Li-Shu', 'Andale-Mono', 'Arial', 'Arial-Black', 'Comic-Sons-Ms', 'Impact', 'Times-New-Roman', 'Sans-Serif'];
  Quill.register(Font, true);

  export default { 
    components: { 
      quillEditor,
      'cmpButton': Button,
      'cmpMap': Map
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
            // 标题 
            [{ color: [] }, { background: [] }], 
            // 字体颜色、字体背景颜色 
            // [{ font: ['serif', 'monospace'] }], 
            [{ font: ['Microsoft-YaHei', 'Sim-Sun', 'Kai-Ti', 'Sim-Hei', 'Li-Shu', 'Andale-Mono', 'Arial', 'Arial-Black', 'Comic-Sons-Ms', 'Impact', 'Times-New-Roman', 'Sans-Serif'] }], 
            // 文本方向 
            [{ size: ['small', false, 'large', 'huge'] }], 
            // 字体大小 
            [{ header: [1, 2, 3, 4, 5, 6, false] }], 
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
            // 字体种类 
            [{ align: [] }], 
            // 对齐方式 
            ['clean'], 
            // 清除文本格式 
            ['link', 'image', 'video'],
            // 链接、图片、视频 
            ['position']
          ];
        }
      }
    }, 
    data () {
      var _this = this;

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
                },
                position: function (value) {
                  _this.optMap.show = true;
                  _this.insertPositionMessage({
                    text: '福州市鼓楼区五四路310号省体育中心西二5楼',
                    longitude: '1',
                    latitude: '2'
                  });
                }
              } 
            } 
          } 
        }, 
        fileOption: {
          accept: 'image/*',
          // 'image/gif, image/jpeg',
          multiple: false
        },
        optMap: {
          show: ''
        }
      }; 
    }, 
    watch: {
      value: function (val) {
        this.content = val;
      }
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.resize);
    },
    mounted: function () {
      this.resize();
      this.addBtnTitle();
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
      onEditorChange (data) { 
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
      },
      addBtnTitle: function () {
        var titleConfig = {
          'ql-bold': '加粗',
          'ql-color': '字体颜色',
          'ql-font': '字体',
          'ql-code': '插入代码',
          'ql-italic': '斜体',
          'ql-link': '添加链接',
          'ql-background': '背景颜色',
          'ql-size': '字体大小',
          'ql-strike': '删除线',
          'ql-script[value="super"]': '上标',
          'ql-script[value="sub"]': '下标',
          'ql-underline': '下划线',
          'ql-blockquote': '引用',
          'ql-header': '标题',
          'ql-header[value="1"]': '标题1',
          'ql-header[value="2"]': '标题2',
          'ql-indent[value="-1"]': '向左缩进',
          'ql-indent[value="+1"]': '向右缩进',
          'ql-list[value="ordered"]': '有序列表',
          'ql-list[value="bullet"]': '无序列表',
          'ql-align': '文本对齐',
          'ql-direction': '文本方向',
          'ql-code-block': '代码块',
          'ql-formula': '公式',
          'ql-image': '图片',
          'ql-video': '视频',
          'ql-clean': '清除字体样式',
          'ql-position': '位置'
        };

        for (let key in titleConfig) { 
          let frag = document.querySelector('.quill-editor .' + key);

          if (!frag) continue;
          frag.setAttribute('title', titleConfig[key]);
        }
      },
      // 插入位置信息
      insertPositionMessage: function (param) { 
        // 获取富文本组件实例 
        let quill = this.$refs.myQuillEditor.quill; 
        // 获取光标所在位置 
        let length = quill.getSelection().index; 
        
        // 插入位置节点
        quill.insertEmbed(length, 'image', 'map');
        // 获取插入的位置信息节点
        var dom = quill.container.querySelector('img[src="map"]');
        var posDom = document.createElement('em');

        posDom.setAttribute('class', 'ql-position-content');
        posDom.innerHTML = ' ';
        posDom.setAttribute('data-position-text', param.text);
        posDom.setAttribute('data-position-longitude', param.longitude);
        posDom.setAttribute('data-position-latitude', param.latitude);
        dom.parentNode.replaceChild(posDom, dom);
        
        // 插入空字符串用以触发change
        quill.insertText(length + param.text.length + 1, '');
        // 调整光标到最后 
        quill.setSelection(length + param.text.length + 1); 
      },
      clkMap: function (data) {
        // 
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

    .ql-toolbar,
    .ql-container,
    pre {
      font-family: 微软雅黑, 'Microsoft YaHei';
    }

    .ql-toolbar {
      > .ql-formats {
        position: relative;
      }

      > .ql-formats:after {
        content: '';
        position: absolute;
        right: -7px;
        top: 0;
        left: auto;
        bottom: 0;
        margin: auto;
        width: 1px;
        height: 14px;
        background-color: #ccc;
      }

      .ql-color .ql-color-label {
        stroke: #ff0000;
        opacity: 1;
      }
      .ql-background .ql-color-label {
        stroke: #549fe6;
      }
    }

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
      content: '正文'; 
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

    // ---------------自定义字体v----------------------
    // 微软雅黑
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Microsoft-YaHei]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Microsoft-YaHei]::before { 
      content: '微软雅黑'; 
    }  
    .ql-font-Microsoft-YaHei {
      font-family: 微软雅黑, 'Microsoft YaHei';
    }
    // 宋体
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Sim-Sun]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Sim-Sun]::before { 
      content: '宋体'; 
    } 
    .ql-font-Sim-Sun {
      font-family: 宋体, SimSun;
    }
    // 楷体
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Kai-Ti]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Kai-Ti]::before { 
      content: '楷体'; 
    } 
    .ql-font-Kai-Ti {
      font-family: 楷体, 楷体_GB2312, SimKai;
    }
    // 黑体
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Sim-Hei]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Sim-Hei]::before { 
      content: '黑体'; 
    } 
    .ql-font-Sim-Hei {
      font-family: 黑体, SimHei;
    }
    // 隶书
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Li-Shu]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Li-Shu]::before { 
      content: '隶书'; 
    } 
    .ql-font-Li-Shu {
      font-family: 隶书, SimLi;
    }
    // andale mono
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Andale-Mono]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Andale-Mono]::before { 
      content: 'andale mono'; 
    } 
    .ql-font-Andale-Mono {
      font-family: 'andale mono';
    }
    // arial
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Arial]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Arial]::before { 
      content: 'arial'; 
    } 
    .ql-font-Arial {
      font-family: arial, helvetica, sans-serif;
    }
    // arial black
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Arial-Black]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Arial-Black]::before { 
      content: 'arial black'; 
    } 
    .ql-font-Arial-Black {
      font-family: 'arial black', 'avant garde';
    }
    // comic sons ms
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Comic-Sons-Ms]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Comic-Sons-Ms]::before { 
      content: 'comic sons'; 
    } 
    .ql-font-Comic-Sons-Ms {
      font-family: 'comic sans ms';
    }
    // impact
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Impact]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Impact]::before { 
      content: 'impact'; 
    } 
    .ql-font-Impact {
      font-family: impact, chicago;
    }
    // times new roman
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Times-New-Roman]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Times-New-Roman]::before { 
      content: 'times roman'; 
    } 
    .ql-font-Times-New-Roman {
      font-family: 'times new roman';
    }
    // sans-serif
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=Sans-Serif]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=Sans-Serif]::before { 
      content: 'sans-serif'; 
    } 
    .ql-font-Sans-Serif {
      font-family: sans-serif;
    }
    // ---------------自定义字体∧----------------------

    // ---------------自定义位置 按钮v----------------------
    .ql-position {
      background-image: url(../images/icon_gps.png)!important;
      background-position: center 0!important;
      background-repeat: no-repeat!important;
      background-size: contain!important;
    }
    .ql-position-content {
      position: relative;
      font-style: normal;
      background-image: url(../images/gps.png);
      background-position: 0 0;
      background-repeat: no-repeat;
      background-size: contain;
    }
    .ql-position-content.ql-size-huge {
      padding-left: 40px;
    }
    .ql-position-content:before {
      content: attr(data-position-text);
      margin-left: 16px;
    }
    .ql-position-content.ql-size-large:before {
      margin-left: 22px;
    }
    .ql-position-content.ql-size-huge:before {
      margin-left: 6px;
    }
    h1 {
      .ql-position-content:before {
        margin-left: 34px;
      }
      .ql-position-content.ql-size-huge:before {
        margin-left: 50px;
      }
      .ql-position-content.ql-size-large:before {
        margin-left: 44px;
      }
    }
    h2 {
      .ql-position-content:before {
        margin-left: 24px;
      }      
      .ql-position-content.ql-size-large:before {
        margin-left: 34px;
      }
    }
    
    // ---------------自定义位置 按钮∧----------------------
  } 
    
</style>
