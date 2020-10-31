<template>
  <div class="sheet-background">
    <COC7thSection class="bsection" title="調查員背景">
      <SheetInput :view="view" :max="256" v-model="story.injuries" name="創傷與傷疤"></SheetInput>
      <SheetInput :view="view" :max="256" v-model="story.encounter" name="第三類接觸"></SheetInput>
      <SheetInput :view="view" :max="256" v-model="story.mania" name="恐懼與狂熱"></SheetInput>
      <SheetInput :view="view" :max="256" v-model="story.magic" name="魔法書與咒文"></SheetInput>
      <label>神話相信者
        <select :disabled="view" v-model="story.myth">
          <option>是</option>
          <option>否</option>
        </select>
      </label><br>
      <SheetTextArea :view="view" :max="2048" v-model="story.description" name="調查員個人描述" style="margin-top: 5%;height: 200px"></SheetTextArea>
    </COC7thSection>
    <COC7thSection class="bsection" id="tx" title="調查員經歷">
      <SheetTextArea :view="view" :max="256" name="思念與信念" v-model="story.belief"></SheetTextArea>
      <SheetTextArea :view="view" :max="256" name="重要之人" v-model="story.significant_people"></SheetTextArea>
      <SheetTextArea :view="view" :max="256" name="意義非凡之地" v-model="story.meaningful_location"></SheetTextArea>
      <SheetTextArea :view="view" :max="256" name="寶貴之物" v-model="story.treasured_possession"></SheetTextArea>
      <SheetTextArea :view="view" :max="256" name="特點" v-model="story.trait"></SheetTextArea>
    </COC7thSection>
  </div>
</template>

<script>
import COC7thSection from "@/components/Sheet/COC7th/COC7thSection";
import SheetInput from "@/components/Sheet/SheetInput";
import SheetTextArea from "@/components/Sheet/SheetTextArea";
export default {
  name: "COC7thBackground",
  components: {SheetTextArea, SheetInput, COC7thSection},
  props:{
    story:{
      type:Object,
      required:true
    },
    view:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped lang="scss">
.sheet-textarea {
  resize: none;
  height: 100%;
  width: 100%;
  border: 1px lightgray solid;
  border-radius: 0.25rem;
  &:focus{
    border-color: #80bdff;
    outline: 0;
  }
}

#tx label {
  width: 100%;

}
.bsection{
  width: 45%;
  @include phone-width{
    width: 100%;
  }
  @include small-pad-width{
    width: 100%;
  }
}
</style>
