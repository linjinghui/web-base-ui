<template>
  <button :class="fbTurn?'on':'off'" :disabled="fbDisabled" @click="clk"></button>
</template>

<script type="text/babel">
  export default {
    name: 'Switch',
    data: function () {
      return {
        fbTurn: this.turn,
        fbDisabled: this.disabled
      };
    },
    props: {
      'turn': {
        type: Boolean,
        default: false
      },
      'disabled': {
        type: Boolean,
        default: false
      }
    },
    watch: {
      turn: function (val) {
        this.fbTurn = val;
      },
      disabled: function (val) {
        this.fbDisabled = val;
      }
    },
    methods: {
      'clk': function () {
        this.fbTurn = !this.fbTurn;
        this.$emit('callback', this.fbTurn);
      }
    }
  };
</script>

<style scoped lang="scss">
  button {
    position: relative;
    width: 40px;
    height: 20px;
    background-color: #13ce66;
    border-radius: 20px;
    border: 0;
    color: inherit;
    font: inherit;
    outline: medium;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-transform: none;
  }

  button:after {
    content: '';
    position: absolute;
    top: 2px;
    width: 14px;
    height: 14px;
    border: solid 1px #e5e5e5;
    border-radius: 50%;
    background-color: #f8f4f4;
    transition: left .3s ease-in;
  }

  button.on:after {
    left: calc(100% - 3px - 14px);
  }

  button.off {
    background-color: #ddd;
  }

  button.off:after {
    left: 2px;
  }
</style>