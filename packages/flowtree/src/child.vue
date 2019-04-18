<!-- 
功能介绍：
1、
 -->

 <template>
  <div class="wrap-box" :class="{'condition':stdata[0].condition}">
    <template v-for="(item,index) in stdata">
      <div class="wrap-node wrap-condition" :key="'idx'+index" v-if="(item instanceof Array)">
        <a class="btn-add-condition" @click="clkAddCondition(item,stdata)">添加条件</a>
        <flowtreebox v-for="(item2,index2) in item" :key="'idx_1_'+index2" :stdata="item2" @cbkClkAddBtn="emit"></flowtreebox>
        <a class="btn-add" @click.stop="clkBtnAdd($event,item,stdata)"></a>
      </div>
      <div class="wrap-node" :key="'idx'+index" v-else>
        <div class="node">
          <section>{{item.title}}</section>
          <a class="btn-add" v-if="item.title!=='end'" @click.stop="clkBtnAdd($event,item,stdata)"></a>
        </div>
      </div>
    </template>
    
  </div>
</template>

<script type="text/babel">
  
  export default {
    name: 'Flowtreebox',
    data: function () {
      return {
        // id: 'flowtree_box_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {
      stdata: {
        default: function () {
          return [];
        }
      }
    },
    mounted: function () {
      // 
    },
    methods: {
      emit: function (data) {
        this.$emit('cbkClkAddBtn', data);
      },
      clkBtnAdd: function (event, info, ptinfo) {
        let target = event.currentTarget;
        let top = target.getBoundingClientRect().top;
        let left = target.getBoundingClientRect().left;
        let width = target.clientWidth;
        let height = target.clientHeight;

        this.emit({
          target: {'top': top, 'left': left, 'width': width, 'height': height},
          current: info,
          parent: ptinfo
        });
      },
      // 条件节点中新增一个条件
      clkAddCondition: function (info) {
        info.push([{
          title: '添加条件',
          content: '请选择',
          condition: true
        }]);
      }
    }
  };
</script>
