<template>
  <Load v-if="success.all">
    <div>
      <Title>
        <span>{{ info.name || '無名' }}</span>
        <i :style="{color:getSuccessColor}" class="fa"
        :class="{'fa-check':success.upload,'fa-spinner fa-spin':!success.upload}"></i>
      </Title>

      <Tab class="tab" :page="['info','background','skill','option']">
        <COC6thInfo v-if="success.info && success.stat" :stat="stat" :info="info" :equip="equip" :story="story"
                    :mytho="getMytho"
                    slot="info"></COC6thInfo>
        <COC6thBackground :story="story" slot="background"></COC6thBackground>
        <COC6thSkill v-if="success.skill" :stat="stat" :skills="skills" slot="skill"></COC6thSkill>
        <div slot="option">
          檢視權限
          <select v-model="info.permission">
            <option>限團務GM</option>
            <option>團務所有人</option>
            <option>所有人</option>
          </select><br>
          <button class="btn btn-danger" @click="$refs.deleteBox.show=true">刪除</button>
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
import Tab from "@/components/Tab";
import api from "@/api";
import Load from "@/components/Load";
import debounce from "lodash.debounce"
import Msgbox from "@/components/Msgbox";
import ChangeLang from "@/components/Sheet/ChangeLang";
import COC6thInfo from "@/components/Sheet/COC6th/COC6thInfo";
import COC6thBackground from "@/components/Sheet/COC6th/COC6thBackground";
import COC6thSkill from "@/components/Sheet/COC6th/COC6thSkill";

export default {
  name: "COC6th",
  components: {
    COC6thSkill,
    COC6thBackground,
    COC6thInfo, ChangeLang, Msgbox,  Load,  Tab, Title},
  data() {
    return {
      info: {
        author: "",
        name: "",
        permission: "限團務GM"
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
      api.editSheet("COC6th", this.$route.params.id, sheet)
          .then(() => {
            this.success.upload = true
          })
          .catch(err => {
            console.log(err)
          })
    }, 3000),
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
        skill: this.skills
      }
    },
    getSuccessColor() {
      if (this.success.upload) {
        return '#42b983'
      } else return '#28a1dc'
    },
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
    skills: {
      handler(newValue) {
        if (this.success.not_init) {
          this.socketInput(newValue, 'skills')
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
  mounted() {
    this.loadSheet()
    this.$socket.emit('joinSheet', this.$route.params.id)
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
  beforeRouteEnter(to, from, next) {
    api.checkSheetAccess(to.params.id)
        .then(res => {
          switch (res) {
            case "author":
              next()
              break
            case "view":
              next({name: "COC6thView", params: {id: to.params.id}})
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
