<template>
  <div>
    <SheetSection title="冒險者外觀">
      <SheetInput name="身高" :view="view" v-model="story.height"></SheetInput>
      <SheetInput name="膚色" :view="view" v-model="story.skin"></SheetInput>
      <SheetInput name="年齡" :view="view" v-model="story.age"></SheetInput>
      <SheetInput name="瞳孔顏色" :view="view" v-model="story.pupil"></SheetInput>
      <SheetInput name="體重" :view="view" v-model="story.weight"></SheetInput>
      <SheetInput name="髮色" :view="view" v-model="story.hair"></SheetInput>
      <SheetTextArea style="height: 200px" name="特徵&特性" :view="view"
                     v-model="story.trait" :val="story.trait"></SheetTextArea>
      <SheetTextArea style="height: 150px" name="其他特徵&特性" :view="view"
                     v-model="story.otherTrait" :val="story.otherTrait"></SheetTextArea>
    </SheetSection>
    <SheetSection title="冒險者特質">
      <SheetTextArea name="性格" :view="view" v-model="story.personality" :val="story.personality"></SheetTextArea>
      <SheetTextArea name="理念" :view="view" v-model="story.ideals" :val="story.ideals"></SheetTextArea>
      <SheetTextArea name="關係" :view="view" v-model="story.bonds" :val="story.bonds"></SheetTextArea>
      <SheetTextArea name="缺點" :view="view" v-model="story.flaws" :val="story.flaws"></SheetTextArea>
    </SheetSection>
    <SheetSection title="冒險者背景">
      <SheetTextArea style="height: 350px" name="背景歷史" :view="view"
                     v-model="story.backstory" :val="story.backstory"></SheetTextArea>
      <SheetTextArea style="height: 200px" name="同盟&組織" :view="view"
                     v-model="story.alignment" :val="story.alignment"></SheetTextArea>
    </SheetSection>
  </div>
</template>

<script>
import SheetSection from "@/components/Sheet/SheetSection";
import SheetInput from "@/components/Sheet/SheetInput";
import SheetTextArea from "@/components/Sheet/SheetTextArea";
export default {
  name: "DND5eStory",
  components: {SheetTextArea, SheetInput, SheetSection},
  props: {
    story: {
      type: Object,
      required: true
    },
    view: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
