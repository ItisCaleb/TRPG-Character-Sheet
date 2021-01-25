<template>
  <div>
    <SheetSection title="冒險者技能：">
      <div class="inline">
        <SheetGridInput :down="true" type="number" v-model.number="stat.passive_wisdom">
          <span slot="down">被動感知</span>
        </SheetGridInput>
        <SheetGridInput :down="true" type="number" v-model.number="stat.inspiration">
          <span slot="down">激勵值</span>
        </SheetGridInput>
        <SheetGridInput :down="true" type="number" v-model.number="stat.pro">
          <span slot="down">熟練加成</span>
        </SheetGridInput>
      </div>
      <ul style="font-size: 14px;list-style-type: none;border: 1px lightgray solid;padding: 0;text-align: center">
        <li v-for="(obj,key) in savings" :key="key" class="skills">
          <input type="checkbox" v-model="savings[key].check" style="margin: 1%">{{ calSkill(obj) }} {{ key }}
        </li>
        <li style="font-weight: bold;border-top: 1px lightgray solid">豁免檢定</li>
      </ul>
      <ul style="font-size: 14px;list-style-type: none;border: 1px lightgray solid;padding: 0;text-align: center">
        <li v-for="(obj,key) in skills" :key="key" class="skills">
          <input type="checkbox" v-model="skills[key].check" style="margin: 1%">{{ calSkill(obj) }}
          {{ key }}({{ obj.type }})
        </li>
        <li style="font-weight: bold;border-top: 1px lightgray solid">技能</li>
      </ul>
    </SheetSection>
    <SheetSection title="冒險者裝備：">
      <div class="inline">
        <SheetGridInput v-model.number="equip.money.cp" type="number" :down="true">
          <span slot="down">CP</span>
        </SheetGridInput>
        <SheetGridInput v-model.number="equip.money.sp" type="number" :down="true">
          <span slot="down">SP</span>
        </SheetGridInput>
        <SheetGridInput v-model.number="equip.money.ep" type="number" :down="true">
          <span slot="down">EP</span>
        </SheetGridInput>
        <SheetGridInput v-model.number="equip.money.gp" type="number" :down="true">
          <span slot="down">GP</span>
        </SheetGridInput>
        <SheetGridInput v-model.number="equip.money.pp" type="number" :down="true">
          <span slot="down">PP</span>
        </SheetGridInput>
      </div>
      <SheetTextArea v-model="equip.equipment"  :max="2048" style="height: 250px;margin-bottom: 10%" :view="view"
                     name="裝備" :val="equip.equipment"></SheetTextArea>
      <SheetTextArea v-model="equip.treasure" :max="2048" style="height: 250px" :view="view"
                     name="寶物" :val="equip.treasure"></SheetTextArea>
    </SheetSection>
    <SheetSection>
      <SheetTextArea v-model="equip.language" :max="1024" style="height: 250px;" :view="view"
                     name="其他專長&語言" :val="equip.language"></SheetTextArea>
    </SheetSection>
  </div>
</template>

<script>
import SheetSection from "@/components/Sheet/SheetSection";
import SheetGridInput from "@/components/Sheet/SheetGridInput";
import SheetTextArea from "@/components/Sheet/SheetTextArea";

export default {
  name: "DND5eStory",
  components: {SheetTextArea, SheetGridInput, SheetSection},
  props: {
    stat: {
      type: Object,
      required: true
    },
    equip: {
      type: Object,
      required: true
    },
    view: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      savings: {
        str: {check: false, type: "str"},
        dex: {check: false, type: "dex"},
        con: {check: false, type: "con"},
        int: {check: false, type: "int"},
        wis: {check: false, type: "wis"},
        cha: {check: false, type: "cha"},
      },
      skills: {
        Acrobatics: {check: false, type: "dex"},
        "Animal Handling": {check: false, type: "wis"},
        Arcana: {check: false, type: "int"},
        Athletics: {check: false, type: "str"},
        Deception: {check: false, type: "cha"},
        History: {check: false, type: "int"},
        Insight: {check: false, type: "wis"},
        Intimidation: {check: false, type: "cha"},
        Investigation: {check: false, type: "int"},
        Medicine: {check: false, type: "wis"},
        Nature: {check: false, type: "int"},
        Perception: {check: false, type: "wis"},
        Performance: {check: false, type: "cha"},
        Persuasion: {check: false, type: "cha"},
        Religion: {check: false, type: "int"},
        "Sleight of Hand": {check: false, type: "dex"},
        Stealth: {check: false, type: "dex"},
        Survival: {check: false, type: "wis"},
      }
    }
  },
  methods: {
    calSkill(obj) {
      let value = Math.floor((this.stat.stat[obj.type] - 10) / 2)
      if (obj.check) value += this.stat.pro
      if (value >= 0) value = "+" + value
      return value
    },
  },
  computed:{
    getSkill(){
      let arr = []
      for (let key in this.skills){
        if(this.skills[key].check){
          arr.push(key)
        }
      }
      return arr
    },
    getSavings(){
      let arr = []
      for (let key in this.savings){
        if(this.savings[key].check){
          arr.push(key)
        }
      }
      return arr
    },
  },
  mounted() {
    for (let key of this.stat.savings){
      this.savings[key].check=true
    }
    for (let key of this.stat.skills){
      this.skills[key].check=true
    }
  },
  watch:{
    skills:{
      deep:true,
      handler(){
        this.stat.skills=this.getSkill
      }
    },
    savings:{
      deep:true,
      handler(){
        this.stat.savings=this.getSavings
      }
    }
  }
}
</script>

<style scoped lang="scss">
.inline {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.skills {
  align-items: center;
  display: flex;
  margin-left: 2%;
}
</style>
