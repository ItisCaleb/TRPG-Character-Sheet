<template>
  <Load v-show="success">
    <div>
      <Title><span>{{ info.name || '無名' }}</span></Title>
      <Tab class="tab" :page="['一般','背景','技能','選項']">
        <COC7thInfo ref="info" slot="一般"></COC7thInfo>
        <COC7thBackground ref="background" slot="背景"></COC7thBackground>
        <COC7thSkill ref="skill" slot="技能"></COC7thSkill>
        <div slot="選項" v-if="$store.getters.getUser._id === info.author">
          <button class="btn btn-primary" @click="uploadSheet">上傳</button>
          <button class="btn btn-danger" @click="deleteSheet">刪除</button>
        </div>
      </Tab>
    </div>
  </Load>
</template>

<script>
import Title from "@/components/Title";
import Tab from "@/components/Tab";
import api from "@/api";
import COC7thInfo from "@/components/Sheet/COC7th/COC7thInfo";
import Load from "@/components/Load";
import COC7thBackground from "@/components/Sheet/COC7th/COC7thBackground";
import COC7thSkill from "@/components/Sheet/COC7th/COC7thSkill";

export default {
  name: "COC7th",
  components: {COC7thSkill, COC7thBackground, Load, COC7thInfo, Tab, Title},
  data() {
    return {
      info: "",
      success: false
    }
  },
  methods: {
    deleteSheet() {
      api.deleteSheet(this.$route.params.id)
          .then(res => {
            this.$store.dispatch('setSheet')
                .then(() => {
                  alert(res)
                  this.$router.replace('/sheet')
                })
          })
          .catch(err => {
            alert(err)
          })
    },
    uploadSheet(){
      const skills = Object.assign({},this.$refs.skill.$data.skills)
      console.log(skills)
      for(let key in skills.skill){
        if (Object.keys(skills.skill[key]).length==0){
          delete skills.skill[key]
        }
      }
      const sheet={
        info:this.$refs.info.$data.info,
        stat:this.$refs.info.$data.stat,
        story:Object.assign(this.$refs.info.$data.story,this.$refs.background.$data.story),
        equip: {},
        skill:skills
      }
      console.log(sheet)
      api.editSheet("COC7th",this.$route.params.id,sheet)
      .then(res=>{
        console.log(res)
        alert("上傳成功")
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  beforeCreate() {
    api.getSheetData(this.$route.params.id)
        .then(data => {
          this.info = data.info
          this.$refs.info.$data.info = data.info
          this.$refs.info.$data.stat = data.stat
          this.$refs.info.$data.story = Object.assign({},data.story)
          delete data.story.class
          delete data.story.age
          delete data.story.sex
          delete data.story.residence
          delete data.story.birthplace
          this.$refs.background.$data.story=data.story
          this.$refs.skill.$data.skills=data.skill
          this.success = true
        })
        .catch(() => {
          this.$router.replace('/404')
        })
  }
}
</script>

<style lang="scss">
.tab {
  width: 90% !important;

  input {
    font-size: 15px;
  }
}

</style>
