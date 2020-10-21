<template>
  <div class="sheet-info">
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
      <h4>調查員屬性：</h4>
      <div class="stat">
        
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
      story: ""
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import "public/main";
.basic-info {
  height: 80%;
  width: 40%;
  margin-right: 10%;
  margin-bottom: 5% ;
  @include phone-width{
    width: 100%;
  }
  display: inline-block;
  vertical-align: top;
  flex-wrap: wrap;
}
h4{
  font-weight: bold;
}
#body {
  display: flex;
}

</style>
