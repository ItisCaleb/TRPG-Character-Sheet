<template>
  <div>
    <Title>忘記密碼</Title>
    <Form @submit="sendMail" btn="送出驗證電子郵件">
      <FormInput v-model="email" :input="email" @input="emailVerify"
                 type="email" id="email" ph="輸入電子郵件" :msg="msg">

      </FormInput>
    </Form>
  </div>
</template>

<script>
import FormInput from "@/components/User/FormInput";
import Form from "@/components/User/Form";
import Title from "@/components/Title";
import api from "@/api";

export default {
  name: "SendFindPassword",
  components: {Title, Form, FormInput},
  data() {
    return {
      email: "",
      mailVerified: false,
      msg: "",
      send:false
    }
  },
  methods: {
    emailVerify() {
      const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+(([.])[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      this.mailVerified = emailRule.test(this.email)
      if (this.mailVerified || this.email.length === 0) {
        this.msg = ""
      } else {
        this.msg = "電子郵件格式錯誤"
      }
    },
    sendMail(){
      if(!this.mailVerified && this.send) return
      this.send=true
      api.passwordMail({email:this.email})
        .then(res=>{
          alert(res)
          this.$router.push('/')
        })
        .catch(err=>{
          alert(err.data)
          this.send=false
        })
    }
  }
}
</script>

<style scoped>

</style>
