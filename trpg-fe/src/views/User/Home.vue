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
  beforeCreate(){
    api.getUser(this.$route.params.name)
    .then(user=>{
        this.setUser(user)
    })
    .catch(()=>{
      this.$router.replace({name: 'NotFound', params: {'0': this.$route.fullPath}})
    })
  },
}
</script>

<style scoped >

</style>
