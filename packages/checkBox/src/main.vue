<template>
  <div>
    <input type="checkbox" v-model="bfChecked" :value="fbValue" :id="id" :name="fbName" :disabled="bfDisabled" />
    <label :for="id" @click="clkCallback">
      <span>
        <i class="icon cmpIconfont icon-checkboxes"></i>
      </span>
      {{fbLabel}}
    </label>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'CheckBox',
    data: function () {
      return {
        id: '',
        fbName: this.name,
        fbLabel: this.label || this.value,
        bfDisabled: this.disabled,
        fbValue: this.value,
        bfChecked: this.checked
      };
    },
    props: {
      'eventName': {
        default: 'changeCkb'
      },
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
      'checked': {
        type: Boolean,
        default: false
      }
    },
    watch: {
      checked: function (val) {
        this.bfChecked = val;
      },
      bfChecked: function (val) {
        // this.$nextTick(function () {
        //   let result = this.getResult();

        //   this.$emit('callback', result);
        // });
      }
    },
    mounted: function () {
      this.id = this.getInputId();
    },
    methods: {
      clkCallback: function () {
        let _this = this;

        setTimeout(function () {
          _this.$emit('click', {
            'result': _this.getResult(),
            'checked': _this.bfChecked,
            'value': JSON.parse(_this.fbValue)
          });
        }, 50);
      },
      addParamsChange: function () {
        let _this = this;

        window.EVENTBUS.$on(this.eventName, function (data) {
          if (typeof data.checked !== 'undefined') {
            _this.bfChecked = data.checked;
          }
          if (typeof data.disabled !== 'undefined') {
            _this.bfDisabled = data.disabled;
          }
        });
      },
      getInputId: function () {
        return 'ipt' + Math.ceil(Math.random() * 1000);
      },
      getResult: function () {
        let doms = document.getElementsByName(this.fbName);
        let result = [];
        let obj = '';

        for (let i in doms) {
          if (doms[i].checked) {
            try {
              obj = JSON.parse(doms[i].value);
            } catch (e) {
              obj = doms[i].value;
            }
            result.push(obj);
          }
        }
        return result;
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

      .cmpIconfont {
        display: block;
      }
    }

    span {
      position: relative;display: inline-block;width: 14px;height: 14px;vertical-align: -2px;border-style: solid;border-width: 1px;border-color: #999;border-radius: 2px;background-color: #fff;cursor: pointer;overflow: hidden;

      .cmpIconfont {
        display: none;
        display: block;
        width: 16px;
        height: 17px;
        position: absolute;
        left: -2px;
        top: -2px;
        color: #fff;
        font-size: 16px;
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