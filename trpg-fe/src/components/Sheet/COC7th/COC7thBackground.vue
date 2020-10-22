<template>
  <div class="sheet-background">
    <COC7thSection title="調查員背景" style="width: 45%">
      <SheetInput v-model="story.injuries" name="創傷與傷疤"></SheetInput>
      <SheetInput v-model="story.encounter" name="第三類接觸"></SheetInput>
      <SheetInput v-model="story.mania" name="恐懼與狂熱"></SheetInput>
      <SheetInput v-model="story.magic" name="魔法書與咒文"></SheetInput>
      <label>神話相信者
        <select v-model="story.myth">
          <option>是</option>
          <option>否</option>
        </select>
      </label><br>
      <label style="margin-top: 5%;width: 100%">
        調查員個人描述
        <textarea v-model="story.description" class="sheet-textarea" style="height: 200px"></textarea>
      </label>
    </COC7thSection>
    <COC7thSection id="tx" title="調查員經歷" style="width: 45%">
      <label>
        思念與信念
        <textarea v-model="story.belief" class="sheet-textarea"> </textarea>
      </label>
      <label>
        重要之人
        <textarea v-model="story.significant_people" class="sheet-textarea"> </textarea>
      </label>
      <label>
        意義非凡之地
        <textarea v-model="story.meaningful_location" class="sheet-textarea"> </textarea>
      </label>
      <label>
        寶貴之物
        <textarea v-model="story.treasured_possession" class="sheet-textarea"> </textarea>
      </label>
      <label>
        特點
        <textarea v-model="story.trait" class="sheet-textarea"> </textarea>
      </label>
    </COC7thSection>
  </div>
</template>

<script>
import COC7thSection from "@/components/Sheet/COC7th/COC7thSection";
import SheetInput from "@/components/Sheet/SheetInput";

export default {
  name: "COC7thBackground",
  components: {SheetInput, COC7thSection},
  data() {
    return {
      story: {
        description: "",
        belief: "",
        significant_people: "",
        meaningful_location: "",
        treasured_possession: "",
        trait: "",
        myth: "",
        injuries: "",
        mania: "",
        magic: "",
        encounter: "",
        fellow_investigator: ""
      }
    }
  }
}
</script>

<style scoped>
.sheet-textarea {
  resize: none;
  height: 100%;
  width: 100%;
}

#tx label {
  width: 100%;

}
</style>
