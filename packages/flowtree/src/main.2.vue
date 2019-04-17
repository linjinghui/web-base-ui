<!-- 
功能介绍：
1、
 -->
<script type="text/babel">

  export default {
    name: 'Flowtree',
    data: function () {
      return {
        id: 'flowtree_' + new Date().getTime() + parseInt(Math.random() * 100),
        tdata: {
          title: '发起人',
          content: '所有人',
          children: {
            title: '审批人',
            content: '请选择',
            children: {
              title: '抄送人',
              content: '请选择',
              children: {}
            }
          },
          condition: []
        },
        tdata: [
          {
            title: '发起人',
            content: '请选择'
          },
          [
            [
              {
                title: '条件1',
                content: '请选择'
              },
              {
                title: '发起人1',
                content: '请选择'
              }
            ],
            [
              {
                title: '条件2',
                content: '请选择'
              },
              {
                title: '发起人2',
                content: '请选择'
              }
            ]
          ],
          {
            title: '抄送人',
            content: '请选择'
          }
        ]
      };
    },
    props: {
      wrapId: ''
    },
    render: function () {
      // this.domWrap = this.$parent && this.$parent.$el;
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
      this.$nextTick(function () {
        this.renderHtml();
      });
    },
    methods: {
      // 渲染内容
      renderHtml: function () {
        if (this.$parent && this.$parent.$el) {
          let _this = this;
          let item = JSON.parse(JSON.stringify(this.tdata));
          let html = '<div class="wrap-flowtree">';

          while (item.children) {
            html += '<div class="wrap-node">' + _this.getNodeHtml(item) + '</div>';
            item = item.children;
          }

          html += '</div>';
          this.$parent.$el.innerHTML = html;
        }
      },
      getNodeHtml: function (info) {
        return '<div class="node">' + info.title + '</div>';
      }
    }
  };
</script>

<style lang="scss">
  .wrap-flowtree {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: red;

    .wrap-node {
      position: relative;
      display: inline-flex;
      display: flex;
      align-items:center;
      justify-content:center;

      .node {
        position: relative;
        // width: 100px;
        // height: 60px;
        padding: 10px;
        border: solid 1px;
      }
    }
  }
</style>