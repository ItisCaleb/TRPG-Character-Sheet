<template>
  <label>
    <span style="font-weight: bold">{{ name }}</span>
    <input class="form-control input-group"
           :type="type"
           :value="value"
           :min="min"
           :max="max"
           :readonly="view"
           @input="emitInput"
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
    min:{
      type:Number,
      default: 0
    },
    max: {
      type:Number,
      default: 100
    },
    type: {
      type: String,
      default: "text"
    },
    view:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    emitInput(event){
      this.calMinMax(event)
      this.$emit('input',event.target.value)
    },
    calMinMax(event){
      if (this.type==="number"){
        if(event.target.value<this.min) event.target.value=this.min
        else if (event.target.value>this.max) event.target.value=this.max
      }else if(this.type==="text"){
        if(event.target.value.length>this.max){
          event.target.value=event.target.value.slice(0,this.max)
        }
      }
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
