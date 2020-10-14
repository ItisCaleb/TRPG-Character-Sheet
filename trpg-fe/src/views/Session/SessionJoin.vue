<template>
  <div>
    <Title>加入團務</Title>
    <Form @submit="createSession" btn="加入">
      <Input
          v-model="data.name"
          :input="data.password"
          id="name"
          type="text" ph="輸入團務名稱"
      ></Input>
      <Input
          v-model="data.password"
          :input="data.password"
          id="password"
          type="password" ph="輸入密碼"
      ></Input>
      <div class="form-group" style="font-size: 15px;margin-bottom: 2%">
        還是你其實要
        <router-link to="/session/create">創建團務?</router-link>
      </div>
    </Form>
  </div>
</template>

<script>
import Title from "@/components/Title";
import Form from "@/components/User/Form";
import Input from "@/components/User/Input";
import api from "@/api";

export default {
  name: "SessionJoin",
  components: {Title, Input, Form},
  data() {
    return {
      data: {
        name: "",
        password: ""
      }
    }
  },
  methods: {
    createSession() {
      api.joinSession(this.data)
          .then(res => {
            api.getSessions()
                .then(session => {
                  alert(res)
                  this.$store.dispatch('setSession', session)
                  this.$router.replace('/session')
                })
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
}
</script>

<style scoped>

</style>
