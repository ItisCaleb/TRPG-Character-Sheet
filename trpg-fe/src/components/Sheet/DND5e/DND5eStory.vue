<template>
  <div>
    <SheetSection :title="$t('dnd5e.char_appearance')">
      <SheetInput :name="$t('dnd5e.height')" :view="view" v-model="story.height"></SheetInput>
      <SheetInput :name="$t('dnd5e.skin')" :view="view" v-model="story.skin"></SheetInput>
      <SheetInput :name="$t('age')" :view="view" v-model="story.age"></SheetInput>
      <SheetInput :name="$t('dnd5e.pupil')" :view="view" v-model="story.pupil"></SheetInput>
      <SheetInput :name="$t('dnd5e.weight')" :view="view" v-model="story.weight"></SheetInput>
      <SheetInput :name="$t('dnd5e.hair')" :view="view" v-model="story.hair"></SheetInput>
      <SheetTextArea style="height: 200px" :name="$t('dnd5e.trait')" :view="view"
                     v-model="story.trait" :val="story.trait"></SheetTextArea>
      <SheetTextArea style="height: 150px" :name="$t('dnd5e.otherTrait')" :view="view"
                     v-model="story.otherTrait" :val="story.otherTrait"></SheetTextArea>
    </SheetSection>
    <SheetSection :title="$t('dnd5e.char_trait')">
      <SheetTextArea :name="$t('dnd5e.personality')" :view="view" v-model="story.personality" :val="story.personality"></SheetTextArea>
      <SheetTextArea :name="$t('dnd5e.ideals')" :view="view" v-model="story.ideals" :val="story.ideals"></SheetTextArea>
      <SheetTextArea :name="$t('dnd5e.bonds')" :view="view" v-model="story.bonds" :val="story.bonds"></SheetTextArea>
      <SheetTextArea :name="$t('dnd5e.flaws')" :view="view" v-model="story.flaws" :val="story.flaws"></SheetTextArea>
    </SheetSection>
    <SheetSection :title="$t('dnd5e.char_background')">
      <SheetTextArea style="height: 350px" :name="$t('dnd5e.backstory')" :view="view"
                     v-model="story.backstory" :val="story.backstory"></SheetTextArea>
      <SheetTextArea style="height: 200px" :name="$t('dnd5e.alignment')" :view="view"
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
