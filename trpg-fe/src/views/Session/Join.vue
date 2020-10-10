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
    </Form>
  </div>
</template>

<script>
import Title from "@/components/Title";
import Form from "@/components/User/Form";
import Input from "@/components/User/Input";
import api from "@/api";
export default {
  name: "Join",
  components: {Title,Input,Form},
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
            alert(res)
            api.getSession()
                .then(session => {
                  this.$store.dispatch('setSession',session)
                })
            this.$router.replace('/session')
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
