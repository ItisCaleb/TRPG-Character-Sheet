<template>
  <Load v-if="success.all">
    <div>
      <Title>
        <span>{{ info.name || '無名' }}</span>
        <i :style="{color:getSuccessColor}" class="fa"
           :class="{'fa-check':success.upload,'fa-spinner fa-spin':!success.upload}"></i>
      </Title>

      <Tab class="tab" :page="['一般','背景','法術','選項']">

        <div slot="選項">
          檢視權限
          <select v-model="info.permission">
            <option>限團務GM</option>
            <option>團務所有人</option>
            <option>所有人</option>
          </select><br>
          <button class="btn btn-danger" @click="deleteSheet">刪除</button>
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

export default {
  name: "DND5e",
  components: {Tab, Load, Title},
  data() {
    return {
      info: {
        author: "",
        name: "",
        permission: "限團務GM"
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
            console.log(data)
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
    }
  },
  computed: {
    getSuccessColor() {
      if (this.success.upload) {
        return '#42b983'
      } else return '#28a1dc'
    }
  },
  sockets: {
    deleteSheet() {
      this.$store.dispatch('setSheet')
      this.$router.replace('/sheet')
    }
  },
  mounted() {
      console.log(this.$data)
      this.loadSheet()
      this.$socket.emit('joinSheet', this.$route.params.id)
  }
}
</script>

<style scoped>

</style>