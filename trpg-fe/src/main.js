import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from "bootstrap-vue"
import VueSocketIO from "vue-socket.io";
import VueI18n from "vue-i18n";



Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(new VueSocketIO({
  debug:false,
  connection: process.env.VUE_APP_BACKEND_URL || ''
}))

import zh_tw from './i18n/zh_tw'
import en_us from "@/i18n/en_us";

Vue.use(VueI18n)
const locale = localStorage.getItem('locale') || 'zh_tw'
const i18n = new VueI18n({
  locale,
  messages:{zh_tw,en_us},
  silentTranslationWarn:true
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
