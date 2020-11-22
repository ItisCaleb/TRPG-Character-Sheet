<template>
  <div v-if="success" style="text-align: center">
    <Title>團務{{ Session.name }}</Title>
    <Msgbox ref="boxShow">
      <div id="box-content">
        <Title>
          上傳角色卡
          <button v-if="!noSheet" class="btn btn-primary" @click="uploadSheet">上傳</button>
        </Title>
        <h3 v-if="noSheet">{{ this.noSheet }}</h3>
        <div v-else>
          <table class="table" style="width: 100%;height: 100%">
            <tr>
              <td>角色卡</td>
              <td>系統</td>
              <td>選取</td>
            </tr>
            <tr v-for="sheet in sheets" :key="sheet.id" style="height: 100%; ">
              <td>{{ sheet.name }}</td>
              <td>{{ sheet.system }}</td>
              <td><input :value="sheet.url" v-model="selectSheet" style="width: 100%;height: 18px" type="checkbox"
                         class="custom-checkbox">
              </td>
            </tr>
          </table>
        </div>
      </div>
    </Msgbox>
    <button class="btn btn-primary" @click="$refs.boxShow.$data.show=true">上傳角色卡</button>
    <Load>
      <Tab style="text-align: center" :page="['資訊','角色卡','選項']">
        <div slot="資訊">
          GM:{{ Session.gm }}<br>
          玩家:<span class="players" v-for="player in Session.player" :key="player">{{ player }}</span>
        </div>
        <div slot="角色卡">
          <table style="width: 100%">
            <tr>
              <td>角色卡</td>
              <td>系統</td>
              <td>玩家名稱</td>
              <td>用戶</td>
            </tr>
            <tbody v-for="sheet in Session.sheetInfos" :key="sheet._id">
            <tr class="link" @click="toSheet(sheet.system,sheet.id)" v-if="sheet.access">
              <td>{{ sheet.name }}</td>
              <td> {{ sheet.system }}</td>
              <td> {{ sheet.player_name }}</td>
              <td>{{ sheet.author }}</td>
            </tr>
            <tr style="color: lightgray" v-else>
              <td>{{ sheet.name }}</td>
              <td> {{ sheet.system }}</td>
              <td> {{ sheet.player_name }}</td>
              <td>{{ sheet.author }}</td>
            </tr>
            </tbody>

          </table>
        </div>
        <div slot="選項">
          <button class="btn btn-danger" @click="deleteSession">{{ leaveOption }}</button>
        </div>
      </Tab>
    </Load>
  </div>
</template>

<script>
import Title from "@/components/Title";
import Tab from "@/components/Tab";
import api from "@/api";
import Load from "@/components/Load";
import Msgbox from "@/components/Msgbox";

export default {
  name: "SessionInfo",
  components: {Msgbox, Load, Tab, Title},
  data() {
    return {
      Session: {},
      sheets: {},
      selectSheet: [],
      success: false,
      noSheet: ""
    }
  },
  methods: {
    deleteSession() {
      api.deleteSession(this.$route.params.id)
          .then(res => {
            alert(res)
            this.$store.dispatch('setSession')
                .then(() => {
                  this.$router.replace('/session')
                })

          })
          .catch(err => {
            console.log(err)
          })
    },
    uploadSheet() {
      api.uploadSheet(this.selectSheet, this.$route.params.id)
          .then(res => {
            console.log(res)
            this.$router.go(0)
          })
          .catch(err => {
            console.log(err)
          })
    },
    toSheet(system, url) {
      this.$router.push(`/sheet/${system}/${url}`)
    },
  },
  computed: {
    leaveOption() {
      if (this.$store.getters.getUser.name === this.Session.gm) {
        return "解散"
      } else return "離開"
    }
  },
  beforeCreate() {
    api.getSessionInfo(this.$route.params.id)
        .then(res => {
          this.Session = res
          this.Session.player.shift()
          this.success = true
          this.sheets = this.$store.getters.getSheet
          if (this.sheets === "NotFound") {
            this.noSheet = "你還未擁有角色卡"
            return
          }
          for (let i in this.Session.sheet) {
            this.sheets = this.sheets.filter((s) => {
              return s.url !== this.Session.sheet[i]
            })
          }
          if (this.sheets.length === 0) this.noSheet = "你的角色卡已經全部上傳了"
        })
        .catch(() => {
          this.$router.replace({name: 'NotFound', params: {'0': this.$route.fullPath}})
        })
  }
}
</script>

<style scoped lang="scss">
.players {
  display: block;
}

#box-content {
  margin: 5%;
}

td {
  font-size: 20px;
  padding: 1%
}

.link {
  color: #46A3FF;
  cursor: pointer;

  &:hover {
    color: #42b983;
  }


}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=checkbox] {
  -moz-appearance: textfield;
}
</style>
