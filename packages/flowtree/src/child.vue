<!-- 
功能介绍：
1、
 -->

 <template>
  <div class="wrap-box" :class="{'condition':stdata[0].condition}">
    <template v-for="(item,index) in stdata">
      <div class="wrap-node wrap-condition" :key="'idx'+index" v-if="(item instanceof Array)">
        <a class="btn-add-condition" @click="clkAddCondition(item,stdata)">添加条件</a>
        <flowtreebox v-for="(item2,index2) in item" :key="'idx_1_'+index2" :stdata="item2"></flowtreebox>
        <a class="btn-add" @click="clkAdd(item,stdata)"></a>
      </div>
      <div class="wrap-node" :key="'idx'+index" v-else>
        <div class="node">
          <section>{{item.title}}</section>
          <a class="btn-add" v-if="item.title!=='end'" @click="clkAdd(item,stdata)"></a>
        </div>
      </div>
    </template>
    
  </div>
</template>

<script type="text/babel">
  
  export default {
    name: 'Flowtreebox',
    components: {
      // 
    },
    data: function () {
      return {
        id: 'flowtree_box_' + new Date().getTime() + parseInt(Math.random() * 100)
      };
    },
    props: {
      stdata: {
        default: function () {
          return [];
        }
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
      clkAdd: function (info, ptinfo) {
        let index = ptinfo.indexOf(info);

        ptinfo.splice(index + 1, 0, {
          title: '添加x',
          content: '请选择'
        });
      },
      clkAddCondition: function (info) {
        console.log('==clkAddCondition==');
        console.log(info);
        info.push([{
          title: '添加条件',
          content: '请选择',
          condition: true
        }]);
      }
    }
  };
</script>
