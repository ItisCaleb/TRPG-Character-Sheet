<template>
  <div></div>
</template>

<script>
import api from "@/api";

export default {
  name: "SessionLinkJoin",
  beforeMount() {
    if (!this.$store.getters.getUser) {
      this.$router.replace('/login')
    } else {
      api.joinSession(this.$route.params.code)
          .then(res => {
            this.$router.replace(`/session/info/${res.session}`)
          })
          .catch((err) => {
            alert(err)
            this.$router.replace('/')
          })
    }

  }
}
</script>

<style scoped>

</style>
