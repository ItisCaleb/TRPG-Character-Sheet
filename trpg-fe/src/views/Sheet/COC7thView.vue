<template>
  <Load v-show="success.all">
    <div>
      <Title>
        <span>{{ info.name || '無名' }}</span>
      </Title>
      <Tab class="tab" :page="['一般','背景','技能']">
        <COC7thInfo view v-if="success.info && success.stat" :stat="stat" :info="info" :equip="equip" :story="story"
                    :mytho="getMytho"
                    slot="一般"></COC7thInfo>
        <COC7thBackground view :story="story" slot="背景"></COC7thBackground>
        <COC7thSkill view v-if="success.skill" :stat="stat" :skills="skills" slot="技能"></COC7thSkill>
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
  name: "COC7thView",
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
      equip: {
        equip: "",
        cash: "",
        weapon: ""
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
        equip: false,
        story: false,
        all: false,
        not_init: false,
        upload: true
      },
    }
  },
  methods: {
    loadSheet() {
      api.getSheetData(this.$route.params.id)
          .then(data => {
            this.info = data.info
            this.success.info = true
            this.stat = data.stat
            this.success.stat = true
            this.equip = data.equip
            this.success.equip = true
            this.story = data.story
            this.success.story = true
            this.skills = data.skill
            this.success.skill = true
            this.success.all = true
          })
          .catch((err) => {
            console.log(err)
            this.$router.replace('/sheet')
          })
    }
  },
  computed: {
    getMytho() {
      if (!this.skills.skill) return 0
      if (!this.skills.skill["Cthulhu Mythos"]) return 0
      else {
        let total = 0
        for (let type in this.skills.skill["Cthulhu Mythos"]) {
          total += parseInt(this.skills.skill["Cthulhu Mythos"][type])
        }
        return total
      }
    },
  },
  mounted() {
    this.loadSheet()
    this.$socket.emit('joinSheet', this.$route.params.id)
  },
  sockets: {
    syncInput(data) {
      this[data[1]] = data[0]
    },
    deleteSheet() {
      this.$router.replace('/sheet')
    },
    reconnect() {
      Object.assign(this.$data.success, this.$options.data().success)
      this.loadSheet()
    }
  }
}
</script>

<style scoped>

</style>
