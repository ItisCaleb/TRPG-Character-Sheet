<template>
  <div class="system-content" style="display: table">
    <div id="systems">
      <div @click="changeSystem('COC7th')" :class="{'systems-choose':isCurrent('COC7th')}" class="systems-title">
        <div class="systems-title-tile">
          COC7th
        </div>
      </div>
      <div @click="changeSystem('DND5e')" :class="{'systems-choose':isCurrent('DND5e')}" class="systems-title">
        <div class="systems-title-tile">
          DND5e
        </div>
      </div>
    </div>
    <div style="display: inline-block;text-align: center;padding: 4px;width: 100%">
      <Title>匯入角色卡</Title>
      <div class="systems-info">
        <Tab ref="tab" :page="getOption" style="width: 80%">
          <div slot="roll20">
            請輸入roll20的json角色卡
            <SheetTextArea v-model="json" style="height: 350px"></SheetTextArea>
          </div>
        </Tab>
      </div>

      <button :disabled="isCurrent('DND5e')" @click="importSheet" class="btn btn-primary">匯入</button>
      <br>
      <small style="color: red" v-if="small">{{ small }}</small>
    </div>
  </div>
</template>

<script>

import Title from "@/components/Title";
import SheetTextArea from "@/components/Sheet/SheetTextArea";
import Tab from "@/components/Tab";
import api from "@/api";

export default {
  name: "ImportSheet",
  components: {Tab, SheetTextArea, Title},
  data() {
    return {
      choose: "COC7th",
      json: "",
      txt: "",
      created: false,
      small: ""
    }
  },
  computed: {
    getOption() {
      switch (this.choose) {
        case "COC7th":
          return ["roll20"]
        case "DND5e":
          return ["roll20"]
        default :
          return ["roll20"]
      }
    }
  },
  methods: {
    changeSystem(name) {
      this.choose = name
    },
    isCurrent(name) {
      return this.choose === name
    },
    importSheet: function () {
      this.small = ""
      if (this.created) return
      this.created = true
      if (this.$refs.tab.currentPage === "roll20") {
        if (this.json.length === 0) {
          this.small = "請輸入角色卡"
          return
        }
        try {
          let json = JSON.parse(this.json)[0]
          console.log(json)
          if (json == undefined) {
            this.created = false
            this.small = "請輸入有效的json格式"
            return
          }
          api.importSheet('COC7th', 'roll20', json)
              .then(id => {
                console.log(id)
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
        } catch (err) {
          this.created = false
          this.small = "請輸入有效的json格式"
        }
      } else if (this.$refs.tab.currentPage === "悠子") {
        if (this.txt.length === 0) {
          this.small = "請輸入角色卡"
          return
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

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

.systems-title-tile:hover {
  animation-name: choose-mouse-hover;
  animation-iteration-count: 1;
  animation-duration: 0.1s;
}

.systems-title-tile:not(:hover) {
  animation-name: choose-mouse-leave;
  animation-iteration-count: 1;
  animation-duration: 0.1s;
}

@keyframes choose-mouse-hover {
  0% {
    background: #ffffff;
    color: #000000;
  }
  100% {
    background: #46A3FF;
    color: white;
  }
}

@keyframes choose-mouse-leave {
  0% {
    background: #46A3FF;
    color: white;
  }
  100% {
    background: #ffffff;
    color: #000000;
  }
}
</style>
