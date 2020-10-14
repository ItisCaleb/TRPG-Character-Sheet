<template>
  <div>
    <Title>團務{{ Session.name}}</Title>
    <Tab style="text-align: center" :page="['資訊','角色卡','選項']">
      <div slot="資訊">
        GM:{{Session.gm}}<br>
        玩家:<span class="players" v-for="player in Session.player" :key="player">{{player}}</span>
      </div>
      <div slot="角色卡">

      </div>
      <div slot="選項">
        <button class="btn btn-danger" @click="deleteSession">{{ leaveOption }}</button>
      </div>
    </Tab>
  </div>
</template>

<script>
import Title from "@/components/Title";
import Tab from "@/components/Tab";
import api from "@/api";
export default {
  name: "SessionInfo",
  components: {Tab, Title},
  data() {
    return {
      Session:{},
    }
  },
  methods:{
    deleteSession(){
      api.deleteSession(this.$route.params.id)
      .then(res=>{
        api.getSessions()
            .then(sessions => {
              alert(res)
              this.$store.dispatch('setSession', sessions)
              this.$router.replace('/session')
            })
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  computed:{
    leaveOption(){
      if(this.$store.getters.getUser.name === this.Session.gm){
        return "解散"
      }else return "離開"
    }
  }
  ,
  created() {
    api.getSessionInfo(this.$route.params.id)
    .then(res=>{
      console.log(res)
      this.Session=res
      this.Session.player.shift()
    })
    .catch(()=> {
      this.$router.replace('/404')
    })
  }
}
</script>

<style scoped>
  .players{
    display: block;
  }
</style>
