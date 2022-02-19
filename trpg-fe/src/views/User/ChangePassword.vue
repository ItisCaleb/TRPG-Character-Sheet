<template>
  <div>
    <Title>修改密碼</Title>
    <Form @submit="changePassword" btn="修改密碼">
      <FormInput :msg="msg.pwd" ph="輸入密碼" type="password" v-model="data.password" id="password"
                 :input="data.password"></FormInput>
      <FormInput :msg="msg.repwd" ph="重複輸入密碼" type="password" v-model="data.repassword"
                 id="repassword"
                 :input="data.repassword"></FormInput>
    </Form>
  </div>
</template>

<script>
import Form from "@/components/User/Form";
import FormInput from "@/components/User/FormInput";
import api from "@/api";
import Title from "@/components/Title";

export default {
  name: "ChangePassword",
  components: {Title, FormInput, Form},
  data() {
    return {
      data: {
        password: "",
        repassword: ""
      },
      verified: {
        pwd: false,
        repwd: false
      },
      msg: {
        pwd: "",
        repwd: ""
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    api.checkChangePasswordExist(to.params.id)
        .then(() => {
          next()
        })
        .catch(() => {
          next({name: 'NotFound', params: {'0': to.fullPath}})
        })
  },
  methods: {
    pwdVerify() {
      const len = this.data.password.length;
      if (len >= 6 && len <= 30 || len === 0) {
        this.verified.pwd = true
        this.msg.pwd = ""
      } else {
        this.verified.pwd = false
        this.msg.pwd = "密碼長度為6到30個字元"
      }
    },
    repwdVerify() {
      if (this.data.repassword === this.data.password || this.data.repassword.length === 0) {
        this.verified.repwd = true
        this.msg.repwd = ""
      } else {
        this.verified.repwd = false
        this.msg.repwd = "請輸入一模一樣的密碼"
      }
    },
    changePassword() {
      for (let verify in this.verified) {
        if (!this.verified[verify]) {
          alert('密碼有誤')
          return
        }
      }
      api.changePassword(this.$route.params.id, this.data)
          .then(res => {
            alert(res)
            this.$router.replace({
              path: '/login'
            })
          })
          .catch(err => {
            alert(err.data)
            this.$router.replace('/')
          })
    }
  },
  watch: {
    data: {
      handler() {
        this.pwdVerify()
        this.repwdVerify()
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
