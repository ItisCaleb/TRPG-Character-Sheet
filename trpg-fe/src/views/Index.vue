<template>
  <div class="home" style="text-align: center">
    <img alt="Vue logo" src="../assets/logo.png">
    <Title>歡迎來到TRPG Toaster</Title>
  </div>
</template>

<script>
// @ is an alias to /src
import Title from "@/components/Title";
export default {
  name: 'Index',
  components: {Title},
}
</script>
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
