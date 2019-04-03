<!--
功能介绍：
1、
 -->

<template>
  <vperfect-scrollbar class="scroll-area vtree" :settings="settings">
    <div id="tree"></div>
  </vperfect-scrollbar>
</template>

<script type="text/babel">
  import $ from 'jquery';
  import 'jstree';
  import VuePerfectScrollbar from 'vue-perfect-scrollbar';

  export default {
    name: 'Tree',
    components: {
      'vperfect-scrollbar': VuePerfectScrollbar
    },
    data: function () {
      return {
        // 滚动条插件
        settings: {
          wheelSpeed: 0.5
        },
        pactiveId: ''
      };
    },
    props: {
      // 树结构数据
      treeData: {
        default: function () {
          return {};
        }
      },
      activeId: '',
      autoActiveRoot: {
        type: Boolean,
        default: false
      },
      isWholerow: {
        type: Boolean,
        default: true
      },
      isCheckBox: {
        type: Boolean,
        default: false
      },
      checkBoxOption: {
        default: function () {
          return {};
        }
      },
      // 是否返回半选中的节点
      undetermined: {
        default: false
      }
    },
    watch: {
      treeData: function (val, val2) {
        if (val2 && val.length === 0) {
          this.destroyJstree();
        }
        if (val) {
          // 设置默认点开根节点
          this.autoActiveRoot && (val[0]['state'] = { 'opened': true });
          // 初始化树
          this.initJstree(val);
        }
      },
      activeId: function (val) {
        this.pactiveId = val;
        this.selectItem(val);
      }
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
      getTreeDom: function () {
        return $('#tree');
      },
      initJstree: function (data) {
        let _this = this;

        if (data) {
          let plugins = [];

          if (this.isWholerow) {
            plugins[plugins.length] = 'wholerow';
          }
          if (this.isCheckBox) {
            plugins[plugins.length] = 'checkbox';
          }
          this.getTreeDom().jstree({
            'core': {
              'data': data,
              'themes': {
                'icons': false,
                'dots': false
              }
            },
            'plugins': plugins,
            'checkbox': this.checkBoxOption
          });

          this.getTreeDom().on('ready.jstree', function (e, data) {
            // 判断是否选中根节点, 还是指定节点
            if (_this.pactiveId) {
              _this.selectItem(_this.pactiveId);
            }
            // 移除所有超链接的href属性
            _this.removeAHref();
          });

          this.getTreeDom().on('after_open.jstree', function (e, data) {
            // 移除所有超链接的href属性
            _this.removeAHref();
          });

          this.getTreeDom().on('changed.jstree', function (e, data) {
            var instance = _this.getTreeDom().jstree(true);

            if (_this.isCheckBox) {
              // checkBoxOption.cascade === 'otoParent' 勾选后只关联父层
              if (data.action === 'select_node' && !_this.checkBoxOption.three_state && _this.checkBoxOption.cascade && _this.checkBoxOption.cascade.indexOf('otoParent') >= 0) {
                instance.select_node(data.node.parent);
              }
              setTimeout(function () {
                _this.$emit('checkBoxCallback', _this.getAllChecked());
              }, 100);
            }
          });

          this.getTreeDom().on('select_node.jstree', function (e, data) {
            if (_this.isCheckBox) {
              return;
            }
            var instance = _this.getTreeDom().jstree(true);
            var parentIds = data.node.parents;
            var parentsArr = [];

            _this.pactiveId = data.selected;
            // 获取所有父节点数据
            for (var i = parentIds.length - 1;i >= 0;i--) {
              if (parentIds[i] !== '#') {
                let id = parentIds[i];
                let parentNode = instance.get_node(id)['original'];
                let parentChild = instance.get_node(id)['children'];

                parentNode['children'] = parentChild;
                parentsArr.push(parentNode);
              }
            }

            // 当前节点数据
            let current = data.node['original'];
            let currentChildrenData = _this.getChildrenById(data.node['id'], data.node['parent'] === '#');

            // current['children'] = data.node['children'];
            current['children'] = currentChildrenData;
            parentsArr.push(current);
            // 回调父节点数据
            _this.$emit('callback', parentsArr);
          });
        }

      },
      destroyJstree: function () {
        var instance = this.getTreeDom().jstree(true);

        instance && instance.destroy();
      },
      selectItem: function (id) {
        var instance = this.getTreeDom().jstree(true);

        if (instance) {
          instance.deselect_all();
          instance.select_node(id);
        }
      },
      removeAHref: function () {
        let _this = this;

        setTimeout(function () {
          _this.getTreeDom().find('a[href]').removeAttr('href');
        }, 50);
      },
      getChildrenById: function (id, isRoot) {
        let data = (this.treeData)[0];
        let result = false;
        let resultData = '';
        let searchFun = function (childrenArr) {
          if (childrenArr && childrenArr.length > 0) {
            childrenArr.find(function (a) {
              if (a.id === id) {
                result = true;
                resultData = a['children'];
              } else {
                searchFun(a['children']);
              }
              return result;
            });
          }
        };

        if (isRoot) {
          resultData = data['children'];
        } else {
          searchFun(data['children']);
        }
        
        return resultData;
      },
      getAllChecked: function () {
        let _this = this;
        let checkBoxes = this.getTreeDom().jstree().get_checked(true) || [];
        
        // 获取所有半选框
        if (this.undetermined) {
          this.getTreeDom().find('.jstree-undetermined').each(function (i, element) {
            var dom = $(element).parents('li');
            var id = dom.attr('id');
            var node = _this.getTreeDom().jstree('get_node', id);

            node && checkBoxes.push(node);
          });
        }
        for (let i = checkBoxes.length - 1;i >= 0;i--) {
          checkBoxes[i] = checkBoxes[i]['original'];
        }
        return checkBoxes;
      }
    }
  };
</script>

<style lang="scss">
  @import '../../../node_modules/jstree/dist/themes/default/style.min.css';

  .vtree {
    width: 100%;
    height: 100%;
    color: #333;
    font-size: 12px;
    user-select: none;

    .jstree-node {
      margin-left: 18px;
    }

    .jstree-icon {
      background-image: url(../images/bgp.png);
    }

    .jstree-loading {
      .jstree-ocl {
        background-position-y: 12px!important;
      }
    }

    li {
      padding-right: 14px;

      .jstree-wholerow,
      .jstree-icon,
      .jstree-anchor {
        height: 40px!important;
        line-height: 40px!important;
      }
      .jstree-anchor {
        cursor: pointer;
      }

      .jstree-icon {
        background-position-y: 3px!important;
      }

      .jstree-wholerow:not(.jstree-wholerow-clicked):hover {
        background-color: #e3edf3!important;
      }

      .jstree-wholerow-clicked {
        background: #cbe3f3!important;
      }
    }

    li.disabled {

      >.jstree-anchor {
        color: #999;
      }
    }
  }
</style>