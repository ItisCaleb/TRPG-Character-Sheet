<template>
  <label>
    <span style="font-weight: bold">{{ name }}</span>
    <textarea :readonly="view" :value="val" class="sheet-textarea form-control"
              @input="emitInput"></textarea>
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
    },
    view:{
      type:Boolean,
      default: false
    },
    val:{
      type:String,
      default:""
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
  height: 120px;
  margin-bottom: 10%;
}
</style>
