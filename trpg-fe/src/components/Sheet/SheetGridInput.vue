<template>
  <table>
    <tr v-if="top">
      <td colspan="3" class="td-top">
        <slot name="top"></slot>
      </td>
    </tr>
    <tr>
      <td v-if="left" class="td-left">
        <slot name="left"></slot>
      </td>
      <td class="td-input">
        <input class="form-control input-group"
               :readonly="view"
               :type="type"
               :value="value"
               :min="min"
               :max="max"
               @input="emitInput">
      </td>
      <td v-if="right" class="td-right">
        <slot name="right"></slot>
      </td>
    </tr>
    <tr v-if="down">
      <td colspan="3" class="td-down">
        <slot name="down"></slot>
      </td>
    </tr>
  </table>


</template>

<script>
export default {
  name: "SheetGridInput",
  props: {
    left: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    down: {
      type: Boolean,
      default: false
    },
    ph: String,
    value: {
      type: [String, Number]
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    type: {
      type: String,
      default: "text"
    },
    view: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitInput(event) {
      this.calMinMax(event)
      this.$emit('input', event.target.value)
    },
    calMinMax(event) {
      if (this.type === "number") {
        if (event.target.value < this.min || event.target.value=="") event.target.value = this.min
        else if (event.target.value > this.max) event.target.value = this.max
      }
    }

  }
}
</script>

<style scoped lang="scss">

table{
  width: auto;
  margin: 2%;
  min-width: 29%;
}

.td-left {
  padding: 0;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  border: 1px lightgray solid;
}

.td-right {
  padding: 0;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  border: 1px lightgray solid;
}

.td-top {
  padding: 0;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  border: 1px lightgray solid;

}

.td-down {
  padding: 0;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  border: 1px lightgray solid;

}

.td-input {
  border: 1px lightgray solid;
  padding: 0;
  height: 50px;
  width: 65%;

  input {
    border: none;
    padding: 0;
    text-align: center;
    height: 100%;
    width: 100%;

    box-shadow: none !important;
  }
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
