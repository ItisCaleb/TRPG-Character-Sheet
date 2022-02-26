<template>
  <div>
    <SheetSection :title="$t('dnd5e.char_skill')">
      <div class="inline">
        <SheetGridInput :view="view" down type="number" v-model.number="stat.passive_wisdom">
          <span slot="down">{{ $t('dnd5e.passive_wisdom') }}</span>
        </SheetGridInput>
        <SheetGridInput :view="view" down type="number" v-model.number="stat.inspiration">
          <span slot="down">{{ $t('dnd5e.inspiration') }}</span>
        </SheetGridInput>
        <SheetGridInput :view="view" down type="number" v-model.number="stat.pro">
          <span slot="down">{{ $t('dnd5e.pro') }}</span>
        </SheetGridInput>
      </div>
      <ul style="font-size: 14px;list-style-type: none;border: 1px lightgray solid;padding: 0;text-align: center">
        <li v-for="(obj,key) in savings" :key="key" class="skills">
          <input :disabled="view" type="checkbox" v-model="savings[key].check" style="margin: 1%">
          {{ calSkill(obj) }} {{ $t(`dnd5e.${key}`) }}
        </li>
        <li style="font-weight: bold;border-top: 1px lightgray solid">{{ $t('dnd5e.savings') }}</li>
      </ul>
      <ul style="font-size: 14px;list-style-type: none;border: 1px lightgray solid;padding: 0;text-align: center">
        <li v-for="(obj,key) in skills" :key="key" class="skills">
          <input :disabled="view" type="checkbox" v-model="skills[key].check" style="margin: 1%">
          <span @click="changeMultiply(obj)" class="unselectable" :style="`color:${getMultiplyColor(obj)}`" style="cursor: pointer;">
            {{ calSkill(obj) }} {{ $t(`dnd5e.${key}`) }}({{ obj.type }})
          </span>
        </li>
        <li style="font-weight: bold;border-top: 1px lightgray solid">{{ $t('dnd5e.skills') }}</li>
      </ul>
    </SheetSection>
    <SheetSection :title="$t('dnd5e.char_equip')">
      <div class="inline">
        <SheetGridInput :view="view" v-model.number="equip.money.cp" type="number" :max="999" down>
          <span slot="down">CP</span>
        </SheetGridInput>
        <SheetGridInput :view="view" v-model.number="equip.money.sp" type="number" :max="999" down>
          <span slot="down">SP</span>
        </SheetGridInput>
        <SheetGridInput :view="view" v-model.number="equip.money.ep" type="number" :max="999" down>
          <span slot="down">EP</span>
        </SheetGridInput>
        <SheetGridInput :view="view" v-model.number="equip.money.gp" type="number" :max="999" down>
          <span slot="down">GP</span>
        </SheetGridInput>
        <SheetGridInput :view="view" v-model.number="equip.money.pp" type="number" :max="999" down>
          <span slot="down">PP</span>
        </SheetGridInput>
      </div>
      <SheetTextArea v-model="equip.equipment"  :max="2048" style="height: 250px;margin-bottom: 10%" :view="view"
                     :name="$t('dnd5e.equipment')" :val="equip.equipment"></SheetTextArea>
      <SheetTextArea v-model="equip.treasure" :max="2048" style="height: 250px" :view="view"
                     :name="$t('dnd5e.treasure')" :val="equip.treasure"></SheetTextArea>
    </SheetSection>
    <SheetSection>
      <SheetTextArea v-model="equip.language" :max="1024" style="height: 250px;" :view="view"
                     :name="$t('dnd5e.language')" :val="equip.language"></SheetTextArea>
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
        str: {check: false, type: "str", multiplier: 1},
        dex: {check: false, type: "dex", multiplier: 1},
        con: {check: false, type: "con", multiplier: 1},
        int: {check: false, type: "int", multiplier: 1},
        wis: {check: false, type: "wis", multiplier: 1},
        cha: {check: false, type: "cha", multiplier: 1},
      },
      skills: {
        Acrobatics: {check: false, type: "dex", multiplier: 1},
        "Animal Handling": {check: false, type: "wis", multiplier: 1},
        Arcana: {check: false, type: "int", multiplier: 1},
        Athletics: {check: false, type: "str", multiplier: 1},
        Deception: {check: false, type: "cha", multiplier: 1},
        History: {check: false, type: "int", multiplier: 1},
        Insight: {check: false, type: "wis", multiplier: 1},
        Intimidation: {check: false, type: "cha", multiplier: 1},
        Investigation: {check: false, type: "int", multiplier: 1},
        Medicine: {check: false, type: "wis", multiplier: 1},
        Nature: {check: false, type: "int", multiplier: 1},
        Perception: {check: false, type: "wis", multiplier: 1},
        Performance: {check: false, type: "cha", multiplier: 1},
        Persuasion: {check: false, type: "cha", multiplier: 1},
        Religion: {check: false, type: "int", multiplier: 1},
        "Sleight of Hand": {check: false, type: "dex", multiplier: 1},
        Stealth: {check: false, type: "dex", multiplier: 1},
        Survival: {check: false, type: "wis", multiplier: 1},
      }
    }
  },
  methods: {
    calSkill(obj) {
      let value = Math.floor((this.stat.stat[obj.type] - 10) / 2)
      if (obj.check) value += Math.floor(this.stat.pro * obj.multiplier)
      if (value >= 0) value = "+" + value
      return value
    },
    changeMultiply(obj){
      switch (obj.multiplier){
        case 1:
          obj.multiplier = 2
          break
        case 2:
          obj.multiplier = 0.5
          break
        case 0.5:
          obj.multiplier = 1
          break
      }
    },
    getMultiplyColor(obj){
      switch (obj.multiplier){
        case 1:
          return 'black'
        case 2:
          return 'green'
        case 0.5:
          return 'red'
      }
    }
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
    getSkillMultiplier(){
      let obj = {}
      for (let key in this.skills){
        if(this.skills[key].multiplier !== 1){
          obj[key] = this.skills[key].multiplier
        }
      }
      return obj
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
    for (let key in this.stat.skill_multiplier){
      this.skills[key].multiplier= this.stat.skill_multiplier[key]
    }
  },
  watch:{
    skills:{
      deep:true,
      handler(){
        this.stat.skills=this.getSkill
        this.stat.skill_multiplier=this.getSkillMultiplier
      }
    },
    savings:{
      deep:true,
      handler(){
        this.stat.savings=this.getSavings
      }
    },
  }
}
</script>

<style scoped lang="scss">
.inline {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: auto;
  @include phone-width{
    text-align: center;
    min-width: 0;
    table,div{
      display: inline;
    }
    table{
      width: 100%;
    }
  }
}

.skills {
  align-items: center;
  display: flex;
  margin-left: 2%;
}

.unselectable{
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
