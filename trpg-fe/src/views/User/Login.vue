<template>
  <div>
    <Title>登入</Title>
    <Form @submit="UserLogin" btn="登入">
      <Input
          v-model="userData.email"
          :input="userData.email"
          @input="emailVerify"
          type="email" id="email" ph="輸入電子郵件"
          :msg="msg.mail"
      ></Input>
      <Input
          v-model="userData.password"
          :input="userData.password"
          @input="pwdVerify"
          type="password" id="password" ph="輸入密碼"
          :msg="msg.pwd"
      ></Input>
      <div class="form-check form-group" style="text-align: left;margin-bottom: 1%">
        <input v-model="userData.check" type="checkbox" class="form-check-input" id="remember">
        <label class="form-check-label">記住我</label><br>
      </div>
      <div class="form-group" style="font-size: 15px;margin-bottom: 2%">
        <router-link to="/signup">還沒註冊嗎?點擊這裡註冊</router-link>
      </div>
    </Form>
  </div>
</template>

<script>
import Input from "@/components/User/Input";
import Title from "@/components/Title";
import api from "@/api";
import {mapActions} from 'vuex'
import Form from "@/components/User/Form";

export default {
  name: "Login",
  components: {Form, Title, Input},
  data() {
    return {
      userData: {
        email: "",
        password: "",
        check: false
      },
      msg: {
        mail: "",
        pwd: "",
      },
      mailVerified: false,
      pwdVerified: false,
      formSend:false
    }
  },
  methods: {
    emailVerify() {
      const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+(([.])[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      this.mailVerified = emailRule.test(this.userData.email)
      if (this.mailVerified || this.userData.email.length === 0) {
        this.msg.mail = ""
      } else {
        this.msg.mail = "電子郵件格式錯誤"
      }
    },
    pwdVerify() {
      const len = this.userData.password.length;
      if (len >= 8 && len <= 20 || len === 0) {
        this.pwdVerified = true
        this.msg.pwd = ""
      } else {
        this.pwdVerified = false
        this.msg.pwd = "密碼長度為8到20個字元"
      }
    },
    ...mapActions(['loginActions']),
    UserLogin() {
      if(this.formSend) return
      this.emailVerify()
      this.pwdVerify()
      if (this.mailVerified && this.pwdVerified) {
        this.formSend = true
        api.login(this.userData)
            .then((user) => {
              alert('登入成功')
              this.$store.dispatch('loginActions', user)
              api.getSessions()
                  .then(sessions => {
                    this.$store.dispatch('setSession', sessions)
                  })
              api.getSheets()
                  .then(sheets => {
                    this.$store.dispatch('setSheet', sheets)
                  })
              this.$router.replace({
                path: '/'
              })
            })
            .catch(err => {
              this.formSend=false
              alert(err)
            })
      } else {
        alert("你的帳號或密碼有誤")
      }
    },

  }
}
</script>

<style scoped>


</style>
