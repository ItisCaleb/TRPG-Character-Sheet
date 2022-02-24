<template>
  <div>
    <div class="title">角色名字:{{info.name}}</div>
    <div>
      <div class="title">先攻:{{stat.initiative}}</div>
      <div class="title">AC:{{stat.armorValue}}</div>
      <div class="title">臨時HP:{{stat.temp_hp}}</div>
      <div class="title">HP:{{stat.hp}}</div>
      <div class="title">速度:{{stat.speed}}</div>
      <div class="title">熟練:{{stat.pro}}</div>
    </div>
    <div class="title">豁免:
      <div style="margin-left: 3%" v-for="saving in stat.savings" :key="saving">
        {{ $t(`dnd5e.${saving}`) }} {{ calSkill(saving,saving) }}
      </div>
    </div>
    <div class="title">技能:
      <div style="margin-left: 3%" v-for="skill in stat.skills" :key="skill">
        {{ $t(`dnd5e.${skill}`) }} {{ calSkill(skill,skills[skill].type) }}
      </div>
    </div>
    <div class="title">屬性調整值:<br>
      <div style="margin-left: 3%;display: inline" v-for="(value,key) in stat.stat" :key="key">
        {{key}}:{{Math.floor((value - 10) / 2)>0?"+":""}}{{Math.floor((value - 10) / 2)}}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "DND5eCard",
  components: {},
  data(){
    return {
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
  props:{
    info:{
      type:Object
    },
    stat:{
      type:Object
    }
  },
  mounted() {
    console.log(this.stat)
  },
  methods:{
    calSkill(skill,type) {
      let value = Math.floor((this.stat.stat[type] - 10) / 2)
      value += this.stat.pro
      if (value >= 0) value = "+" + value
      return value
    }
  }
}
</script>

<style scoped>
  *{
    font-size: 14px;
    text-align: left;
  }
  .title{
    font-weight: bold;
    display: inline;
    margin-right: 3%;
  }
</style>
