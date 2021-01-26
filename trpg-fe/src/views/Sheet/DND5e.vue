<template>
  <Load v-if="success.all">
    <div>
      <Title>
        <span>{{ info.name || '無名' }}</span>
        <i :style="{color:getSuccessColor}" class="fa"
        :class="{'fa-check':success.upload,'fa-spinner fa-spin':!success.upload}"></i>
      </Title>
      <Tab class="tab" :page="['一般','技能&裝備','背景','法術','選項']">
        <DND5eInfo v-if="success.info && success.stat" slot="一般"
                   :info="info" :stat="stat" :equip="equip" :story="story"></DND5eInfo>
        <DND5eEquip v-if="success.equip" slot="技能&裝備" :stat="stat" :equip="equip"></DND5eEquip>
        <DND5eStory v-if="success.story" slot="背景" :story="story"></DND5eStory>
        <DND5eSpell v-if="success.spell" slot="法術" :spell="spell" :stat="stat"></DND5eSpell>
        <div slot="選項">
          檢視權限
          <select v-model="info.permission">
            <option>限團務GM</option>
            <option>團務所有人</option>
            <option>所有人</option>
          </select><br>
          <button class="btn btn-danger" @click="$refs.deleteBox.show=true">刪除</button>
          <Msgbox ref="deleteBox">
            <div style="text-align: center;margin: 10% auto">
              你確定要刪除嗎?<br>
              <button style="margin: 10% 2%;" class="btn btn-primary" @click="$refs.deleteBox.show=false">沒有</button>
              <button style="margin: 10% 2%;" class="btn btn-danger" @click="deleteSheet">刪除</button>
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

export default {
  name: "DND5e",
  components: {Msgbox, DND5eSpell, DND5eStory, DND5eEquip, DND5eInfo, Tab, Load, Title},
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
        flaws: ""
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
            this.spell = data.spell
            this.success.spell = true
            this.success.all = true
          })
          .catch((err) => {
            console.log(err)
            this.$router.replace('/sheet')
          })
    },
    deleteSheet() {
      api.deleteSheet(this.$route.params.id)
          .then(res => {
            this.$store.dispatch('setSheet')
                .then(() => {
                  this.$socket.emit('clientDelete', this.$route.params.id)
                  alert(res)
                  this.$router.replace('/sheet')
                })
          })
          .catch(err => {
            alert(err)
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
    }, 3000),
    calSpell(origin) {
      let spell = JSON.parse(JSON.stringify(origin))
      for (let i in spell.spell) {
        spell.spell[i] = spell.spell[i].filter((obj, index) => {
          return index == 0 || obj.text != ""
        })
      }
      return spell
    },
    socketInput: debounce(function (data, key) {
      this.$socket.emit('clientInput', data, key, this.$route.params.id)
    }, 1000),
    $withoutWatchers(cb) {
      const watchers = this._watchers.map((watcher) => ({cb: watcher.cb, sync: watcher.sync}))
      for (let index in this._watchers) {
        this._watchers[index] = Object.assign(this._watchers[index], {cb: () => null, sync: true})
      }
      cb()
      for (let index in this._watchers) {
        this._watchers[index] = Object.assign(this._watchers[index], watchers[index])
      }
    }
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
    },
    getSuccessColor() {
      if (this.success.upload) {
        return '#42b983'
      } else return '#28a1dc'
    }
  },
  sockets: {
    syncInput(data) {
      this.$withoutWatchers(() => {
        this[data[1]] = data[0]
      })
    },
    deleteSheet() {
      this.$store.dispatch('setSheet')
      this.$router.replace('/sheet')
    },
    reconnect() {
      Object.assign(this.$data.success, this.$options.data().success)
      this.loadSheet()
    }
  },
  mounted() {
    this.loadSheet()
    this.$socket.emit('joinSheet', this.$route.params.id)
  },
  beforeRouteEnter(to, from, next) {
    api.checkSheetAccess(to.params.id)
        .then(res => {
          switch (res) {
            case "author":
              next()
              break
            case "view":
              next({name: "DND5eView", params: {id: to.params.id}})
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
.tab {
  width: 90% !important;

  input {
    font-size: 15px;
  }
}

</style>
