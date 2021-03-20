<template>
  <div>
    <Title>登入</Title>
    <Form btn="登入" @submit="UserLogin">
      <FormInput
          id="email"
          v-model="userData.email"
          :input="userData.email"
          :msg="msg.mail" ph="輸入電子郵件" type="email"
          @input="emailVerify"
      ></FormInput>
      <FormInput
          id="password"
          v-model="userData.password"
          :input="userData.password"
          :msg="msg.pwd" ph="輸入密碼" type="password"
          @input="pwdVerify"
      ></FormInput>
      <GoogleLogin :onSuccess="googleSuccess" :onFailure="googleFail" :params="google.params"
                   :renderParams="google.renderParams"  class="form-group">Login
      </GoogleLogin>
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
import GoogleLogin from 'vue-google-login'
// eslint-disable-next-line no-unused-vars
export default {
  name: "Login",
  components: {Form, Title, FormInput, GoogleLogin},
  data() {
    return {
      userData: {
        email: "",
        password: "",
      },
      msg: {
        mail: "",
        pwd: "",
      },
      mailVerified: false,
      pwdVerified: false,
      send: false,
      google: {
        params: {
          client_id: "396115014001-hbn5flthv9ua7lui7av79csfe31gd8o0.apps.googleusercontent.com"
        },
        renderParams: {
          width: 280,
          height: 50,
          longtitle: true
        }
      }
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
      if (len >= 6 && len <= 20 || len === 0) {
        this.pwdVerified = true
        this.msg.pwd = ""
      } else {
        this.pwdVerified = false
        this.msg.pwd = "密碼長度為6到20個字元"
      }
    },
    ...mapActions(['loginActions']),
    UserLogin() {
      if (this.send) return
      this.emailVerify()
      this.pwdVerify()
      if (this.mailVerified && this.pwdVerified) {
        this.send = true
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
              alert(err)
              setTimeout(() => {
                this.send = false
              }, 1000)
            })
      } else {
        alert("你的帳號或密碼有誤")
      }
    },
    googleSuccess(googleUser) {
      console.log(googleUser.getBasicProfile())
      const data = {
        gmail: googleUser.getBasicProfile().At,
        id: googleUser.getAuthResponse().id_token
      }
      api.googleLogin(data).then(res => {
        if (res == "signup") {
          this.$router.push({path: `/oauth/${data.id}`, query: {name: googleUser.Is.sd}})
        } else {
          Promise.all([
            this.$store.dispatch('setSession'),
            this.$store.dispatch('setSheet')
          ]).then(() => {
            this.$store.dispatch('loginActions', res)
            this.$router.replace({
              path: '/'
            })
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    googleFail(err){
      console.log(err)
      alert("Google登入失敗!")
    }

  },
}


</script>

<style lang="scss" scoped>
#smalltext {
  font-size: 15px;
  margin-bottom: 2%;
  display: flex;
  justify-content: space-between
}

#recaptcha {
  margin: auto;
  width: 60%;
  @include phone-width {
    width: 80%;
  }
}

</style>
