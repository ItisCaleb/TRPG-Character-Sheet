<template>
  <div class="sheet-info">
    <div class="stat">
      <div v-for="(value,key) in stat.characteristic" :key="key" class="stat-block">
        <SheetGridInput v-model.number="stat.characteristic[key]" :max="20" :top="true" :view="view"
                        type="number" @input="calStat(key)">
          <span slot="top">{{ key.toUpperCase() }}</span>
        </SheetGridInput>
      </div>
    </div>
    <SheetSection :title="$t('coc6th.char_info')">
      <SheetInput v-model="info.name" :max="100" :name="$t('name')" :view="view"/>
      <SheetInput v-model="info.player_name" :max="64" :name="$t('player_name')" :view="view"/>
      <SheetInput v-model="story.class" :max="64" :name="$t('coc6th.class')" :view="view"/>
      <div class="inline">
        <SheetInput v-model="story.age" :max="64" :name="$t('age')" :view="view"/>
        <SheetInput v-model="story.sex" :max="64" :name="$t('sex')" :view="view"/>
      </div>
      <SheetInput v-model="story.degree" :max="64" :name="$t('coc6th.degree')" :view="view"/>
      <SheetInput v-model="story.birthplace" :max="64" :name="$t('coc6th.birthplace')" :view="view"/>
      <SheetInput v-model="story.residence" :max="64" :name="$t('coc6th.residence')" :view="view"/>
      <SheetInput v-model="story.mental" :max="64" :name="$t('coc6th.mental')" :view="view"/>
    </SheetSection>
    <SheetSection :title="$t('coc6th.char_status')">
      <div style="display: flex">
        <div class="status">
          <div class="inline">
            <SheetInput v-model.number="stat.hp" :max="getHpMax" :min="0" :view="view" name="HP"
                        type="number"></SheetInput>
            <div class="max">/{{ getHpMax }}</div>
            <SheetInput v-model.number="stat.san" :max="getSanMax" :min="0" :view="view" name="SAN"
                        type="number"></SheetInput>
            <div class="max">/{{ getSanMax }}</div>
          </div>
          <div class="inline">
            <SheetInput v-model.number="stat.mp" :max="getMpMax" :min="0" :view="view" name="MP"
                        type="number"></SheetInput>
            <div class="max">/{{ getMpMax }}</div>
          </div>
          <div>{{ $t('coc6th.db_build') }}：{{ getDb }}</div>
          <div>{{ $t('coc6th.luk') }}: {{ getStats(stat.characteristic.pow) }}</div>
          <div>{{ $t('coc6th.idea') }}：{{ getStats(stat.characteristic.int) }}</div>
          <div>{{ $t('coc6th.know') }}：{{ getStats(stat.characteristic.edu) }}</div>
        </div>
      </div>
    </SheetSection>
    <SheetSection :title="$t('coc6th.char_image')">
      <img v-if="avatar"
           :src="`data:image/jpeg;base64,${avatar}`"
           alt="角色圖片" style="margin-bottom: 5%;width: 100%;height: 100%"><br>
      <div v-if="image_success.msg" :style="{'color':image_success.color}">{{ image_success.msg }}</div>
      <div v-if="!view" class="custom-file" style="margin-bottom: 5%">
        <input ref="image" accept="image/*" class="custom-file-input" type="file" @change="previewImage">
        <label class="custom-file-label">{{ image_name }}</label>
      </div>
      <div v-if="!view" style="display: flex;justify-content: space-around">
        <button class="btn btn-primary" style="margin-right: 5%" @click="uploadImage">{{ $t('upload_image') }}</button>
        <button class="btn btn-primary" @click="cancelImage">{{ $t('cancel_image') }}</button>
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

export default {
  name: "COC6thInfo",
  components: { SheetGridInput, SheetSection, SheetInput},
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
    skills:{
      type: Object,
      required: true
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
    api.getImage('COC6th', this.$route.params.id)
        .then(res => {
          this.avatar = res
        })
        .catch(err => {
          console.log(err.data)
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
            this.image_success.msg = err.data
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
        api.uploadImage("COC6th", this.$route.params.id, data)
            .then(() => {
              this.image_success.msg = "上傳成功"
              this.image_success.color = "#10a36a"
            })
            .catch(err => {
              this.image_success.msg = err.data
              this.image_success.color = "red"
            })
      } catch (err) {
        this.image_success.msg = '請先選取圖片'
        this.image_success.color = "red"
      }
    },
    getStats(stat) {
      return (stat * 5 > 99) ? 99 : stat * 5
    }
  },
  computed: {
    getHpMax() {
      return Math.ceil((parseInt(this.stat.characteristic.siz) + parseInt(this.stat.characteristic.con)) / 2)
    },
    getMpMax() {
      return this.stat.characteristic.pow
    },
    getDb() {
      const total = this.stat.characteristic.str + this.stat.characteristic.siz
      if (total >= 2 && total <= 12) return " -1d6"
      else if (total >= 13 && total <= 16) return "-1d4"
      else if (total >= 17 && total <= 24) return "0"
      else if (total >= 25 && total <= 32) return "+1d4"
      else if (total >= 33 && total <= 40) return "+1d6"
      else if (total >= 41 && total <= 56) return "+2d6"
      else if (total >= 57 && total <= 72) return "+3d6"
      else return "請先填入屬性"
    },
    getSanMax() {
      return 99 - this.mytho
    },
    mytho() {
      if (!this.skills.skill) return 0
      if (!this.skills.skill["Cthulhu Mythos"]) return 0
      else {
        let total = 0
        for (let type in this.skills.skill["Cthulhu Mythos"]) {
          total += parseInt(this.skills.skill["Cthulhu Mythos"][type])
        }
        return total
      }
    }
  }
}
</script>

<style lang="scss" scoped>

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
  margin: 2px 1px 0 1px;
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
