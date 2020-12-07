<template>
  <div>
    <Title>登入</Title>
    <Form @submit="UserLogin" btn="登入">
      <FormInput
          v-model="userData.email"
          :input="userData.email"
          @input="emailVerify"
          type="email" id="email" ph="輸入電子郵件"
          :msg="msg.mail"
      ></FormInput>
      <FormInput
          v-model="userData.password"
          :input="userData.password"
          @input="pwdVerify"
          type="password" id="password" ph="輸入密碼"
          :msg="msg.pwd"
      ></FormInput>
      <div class="form-check form-group" style="text-align: left;margin-bottom: 1%">
        <input v-model="userData.check" type="checkbox" class="form-check-input" id="remember">
        <label class="form-check-label">記住我</label><br>
      </div>
      <div id="recaptcha"></div>
      <div id="smalltext" class="form-group">
        <router-link to="/signup">還沒註冊嗎?點擊這裡註冊</router-link>
        <br>
        <router-link to="/forget_password">忘記密碼?</router-link>
      </div>
    </Form>
  </div>
</template>

<script>
import FormInput from "@/components/User/FormInput";
import Title from "@/components/Title";
import api from "@/api";
import {mapActions} from 'vuex'
import Form from "@/components/User/Form";
// eslint-disable-next-line no-unused-vars
export default {
  name: "Login",
  components: {Form, Title, FormInput},
  data() {
    return {
      userData: {
        email: "",
        password: "",
        check: false,
        recaptcha: ""
      },
      msg: {
        mail: "",
        pwd: "",
      },
      mailVerified: false,
      pwdVerified: false,
      formSend: false,
      sitekey: process.env.VUE_APP_RECAPTCHA
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    this.$loadScript("https://www.google.com/recaptcha/api.js")
      .then(()=>{
        setTimeout(()=>{
          window.grecaptcha.render("recaptcha", {
            sitekey: "6LcXK_sZAAAAAAikEOURxVi6SDdtCYqCpYjW-BMN"
          })
        },20)

      })
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
      if (this.formSend) return
      this.emailVerify()
      this.pwdVerify()
      if (this.mailVerified && this.pwdVerified) {
        this.formSend = true
        // eslint-disable-next-line no-undef
        if (!grecaptcha.getResponse) {
          this.formSend = false
          alert("請勾選驗證!")
          return;
        }
        // eslint-disable-next-line no-undef
        this.userData.recaptcha = grecaptcha.getResponse()
        api.login(this.userData)
            .then((user) => {
              Promise.all([
                this.$store.dispatch('setSession'),
                this.$store.dispatch('setSheet')
              ]).then(() => {
                this.$store.dispatch('loginActions', user)
                this.$router.replace({
                  path: '/'
                })
              })
            })
            .catch(err => {
              this.formSend = false
              alert(err)
            })
      } else {
        alert("你的帳號或密碼有誤")
      }
    }

  },
}


</script>

<style scoped lang="scss">
#smalltext {
  font-size: 15px;
  margin-bottom: 2%;
  display: flex;
  justify-content: space-between
}
#recaptcha{
  margin: auto;
  width: 60%;
  @include phone-width{
    width: 80%;
  }
}

</style>
