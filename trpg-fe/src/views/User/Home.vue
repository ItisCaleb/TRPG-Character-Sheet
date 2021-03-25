<template>
  <div>
    <Load>
      <div v-if="success" id="user">
        <Title>{{ user.name }}的頁面</Title>
        <div v-if="checkUser" class="custom-control custom-switch" style="text-align: center">
          <input type="checkbox" class="custom-control-input" id="dark-btn"
                 :checked="$store.state.darkMode" @click="$store.dispatch('changeDark')">
          <label class="custom-control-label" for="dark-btn">闇黑模式</label>
        </div>
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
    },
  },
  computed:{
    checkUser(){
      if(!this.$store.getters.getUser.name) return false
      return this.user.name === this.$store.getters.getUser.name
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
