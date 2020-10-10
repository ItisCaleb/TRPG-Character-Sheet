<template>
  <div></div>
</template>

<script>
import api from "@/api";
export default {
  mounted() {
    api.logout()
        .then(()=> {
          this.$store.dispatch('logoutActions')
          this.$router.replace({
            path:'/'
          })
        })
  }
}
</script>


