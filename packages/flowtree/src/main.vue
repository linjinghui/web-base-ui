<!-- 
功能介绍：
1、
 -->

 <template>
  <div class="wrap-flowtree" @click="wrapBtn.display=false">
    <cmp-flowtreebox :stdata="tdata" @cbkClkAddBtn="cllbackClkAddBtn"></cmp-flowtreebox>
    <ul class="wrap-add-btn" v-if="wrapBtn.display" :style="{'top':wrapBtn.top,'left':wrapBtn.left}">
      <li @click="clkNew">普通流程</li>
      <li @click="clkNewCondition">条件</li>
    </ul>
  </div>
</template>

<script type="text/babel">
  import Flowtreebox from './child.vue';

  export default {
    name: 'Flowtree',
    components: {
      cmpFlowtreebox: Flowtreebox
    },
    data: function () {
      return {
        id: 'flowtree_' + new Date().getTime() + parseInt(Math.random() * 100),
        tdata: [
          {
            title: '发起人',
            content: '请选择'
          },
          {
            title: 'end',
            content: 'end'
          }
        ],
        tdata1: [
          {
            title: '发起人',
            content: '请选择'
          },
          [
            [
              {
                title: '条件1',
                content: '请选择',
                condition: true
              },
              {
                title: '发起人1',
                content: '请选择'
              }
            ],
            [
              {
                title: '条件2',
                content: '请选择',
                condition: true
              },
              {
                title: '发起人2',
                content: '请选择'
              },
              [
                [
                  {
                    title: '条件21',
                    content: '请选择',
                    condition: true
                  },
                  {
                    title: '发起人21',
                    content: '请选择'
                  }
                ],
                [
                  {
                    title: '条件22',
                    content: '请选择',
                    condition: true
                  },
                  {
                    title: '发起人22',
                    content: '请选择'
                  }
                ]
              ]
            ],
            [
              {
                title: '条件3',
                content: '请选择',
                condition: true
              },
              {
                title: '发起人3',
                content: '请选择'
              },
              {
                title: '抄送人3',
                content: '请选择'
              }
            ]
          ],
          {
            title: '抄送人',
            content: '请选择'
          },
          {
            title: 'end',
            content: 'end'
          }
        ],
        wrapBtn: {
          display: false,
          top: 0,
          left: 0,
          current: '',
          parent: ''
        }
      };
    },
    props: {
      wrapId: ''
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
      // 添加节点按钮点击
      cllbackClkAddBtn: function (data) {
        this.$set(this.wrapBtn, 'top', data.target.top + 'px');
        this.$set(this.wrapBtn, 'left', data.target.left + data.target.width + 'px');
        this.$set(this.wrapBtn, 'current', data.current);
        this.$set(this.wrapBtn, 'parent', data.parent);
        this.$set(this.wrapBtn, 'display', true);
      },
      // 新增流程节点
      clkNew: function () {
        let index = this.wrapBtn.parent.indexOf(this.wrapBtn.current);

        this.wrapBtn.parent.splice(index + 1, 0, {
          title: '添加x',
          content: '请选择'
        });
        console.log(this.tdata);
      },
      // 新增条件节点
      clkNewCondition: function () {
        let index = this.wrapBtn.parent.indexOf(this.wrapBtn.current);

        this.wrapBtn.parent.splice(index + 1, 0, [
          [{
            title: '添加条件1',
            content: '请选择'
          }], 
          [{
            title: '添加条件2',
            content: '请选择'
          }]
        ]);
        console.log(this.tdata);
      }
    }
  };
</script>

<style lang="scss">
  // 背景色
  $fr-bgc: #f5f5f7;
  // 线条颜色
  $fr-bdrc: #cacaca;

  .wrap-flowtree {
    position: relative;
    padding: 10px;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: $fr-bgc;

    .wrap-box {
      position: relative;
      background-color: $fr-bgc;
      z-index: 2;
    }

    .wrap-node {
      position: relative;
      display: inline-flex;
      display: flex;
      justify-content: center;
      padding: 30px 20px;
      // overflow: hidden;

      .node {
        position: relative;
        z-index: 2;

        // 自定义此样式
        > section {
          padding: 10px;
          border: solid 1px;
          background-color: #fff;
        }
      }
    }

    .wrap-node.wrap-condition {
      padding-bottom: calc(30px + 30px + 20px);
    }

    > .wrap-box > .wrap-node:first-of-type {
      padding-top: 0;
    }
    > .wrap-box > .wrap-node:last-of-type {
      padding-bottom: 0;
    }

    // 添加按钮
    .btn-add {
      position: relative;
      display: block;
      margin: 0 auto;
      margin-top: 20px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #3296fa;
      z-index: 2;
      cursor: pointer;

    }
    // 添加条件按钮
    .btn-add-condition {
      position: absolute;
      left: 0;
      top: 15px;
      right: 0;
      margin: auto;
      width: 80px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 20px;
      color: #3296fa;
      background-color: #fff;
      font-size: 12px;
      z-index: 3;
      cursor: pointer;
    }

    .wrap-condition > .btn-add {
      position: absolute;
      left: 0;
      bottom: 20px;
      right: 0;
      margin: auto;
    }

    // 竖线条
    .wrap-box:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 2px;
      height: 100%;
      background-color: $fr-bdrc;
      z-index: 1;
    }

    // 横线条
    > .wrap-box .wrap-box:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(100% - 4px);
      border: solid 2px $fr-bdrc;
      border-left: 0;
      border-right: 0;
    }
    > .wrap-box .wrap-box:first-of-type:after {
      width: 50%;
      right: 0;
      left: unset;
    }
    > .wrap-box .wrap-box:last-of-type:after {
      width: 50%;
      right: unset;
      left: 0;
    }

    // 浮动按钮集合
    .wrap-add-btn {
      position: absolute;
      z-index: 3;

      > li {
        float: left;
        padding: 4px;
        border: solid 1px;
        cursor: pointer;
        background-color: #fff;
      }
    }
  }
</style>