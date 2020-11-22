<template>
  <div style="text-align: center">
    <Title>電子郵件{{mail}}已被驗證!</Title>
    <div>你現在可以<router-link to="/login">登入</router-link>了!</div>
  </div>
</template>

<script>
import api from "@/api";
import Title from "@/components/Title";

export default {
  name: "MailVerify",
  components: {Title},
  data(){
    return {
      mail:""
    }
  },
  beforeRouteEnter(to,from,next) {
    api.mailVerify(to.params.id)
    .then((res)=>{
      next(vm => vm.mail=res)
    })
    .catch(()=>{
      next('/404')
    })
  }
}
</script>

<style scoped>

</style>
