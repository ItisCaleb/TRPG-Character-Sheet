<template>
  <Load v-if="success.all">
    <div>
      <Title>
        <span>{{ info.name || '無名' }}</span>
        <i :style="{color:getSuccessColor}" class="fa"
        :class="{'fa-check':success.upload,'fa-spinner fa-spin':!success.upload}"></i>
      </Title>
      <Tab class="tab" :page="['info','skill_equip','background','spell','note','option']">
        <DND5eInfo v-if="success.info && success.stat" slot="info"
                   :info="info" :stat="stat" :equip="equip" :story="story"></DND5eInfo>
        <DND5eEquip v-if="success.equip" slot="skill_equip" :stat="stat" :equip="equip"></DND5eEquip>
        <DND5eStory v-if="success.story" slot="background" :story="story"></DND5eStory>
        <DND5eSpell v-if="success.spell" slot="spell" :spell="spell" :stat="stat"></DND5eSpell>
        <SheetNote v-if="success.story" slot="note" :story="story"></SheetNote>
        <div slot="option">
          檢視權限
          <select v-model="info.permission">
            <option>限團務GM</option>
            <option>團務所有人</option>
            <option>所有人</option>
          </select><br>
          <input id="code" type="hidden" :value="'https://trpgtoaster.com/sheet/DND5e/'+$route.params.id">
          <button class="btn-primary btn" @click="copyCode">複製角卡連結</button>
          <br>
          <button class="btn btn-danger" @click="$refs.deleteBox.show=true">{{ $t('delete') }}</button>
          <ChangeLang/>
          <Msgbox ref="deleteBox">
            <div style="text-align: center;margin: 10% auto">
              你確定要刪除嗎?<br>
              <button style="margin: 10% 2%;" class="btn btn-primary" @click="$refs.deleteBox.show=false">沒有</button>
              <button style="margin: 10% 2%;" class="btn btn-danger" @click.once="deleteSheet">刪除</button>
            </div>
          </Msgbox>
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
import debounce from "lodash.debounce";
import Msgbox from "@/components/Msgbox";
import ChangeLang from "@/components/Sheet/ChangeLang";
import SheetMixins from "@/components/Sheet/SheetMixins";
import SheetNote from "@/components/Sheet/SheetNote";
//import SessionSidebar from "@/components/Sheet/SessionSidebar";

export default {
  name: "DND5e",
  components: {SheetNote, ChangeLang, Msgbox, DND5eSpell, DND5eStory, DND5eEquip, DND5eInfo, Tab, Load, Title},
  mixins:[SheetMixins],
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
      },
    }
  },
  watch: {
    getSheet: {
      handler(sheet) {
        if (this.success.not_init) {
          this.success.upload = false
          this.updateSheet(sheet)
        } else {
          this.$nextTick(() => {
            this.success.not_init = true
          })
        }
      },
      deep: true
    },
    info: {
      handler(newValue) {
        if (this.success.not_init) {
          this.socketInput(newValue, 'info')
        }
      },
      deep: true
    },
    stat: {
      handler(newValue) {
        if (this.success.not_init) {
          this.socketInput(newValue, 'stat')
        }
      },
      deep: true
    },
    equip: {
      handler(newValue) {
        if (this.success.not_init) {
          this.socketInput(newValue, 'equip')
        }
      },
      deep: true
    },
    spell: {
      handler(newValue) {
        if (this.success.not_init) {
          this.socketInput(newValue, 'spell')
        }
      },
      deep: true
    },
    story: {
      handler(newValue) {
        if (this.success.not_init) {
          this.socketInput(newValue, 'story')
        }
      },
      deep: true
    }

  },
  methods: {
    loadSheet() {
      api.getSheetData('DND5e', this.$route.params.id)
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
    },
    updateSheet: debounce(function (sheet) {
      api.editSheet("DND5e", this.$route.params.id, sheet)
          .then(() => {
            this.success.upload = true
          })
          .catch(err => {
            console.log(err)
          })
    }, 2000),
    calSpell(origin) {
      let spell = JSON.parse(JSON.stringify(origin))
      for (let i in spell.spell) {
        spell.spell[i] = spell.spell[i].filter((obj, index) => {
          return index == 0 || obj.text != ""
        })
      }
      return spell
    },
  },
  computed: {
    getSheet() {
      return {
        info: this.info,
        stat: this.stat,
        story: this.story,
        equip: this.equip,
        spell: this.spell
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    api.checkSheetAccess(to.params.id, to.query.session)
        .then(perm => {
          switch (perm) {
            case "author":
              next()
              break
            case "view":
              next({
                name: "DND5eView",
                params: {id: to.params.id},
                query: {session: to.query.session}
              })
              break
            case "noPerm":
              next('/sheet')
              break
          }
        })
  }
}
</script>

<style scoped lang="scss">


</style>
