<template>
  <div v-if="success" style="text-align: center">
    <Title>團務-{{ Session.name }}</Title>
    <Msgbox ref="boxShow">
      <div id="box-content">
        <Title>
          上傳角色卡
          <button v-if="!noSheet" class="btn btn-primary" @click="uploadSheet">上傳</button>
        </Title>
        <h3 v-if="noSheet">{{ this.noSheet }}</h3>
        <div v-else>
          <table class="table" style="width: 100%;height: 100%;color: inherit">
            <tr>
              <td>角色卡</td>
              <td>系統</td>
              <td>選取</td>
            </tr>
            <tr v-for="sheet in sheets" :key="sheet._id" style="height: 100%; ">
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
    <button v-if="!Session.code" class="btn btn-primary" @click="createInvite">創造邀請連結</button>
    <button class="btn btn-primary" @click.prevent="loadSession">重新載入</button>
    <Load>
      <Tab style="text-align: center" :page="['資訊','玩家','選項']">
        <div slot="資訊">
          GM:{{ Session.gm }}<br>
          <p v-if="Session.code">邀請碼(有效期為七天)：{{ Session.code }}</p>
          <input id="code" type="hidden" :value="'https://trpgtoaster.net/session/link/'+Session.code">
          <button class="btn-primary btn" v-if="Session.code" @click="copyCode">複製邀請連結</button>
        </div>
        <div slot="玩家">
          <Tab style="width: 95%" :page=Session.player>
            <table v-for="(player,name) in Session.sheets" :key="name" :slot=name>
              <tr>
                <td>角色卡</td>
                <td>系統</td>
                <td>操作</td>
              </tr>
              <tbody v-for="sheet in player" :key="sheet._id">
              <tr class="link" v-if="sheet.access">
                <td @click="toSheet(sheet.info.system,sheet.info._id)">{{ minimizeName(sheet.info.name) }}</td>
                <td @click="toSheet(sheet.info.system,sheet.info._id)">{{ sheet.info.system }}</td>
                <td style="width: 20%" >
                  <button v-if="name===$store.getters.getUser.name" class="btn btn-danger" @click.prevent="removeSheet(sheet.info._id)">移除</button>
                  <button v-if="sheet.info.system === 'DND5e'" class="btn btn-primary" @mouseover="sheet.showCard = true" @mouseleave="sheet.showCard=false">卡片</button>
                </td>
              </tr>
              <tr style="color: lightgray" v-else>
                <td>{{ minimizeName(sheet.info.name) }}</td>
                <td>{{ sheet.info.system }}</td>
              </tr>
              <component v-if="sheet.info.system === 'DND5e'" v-show="sheet.showCard" class="card" :is="'DND5eCard'" v-bind="sheet"></component>
              <div v-show="sheet.showCard" @click="sheet.showCard=false"></div>
              </tbody>
            </table>
          </Tab>
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

import DND5eCard from "@/components/Sheet/DND5e/DND5eCard";

export default {
  name: "SessionInfo",
  components: {Msgbox, Load, Tab, Title,DND5eCard},
  data() {
    return {
      Session: {
        code:"",
        date:"",
        gm:"",
        player:[],
        sheets:{},
      },
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
                .then(() => {this.$router.replace('/session')})
          })
          .catch(err => {console.log(err.data)})
    },
    uploadSheet() {
      api.uploadSheet(this.selectSheet, this.$route.params.id)
          .then(() => {this.$router.go(0)})
          .catch(err => {console.log(err.data)})
    },
    removeSheet(id) {
      api.removeSheet(id, this.$route.params.id)
          .then(() => {this.$router.go(0)})
    },
    toSheet(system, url) {
      let route = this.$router.resolve({path: `/sheet/${system}/${url}`,query:{session:this.$route.params.id}});
      window.open(route.href, '_blank');
    },
    createInvite() {
      if (this.Session.code) return
      api.createInviteLink(this.$route.params.id)
          .then((res) => {this.Session.code = res})
    },
    setUploadSheet(){
      const user = this.$store.getters.getUser
      this.sheets = this.$store.getters.getSheet
      if (this.sheets.length === 0) this.noSheet = "你還未擁有角色卡"
      for (let i in this.Session.sheets[user.name]) {
        this.sheets = this.sheets.filter((s) => {
          return s.url !== this.Session.sheets[user.name][i].info._id
        })
      }
      if (this.sheets.length === 0) this.noSheet = "你的角色卡已經全部上傳了"
    },
    copyCode(){
      const code = document.getElementById('code')
      code.setAttribute('type','text')
      code.select()
      code.setSelectionRange(0,99999)
      document.execCommand('copy')
      code.setAttribute('type','hidden')
      window.getSelection().removeAllRanges()
    },
    appendCardShow(){
      for(let user in this.Session.sheets){
        for(let sheet of this.Session.sheets[user]){
          this.$set(sheet,"showCard",false)
        }
      }
    },
    minimizeName(name){
      if(name.length>10){
        return name.slice(0,10)+"..."
      }return name
    },
    loadSession(){
      api.getSessionInfo(this.$route.params.id)
          .then(async res => {
            this.$set(this,"Session",res)
            this.success = true
            this.setUploadSheet()
            this.appendCardShow()
          }).catch((err) => {
            console.log(err)
            this.$router.replace({name: 'NotFound', params: {'0': this.$route.fullPath}})
          })
    }
  },
  computed: {
    leaveOption() {
      if (this.$store.getters.getUser.name === this.Session.gm) {
        return "解散"
      } else return "離開"
    }
  },
  beforeMount() {
    this.loadSession()
    this.$socket.emit('joinSession', this.$route.params.id)
  }
}
</script>

<style scoped lang="scss">
.players {
  display: block;
}

.btn {
  margin: 1%;
}

#box-content {
  margin: 5%;
}

table {
  width: 100%;

}

td {
  font-size: 20px;
  padding: 1%;
  @include phone-width {
    font-size: 16px;
  }
}

.btn{
  @include phone-width {
    font-size: 12px;
  }
}

.card{
  position: fixed;
  top: 20%;
  left: 5%;
  width: 30%;
  @include phone-width{
    width: 60%;
  }
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
