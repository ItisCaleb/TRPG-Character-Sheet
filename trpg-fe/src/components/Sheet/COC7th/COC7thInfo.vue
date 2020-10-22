<template>
  <div class="sheet-info">
    <table class="stat ta" style="width: 100%">
      <tr class="tr">
        <td class="td" v-for="(value,key) in stat.characteristic" :key="key">
          <table>
            <tr>
              <td class="td-font">{{ key }}</td>
              <td class="td-input">
                <input type="number" @input="calStat(key)"
                       class="form-control input-group" v-model.number="stat.characteristic[key]">
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
      <SheetInput name="姓名" v-model="info.name"/>
      <SheetInput name="玩家" v-model="info.player_name"/>
      <SheetInput name="職業" v-model="story.class"/>
      <div class="two">
        <SheetInput name="年齡" v-model="story.age"/>
        <SheetInput name="性別" v-model="story.sex"/>
      </div>
      <SheetInput name="出生地" v-model="story.birthplace"/>
      <SheetInput name="現居地" v-model="story.residence"/>
    </COC7thSection>
    <COC7thSection title="調查員狀態：">
      <div style="display: flex">
        <div class="status">
          <div class="two">
            <SheetInput name="HP" type="number" v-model.number="stat.hp"></SheetInput>
            <div class="max">/0</div>
            <SheetInput name="SAN" type="number" v-model.number="stat.san"></SheetInput>
            <div class="max">/{{ stat.characteristic.pow }}</div>
          </div>
          <div class="two">
            <SheetInput name="MP" type="number" v-model.number="stat.mp"></SheetInput>
            <div class="max">/0</div>
            <SheetInput name="LUK" type="number" v-model.number="stat.luk"></SheetInput>
          </div>
          <div>傷害加成與體格(DB & Build)</div>
          <div>機動力(MOV)</div>
          <label>
            負傷狀態
            <select v-model="stat.injured_status">
              <option selected="">無</option>
              <option>重傷</option>
              <option>瀕死</option>
              <option>暫時穩定</option>
            </select>
          </label>
          <label>
            瘋狂狀態
            <select v-model="stat.injured_status">
              <option selected="">無</option>
              <option>臨時瘋狂</option>
              <option>不定性瘋狂</option>
              <option>潛在瘋狂</option>
            </select>
          </label>
        </div>
      </div>
    </COC7thSection>
    <COC7thSection title="調查員形象：">
      <img v-if="story.avatar"
           style="margin-bottom: 5%;width: 100%;height: 100%"
           :src="`data:image/jpeg;base64,${story.avatar}`" alt="角色圖片"><br>
      <div style="margin-bottom: 5%" class="custom-file">
        <input ref="image" @change="previewImage" type="file" accept="image/*" class="custom-file-input">
        <label class="custom-file-label">選擇圖片</label>
      </div>
      <div style="display: flex;justify-content: space-around">
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

export default {
  name: "COC7thInfo",
  components: {COC7thSection, SheetInput},
  data() {
    return {
      info: {
        name: "",
        player_name:""
      },
      stat: {
        characteristic: {
          str: 0,
          con: 0,
          dex: 0,
          app: 0,
          pow: 0,
          siz: 0,
          int: 0,
          edu: 0
        },
        hp: 0,
        san: 0,
        mp: 0,
        luk: 0,
        insane_status: "無",
        injured_status: "無"
      },
      story: {
        class:"",
        age:"",
        sex:"",
        residence:"",
        birthplace:"",
        avatar:""
      },
    }
  },
  methods: {
    calStat(key) {
      let val = this.stat.characteristic[key]
      if (!val) {
        this.stat.characteristic[key]=0
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
      const size=(image.size/1024);
      console.log(size +"kb");
      reader.onload=(e)=>{
        this.story.avatar=e.target.result.split(',').pop();
      }
    },
    cancelImage(){
      this.story.avatar=""
    },
    uploadImage(){
      const data = new FormData();
      console.log(this.$refs.image.files[0])
      data.append("file",this.$refs.image.files[0])
      api.uploadImage('COC7th',this.$route.params.id,data)
      .then(()=>{
        console.log('yes')
      })
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
