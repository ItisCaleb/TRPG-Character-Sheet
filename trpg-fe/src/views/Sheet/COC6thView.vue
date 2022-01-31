<template>
  <Load v-show="success.all">
    <div>
      <Title>
        <span>{{ info.name || '無名' }}</span>
      </Title>
      <Tab class="tab" :page="['info','background','weapon_equip','skill','option']">
        <COC6thInfo view v-if="success.info && success.stat" :stat="stat" :info="info" :equip="equip" :story="story"
                    :mytho="getMytho"
                    slot="info"></COC6thInfo>
        <COC6thBackground view :story="story" slot="background"></COC6thBackground>
        <COC6thEquip view :equip="equip" :skills="skills" :story="story" slot="weapon_equip"></COC6thEquip>
        <COC6thSkill view v-if="success.skill" :stat="stat" :skills="skills" slot="skill"></COC6thSkill>
        <SheetNote view v-if="success.story" slot="note" :story="story"></SheetNote>
        <div slot="option">
          <ChangeLang/>
        </div>
      </Tab>
    </div>
  </Load>
</template>

<script>
import Title from "@/components/Title";
import Tab from "@/components/Tab";
import api from "@/api";
import COC6thInfo from "@/components/Sheet/COC6th/COC6thInfo";
import Load from "@/components/Load";
import COC6thBackground from "@/components/Sheet/COC6th/COC6thBackground";
import COC6thSkill from "@/components/Sheet/COC6th/COC6thSkill";
import ChangeLang from "@/components/Sheet/ChangeLang";
import COC6thEquip from "@/components/Sheet/COC6th/COC6thEquip";
import SheetMixins from  "@/components/Sheet/SheetMixins"
import SheetNote from "@/components/Sheet/SheetNote";

export default {
  name: "COC6thView",
  components: {SheetNote, COC6thEquip, ChangeLang, COC6thSkill, COC6thBackground, Load, COC6thInfo, Tab, Title},
  mixins:[SheetMixins],
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
        weapon: {
          weapon:[],
          melee:[]
        }
      },
      skills: {
        skill: {}
      },
      story: {
        class: "",
        age: "",
        sex: "",
        degree:"",
        mental:"",
        insanity:"",
        residence: "",
        birthplace: "",
        description: "",
        family: "",
        trait: "",
        injuries: "",
        scars:"",
        magic: "",
        encounter: "",
        fellow_investigator: "",
        note: ""
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
      api.getSheetData('COC6th',this.$route.params.id)
          .then(data => {
            this.info = data.info
            this.success.info = true
            document.title = `TRPG Toaster · ${this.info.system} · ${this.info.name}`
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
  }
}
</script>

<style scoped lang="scss">
.tab {
  width: 90% !important;

input {
  font-size: 15px;
}
}
</style>
