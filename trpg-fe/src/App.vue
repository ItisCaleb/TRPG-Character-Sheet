<template>
  <div id="app" :class="{'dark':$store.state.darkMode}">
    <Navbar></Navbar>
    <div id="content">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<style lang="scss">

html {
  position: relative;
  min-height: 100%;
}
#app {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  font-family: "Taipei Sans TC Beta", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 18px;

  margin: auto;
}

#content {
  width: 90%;
  margin-top: 10%;
  margin-bottom: 5%;

  font-family: Arial, serif;
  @include big-pc-width {
    margin-top: 3%;
  }
  @include pad-width {
    margin-top: 6%;
  }
  @include phone-width{
    margin-bottom: 20%;
  }
  input[type=number]::-webkit-outer-spin-button,
  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance:textfield;
  }
}
</style>
<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/api";

export default {
  components: {Footer, Navbar},
  beforeCreate() {
    this.$store.dispatch('setDark')
    if (this.$store.getters.getLogin) {
      api.authVerify()
          .then(() => {
            this.$store.dispatch('setSheet')
            this.$store.dispatch('setSession')
          })
          .catch(() => {
            this.$store.dispatch('logoutActions')
          })
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        if(!to.meta.title) return document.title = 'TRPG Toaster'
        document.title = "TRPG Toaster · "+ to.meta.title
      }
    },
  }
}
</script>
