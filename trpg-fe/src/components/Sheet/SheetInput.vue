<template>
  <label>
    {{name}}
    <input
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
    value:String
  }
}
</script>

<style scoped lang="scss">
label {
  flex: 1 1 auto;
  display: flex;
  input {
    min-width: 0;
    flex: 1;
    width: 100%;
  }
}
</style>
