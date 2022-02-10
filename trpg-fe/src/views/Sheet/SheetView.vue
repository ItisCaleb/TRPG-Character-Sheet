<template>
  <Load v-if="success.all">
    <div>
      <Title>
        <span>{{ config.props.info.name || '無名' }}</span>
      </Title>
      <Tab class="tab" :page="[...getPages,'note','option']">
        <component  v-for="page in config.pages" :key="page.name" :is="page.component" v-bind="config.props"
                   view :slot="page.name">
        </component>
        <SheetNote v-if="success.all" slot="note" :story="config.props.story"></SheetNote>
        <div slot="option">
          <ChangeLang/>
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
import Msgbox from "@/components/Msgbox";
import ChangeLang from "@/components/Sheet/ChangeLang";
import SheetNote from "@/components/Sheet/SheetNote";

import COC7thInfo from "@/components/Sheet/COC7th/COC7thInfo";
import COC7thBackground from "@/components/Sheet/COC7th/COC7thBackground";
import COC7thSkill from "@/components/Sheet/COC7th/COC7thSkill"
import COC6thInfo from "@/components/Sheet/COC6th/COC6thInfo";
import COC6thBackground from "@/components/Sheet/COC6th/COC6thBackground";
import COC6thEquip from "@/components/Sheet/COC6th/COC6thEquip";
import COC6thSkill from "@/components/Sheet/COC6th/COC6thSkill";
import DND5eInfo from "@/components/Sheet/DND5e/DND5eInfo";
import DND5eStory from "@/components/Sheet/DND5e/DND5eStory";
import DND5eEquip from "@/components/Sheet/DND5e/DND5eEquip";
import DND5eSpell from "@/components/Sheet/DND5e/DND5eSpell";

export default {
  name: "SheetView",
  components: {SheetNote, ChangeLang, Msgbox, Load , Tab, Title,
    COC7thInfo, COC7thSkill, COC7thBackground,
    COC6thInfo, COC6thEquip, COC6thSkill, COC6thBackground,
    DND5eInfo, DND5eStory,DND5eEquip,DND5eSpell
  },
  data() {
    return {
      config : {
        pages:{},
        props:{}
      },
      success: {
        all: false,
      },
    }
  },
  mounted() {
    this.$set(this,"config",systemConfig[this.$route.params.system])
    this.loadSheet()
    this.loadSession()
    this.$socket.emit('joinSheet', this.$route.params.id)
  },
  methods: {
    loadSheet() {
      api.getSheetData(this.$route.params.system, this.$route.params.id)
          .then(data => {
            document.title = `TRPG Toaster · ${this.config.props.info.system} · ${this.config.props.info.name}`
            for(let key of Object.keys(this.config.props)){
              this.config.props[key] = data[key]
            }
            this.success.all = true
          })
          .catch((err) => {
            console.log(err)
            this.$router.replace('/sheet')
          })
    },
    loadSession() {
      if (this.$route.query.session)
        api.getSessionInfo(this.$route.query.session)
            .then(session => {
              console.log(session)
              this.session=session
            })
    },
  },
  computed:{
    getPages(){
      let arr = []
      for(let page of this.config.pages){
        arr.push(page.name)
      }
      return arr
    }
  },
  sockets: {
    syncInput(data) {
        this.config.props[data[1]] = data[0]
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
