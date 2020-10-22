<template>
  <Load v-show="success">
    <div>
      <Title><span>{{ info.name || '無名' }}</span></Title>
      <Tab class="tab" :page="['一般','背景','技能','選項']">
        <COC7thInfo ref="info" slot="一般"></COC7thInfo>
        <COC7thBackground ref="background" slot="背景"></COC7thBackground>
        <COC7thSkill ref="skill" slot="技能"></COC7thSkill>
        <div slot="選項" v-if="$store.getters.getUser._id === info.author">
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
    }
  },
  beforeCreate() {
    api.getSheetData(this.$route.params.id)
        .then(data => {
          this.info = data.info
          this.$refs.info.$data.info = data.info
          this.$refs.info.$data.stat = data.stat
          this.$refs.info.$data.story = data.story
          this.$refs.background.$data.story=data.story
          console.log(data.story)
          this.success = true
        })
        .catch(err => {
          console.log(err)
        })
  },
  beforeMount() {
    api.getSheetData(this.$route.params.id)
        .then(data => {
          this.info = data.info
          this.$refs.info.$data.info = data.info
          this.$refs.info.$data.stat = data.stat
          this.$refs.info.$data.story = data.story
        })
        .catch(err => {
          console.log(err)
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
