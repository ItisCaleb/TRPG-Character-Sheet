<template>
  <label>
    {{ name }}
    <input class="form-control input-group"
           :type="type"
           :value="value"
           @input="$emit('input',$event.target.value)"
    >

  </label>
</template>

<script>
export default {
  name: "SheetInput",
  props: {
    name: String,
    ph: String,
    value: {
      type:[String,Number]
    },
    type: {
      type: String,
      default: "text"
    }
  }
}
</script>

<style scoped lang="scss">
label {
  flex: 1 1 auto;
  display: flex;
  align-items: center;

  input {
    min-width: 0;
    flex: 1;
    width: 100%;
  }
}
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
