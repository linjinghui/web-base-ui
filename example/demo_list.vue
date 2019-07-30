<template>
  <div>
    <cmp-list :data="arr" style="width:300px;height:600px;border:solid 1px;overflow:auto;background-color: #fff;">
      <dt slot="dt">标题</dt>
      <template slot="dds">
        <dd>
          <span class="flex-1">左右等分</span>
          <span class="flex-1 txt-r">左右等分</span>
        </dd>

        <dd class="noline">
          <span class="flex-1">无底边</span>
        </dd>

        <dd>
          <span class="flex-1">单行带箭头</span>
          <i class="arrow"></i>
        </dd>

        <dd>
          <p>上文、下图</p>
          <img width="100%" src="http://cmstop.ndsww.com/a/10001/201904/ad3ea45820779176ce9657a422c12eee.jpeg">
        </dd>

        <dd>
          <p class="text-eps">上文省略号、下图xxxxxxxxxxxxxxxxxxxxxxxxx</p>
          <img width="100%" src="http://cmstop.ndsww.com/a/10001/201904/ad3ea45820779176ce9657a422c12eee.jpeg">
        </dd>

        <dd>
          <p>上文、下三图 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
          <img width="30%" height="70px" src="http://cmstop.ndsww.com/a/10001/201904/ad3ea45820779176ce9657a422c12eee.jpeg">
          <img style="margin:0 5%;" width="30%" height="70px" src="http://cmstop.ndsww.com/a/10001/201904/ad3ea45820779176ce9657a422c12eee.jpeg">
          <img width="30%" height="70px" src="http://cmstop.ndsww.com/a/10001/201904/ad3ea45820779176ce9657a422c12eee.jpeg">
        </dd>

        <dd>
          <img width="70px" height="70px" src="http://cmstop.ndsww.com/a/10001/201904/ad3ea45820779176ce9657a422c12eee.jpeg">
          <span class="flex-1" style="padding-left:10px;">左图、右文 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
        </dd>

        <dd>
          <span class="flex-1" style="padding-right:10px;">左文、右图 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
          <img width="70px" height="70px" src="http://cmstop.ndsww.com/a/10001/201904/ad3ea45820779176ce9657a422c12eee.jpeg">
        </dd>

        <dd>
          <p>嘻嘻嘻嘻嘻嘻嘻</p>
          <span>姓名</span>
          <input class="flex-1" type="text">
          <i class="arrow"></i>
        </dd>

        <dd>222</dd>
      </template>
    </cmp-list>

    <cmp-list class="wx" :data="arr" style="margin-top:10px;width:300px;overflow:auto;background-color: #fff;">
      <dt slot="dt">微信-设置</dt>
      <template slot="dds">
        <dd><span class="flex-1">新消息提醒</span><i class="arrow"></i></dd>
        <dd><span class="flex-1">勿扰模式</span><i class="arrow"></i></dd>
        <dd><span class="flex-1">手机号</span><span class="flex-1 txt-r">13599081111</span></dd>
        <dd><span class="flex-1">用户名</span><input class="flex-1 txt-r" type="text" placeholder="请输入用户名"></dd>
        <dd><span class="flex-1">用户名</span><input class="flex-1 txt-r" type="text" placeholder="请选择" readonly="readonly"><i class="arrow" style="color:#999;"></i></dd>
        <dd>
          <span class="flex-1">
            <p>微信安全中心</p>
            <p style="color:#999;font-size:12px;">如果你遇到微信被盗，无法登录等问题，可以前往安全中心</p>
          </span>
          <i class="arrow"></i>
        </dd>
      </template>
    </cmp-list>
  </div>
</template>

<script>
import {List} from '../packages/index.js';

export default {
  name: 'demoList',
  data: function () {
    return {
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },
  components: {
    'cmpList': List
  },
  watch: {
    //
  },
  methods: {
    //
  }
};
</script>

<style scoped lang="scss">
  dt, dd {
    padding-left: 10px;
    padding-right: 10px;
  }

  .wx {
    > dt:not(.noline):after, 
		> dd:not(.noline):not(:last-of-type):after {
      left: 10px!important;
      width: calc(100% - 10px)!important;
    }
  }
</style>