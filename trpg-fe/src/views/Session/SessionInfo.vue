<template>
  <div v-if="success">
    <Title>團務{{ Session.name }}</Title>
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

export default {
  name: "SessionInfo",
  components: {Load, Tab, Title},
  data() {
    return {
      Session: {},
      success: false
    }
  },
  methods: {
    deleteSession() {
      api.deleteSession(this.$route.params.id)
          .then(res => {
            alert(res)
            this.$store.dispatch('setSession')
            this.$router.replace('/session')
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
</style>
