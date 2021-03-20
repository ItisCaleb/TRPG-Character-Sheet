<template>
  <div class="sheet-info">
    <div class="stat">
        <div class="stat-block" v-for="(value,key) in stat.characteristic" :key="key">
          <SheetGridInput :top="true" :right="true" :view="view" type="number" @input="calStat(key)"
                          v-model.number="stat.characteristic[key]">
            <span slot="top">{{key.toUpperCase()}}</span>
            <table class="td-cal" slot="right">
              <tr>
                <td style="border-bottom: 1px lightgray solid">{{ Math.floor(value / 2) }}</td>
              </tr>
              <tr>
                <td>{{ Math.floor(value / 5) }}</td>
              </tr>
            </table>
          </SheetGridInput>
        </div>
    </div>
    <SheetSection :title="$t('coc7th.char_info')">
      <SheetInput :view="view" :max="100" :name="$t('name')" v-model="info.name"/>
      <SheetInput :view="view" :max="64" :name="$t('player_name')" v-model="info.player_name"/>
      <SheetInput :view="view" :max="64" :name="$t('coc7th.class')" v-model="story.class"/>
      <div class="inline">
        <SheetInput :view="view" :max="64" :name="$t('age')" v-model="story.age"/>
        <SheetInput :view="view" :max="64" :name="$t('sex')" v-model="story.sex"/>
      </div>
      <SheetInput :view="view" :max="64" :name="$t('coc7th.birthplace')" v-model="story.birthplace"/>
      <SheetInput :view="view" :max="64" :name="$t('coc7th.residence')" v-model="story.residence"/>
    </SheetSection>
    <SheetSection :title="$t('coc7th.char_status')">
      <div style="display: flex">
        <div class="status">
          <div class="inline">
            <SheetInput :view="view" :min="0" :max="getHpMax" name="HP" type="number"
                        v-model.number="stat.hp"></SheetInput>
            <div class="max">/{{ getHpMax }}</div>
            <SheetInput :view="view" :min="0" :max="getSanMax" name="SAN" type="number"
                        v-model.number="stat.san"></SheetInput>
            <div class="max">/{{ getSanMax }}</div>
          </div>
          <div class="inline">
            <SheetInput :view="view" :min="0" :max="getMpMax" name="MP" type="number"
                        v-model.number="stat.mp"></SheetInput>
            <div class="max">/{{ getMpMax }}</div>
            <SheetInput :view="view" name="LUK" type="number" v-model.number="stat.luk"></SheetInput>
          </div>
          <div>{{ $t('coc7th.db_build') }}：{{ getDb }}</div>
          <div>{{ $t('coc7th.mov') }}：{{ calMov }}</div>
          <label>
            {{ $t('coc7th.injured_status') }}
            <select :disabled="view" v-model="stat.injured_status">
              <option value="none" selected>{{$t('none')}}</option>
              <option value="injured1">{{ $t('coc7th.injured1') }}</option>
              <option value="injured2">{{ $t('coc7th.injured2') }}</option>
              <option value="injured3">{{ $t('coc7th.injured3') }}</option>
            </select>
          </label>
          <label>
            {{ $t('coc7th.insane_status') }}
            <select :disabled="view" v-model="stat.insane_status">
              <option value="none" selected>{{$t('none')}}</option>
              <option value="insane1">{{ $t('coc7th.insane1') }}</option>
              <option value="insane2">{{ $t('coc7th.insane2') }}</option>
              <option value="insane3">{{ $t('coc7th.insane3') }}</option>
            </select>
          </label>
        </div>
      </div>
      <div>
        <h4 style="font-weight: bold">{{ $t('coc7th.char_equip') }}</h4>
        <SheetInput :view="view" :max="128" :name="$t('coc7th.money')" :val="equip.cash" v-model="equip.cash"></SheetInput>
        <SheetTextArea :view="view" :max="256" :name="$t('coc7th.weapon')" :val="equip.weapon" v-model="equip.weapon"
                       style="height: 170px;margin-bottom: 10%"></SheetTextArea>
        <SheetTextArea :view="view" :name="$t('coc7th.equip')" :max="512" :val="equip.equip" v-model="equip.equip"
                       style="height: 170px;margin-bottom: 7%"></SheetTextArea>
      </div>
    </SheetSection>
    <SheetSection :title="$t('coc7th.char_image')">
      <img v-if="avatar"
           style="margin-bottom: 5%;width: 100%;height: 100%"
           :src="`data:image/jpeg;base64,${avatar}`" alt="角色圖片"><br>
      <div :style="{'color':image_success.color}" v-if="image_success.msg">{{ image_success.msg }}</div>
      <div v-if="!view" style="margin-bottom: 5%" class="custom-file">
        <input ref="image" @change="previewImage" type="file" accept="image/*" class="custom-file-input">
        <label class="custom-file-label">{{ image_name }}</label>
      </div>
      <div v-if="!view" style="display: flex;justify-content: space-around">
        <button @click="uploadImage" style="margin-right: 5%" class="btn btn-primary">{{ $t('upload_image') }}</button>
        <button @click="cancelImage" class="btn btn-primary">{{ $t('cancel_image') }}</button>
      </div>
      <div></div>
    </SheetSection>

  </div>

</template>

<script>
import SheetInput from "@/components/Sheet/SheetInput";
import api from "@/api";
import SheetSection from "@/components/Sheet/SheetSection";
import SheetGridInput from "@/components/Sheet/SheetGridInput";
import SheetTextArea from "@/components/Sheet/SheetTextArea";

export default {
  name: "COC7thInfo",
  components: {SheetTextArea, SheetGridInput, SheetSection, SheetInput},
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
    view: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      avatar: "",
      image_name: this.$t('select_image'),
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
      this.image_success.msg = ""
      this.image_success.color = ""
      const image = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(image);
      const size = (image.size / 1024);
      if (size > 1000) {
        this.image_success.msg = "你的圖片太大了!上限是1mb"
        this.image_success.color = "red"
        return
      }
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
      var reader = new FileReader();
      try {
        reader.readAsDataURL(this.$refs.image.files[0]);
        reader.onload = (e) => {
          this.image_name = this.$refs.image.files[0].name;
          this.avatar = e.target.result.split(',').pop();
        }
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
      } catch (err) {
        this.image_success.msg = '請先選取圖片'
        this.image_success.color = "red"
      }

    }
  },
  computed: {
    getHpMax() {
      return Math.floor((parseInt(this.stat.characteristic.siz) + parseInt(this.stat.characteristic.con)) / 10)
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

.inline {
  display: flex;
  align-items: center;
}

.max {
  width: 10%;
  vertical-align: center;
  margin-bottom: 8px;
  margin-right: 8px;
}

.stat-block {
  width: 10%;
  @include phone-width {
    width: 40%;
  }

  @include pad-width {
    width: 10%;
  }
  @include small-pad-width {
    width: 10%;
  }
  word-wrap: break-word;
  display: inline-block;
  margin: 2px 1px 0 1px ;
}

.stat {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2%;
  justify-content: space-around;
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
