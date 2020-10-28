<template>
  <input class="form-control input-group"
         :type="type"
         :value="value"
         :min="min"
         :max="max"
         @input="emitInput"
  >
</template>

<script>
export default {
  name: "SheetGridInput",
  props: {
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
    }
  },
  methods: {
    emitInput(event) {
      this.calMinMax(event)
      this.$emit('input', event.target.value)
    },
    calMinMax(event) {
      if (this.type === "number") {
        if (event.target.value < this.min) event.target.value = this.min
        else if (event.target.value > this.max) event.target.value = this.max
      }
    }

  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
