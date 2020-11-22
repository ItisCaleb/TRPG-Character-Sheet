<template>
  <form>
    <slot></slot>
    <div class="form-group">
      <button @click.prevent="callSubmit" type="submit" class="btn btn-primary mb-2">{{ btn }}</button>
    </div>

  </form>
</template>

<script>
export default {
  name: "Form",
  props: {
    btn: {
      type: String,
      required: true
    }
  },
  methods: {
    callSubmit() {
      this.$emit('submit');
    }
  }
}
</script>

<style scoped lang="scss">

form {
  @include pc-width{
    width: 70%;
    margin: auto;
  }
}

.form-group {
  margin: auto auto 5%;
  width: 60%;
  @include phone-width {
    width: 80%;
  }
}

button[type=submit] {
  background: #42b983;
  border: white;
  width: 100%;

}
</style>
