<template>
<div class="sheet-section">
  <h4>{{title}}</h4>
  <slot></slot>
</div>
</template>

<script>
export default {
name: "COC7thSection",
  props:{
  title:String
  }
}
</script>

<style scoped lang="scss">

h4 {
  font-weight: bold;
}
.sheet-section {
  height: 80%;
  width: 28%;
  margin-right: 5%;
  margin-bottom: 5%;
@include phone-width {
  width: 100%;
}
@include small-pad-width {
  width: 45%;
  margin-right: 5%;
}
display: inline-block;
vertical-align: top;
flex-wrap: wrap;
}
</style>
