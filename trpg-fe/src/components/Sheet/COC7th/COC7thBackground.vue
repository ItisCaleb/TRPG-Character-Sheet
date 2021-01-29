<template>
  <div class="sheet-background">
    <SheetSection class="bsection" :title="$t('coc7th.char_background')">
      <SheetInput :view="view" :max="256" v-model="story.injuries" :name="$t('coc7th.injuries')"></SheetInput>
      <SheetInput :view="view" :max="256" v-model="story.encounter" :name="$t('coc7th.encounter')"></SheetInput>
      <SheetInput :view="view" :max="256" v-model="story.mania" :name="$t('coc7th.mania')"></SheetInput>
      <SheetInput :view="view" :max="256" v-model="story.magic" :name="$t('coc7th.magic')"></SheetInput>
      <label style="font-weight: bold">{{ $t("coc7th.myth") }}
        <select :disabled="view" v-model="story.myth">
          <option value="yes">{{ $t('yes') }}</option>
          <option value="no">{{ $t('no') }}</option>
        </select>
      </label><br>
      <SheetTextArea :view="view" :max="1024" :val="story.role_description" v-model="story.role_description"
                     :name="$t('coc7th.role_description')" style="margin-top: 5%;height: 120px"></SheetTextArea>
      <SheetTextArea :view="view" :max="2048" :val="story.description" v-model="story.description"
                     :name="$t('coc7th.description')" style="margin-top: 5%;height: 200px"></SheetTextArea>

    </SheetSection>
    <SheetSection class="bsection" id="tx" :title="$t('coc7th.char_experience')">
      <SheetTextArea :view="view" :max="256" :name="$t('coc7th.belief')" :val="story.belief"
                     v-model="story.belief"></SheetTextArea>
      <SheetTextArea :view="view" :max="256" :name="$t('coc7th.sig_people')" :val="story.significant_people"
                     v-model="story.significant_people"></SheetTextArea>
      <SheetTextArea :view="view" :max="256" :name="$t('coc7th.mean_location')" :val="story.meaningful_location"
                     v-model="story.meaningful_location"></SheetTextArea>
      <SheetTextArea :view="view" :max="256" :name="$t('coc7th.treasured_possession')" :val="story.treasured_possession"
                     v-model="story.treasured_possession"></SheetTextArea>
      <SheetTextArea :view="view" :max="256" :name="$t('coc7th.trait')" :val="story.trait"
                     v-model="story.trait"></SheetTextArea>
    </SheetSection>
  </div>
</template>

<script>
import SheetSection from "@/components/Sheet/SheetSection";
import SheetInput from "@/components/Sheet/SheetInput";
import SheetTextArea from "@/components/Sheet/SheetTextArea";

export default {
  name: "COC7thBackground",
  components: {SheetTextArea, SheetInput, SheetSection},
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
