<template>
  <div :id="id" class="input">
    <input
        :value="input"
        @input="$emit('input',$event.target.value)"
        class="form-control input-group-sm"
        style="box-shadow: none"
        :type="type"
         placeholder=" " autocomplete="chrome-off">
    <label :style="{'--bcolor':calColor}" id="label">
        <span id="label-content" >{{ph}}</span>
    </label>
    <small v-if="msg.length>0" :style="{color: calColor} ">{{ msg }}</small>
  </div>
</template>

<script>
export default {
  name: "Form-Input",
  props: {
    input: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    id: {
      type: String,
      required: true
    },
    intro: {
      type: String
    },
    ph: {
      type: String
    },
    msg: {
      type: String,
      default: ""
    }
  },
  computed: {
    calColor() {
      if (this.input.length === 0) return "#28a1dc"
      else if (this.msg.length > 0) {
        return "red"
      } else return "#10a36a"
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../public/main";
.input{
  position: relative;
  height: 50px;
  width: 60%;
  margin: auto auto 4%;
  @include phone-width {
    width: 80%;
    margin: auto auto 8%;
  }
}
label{
  position: absolute;
  margin: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-bottom: 2px solid var(--bcolor);
  :after{
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    height: 100%;
    width: 100%;
    transform: scaleX(-100%);
  }
}

#label-content{
  position: absolute;
  bottom: 0;
  left: 0;
  color: #797979;
  transition: all 0.3s ease;
}

input:focus + #label #label-content,
input:not(:placeholder-shown) + #label #label-content{
  transform: translateY(-150%);
  font-size: 14px;
  color: var(--bcolor);
}

input {
  height: 100%;
  width: 100%;
  padding: 20px 0 0;
  border: none;
  color: #595f6e;
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
}



</style>
