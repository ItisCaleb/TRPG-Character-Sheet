<template>
  <div>
    <Title>加入團務</Title>
    <Form @submit="joinSession" btn="加入">
      <FormInput
          v-model="invite"
          :input="invite"
          id="invite"
          type="text" ph="輸入邀請碼"
      ></FormInput>
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
import FormInput from "@/components/User/FormInput";
import api from "@/api";

export default {
  name: "SessionJoin",
  components: {Title, FormInput, Form},
  data() {
    return {
      invite:"",
      send:false
    }
  },
  methods: {
    joinSession() {
      if(this.send) return
      this.send=true
      if(this.invite=="") {
        alert("請輸入邀請碼")
        this.send=false
        return;
      }
      api.joinSession(this.invite)
          .then(res => {
            this.$store.dispatch('setSession')
                .then(()=>{
                  this.$router.replace(`/session/info/${res.session}`)
                })
          })
          .catch(err => {
            alert(err)
            setTimeout(()=>{
              this.send=false
            },1000)
          })
    }
  }
}
</script>

<style scoped>

</style>
