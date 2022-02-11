<template>
  <div>
    <select v-model="$i18n.locale" @change="changeLang">
      <option v-for="lang in langs" :value="lang"
              :key="lang">{{$t('lang.'+lang)}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "ChangeLang",
  data(){
    return{
      langs:["zh_tw","zh_cn","en_us"]
    }
  },
  methods: {
    changeLang(event){
      localStorage.setItem('locale',event.target.value)
    }
  }

}
</script>

<style scoped>

</style>
