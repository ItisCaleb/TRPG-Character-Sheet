<template>
  <Load v-if="success.all">
    <div>
      <Title>
        <span>{{ info.name || '無名' }}</span>
      </Title>
      <Tab class="tab" :page="['info','skill_equip','background','spell','note','option']">
        <DND5eInfo view v-if="success.info && success.stat" slot="info"
                   :info="info" :stat="stat" :equip="equip" :story="story"></DND5eInfo>
        <DND5eEquip view v-if="success.equip" slot="skill_equip" :stat="stat" :equip="equip"></DND5eEquip>
        <DND5eStory view v-if="success.story" slot="background" :story="story"></DND5eStory>
        <DND5eSpell view v-if="success.spell" slot="spell" :spell="spell" :stat="stat"></DND5eSpell>
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
import api from "@/api";
import Load from "@/components/Load";
import Tab from "@/components/Tab";
import DND5eInfo from "@/components/Sheet/DND5e/DND5eInfo";
import DND5eEquip from "@/components/Sheet/DND5e/DND5eEquip";
import DND5eStory from "@/components/Sheet/DND5e/DND5eStory";
import DND5eSpell from "@/components/Sheet/DND5e/DND5eSpell";
import ChangeLang from "@/components/Sheet/ChangeLang";
import SheetMixins from  "@/components/Sheet/SheetMixins"
import SheetNote from "@/components/Sheet/SheetNote";

export default {
  name: "DND5eView",
  components: {SheetNote, ChangeLang, DND5eSpell, DND5eStory, DND5eEquip, DND5eInfo, Tab, Load, Title},
  data() {
    return {
      info: {
        author: "",
        name: "",
        permission: "限團務GM"
      },
      stat: {
        stat: {
          str: 10,
          dex: 10,
          con: 10,
          wis: 10,
          int: 10,
          cha: 10
        },
        inspiration: 0,
        passive_wisdom: 0,
        pro: 0,
        armorValue: 0,
        initiative: 0,
        speed: "",
        max_hp: 0,
        hp: 0,
        temp_hp: 0,
        hit_dice_total: 0,
        hit_dice: 0,
        death_save: "00",
        savings: [],
        skills: []

      },
      story: {
        height: "",
        skin: "",
        age: "",
        weight: "",
        hair: "",
        pupil: "",
        trait: "",
        alignment: "",
        backstory: "",
        otherTrait: "",
        personality: "",
        ideals: "",
        bonds: "",
        flaws: "",
        note: ""
      },
      equip: {
        attack: {
          first: "",
          second: "",
          third: "",
          spells: ""
        },
        money: {
          cp: 0,
          sp: 0,
          ep: 0,
          gp: 0,
          pp: 0
        },
        equipment: "",
        treasure: "",
        language: ""

      },
      spell: {
        spell_class: "",
        spell_ability: "",
        spell_save: 0,
        spell_bonus: 0,
        spell: {
          "0": [],
          "1": [],
          "2": [],
          "3": [],
          "4": [],
          "5": [],
          "6": [],
          "7": [],
          "8": [],
          "9": [],
        }
      },
      success: {
        info: false,
        stat: false,
        spell: false,
        equip: false,
        story: false,
        all: false,
        not_init: false,
        upload: true
      }
    }
  },
  mixins:[SheetMixins],
  props:{
    session:Object
  },
  methods: {
    loadSheet() {
      api.getSheetData('DND5e',this.$route.params.id)
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
            this.spell = data.spell
            this.success.spell = true
            this.success.all = true
          })
          .catch((err) => {
            console.log(err)
            this.$router.replace('/sheet')
          })
    }
  },
  mounted() {
    console.log(this.$route.params)
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
