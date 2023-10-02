<template>
  <Load v-if="success.all">
    <div>
      <Title>
        <span>{{ config.props.info.name || '無名' }}</span>
        <i :style="{color:getSuccessColor}" class="fa"
        :class="{'fa-check':success.upload,'fa-spinner fa-spin':!success.upload}"></i>
      </Title>

      <Tab class="tab" :page="[...getPages,'note','option']">
        <component v-for="page in config.pages" :key="page.name" :is="page.component" v-bind="config.props"
        :slot="page.name">
        </component>
        <SheetNote v-if="success.all" slot="note" :story="config.props.story"></SheetNote>
        <div slot="option">
          {{$t('viewPermission')}}
          <select v-model="config.props.info.permission">
            <option value="限團務GM">{{$t('sessionGM')}}</option>
            <option value="團務所有人">{{$t('sessionPlayer')}}</option>
            <option value="所有人">{{ $t('allPeople') }}</option>
          </select><br>
          <ChangeLang/>
          <input id="code" type="hidden" :value="`https://trpgtoaster.net/sheet/${$route.params.system}/${$route.params.id}`">
          <button class="btn-primary btn" @click="copyCode">{{$t('copyLink')}}</button>
          <button class="btn-primary btn" style="margin-left: 1%" @click.prevent="downloadSheet">{{$t('downloadJSON')}}</button><br>
          <button class="btn btn-danger" @click="$refs.deleteBox.show=true">{{$t('delete')}}</button>
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
import systemConfig from "@/views/Sheet/systemConfig";
import debounce from "lodash.debounce"
import Msgbox from "@/components/Msgbox";
import ChangeLang from "@/components/Sheet/ChangeLang";
import SheetNote from "@/components/Sheet/SheetNote";

import COC7thInfo from "@/components/Sheet/COC7th/COC7thInfo";
import COC7thBackground from "@/components/Sheet/COC7th/COC7thBackground";
import COC7thSkill from "@/components/Sheet/COC7th/COC7thSkill"
import COC6thInfo from "@/components/Sheet/COC6th/COC6thInfo";
import COC6thEquip from "@/components/Sheet/COC6th/COC6thEquip";
import COC6thSkill from "@/components/Sheet/COC6th/COC6thSkill";
import COC6thBackground from "@/components/Sheet/COC6th/COC6thBackground";
import DND5eInfo from "@/components/Sheet/DND5e/DND5eInfo";
import DND5eStory from "@/components/Sheet/DND5e/DND5eStory";
import DND5eEquip from "@/components/Sheet/DND5e/DND5eEquip";
import DND5eSpell from "@/components/Sheet/DND5e/DND5eSpell";

export default {
  name: "SheetEdit",
  components: {SheetNote, ChangeLang, Msgbox, Load, Tab, Title,
    COC7thInfo, COC7thSkill, COC7thBackground,
    COC6thInfo, COC6thEquip, COC6thSkill, COC6thBackground,
    DND5eInfo, DND5eStory,DND5eEquip,DND5eSpell},
  data() {
    return {
      config : {
        pages:{},
        props:{}
      },
      success: {
        all: false,
        not_init: false,
        upload: true
      },
    }
  },
  mounted() {
    this.loadSheet()
    this.loadSession()
    this.$socket.emit('joinSheet', this.$route.params.id)
  },
  updated() {
    this.success.not_init = true
  },
  methods: {
    loadSheet() {
      api.getSheetData(this.$route.params.id)
          .then(data => {
            let system = data.info.system
            this.$set(this,"config",systemConfig[system])
            if(this.$route.params.system!==system){
              this.$router.replace(`/sheet/${system}/${this.$route.params.id}`)
            }
            for(let key of Object.keys(this.config.props)){
              this.config.props[key] = Object.assign({},data[key])
            }
            document.title = `TRPG Toaster · ${system} · ${this.config.props.info.name}`
            this.addWatcher()
            this.success.all = true
          })
          .catch((err) => {
            console.log(err.data)
            this.$router.replace('/sheet')
          })
    },
    downloadSheet(){
      let json = JSON.stringify(this.config.props,null,2)
      const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = this.config.props.info.name+".json"
      link.click()
      URL.revokeObjectURL(link.href)
    },
    addWatcher(){
      for (let key of Object.keys(this.config.props)){
        this.$watch("config.props."+key,(newValue)=>{
            if(this.success.not_init){
              this.socketInput(newValue, key)
              this.success.upload = false
              this.updateSheet(this.config.props)
            }
        },{deep:true})
      }
    },
    updateSheet: debounce(function (sheet) {
      api.editSheet(this.$route.params.id, sheet)
          .then(() => {
            this.success.upload = true
          })
          .catch(err => {
            console.log(err.data)
          })
    }, 2000),
    socketInput: debounce(function (data, key) {
      this.$socket.emit('clientInput', data, key, this.$route.params.id)
    }, 2000),
    $withoutWatchers(cb) {
      const watchers = this._watchers.map((watcher) => ({cb: watcher.cb, sync: watcher.sync}))
      for (let index in this._watchers) {
        this._watchers[index] = Object.assign(this._watchers[index], {cb: () => null, sync: true})
      }
      cb()
      for (let index in this._watchers) {
        this._watchers[index] = Object.assign(this._watchers[index], watchers[index])
      }
    },
    copyCode() {
      const code = document.getElementById('code')
      code.setAttribute('type', 'text')
      code.select()
      code.setSelectionRange(0, 99999)
      document.execCommand('copy')
      code.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
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
            alert(err.data)
          })
    },
    loadSession() {
      if (this.$route.query.session)
        api.getSessionInfo(this.$route.query.session)
            .then(session => {
              this.session=session
            })
    },
  },
  computed:{
    getSuccessColor() {
      if (this.success.upload) {
        return '#42b983'
      } else return '#28a1dc'
    },
    getPages(){
      let arr = []
      for(let page of this.config.pages){
        arr.push(page.name)
      }
      return arr
    }
  },
  beforeRouteEnter(to, from, next) {
    if(!systemConfig[to.params.system])
      return next('/sheet')
    api.checkSheetAccess(to.params.id,to.query.session)
        .then(perm => {
          switch (perm) {
            case "author":
              next()
              break
            case "view":
              next({name: "SheetView", params: {id: to.params.id,system:to.params.system}})
              break
            case "noPerm":
              next('/sheet')
              break
          }
        }).catch(err=>{
          if(err.status === 404){
            next({name: 'NotFound', params: {'0': to.fullPath}})
          }
    })
  },
  sockets: {
    syncInput(data) {
      this.$withoutWatchers(() => {
        this.config.props[data[1]] = data[0]
      })
    },
    deleteSheet() {
      this.$store.dispatch('setSheet')
      this.$router.replace('/sheet')
    },
    reconnect() {
      this.$data.success.not_init = false
      this.$socket.emit('joinSheet', this.$route.params.id)
      this.loadSheet()
    }
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
