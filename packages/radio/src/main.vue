<template>
  <div>
    <input type="radio" v-model="fbChecked" :value="fbValue" :id="id" :name="fbName" :disabled="fbDisabled" />
    <label :for="id" @click="callback()">
      <span></span>
      {{fbLabel}}
    </label>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'Radio',
    data: function () {
      return {
        id: '',
        fbName: this.name,
        fbLabel: this.label || this.value,
        fbDisabled: this.disabled,
        fbValue: this.value,
        fbChecked: this.checked
      };
    },
    props: {
      'name': {
        default: 'ckname'
      },
      'label': '',
      'disabled': {
        type: Boolean,
        default: false
      },
      'value': {
        default: ''
      },
      'checked': ''
    },
    watch: {
      // fbChecked: function (val) {
      //   this.$emit('callback', val);
      // },
      checked: function (val) {
        this.fbChecked = val;
      },
      disabled: function (val) {
        this.fbDisabled = val;
      }
    },
    mounted: function () {
      this.id = this.getInputId();
    },
    methods: {
      getInputId: function () {
        return 'ipt' + Math.ceil(Math.random() * 1000);
      },
      callback: function () {
        this.$emit('callback', this.fbValue);
      }
    }
  };
</script>

<style scoped lang="scss">

  div {
    display: inline-block;user-select: none;

    input {
      display: none;
    }

    input[disabled] + label > span {
      border-color: transparent;cursor: default;
    }

    input:checked + label > span {
      border-color: #0079ff;background-color: #0079ff;
    }

    input:checked + label > span:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #fff;
    }

    span {
      position: relative;display: inline-block;width: 14px;height: 14px;vertical-align: -2px;border-style: solid;border-width: 1px;border-color: #999;border-radius: 50%;background-color: #fff;cursor: pointer;

      .iconfont {
        display: none;position: absolute;display: block;width: 100%;height: 100%;top: -2px;left: -2px;color: #fff;
      }
    }

    span:hover {
      border-color: #ccc;
    }

    span:active {
      border-color: #0079ff;
    }
  }
</style>