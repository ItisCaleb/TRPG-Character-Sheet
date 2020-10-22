<template>
  <div style="text-align: center">
    <Title>找不到此頁面!</Title>
    <div id="not-found" >
      404
    </div>
    <div style="font-size: 40px;">
      看來你似乎迷路了
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title";
export default {
name: "NotFound",
  components: {Title}
}
</script>

<style scoped lang="scss">
#not-found{
  font-size: 240px;
  @include phone-width{
    font-size: 150px;
  }
}


</style>
