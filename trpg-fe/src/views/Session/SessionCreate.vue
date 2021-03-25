<template>
  <div>
    <Title>創建團務</Title>
    <Form @submit="createSession" btn="創建">
      <FormInput
          v-model="data.name"
          :input="data.name"
          id="name"
          type="text" ph="輸入團務名稱"
      ></FormInput>
      <div class="form-group" style="font-size: 15px;margin-bottom: 2%">
        還是你其實要
        <router-link to="/session/join">加入團務?</router-link>
      </div>
    </Form>
  </div>
</template>

<script>
import Title from "@/components/Title";
import Form from "@/components/User/Form";
import FormInput from "@/components/User/FormInput";
import api from "@/api";

export default {
  name: "SessionCreate",
  components: {Form, Title, FormInput},
  data() {
    return {
      data:{
        name: ""
      },
      send:false
    }
  },
  methods: {
    createSession() {
      if(this.send) return
      this.send=true
      api.createSession(this.data)
          .then(res => {
            this.$store.dispatch('setSession')
                .then(() => {
                  alert(res)
                  this.$router.replace('/session')
                })
          })
          .catch(err => {
            alert(err)
            setTimeout(()=>{
              this.send=false
            },1000)
          })
    }
  },
}
</script>

<style scoped>

</style>
