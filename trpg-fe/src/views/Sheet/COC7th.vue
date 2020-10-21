<template>
  <Load v-show="success">
    <div>
      <Title><span>{{ info.name || '無名' }}</span></Title>
      <Tab class="tab" :page="['一般','背景','技能','選項']">
        <COC7thInfo ref="info" slot="一般">
        </COC7thInfo>
        <div slot="背景"></div>
        <div slot="技能">
          <Tab :page="[1,2,3]">
            <div slot="1"></div>
            <div slot="2"></div>
            <div slot="3"></div>
          </Tab>
        </div>
        <div slot="選項" v-if="$store.getters.getUser._id === info.author">
          <button class="btn btn-danger" @click="deleteSheet">刪除</button>
        </div>
      </Tab>
    </div>
  </Load>
</template>

<script>
import Title from "@/components/Title";
import Tab from "@/components/Tab";
import api from "@/api";
import COC7thInfo from "@/components/Sheet/COC7th/COC7thInfo";
import Load from "@/components/Load";

export default {
  name: "COC7th",
  components: {Load, COC7thInfo, Tab, Title},
  data() {
    return {
      info: "",
      success: false
    }
  },
  methods: {
    deleteSheet() {
      api.deleteSheet(this.$route.params.id)
          .then(res => {
            this.$store.dispatch('setSheet')
                .then(() => {
                  alert(res)
                  this.$router.replace('/sheet')
                })
          })
          .catch(err => {
            alert(err)
          })
    }
  },
  beforeCreate() {
    api.getSheetData(this.$route.params.id)
        .then(data => {
          this.info = data.info
          this.$refs.info.$data.info = data.info
          this.$refs.info.$data.stat = data.stat
          this.$refs.info.$data.story = data.story
          this.success = true
        })
        .catch(err => {
          console.log(err)
        })
  }
}
</script>

<style lang="scss">
.tab {
  width: 90% !important;

  input{
    font-size: 15px;
  }
}

</style>
