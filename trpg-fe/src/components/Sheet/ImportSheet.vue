<template>
  <div class="system-content" style="display: table">
    <div id="systems">
      <div :class="{'systems-choose':isCurrent('COC7th')}" class="systems-title" @click="changeSystem('COC7th')">
        <div class="systems-title-tile">
          COC7th
        </div>
      </div>
      <div :class="{'systems-choose':isCurrent('COC6th')}" class="systems-title" @click="changeSystem('COC6th')">
        <div class="systems-title-tile">
          COC6th
        </div>
      </div>
    </div>
    <div style="display: inline-block;text-align: center;padding: 4px;width: 100%">
      <Title>匯入角色卡</Title>
      <div class="systems-info">
        <Tab ref="tab" :page="getOption" style="width: 80%">
          <div slot="roll20">
            請輸入roll20的json角色卡
            <SheetTextArea v-model="data" style="height: 275px"></SheetTextArea>
          </div>
          <div slot="冷嵐的COC6th自動角卡">
            請輸入自動角卡網址
            <SheetInput v-model="data"></SheetInput>
          </div>
        </Tab>
      </div>
      <button class="btn btn-primary" @click="importSheet">匯入</button>
      <br>
      <small v-if="small" style="color: red">{{ small }}</small>
    </div>
  </div>
</template>

<script>

import Title from "@/components/Title";
import SheetTextArea from "@/components/Sheet/SheetTextArea";
import Tab from "@/components/Tab";
import api from "@/api";
import SheetInput from "@/components/Sheet/SheetInput";

export default {
  name: "ImportSheet",
  components: {SheetInput, Tab, SheetTextArea, Title},
  data() {
    return {
      choose: "COC7th",
      type: "",
      data: "",
      created: false,
      small: ""
    }
  },
  computed: {
    getOption() {
      switch (this.choose) {
        case "COC7th":
          return ["roll20"]
        case "COC6th":
          return ["冷嵐的COC6th自動角卡"]
        default:
          return ""
      }
    }
  },
  methods: {
    changeSystem(name) {
      this.choose = name
      switch (name) {
        case "COC7th":
          this.$refs.tab.currentPage = "roll20"
          break
        case "COC6th":
          this.$refs.tab.currentPage = "冷嵐的COC6th自動角卡"
          break
      }
    },
    isCurrent(name) {
      return this.choose === name
    },
    importSheet: function () {
      this.small = ""
      if (this.created) return
      this.created = true
      if (this.$refs.tab.currentPage === "roll20") {
        if (this.data.length === 0) {
          this.small = "請輸入角色卡"
          return
        }
        try {
          let json = JSON.parse(this.data)[0]
          if (json == undefined) {
            this.created = false
            this.small = "請輸入有效的json格式"
          }
          this.type = "roll20"
        } catch (err) {
          this.created = false
          this.small = "請輸入有效的json格式"
        }
      } else if (this.$refs.tab.currentPage === "冷嵐的COC6th自動角卡") {
        if (this.data.length === 0) {
          this.small = "請輸入角色卡"
          return
        }
        this.type = "lltrpg"
      }
      api.importSheet(this.choose, this.type, {data: this.data})
          .then(id => {
            this.$store.dispatch('setSheet')
                .then(() => {
                  this.created = false
                  this.$router.replace(`/sheet/${this.choose}/${id}`)
                })
                .catch(err => {
                  this.small = err
                  this.created = false
                })
          })
          .catch((err) => {
            this.small = err
            this.created = false
          })
    }
  }
}
</script>

<style lang="scss" scoped>

#systems {
  vertical-align: top;
  width: 30%;
  text-align: center;
  display: table-cell;
  border-right: 1px solid lightgray;
  border-collapse: collapse;
}

.system-content {
  width: 100%;
}

#name {
  width: 200px;
  @include phone-width {
    width: 170px;
  }
}

.systems-title {
  text-align: center;
  font-size: 23px;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid lightgray;
}

.systems-title-tile {
  padding: 3px;
  cursor: pointer;

}

.systems-title-tile:hover {
  background: #46A3FF;
  color: white;
}

.systems-picture {
  max-width: 400px;
  @include phone-width {
    max-width: 100%;
  }
}

.system-text {
  font-size: 20px;
  @include phone-width {
    font-size: 14px;
  }
}

.systems-choose {
  border-left: 3px solid #4CAF50;
}

</style>
