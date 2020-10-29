<template>
  <label>
    {{ name }}
    <textarea class="sheet-textarea"
              @input="emitInput" @change="socketInput"> </textarea>
  </label>
</template>

<script>
export default {
  name: "SheetTextArea",
  props: {
    name: String,
    max:{
      type:Number,
      default:null
    }
  },
  methods: {
    emitInput(event) {
      this.calInput(event)
      this.$emit('input', event.target.value)
    },
    calInput(event){
      if(!this.max) return
      if(event.target.value.length>this.max){
        event.target.value=event.target.value.slice(0,this.max)
      }
    }
  }

}
</script>

<style scoped lang="scss">
.sheet-textarea {
  resize: none;
  height: 100%;
  width: 100%;
  border: 1px lightgray solid;
  border-radius: 0.25rem;

  &:focus {
    border-color: #80bdff;
    outline: 0;
  }
}

label {
  width: 100%;
}
</style>