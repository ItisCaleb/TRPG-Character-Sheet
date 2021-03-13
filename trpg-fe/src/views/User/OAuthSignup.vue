<template>
  <div>
    <Title>輸入資料</Title>
    <Form btn="完成" @submit="UserSignup">
      <FormInput v-model="userData.name"
                 :input="userData.name"
                 :value="userData.name"
                 type="text" id="name" ph="輸入暱稱"
                 :msg="msg.name"></FormInput>
      <FormInput v-model="userData.password"
                 :input="userData.password"
                 type="password" id="pwd" ph="輸入密碼"
                 :msg="msg.pwd"></FormInput>
      <FormInput v-model="userData.repassword"
                 :input="userData.repassword"
                 type="password" id="repwd" ph="重複輸入密碼"
                 :msg="msg.repwd" style="margin-bottom: 3%"></FormInput>
    </Form>
  </div>
</template>

<script>
import Title from "@/components/Title";
import FormInput from "@/components/User/FormInput";
import api from "@/api";
import Form from "@/components/User/Form";

export default {
  name: "OAuthSignup",
  components: {Form, FormInput, Title},
  data() {
    return {
      userData: {
        name: this.$route.query.name || "",
        password: "",
        repassword: "",
        token: this.$route.params.token,
        type: "oauth"
      },
      msg: {
        name: "",
        pwd: "",
        repwd: ""
      },
      verified: {
        name: false,
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
    pwdVerify() {
      const len = this.userData.password.length;
      if (len >= 6 && len <= 20 || len === 0) {
        this.verified.pwd = true
        this.msg.pwd = ""
      } else {
        this.verified.pwd = false
        this.msg.pwd = "密碼長度為6到20個字元"
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
      api.oauthSignup(this.userData)
          .then(res => {
            alert(res)
            this.$router.replace({
              path: '/login'
            })
          })
          .catch(err => {
            alert(err)
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
        this.pwdVerify()
        this.repwdVerify()
      },
      deep: true
    }
  },
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
