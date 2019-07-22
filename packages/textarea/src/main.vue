<template>
  <div class="text-area" :class="{'theme-bc focus': isFocus, 'disabled': disabled+''==='true'}">
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
        let valLength = this.value ? this.value.length : 0;

        if (this.maxlength) {
          result = this.maxlength - valLength;
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
    color: inherit;
    border-radius: 4px;
    background-color: #fff;
    vertical-align: top;

    >textarea {
      display: block;
      padding: 5px 10px;
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

  .text-area:not(.focus) {
    border-color: #dadada;
  }

  .text-area.disabled {
    background-color: #f1f1f1;

    >textarea {
      cursor: default;
    }
  }
</style>