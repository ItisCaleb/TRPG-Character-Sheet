<template>
  <div class="sheet-info">
    <table class="stat ta" style="width: 100%">
      <tr class="tr">
        <td class="td" v-for="(value,key) in stat.characteristic" :key="key">
          <table >
            <tr>
              <td class="td-font">{{key}}</td>
              <td class="td-input"><input style="width: 100%" :value="value"></td>
              <td >
                <table>
                  <tr>
                    <td>{{value/2}}</td>
                  </tr>
                  <tr>
                    <td>{{value/5}}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <div class="basic-info">
      <h4>調查員基本資料：</h4>
      <SheetInput name="姓名" v-model="info.name"/>
      <SheetInput name="玩家" v-model="info.player_name"/>
      <SheetInput name="職業" v-model="story.class"/>
      <div id="body">
        <SheetInput name="年齡" v-model="story.age"/>
        <SheetInput name="性別" v-model="story.sex"/>
      </div>
      <SheetInput name="出生地" v-model="story.birthplace"/>
      <SheetInput name="現居地" v-model="story.residence"/>
    </div>
    <div class="basic-info">
      <h4>調查員狀態：</h4>
      <div style="display: flex">
        <div class="status">
          <SheetInput name="HP"></SheetInput>
          <SheetInput name="SAN"></SheetInput>
          <SheetInput name="MP"></SheetInput>
          <SheetInput name="LUK"></SheetInput>
          <div>傷害加成與體格(DB & Build)</div>
          <div>機動力(MOV)</div>
          <label>
            負傷狀態
            <select>
              <option selected="">無</option>
              <option>重傷</option>
              <option>瀕死</option>
              <option>暫時穩定</option>
            </select>
          </label>
          <label>
            瘋狂狀態
            <select>
              <option selected="">無</option>
              <option>臨時瘋狂</option>
              <option>不定性瘋狂</option>
              <option>潛在瘋狂</option>
            </select>
          </label>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import SheetInput from "@/components/Sheet/SheetInput";

export default {
  name: "COC7thInfo",
  components: {SheetInput},
  data() {
    return {
      info: {
        name: "",
      },
      stat: "",
      story: "",
    }
  }
}
</script>

<style scoped lang="scss">
@import "public/main";

.basic-info {
  height: 80%;
  width: 25%;
  margin-right: 10%;
  margin-bottom: 5%;
  @include phone-width {
    width: 100%;
  }
  display: inline-block;
  vertical-align: top;
  flex-wrap: wrap;
}

h4 {
  font-weight: bold;
}

#body {
  display: flex;
}

.ta .tr .td{
  width: 50%;
  @include pc-width {
    width: 10%;
  }
  @include big-pc-width {
    width: 12%;
  }
  word-wrap: break-word;
}
.ta .tr .td{
  display: inline-block;
  margin-top: 2px;
}

.stat {
  flex: 1 1 auto;
}
.td-font{
  border: 1px lightgray solid;
  font-size: 20px;
  width: 30%;
  @include pc-width{
    width: 50%;
  }
  @include big-pc-width{
    width: 50%;

  }
}
.td-input{
  border: 1px lightgray solid;
  width: 30%;
  padding:0;
  input{
    height:100%;
    display:inline-block;
    position:relative;
  }
}

.status {
  flex: 1 2 auto;
}

</style>
