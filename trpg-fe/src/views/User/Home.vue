<template>
  <div>
    <Load>
      <div v-if="success" id="user">
        <Title>{{ user.name }}的頁面</Title>
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
  created() {
    api.getUser(this.$route.params.name)
        .then((user) => {
          this.setUser(user)
        })
        .catch(() => {
          this.$router.replace('/404')
        })
  }
}
</script>

<style scoped >

</style>
