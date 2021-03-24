<template>
  <div class="sheet-background">
    <SheetSection class="bsection" :title="$t('coc6th.char_background')">
      <SheetTextArea :view="view" :max="1024" :val="story.role_description" v-model="story.role_description"
                     :name="$t('coc6th.role_description')" style="margin-top: 5%;height: 200px"></SheetTextArea>
      <SheetTextArea :view="view" :max="2048" :val="story.description" v-model="story.description"
                     :name="$t('coc6th.description')" style="margin-top: 5%;height: 200px"></SheetTextArea>
    </SheetSection>
    <SheetSection class="bsection" id="tx" :title="$t('coc6th.char_data')">
      <SheetTextArea :view="view" :max="256" :name="$t('coc6th.insanity')" :val="story.insanity"
                     v-model="story.insanity" style="height: 80px"></SheetTextArea>
      <SheetTextArea :view="view" :max="256" :name="$t('coc6th.family')" :val="story.family"
                     v-model="story.family" style="height: 80px"></SheetTextArea>
      <SheetTextArea :view="view" :max="256" :name="$t('coc6th.trait')" :val="story.trait"
                     v-model="story.trait" style="height: 80px"></SheetTextArea>
      <SheetTextArea :view="view" :max="256" :name="$t('coc6th.injuries')" :val="story.injuries"
                     v-model="story.injuries" style="height: 80px"></SheetTextArea>
      <SheetTextArea :view="view" :max="256" :name="$t('coc6th.scars')" :val="story.scars"
                     v-model="story.scars" style="height: 80px"></SheetTextArea>
    </SheetSection>
  </div>
</template>

<script>
import SheetSection from "@/components/Sheet/SheetSection";
import SheetTextArea from "@/components/Sheet/SheetTextArea";

export default {
  name: "COC6thBackground",
  components: {SheetTextArea, SheetSection},
  props: {
    story: {
      type: Object,
      required: true
    },
    view: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style scoped lang="scss">


#tx label {
  width: 100%;

}

.bsection {
  width: 45%;
  @include phone-width {
    width: 100%;
  }
  @include small-pad-width {
    width: 100%;
  }
}
</style>
