<template>
  <div style="text-align: center">
    <Title>角色卡</Title>
    <div>
      <button class="btn btn-primary box-btn" @click="$refs.createBox.$data.show=true">創建角色卡</button>
    </div>
    <Msgbox ref="createBox">
      <ChooseSystem></ChooseSystem>
    </Msgbox>
    <Tab :page="['COC7th','COC6th','DND5e']" style="text-align: center">
      <div slot="COC7th">
        <div v-if="!sheetInfos.COC7thExist">{{ COC7thFound }}</div>
        <table v-else>
          <tr>
            <th>角色名稱</th>
            <th>玩家名稱</th>
          </tr>
          <tr class="sheets" v-for="sheet in sheetInfos.COC7th" @click="toSheet('COC7th',sheet.url)" :key="sheet.name">
            <td>{{ sheet.name }}</td>
            <td>{{ sheet.player }}</td>
          </tr>
        </table>
      </div>
      <div slot="COC6th">
        <div v-if="!sheetInfos.COC6thExist">{{ COC6thFound }}</div>
        <table v-else>
          <tr>
            <th>角色名稱</th>
            <th>玩家名稱</th>
          </tr>
          <tr class="sheets" v-for="sheet in sheetInfos.COC6th" @click="toSheet('COC6th',sheet.url)" :key="sheet.name">
            <td>{{ sheet.name }}</td>
            <td>{{ sheet.player }}</td>
          </tr>
        </table>
      </div>
      <div slot="DND5e">
        <div v-if="!sheetInfos.DND5eExist">{{ DND5eFound }}</div>
        <table v-else>
          <tr>
            <th>角色名稱</th>
            <th>玩家名稱</th>
          </tr>
          <tr class="sheets" v-for="sheet in sheetInfos.DND5e" @click="toSheet('DND5e',sheet.url)" :key="sheet.name">
            <td>{{ sheet.name }}</td>
            <td>{{ sheet.player }}</td>
          </tr>
        </table>
      </div>
    </Tab>
  </div>
</template>

<script>
import Tab from "@/components/Tab";
import Title from "@/components/Title";
import Msgbox from "@/components/Msgbox";
import ChooseSystem from "@/components/Sheet/ChooseSystem";


export default {
  name: "Sheet",
  components: {ChooseSystem, Msgbox, Title, Tab},
  data() {
    return {
      sheet: "",
      sheetInfos:{
        COC7th: [],
        COC6th: [],
        DND5e: [],
        COC7thExist: false,
        COC6thExist: false,
        DND5eExist: false
      },
      createBoxShow: false
    }
  },
  methods: {
    toSheet(system,url) {
      this.$router.push(`/sheet/${system}/${url}`)
    },
    showSheet(){
      Object.assign(this.$data.sheetInfos , this.$options.data().sheetInfos)
      this.sheet = this.getSheet
      if (this.sheet === 'NotFound') return
      for (let item of this.sheet) {
        switch (item.system) {
          case 'COC7th':
            this.sheetInfos.COC7th.push(item)
            this.sheetInfos.COC7thExist = true
            break
          case 'COC6th':
            this.sheetInfos.COC6th.push(item)
            this.sheetInfos.COC6thExist = true
            break
          case 'DND5e':
            this.sheetInfos.DND5e.push(item)
            this.sheetInfos.DND5eExist = true
            break
        }
      }
    }
  },
  watch:{
    getSheet:{
      handler(){
        this.showSheet()
      },
      deep:true
    }
  },
  mounted() {
    this.showSheet()
  },
  computed: {
    getSheet(){
      return this.$store.getters.getSheet
    },
    COC7thFound() {
      if (!this.sheetInfos.COC7thExist) {
        return '你沒有COC7th的角色卡'
      } else return ''
    },
    DND5eFound() {
      if (!this.sheetInfos.DND5eExist) {
        return '你沒有DND5e的角色卡'
      } else return ''
    },
    COC6thFound() {
      if (!this.sheetInfos.COC6thExist) {
        return '你沒有COC6th的角色卡'
      } else return ''
    }
  }

}
</script>

<style scoped lang="scss">

.sheets{
  cursor: pointer;
  &:hover{
    border-left: #42b983 solid 5px;
  }
}
.box-btn{
  margin: auto 2% auto 2%;
}

table {
  width: 100%;
}

td, th {
  border: 1px solid lightgray;
  height: 100%;
  border-collapse: collapse;
  padding: .75rem;
  @include phone-width {
    font-size: 14px;
  }
}

td {
  @include phone-width {
    font-size: 14px;
  }
}

th {
  font-size: 25px;
  @include phone-width {
    font-size: 20px;
  }
}


</style>
