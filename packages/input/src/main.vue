<!-- 
功能介绍：
1、
 -->

<template>
  <span class="input">
    <input autoComplete="off" 
    ref="ipt" 
    v-model.trim="val"
    :type="type" 
    :maxlength="maxlength"
    :placeholder="placeholder"
    :onpaste="(nopaste+''==='true')?'return false':''">
    <i class="cicon-cross-crle-chr-cpt center-v" v-if="val.length>0" @click="clk_del"></i>
  </span>
</template>

<script type="text/babel">
  export default {
    name: 'Input',
    data: function () {
      return {
        id: 'btn_' + new Date().getTime() + parseInt(Math.random() * 100),
        val: this.value
      };
    },
    props: {
      value: '',
      type: {
        default: 'text'
      },
      maxlength: '',
      placeholder: '',
      nopaste: ''
    },
    watch: {
      val: function (val) {
        this.$emit('input', val);
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
      clk_del: function () {
        this.val = '';
        this.$refs.ipt.focus();
      }
    }
  };
</script>

<style scoped lang="scss">
  .input {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 34px;

    >input {
      display: block;
      padding-right: 24px;
      width: 100%;
      height: 100%;
      border-style: solid;
      border-width: 1px;
      border-color: #ddd;
      color: inherit;
      font: inherit;
      outline: medium;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    >input[disabled] {
      cursor: text;
      user-select: none;
    }

    >input::-ms-clear {
      display: none;
    }

    >input:focus {
      border-color: #0079ff;
    }

    >i {
      position: absolute;
      right: 5px;
      font-size: 16px;
      color: #fff;
      background-color: #999;
    }
  }
</style>