<template>
  <div>
    <button @click="add">添加</button>
    <hr>
    <cmp-breadcrumbs v-model="optionBreadcrumbs.list" v-bind="optionBreadcrumbs" @callback="callbackBread"></cmp-breadcrumbs>
  </div>
</template>

<script>
import {Breadcrumbs} from '../packages/index.js';

export default {
  name: 'demoBreadcrumbs',
  data: function () {
    return {
      optionBreadcrumbs: {
        list: [
          {name: 'nav1', disabled: true}, {name: 'nav2'}, {name: 'nav3', disabled: true}, {name: 'nav4'}
        ]
      }
    };
  },
  components: {
    'cmpBreadcrumbs': Breadcrumbs
  },
  watch: {
    //
  },
  methods: {
    add: function () {
      this.optionBreadcrumbs.list.push({name: 'nav' + (this.optionBreadcrumbs.list.length + 1)});
    },
    callbackBread: function () {
      console.log('========callback bread=======');
      console.log(this.optionBreadcrumbs.list);
    }
  }
};
</script>

<style scoped>

</style>