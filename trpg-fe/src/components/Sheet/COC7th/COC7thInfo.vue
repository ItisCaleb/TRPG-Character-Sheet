<template>
  <div class="sheet-info">
    <table class="stat ta" style="width: 100%">
      <tr class="tr">
        <td class="td" v-for="(value,key) in stat.characteristic" :key="key">
          <table>
            <tr>
              <td class="td-font">{{ key }}</td>
              <td class="td-input">
                <SheetGridInput :view="view" type="number" @input="calStat(key)"
                                v-model.number="stat.characteristic[key]"></SheetGridInput>
              </td>
              <td class="td-cal">
                <table>
                  <tr>
                    <td>{{ Math.floor(value / 2) }}</td>
                  </tr>
                  <tr>
                    <td>{{ Math.floor(value / 5) }}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <COC7thSection title="調查員基本資料：">
      <SheetInput :view="view" :max="100" name="姓名" v-model="info.name"/>
      <SheetInput :view="view" :max="64" name="玩家" v-model="info.player_name"/>
      <SheetInput :view="view" :max="64" name="職業" v-model="story.class"/>
      <div class="two">
        <SheetInput :view="view" :max="64" name="年齡" v-model="story.age"/>
        <SheetInput :view="view" :max="64" name="性別" v-model="story.sex"/>
      </div>
      <SheetInput :view="view" :max="64" name="出生地" v-model="story.birthplace"/>
      <SheetInput :view="view" :max="64" name="現居地" v-model="story.residence"/>
    </COC7thSection>
    <COC7thSection title="調查員狀態：">
      <div style="display: flex">
        <div class="status">
          <div class="two">
            <SheetInput :view="view" :min="0" :max="getHpMax" name="HP" type="number"
                        v-model.number="stat.hp"></SheetInput>
            <div class="max">/{{ getHpMax }}</div>
            <SheetInput :view="view" :min="0" :max="getSanMax" name="SAN" type="number"
                        v-model.number="stat.san"></SheetInput>
            <div class="max">/{{ getSanMax }}</div>
          </div>
          <div class="two">
            <SheetInput :view="view" :min="0" :max="getMpMax" name="MP" type="number"
                        v-model.number="stat.mp"></SheetInput>
            <div class="max">/{{ getMpMax }}</div>
            <SheetInput :view="view" name="LUK" type="number" v-model.number="stat.luk"></SheetInput>
          </div>
          <div>傷害加成與體格(DB & Build)：{{ getDb }}</div>
          <div>機動力(MOV)：{{ calMov }}</div>
          <label>
            負傷狀態
            <select :disabled="view" v-model="stat.injured_status">
              <option selected="">無</option>
              <option>重傷</option>
              <option>瀕死</option>
              <option>暫時穩定</option>
            </select>
          </label>
          <label>
            瘋狂狀態
            <select :disabled="view" v-model="stat.injured_status">
              <option selected="">無</option>
              <option>臨時瘋狂</option>
              <option>不定性瘋狂</option>
              <option>潛在瘋狂</option>
            </select>
          </label>
        </div>
      </div>
      <div>
        <h4 style="font-weight: bold">調查員裝備：</h4>
        <SheetInput :view="view" :max="128" name="金錢" v-model="equip.money"></SheetInput>
        <SheetInput :view="view" :max="256" name="武器" v-model="equip.weapon"></SheetInput>
        <SheetTextArea :view="view" name="攜帶物品" :max="512" v-model="equip.equip" :height="110"></SheetTextArea>
      </div>
    </COC7thSection>
    <COC7thSection title="調查員形象：">
      <img v-if="avatar"
           style="margin-bottom: 5%;width: 100%;height: 100%"
           :src="`data:image/jpeg;base64,${avatar}`" alt="角色圖片"><br>
      <div :style="{'color':image_success.color}" v-if="image_success.msg">{{ image_success.msg }}</div>
      <div v-if="!view" style="margin-bottom: 5%" class="custom-file">
        <input ref="image" @change="previewImage" type="file" accept="image/*" class="custom-file-input">
        <label class="custom-file-label">{{ image_name }}</label>
      </div>
      <div v-if="!view" style="display: flex;justify-content: space-around">
        <button @click="uploadImage" style="margin-right: 5%" class="btn btn-primary">上傳圖片</button>
        <button @click="cancelImage" class="btn btn-primary">取消圖片</button>
      </div>
      <div></div>
    </COC7thSection>

  </div>

</template>

<script>
import SheetInput from "@/components/Sheet/SheetInput";
import api from "@/api";
import COC7thSection from "@/components/Sheet/COC7th/COC7thSection";
import SheetGridInput from "@/components/Sheet/SheetGridInput";
import SheetTextArea from "@/components/Sheet/SheetTextArea";

export default {
  name: "COC7thInfo",
  components: {SheetTextArea, SheetGridInput, COC7thSection, SheetInput},
  props: {
    info: {
      type: Object,
      required: true
    },
    stat: {
      type: Object,
      required: true
    },
    story: {
      type: Object,
      required: true
    },
    equip: {
      type: Object,
      required: true
    },
    mytho: {
      type: Number
    },
    view:{
      type:Boolean,
      default:false
    }
  },

  data() {
    return {
      avatar: "",
      image_name: "選擇圖片",
      image_success: {
        color: "",
        msg: ""
      }
    }
  },
  mounted() {
    api.getImage('COC7th', this.$route.params.id)
        .then(res => {
          this.avatar = res
        })
        .catch(err => {
          console.log(err)
        })
  },
  methods: {
    calStat(key) {
      let val = this.stat.characteristic[key]
      if (!val) {
        this.stat.characteristic[key] = 0
        return;
      }
      if (val > 100) {
        this.stat.characteristic[key] = 100;
      } else if (val < 0) this.stat.characteristic[key] = 0;
    },
    previewImage(event) {
      const image = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(image);
      const size = (image.size / 1024);
      console.log(size + "kb");
      reader.onload = (e) => {
        this.image_name = image.name;
        this.avatar = e.target.result.split(',').pop();
      }
    },
    cancelImage() {
      if (!this.avatar) return
      this.avatar = ""
      api.removeImage('COC7th', this.$route.params.id)
          .then(() => {
            this.image_success.msg = "成功移除"
            this.image_success.color = "#10a36a"
          })
          .catch(err => {
            this.image_success.msg = err
            this.image_success.color = "red"
          })
    },
    uploadImage() {
      const data = new FormData();
      data.append("file", this.$refs.image.files[0])
      api.uploadImage("COC7th", this.$route.params.id, data)
          .then(() => {
            this.image_success.msg = "上傳成功"
            this.image_success.color = "#10a36a"
          })
          .catch(err => {
            this.image_success.msg = err
            this.image_success.color = "red"
          })
    }
  },
  computed: {
    getHpMax() {
      return Math.floor((this.stat.characteristic.siz + this.stat.characteristic.con) / 10)
    },
    getMpMax() {
      return Math.floor(this.stat.characteristic.pow / 5)
    },
    calMov() {
      const dex = this.stat.characteristic.dex
      const str = this.stat.characteristic.str
      const siz = this.stat.characteristic.siz
      if (dex < siz && str < siz) {
        return 7
      } else if (dex > siz && str > siz) {
        return 9
      } else return 8
    },
    getDb() {
      const total = this.stat.characteristic.str + this.stat.characteristic.siz
      if (total >= 2 && total <= 64) return "-2 & -2"
      else if (total >= 64 && total <= 84) return "-1 & -1"
      else if (total >= 85 && total <= 124) return "0 & 0"
      else if (total >= 125 && total <= 164) return "+1d4 & 1"
      else if (total >= 165 && total <= 204) return "+1d6 & 2"
      else if (total >= 205 && total <= 284) return "+2d6 & 3"
      else return "請先填入屬性"
    },
    getSanMax() {
      return 99 - this.mytho
    }
  }
}
</script>

<style scoped lang="scss">

.two {
  display: flex;
  align-items: center;
}

.max {
  width: 10%;
  vertical-align: center;
  margin-bottom: 8px;
  margin-right: 8px;
}

.ta .tr .td {
  width: 12.5%;
  @include phone-width {
    width: 50%;
  }

  @include pad-width {
    width: 25%;
  }
  @include small-pad-width {
    width: 25%;
  }
  word-wrap: break-word;
  display: inline-block;
  margin-top: 2px;
}

.stat {
  flex: 1 1 auto;
  margin-bottom: 2%;
}

.td-font {

  font-size: 20px;
  font-weight: bold;
  text-align: center;
  width: 30%;
  @include pc-width {
    width: 50%;
  }
  @include big-pc-width {
    width: 50%;

  }
}

.td-input {
  border: 1px lightgray solid;
  border-right: none;
  padding: 0;
  height: 5px;
  width: 30%;

  input {
    border: none;
    padding: 0;
    text-align: center;
    height: 100%;
    width: 100%;
    box-shadow: none !important;
  }
}

.td-cal {
  padding: 0;
  border-collapse: collapse;
  width: 100%;
  height: 100%;

  tr {
    width: 100%;
  }

  td {
    margin: 0;
    border-collapse: collapse;
    padding: 0;
    border: 1px lightgray solid;
    width: 30px;
    text-align: center;
  }
}

.status {
  flex: 1 2 auto;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>
