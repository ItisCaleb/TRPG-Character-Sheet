<template>
  <div>
    <Load>
      <div v-if="success" id="user">
        <Title>{{ user.name }}的頁面</Title>
        <div></div>
      </div>
    </Load>
  </div>
</template>

<script>
import Title from "@/components/Title";
import api from "@/api";
import Load from "@/components/Load";


export default {
  name: "Home",
  components: {Load, Title},
  data() {
    return {
      success: false,
      user: {
        name: "",
        email: ""
      }
    }
  },
  methods: {
    setUser(user) {
      this.success = true
      this.user = user
    }
  },
  beforeRouteEnter(to,from,next){
    api.getUser(to.params.name)
    .then(user=>{
      next(vm=>{
        vm.setUser(user)
      })
    })
    .catch(()=>{
      next({name:"NotFound",params:{'0':to.fullPath}})
    })
  },
  beforeRouteUpdate(to,from,next){
    api.getUser(to.params.name)
        .then(user=>{
          this.setUser(user)
          next()
        })
        .catch(()=>{
          next({name:"NotFound",params:{'0':to.fullPath}})
        })
  }
}
</script>

<style scoped >

</style>
