<template>
  <Load v-show="success.all">
    <div>
      <Title>
        <span>{{ info.name || '無名' }}</span>
        <i :style="{color:getSuccessColor}" class="fa"
           :class="{'fa-check':success.upload,'fa-spinner fa-spin':!success.upload}"></i>
      </Title>

      <Tab class="tab" :page="['一般','背景','技能','選項']">
        <COC7thInfo v-if="success.info && success.stat" :stat="stat" :info="info" :story="story" :mytho="getMytho"
                    slot="一般"></COC7thInfo>
        <COC7thBackground :story="story" slot="背景"></COC7thBackground>
        <COC7thSkill v-if="success.skill" :stat="stat" :skills="skills" slot="技能"></COC7thSkill>
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
import debounce from "lodash.debounce"

export default {
  name: "COC7th",
  components: {COC7thSkill, COC7thBackground, Load, COC7thInfo, Tab, Title},
  data() {
    return {
      info: {
        author: "",
        name: ""
      },
      stat: {
        hp: 0,
        san: 0,
        mp: 0,
        luk: 0,
        insane_status: "無",
        injured_status: "無",
        characteristic: {
          str: 0,
          con: 0,
          dex: 0,
          app: 0,
          pow: 0,
          siz: 0,
          int: 0,
          edu: 0
        }
      },
      skills: {
        class_feature: "EDU",
        skill: {}
      },
      story: {
        class: "",
        age: "",
        sex: "",
        residence: "",
        birthplace: "",
        description: "",
        belief: "",
        significant_people: "",
        meaningful_location: "",
        treasured_possession: "",
        trait: "",
        myth: "",
        injuries: "",
        mania: "",
        magic: "",
        encounter: "",
        fellow_investigator: ""
      },
      success: {
        info: false,
        stat: false,
        skill: false,
        story: false,
        all: false,
        not_init: false,
        upload: true
      }
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
    updateSheet: debounce(function (sheet) {
      api.editSheet("COC7th", this.$route.params.id, sheet)
          .then(res => {
            console.log(res)
            this.success.upload = true
          })
          .catch(err => {
            console.log(err)
          })
    }, 3000)
  },
  computed: {
    getSheet() {
      return {
        info: this.info,
        stat: this.stat,
        story: this.story,
        equip: {},
        skill: this.skills
      }
    },
    getSuccessColor(){
      if(this.success.upload){
        return '#42b983'
      }else return '#28a1dc'
    },
    getMytho() {
      if (!this.skills.skill["Cthulhu Mythos"]) return 0
      else {
        let total = 0
        for (let type in this.skills.skill["Cthulhu Mythos"]) {
          total += parseInt(this.skills.skill["Cthulhu Mythos"][type])
        }
        return total
      }
    }
  },
  watch: {
    getSheet: {
      handler(sheet) {
        if (this.success.not_init) {
          this.success.upload = false
          this.updateSheet(sheet)
        } else this.success.not_init = true
      },
      deep: true
    }
  },
  beforeCreate() {
    api.getSheetData(this.$route.params.id)
        .then(data => {
          this.info = data.info
          this.success.info = true
          this.stat = data.stat
          this.success.stat = true
          this.story = data.story
          this.success.story = true
          this.skills = data.skill
          this.success.skill = true
          this.success.all = true
        })
        .catch(() => {

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
