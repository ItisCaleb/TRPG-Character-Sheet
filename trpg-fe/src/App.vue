<template>
  <div id="app">
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
}
</style>
<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/api";

export default {
  components: {Footer, Navbar},
  beforeCreate() {
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
  }
}
</script>
