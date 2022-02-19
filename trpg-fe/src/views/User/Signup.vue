<template>
  <div>
    <Title>註冊</Title>
    <Form btn="註冊" @submit="UserSignup">
      <FormInput v-model="userData.name"
                 :input="userData.name"
                 type="text" id="name" ph="輸入暱稱"
                 :msg="msg.name"></FormInput>
      <FormInput v-model="userData.email"
                 :input="userData.email"
                 type="email" id="email" ph="輸入電子郵件"
                 :msg="msg.mail"></FormInput>
      <FormInput v-model="userData.password"
                 :input="userData.password"
                 type="password" id="pwd" ph="輸入密碼"
                 :msg="msg.pwd"></FormInput>
      <FormInput v-model="userData.repassword"
                 :input="userData.repassword"
                 type="password" id="repwd" ph="重複輸入密碼"
                 :msg="msg.repwd" style="margin-bottom: 3%"></FormInput>
      <div class="form-group" style="font-size: 15px;margin-bottom: 2%">
        <router-link to="/login">已經有帳號了嗎?點擊這裡登入</router-link>
      </div>
    </Form>
  </div>
</template>

<script>
import Form from "@/components/User/Form";
import FormInput from "@/components/User/FormInput";
import Title from "@/components/Title";
import api from "@/api";

export default {
  name: "Signup",
  components: {Title, FormInput, Form},
  data() {
    return {
      userData: {
        name: "",
        email: "",
        password: "",
        repassword: "",
      },
      msg: {
        name: "",
        email: "",
        pwd: "",
        repwd: ""
      },
      verified: {
        name: false,
        email: false,
        pwd: false,
        repwd: false
      },
      send: false
    }
  },
  methods: {
    nameVerify() {
      const name = this.userData.name.length
      if (name >= 2 && name <= 20 || name === 0) {
        this.verified.name = true;
        this.msg.name = ""
      } else {
        this.verified.name = false;
        this.msg.name = "暱稱長度為2到20個字"
      }
    },
    emailVerify() {
      const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+(([.])[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      this.msg.email = emailRule.test(this.userData.email)
      if (this.msg.email || this.userData.email.length === 0) {
        this.verified.email = true
        this.msg.mail = ""
      } else {
        this.verified.email = false
        this.msg.mail = "電子郵件格式錯誤"
      }
    },
    pwdVerify() {
      const len = this.userData.password.length;
      if (len >= 6 && len <= 30 || len === 0) {
        this.verified.pwd = true
        this.msg.pwd = ""
      } else {
        this.verified.pwd = false
        this.msg.pwd = "密碼長度為6到30個字元"
      }
    },
    repwdVerify() {
      if (this.userData.repassword === this.userData.password || this.userData.repassword.length === 0) {
        this.verified.repwd = true
        this.msg.repwd = ""
      } else {
        this.verified.repwd = false
        this.msg.repwd = "請輸入一模一樣的密碼"
      }
    },
    UserSignup() {
      if (this.send) return
      this.send = true
      for (let verify in this.verified) {
        if (!this.verified[verify]) {
          alert('註冊資料有誤')
          setTimeout(() => {
            this.send = false
          }, 1000)
          return
        }
      }
      api.signup(this.userData)
          .then(res => {
            alert(res)
            this.$router.replace({
              path: '/'
            })
          })
          .catch(err => {
            alert(err.data)
            setTimeout(() => {
              this.send = false
            }, 1000)
          })
    }
  },
  watch: {
    userData: {
      handler() {
        this.nameVerify()
        this.emailVerify()
        this.pwdVerify()
        this.repwdVerify()
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">
#repwd {
  margin-bottom: 4% !important;
  @include phone-width {
    margin-bottom: 8% !important;
  }
}
</style>
