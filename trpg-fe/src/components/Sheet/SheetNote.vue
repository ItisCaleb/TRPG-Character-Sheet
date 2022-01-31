<template>
  <div>
      <SheetTextArea style="height: 800px" :view="view"
                     v-model="story.note" :val="story.note"></SheetTextArea>
  </div>
</template>

<script>
import SheetTextArea from "@/components/Sheet/SheetTextArea";
export default {
  name: "SheetNote",
  components: {SheetTextArea},
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
