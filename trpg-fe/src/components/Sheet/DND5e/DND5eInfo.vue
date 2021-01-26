<template>
  <div>
    <div class="stat">
      <div class="stat-block" v-for="(value,key) in stat.stat" :key="key">
        <SheetGridInput :top="true" :down="true" :view="view" type="number"
                        v-model.number="stat.stat[key]">
          <span slot="top">{{ key }}</span>
          <span slot="down">{{ Math.floor((value - 10) / 2) }}</span>
        </SheetGridInput>
      </div>
    </div>
    <SheetSection title="冒險者資料：">
      <SheetInput :view="view" :max="100" name="姓名" v-model="info.name"/>
      <SheetInput :view="view" :max="64" name="玩家" v-model="info.player_name"/>
      <SheetInput :view="view" :max="20" name="職業" v-model="story.class"/>
      <div class="inline">
        <SheetInput :view="view" :max="20" name="等級" v-model="story.level"/>
        <SheetInput :view="view" :max="20" name="經驗" v-model="story.exp"/>
      </div>
      <SheetInput :view="view" :max="20" name="陣營" v-model="story.faction"/>
      <SheetInput :view="view" :max="20" name="種族" v-model="story.race"/>
      <SheetInput :view="view" :max="20" name="背景" v-model="story.background"/>
    </SheetSection>
    <SheetSection title="冒險者狀態：">
      <div class="inline">
        <SheetGridInput :down="true" style="margin: 2%" :view="view" type="number" v-model="stat.armorValue">
          <span slot="down">護甲值</span>
        </SheetGridInput>
        <SheetGridInput :down="true" style="margin: 2%" :view="view" type="number" v-model.number="stat.initiative">
          <span slot="down">先攻值</span>
        </SheetGridInput>
        <SheetGridInput :down="true" style="margin: 2%" :view="view" type="number" v-model="stat.speed">
          <span slot="down">速度</span>
        </SheetGridInput>
      </div>
      <SheetGridInput :down="true" :right="true" :left="true" style="margin: 2%" :view="view" type="number"
                      v-model.number="stat.hp">
        <input :readonly="view" @input="calMinMax('temp_hp',0,256)" type="number" slot="left"
               v-model.number="stat.temp_hp">
        <input :readonly="view" @input="calMinMax('max_hp',0,256)" type="number" slot="right"
               v-model.number="stat.max_hp">
        <span slot="down">臨時生命/生命值/最大生命</span>
      </SheetGridInput>
      <div class="inline">
        <SheetGridInput :down="true" :right="true" style="margin: 2%" :view="view" type="number"
                        v-model.number="stat.hit_dice">
          <input type="number" slot="right" v-model.number="stat.hit_dice_total">
          <span slot="down">生命骰/總生命骰</span>
        </SheetGridInput>
        <div style="text-align: center;width: 100%">
          成功
          <select :readonly="view" v-model="death_save.success">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select><br>
          失敗
          <select :readonly="view" v-model="death_save.fail">
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select><br>
          <span style="font-size: 14px;font-weight: bold">死亡豁免</span>
        </div>
      </div>
      <table style="width: 96%;margin: 2%">
        <tr style="border: 1px lightgray solid;text-align: center;font-size: 14px;font-weight: bold">
          <td>攻擊&法術</td>
        </tr>
        <tr style="border: 1px lightgray solid">
          <td><input class="attack" @input="calLength('first',30)" placeholder="攻擊" v-model="equip.attack.first"
                     type="text"></td>
        </tr>
        <tr style="border: 1px lightgray solid">
          <td><input class="attack" @input="calLength('second',30)" placeholder="攻擊" v-model="equip.attack.second"
                     type="text"></td>
        </tr>
        <tr style="border: 1px lightgray solid">
          <td><input class="attack" @input="calLength('third',30)" placeholder="攻擊" v-model="equip.attack.third"
                     type="text"></td>
        </tr>
        <tr style="border: 1px lightgray solid">
          <td><textarea placeholder="法術" @input="calLength('spells',150)" v-model="equip.attack.spell"
                        style="border: none;outline: none;width: 100%;height: 120px;resize: none"></textarea></td>
        </tr>
      </table>
    </SheetSection>
    <SheetSection title="冒險者形象：">
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
    </SheetSection>
  </div>
</template>

<script>
import SheetSection from "@/components/Sheet/SheetSection";
import SheetInput from "@/components/Sheet/SheetInput";
import SheetGridInput from "@/components/Sheet/SheetGridInput";
import api from "@/api";

export default {
  name: "DND5eInfo",
  components: {SheetGridInput, SheetInput, SheetSection},
  props: {
    info: {
      type: Object,
      required: true,
    },
    stat: {
      type: Object,
      required: true
    },
    equip: {
      type: Object,
      required: true
    },
    story: {
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
      death_save: {
        success: "0",
        fail: "0"
      },
      avatar: "",
      image_name: "選擇圖片",
      image_success: {
        color: "",
        msg: ""
      }
    }
  },
  mounted() {
    api.getImage('DND5e', this.$route.params.id)
        .then(res => {
          this.avatar = res
          this.death_save.success = this.stat.death_save[0]
          this.death_save.fail = this.stat.death_save[1]
        })
        .catch(err => {
          console.log(err)
        })
  },
  methods: {
    calMinMax(value, min, max) {
      if (this.stat[value] < min || this.stat[value] == "") this.stat[value] = min
      else if (this.stat[value] > max) this.stat[value] = max
    },
    calLength(value, max) {
      if (this.equip.attack[value].length > max) {
        this.equip.attack[value] = this.equip.attack[value].slice(0, max)
      }
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
        api.uploadImage("DND5e", this.$route.params.id, data)
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
  watch: {
    death_save: {
      deep: true,
      handler() {
        this.stat.death_save = this.death_save.success + this.death_save.fail
      }
    }
  }


}

</script>

<style scoped lang="scss">


.inline {
  display: flex;
  justify-content: space-around;
  align-items: center;

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

input[type=number] {
  border: none;
  padding: 0;
  text-align: center;
  height: 100%;
  width: 100%;
  font-size: 16px;
  box-shadow: none !important;

  &:focus {
    outline: none;
  }
}

.attack {
  border: none;
  outline: none;
  width: 100%;
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
}

.stat {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2%;
  justify-content: space-around;
}

</style>
