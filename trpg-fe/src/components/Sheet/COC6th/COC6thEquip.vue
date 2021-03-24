<template>
  <div class="sheet-background">
    <SheetSection class="bsection" :title="$t('coc6th.char_equip')">
      <SheetInput v-model="equip.cash" :max="128" :name="$t('coc6th.money')" :val="equip.cash"
                  :view="view"></SheetInput>
      <SheetTextArea v-model="equip.equip" :max="512" :name="$t('coc6th.equip')" :val="equip.equip" :view="view"
                     style="height: 170px;margin-bottom: 7%"></SheetTextArea>
      <SheetTextArea v-model="equip.weapon" :max="256" :name="$t('coc6th.weapon')" :val="equip.weapon" :view="view"
                     style="height: 170px;margin-bottom: 10%"></SheetTextArea>
    </SheetSection>
    <SheetSection class="bsection" :title="$t('coc6th.magic_tomes')">
      <SheetTextArea v-model="story.tomes" :max="256" :name="$t('coc6th.tomes')" :val="story.tomes"
                     :view="view"></SheetTextArea>
      <SheetTextArea v-model="story.magic" :max="256" :name="$t('coc6th.magic')" :val="story.magic"
                  :view="view"></SheetTextArea>
    </SheetSection>
  </div>
</template>

<script>
import SheetSection from "@/components/Sheet/SheetSection";
import SheetInput from "@/components/Sheet/SheetInput";
import SheetTextArea from "@/components/Sheet/SheetTextArea";

export default {
  name: "COC6thEquip",
  components: {SheetSection,SheetInput,SheetTextArea},
  props: {
    equip: {
      type: Object,
      required: true
    },
    story:{
      type:Object,
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
