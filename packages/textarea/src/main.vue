<template>
  <div class="text-area" :class="{'focus': isFocus, 'disabled': disabled+''==='true'}">
    <textarea :placeholder="placeholder" :rows="rows" :maxlength="maxlength" v-model="pvalue" :onpaste="noPaste ? 'return false' : ''" :disabled="disabled+''==='true'" @focus="fun_focus" @blur="fun_blur"></textarea>
    <p v-if="residualSize >= 0">还能输入{{residualSize}}个字</p>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'Textarea',
    data: function () {
      return {
        isFocus: false,
        pvalue: this.value
      };
    },
    props: {
      value: {
        default: ''
      },
      placeholder: {
        default: ''
      },
      rows: {
        default: 10
      },
      maxlength: '',
      noPaste: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      value: function (val) {
        this.pvalue = val;
      },
      pvalue: function (val) {
        this.$emit('input', val);
      }
    },
    computed: {
      residualSize: function () {
        let result;

        if (this.maxlength) {
          result = this.maxlength - this.value.length;
        }
        return result;
      }
    },
    mounted: function () {
      //
    },
    methods: {
      fun_focus: function () {
        this.isFocus = true;
        this.$emit('focus');
      },
      fun_blur: function () {
        this.isFocus = false;
        this.$emit('blur');
      }
    }
  };
</script>

<style scoped lang="scss">
  .text-area {
    position: relative;
    width: 100%;
    border-style: solid;
    border-width: 1px;
    border-color: #dadada;
    color: inherit;
    border-radius: 4px;
    background-color: #fff;
    vertical-align: top;

    >textarea {
      display: block;
      padding: 5px;
      width: 100%;
      resize: none;
      border: 0;
      background-color: transparent;
      word-break: break-all;
    }
    >p {
      padding: 5px;
      text-align: right;
      color: #c3c3c3;
      font-size: 12px;
      user-select: none;
    }
  }

  .text-area.focus {
    border-color: #0079ff;
  }

  .text-area.disabled {
    background-color: #f1f1f1;

    >textarea {
      cursor: default;
    }
  }
</style>