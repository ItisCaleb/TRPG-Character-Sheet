<template>
  <div id="sheet">
    <Tab :page="['COC7th','DND5e']">
      <div slot="COC7th">
        <div>COC</div>
      </div>
      <div slot="DND5e">
        <div>DND</div>
      </div>
    </Tab>
  </div>
</template>

<script>
import Tab from "@/components/Tab";
export default {
  name: "Sheet",
  components: {Tab}
}
</script>

<style scoped>

</style>
