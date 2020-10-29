<template>
  <div v-if="success" style="text-align: center">
    <Title>團務{{ Session.name }}</Title>
    <Msgbox ref="boxShow">
      <div id="box-content">
        <Title>上傳角色卡</Title>
        <h3 v-if="!noSheet">你還沒有角色卡</h3>
        <div v-else>
          <table class="table" style="width: 100%">
            <tr>
              <td>角色卡</td>
              <td>系統</td>
            </tr>
            <tr v-for="sheet in sheets" :key="sheet.id">
              <td>{{sheet.name}}</td>
              <td>{{sheet.system}}</td>
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
          <div v-for="sheet in Session.sheetInfos" :key="sheet._id">
            {{ sheet.name }}
            {{ sheet.system }}
            {{ sheet.player_name }}
          </div>
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
      success: false,
      noSheet:true
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
    }
  },
  computed: {
    leaveOption() {
      if (this.$store.getters.getUser.name === this.Session.gm) {
        return "解散"
      } else return "離開"
    }
  }
  ,
  beforeCreate() {
    api.getSessionInfo(this.$route.params.id)
        .then(res => {
          this.Session = res
          this.Session.player.shift()
          this.success = true
          this.sheets = this.$store.getters.getSheet
          if(this.sheets==="NotFound") this.noSheet= false
        })
        .catch(() => {
          this.$router.replace('/404')
        })
  }
}
</script>

<style scoped>
.players {
  display: block;
}
#box-content{
  margin: 7%;
}
</style>
