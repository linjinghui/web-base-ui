<template>
  <div>
    <template v-for="like in likes">
      <cmp-checkbox :name="'like'" :label="like.label" :value="like.value" :checked="like.checked" @click="callback"></cmp-checkbox>&nbsp;
    </template>
  </div>
</template>

<script>
import {CheckBox} from '../packages/index.js';

export default {
  name: 'Checkbox',
  data: function () {
    return {
      likes: [
        {
          'checked': false,
          'value': 1,
          'label': '唱歌'
        },
        {
          'checked': true,
          'value': '2',
          'label': '旅游'
        },
        {
          'checked': true,
          'value': '3',
          'label': '看书'
        }
      ]
    };
  },
  components: {
    'cmpCheckbox': CheckBox
  },
  methods: {
    callback: function (val) {
      alert('callback:' + JSON.stringify(val));
    }
  }
};
</script>

<style scoped>

</style>