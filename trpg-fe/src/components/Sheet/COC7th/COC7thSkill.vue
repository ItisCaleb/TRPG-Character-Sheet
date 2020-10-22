<template>
  <Tab :page="[1,2,3]" style="width: 90%">
    <table slot="1">
      <tr>
        <th colspan="7">調查員技能</th>
      </tr>
      <tr>
        <td colspan="3"></td>
        <td colspan="2"></td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td>技能名稱</td>
        <td>初始值</td>
        <td>興趣</td>
        <td>成長</td>
        <td>總值</td>
        <td>困難</td>
      </tr>
      <!--<tr v-for="name in page1" :key="name">
        <td>{{name}}</td>
        <td>0</td>
      </tr>-->
    </table>
    <div slot="2"></div>
    <div slot="3"></div>
  </Tab>
</template>


<script>
import Tab from "@/components/Tab";

export default {
  name: "COC7thSkill",
  components: {Tab},
  data() {
    return {
      page1: ["會計(Accounting)", "人類學(Anthropology)", "估價(Appraise)", "考古學(Archaeology)", "魅惑(Charm)", "攀爬(Climb)", "電腦使用(Computer Use)", "信用評級(Credit Rating)", "克蘇魯神話(Cthulhu Mythos)", "喬裝(Disguise)", "閃避(Dodge)", "自動車駕駛(Drive Auto)", "電器維修(Electrical Repair)", "電子學(Electronics)", "話術(Fast-Talk)", "急救(First Aid)", "歷史(History)", "威嚇(Intimidate)", "跳躍(Jump)", "法律(Law)", "圖書館使用(Library Use)", "聆聽(Listen)", "鎖匠(Locksmith)"],
      page2: ["機器維修(Mechanical Repair)", "醫學(Medicine)", "自然學(Natural World)", "導航(Navigate)", "神祕學(Occult)", "操縱重型機器(Operate Heavy Machinery)", "說服(Persuade)", "心理分析(Psychoanalysis)", "心理學(Psychology)", "騎術(Ride)", "巧手(Sleight of Hand)", "偵查(Spot Hidden)", "隱密行動(Stealth)", "游泳(Swim)", "投擲(Throw)", "追蹤(Track)", "動物馴養(Animal Handling)", "炮術(Artillery)", "爆破(Demolitions)", "潛水(Diving)", "催眠(Hypnosis)", "讀唇(Read Lips)"],
      page3: ["專業駕駛(Pilot)", "求生(Survival)", "藝術與工藝(Art and Craft)", "藝術與工藝1", "藝術與工藝2", "鬥毆", "戰鬥1", "戰鬥2", "火器(Firearms)", "火器1", "火器2", "他國語言(Language (Other))", "他國語言1", "他國語言2", "母語(Language (Own))", "科學(Science)", "科學1", "科學2", "偏門學問(Lore)", "偏門學問1", "偏門學問2"]
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
