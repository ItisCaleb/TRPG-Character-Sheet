<template>
  <div id="title">
    <h1 style="font-weight: bold;"><slot></slot></h1>
  </div>
</template>

<script>
export default {
  name: "Title"
}
</script>

<style scoped lang="scss">
@import "public/main";
  #title{
    margin-bottom: 2%;
    text-align: center;
  }
  h1{
    font-size: 36px;
    @include phone-width{
      font-size: 24px;
    }
  }
</style>
