<template>
  <div>
    <Title>COC7th</Title>
    <Tab :page="['一般','背景','技能']">
      <div slot="一般"></div>
      <div slot="背景"></div>
      <div slot="技能">
          <Tab :page="[1,2,3]">
            <div slot="1"></div>
            <div slot="2"></div>
            <div slot="3"></div>
          </Tab>
      </div>
    </Tab>
  </div>
</template>

<script>
import Title from "@/components/Title";
import Tab from "@/components/Tab";

export default {
  name: "COC7th",
  components: {Tab, Title}
}
</script>

<style scoped>

</style>