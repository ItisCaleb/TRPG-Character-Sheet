<template>
  <Tab :page="[1,2,3]" style="width: 90%;text-align: center">
    <table slot="1">
      <tr>
        <th colspan="7">調查員技能</th>
      </tr>
      <tr>
        <td colspan="1">職業特徵
          <select v-model="skills['class_feature']">
            <option>EDU</option>
            <option>EDU+STR</option>
            <option>EDU+DEX</option>
            <option>EDU+APP</option>
            <option>EDU+POW</option>
          </select>
        </td>
        <td colspan="3">職業點:{{ getClassPoint }}</td>
        <td colspan="3">興趣點:{{ getInterestPoint }}</td>
      </tr>
      <tr>
        <td>技能名稱</td>
        <td>初始</td>
        <td>興趣</td>
        <td>職業</td>
        <td>成長</td>
        <td class="skill-max">
          <table>
            <tr>
              <td rowspan="2">總值</td>
              <td>困難</td>
            </tr>
            <tr>
              <td>極限</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr v-for="(skill,key) in page1" :key="key">
        <td>
          {{ skill.name }}<br>
          ({{ key }})
        </td>
        <td>{{ skill.default }}</td>
        <td class="skill"><input :ref="key+'_interest'" type="number"
                                 @input="incSkill($event,'interest',key)" class="form-control input-group"></td>
        <td class="skill"><input :ref="key+'_class'" type="number"
                                 @input="incSkill($event,'class',key)" class="form-control input-group"></td>
        <td class="skill"><input :ref="key+'_grow'" type="number"
                                 @input="incSkill($event,'grow',key)" class="form-control input-group">
        </td>
        <td class="skill-max">
          <table>
            <tr>
              <td class="max" rowspan="2">{{ getTotal(key, skill.default) }}</td>
              <td>{{ Math.floor(getTotal(key, skill.default) / 2) }}</td>
            </tr>
            <tr>
              <td>{{ Math.floor(getTotal(key, skill.default) / 5) }}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table slot="2">
      <tr>
        <th colspan="7">調查員技能</th>
      </tr>
      <tr>
        <td colspan="1">職業特徵
          <select v-model="skills['class_feature']">
            <option>EDU</option>
            <option>EDU+STR</option>
            <option>EDU+DEX</option>
            <option>EDU+APP</option>
            <option>EDU+POW</option>
          </select>
        </td>
        <td colspan="3">職業點:{{ getClassPoint }}</td>
        <td colspan="3">興趣點:{{ getInterestPoint }}</td>
      </tr>
      <tr>
        <td>技能名稱</td>
        <td>初始</td>
        <td>興趣</td>
        <td>職業</td>
        <td>成長</td>
        <td class="skill-max">
          <table>
            <tr>
              <td rowspan="2">總值</td>
              <td>困難</td>
            </tr>
            <tr>
              <td>極限</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr v-for="(skill,key) in page2" :key="key">
        <td>
          {{ skill.name }}<br>
          ({{ key }})
        </td>
        <td>{{ skill.default }}</td>
        <td class="skill"><input :ref="key+'_interest'" type="number"
                                 @input="incSkill($event,'interest',key)" class="form-control input-group"></td>
        <td class="skill"><input :ref="key+'_class'" type="number" @input="incSkill($event,'class',key)"
                                 class="form-control input-group"></td>
        <td class="skill"><input :ref="key+'_grow'" type="number" @input="incSkill($event,'grow',key)"
                                 class="form-control input-group"></td>
        <td class="skill-max">
          <table>
            <tr>
              <td class="max" rowspan="2">{{ getTotal(key, skill.default) }}</td>
              <td>{{ Math.floor(getTotal(key, skill.default) / 2) }}</td>
            </tr>
            <tr>
              <td>{{ Math.floor(getTotal(key, skill.default) / 5) }}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table slot="3">
      <tr>
        <th colspan="7">調查員技能</th>
      </tr>
      <tr>
        <td colspan="2">職業特徵
          <select v-model="skills['class_feature']">
            <option>EDU</option>
            <option>EDU+STR</option>
            <option>EDU+DEX</option>
            <option>EDU+APP</option>
            <option>EDU+POW</option>
          </select>
        </td>
        <td colspan="3">職業點:{{ getClassPoint }}</td>
        <td colspan="3">興趣點:{{ getInterestPoint }}</td>
      </tr>
      <tr>
        <td>技能名稱</td>
        <td>自定義</td>
        <td>初始</td>
        <td>興趣</td>
        <td>職業</td>
        <td>成長</td>
        <td class="skill-max">
          <table>
            <tr>
              <td rowspan="2">總值</td>
              <td>困難</td>
            </tr>
            <tr>
              <td>極限</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr v-for="(skill,key) in page3" :key="key">
        <td :rowspan="skill.rows ||1" v-if="!skill.dep">
          {{ skill.name }}<br>
          ({{ key }})
        </td>
        <td class="base-skill"><input class="form-control input-group" placeholder="自定義"></td>
        <td>{{ skill.default }}</td>
        <td class="skill"><input :ref="key+'_interest'" type="number"
                                 @input="incSkill($event,'interest',key)" class="form-control input-group"></td>
        <td class="skill"><input :ref="key+'_class'" type="number" @input="incSkill($event,'class',key)"
                                 class="form-control input-group"></td>
        <td class="skill"><input :ref="key+'_grow'" type="number" @input="incSkill($event,'grow',key)"
                                 class="form-control input-group"></td>
        <td class="skill-max">
          <table>
            <tr>
              <td class="max" rowspan="2">{{ getTotal(key, skill.default) }}</td>
              <td>{{ Math.floor(getTotal(key, skill.default) / 2) }}</td>
            </tr>
            <tr>
              <td>{{ Math.floor(getTotal(key, skill.default) / 5) }}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </Tab>
</template>


<script>
import Tab from "@/components/Tab";

export default {
  name: "COC7thSkill",
  components: {Tab},
  props: {
    skills: {
      type: Object,
      required: true
    },
    stat: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      page1: {
        "Accounting": {default: 5, name: "會計"},
        "Anthropology": {default: 1, name: "人類學"},
        "Appraise": {default: 5, name: "估價"},
        "Archaeology": {default: 1, name: "考古學"},
        "Charm": {default: 15, name: "魅惑"},
        "Climb": {default: 20, name: "攀爬"},
        "Computer Use": {default: 5, name: "電腦使用"},
        "Credit Rating": {default: 0, name: "信用評級"},
        "Cthulhu Mythos": {default: 0, name: "克蘇魯神話"},
        "Disguise": {default: 5, name: "喬裝"},
        "Dodge": {default: 0, name: "閃避"},
        "Drive Auto": {default: 20, name: "自動車駕駛"},
        "Electrical Repair": {default: 1, name: "電器維修"},
        "Electronics": {default: 10, name: "電子學"},
        "Fast-Talk": {default: 5, name: "話術"},
        "First Aid": {default: 30, name: "急救"},
        "History": {default: 5, name: "歷史"},
        "Intimidate": {default: 15, name: "威嚇"},
        "Jump": {default: 20, name: "跳躍"},
        "Law": {default: 5, name: "法律"},
        "Library Use": {default: 20, name: "圖書館使用"},
        "Listen": {default: 20, name: "聆聽"},
        "Locksmith": {default: 1, name: "鎖匠"}
      },
      page2: {
        "Mechanical Repair": {default: 10, name: "機器維修"},
        "Medicine": {default: 1, name: "醫學"},
        "Natural World": {default: 10, name: "自然學"},
        "Navigate": {default: 10, name: "導航"},
        "Occult": {default: 5, name: "神祕學"},
        "Operate Heavy Machinery": {default: 1, name: "操縱重型機器"},
        "Persuade": {default: 10, name: "說服"},
        "Psychoanalysis": {default: 1, name: "心理分析"},
        "Psychology": {default: 10, name: "心理學"},
        "Ride": {default: 5, name: "騎術"},
        "Sleight of Hand": {default: 10, name: "巧手"},
        "Spot Hidden": {default: 25, name: "偵查"},
        "Stealth": {default: 20, name: "隱密行動"},
        "Swim": {default: 20, name: "游泳"},
        "Throw": {default: 20, name: "投擲"},
        "Track": {default: 10, name: "追蹤"},
        "Animal Handling": {default: 5, name: "動物馴養"},
        "Artillery": {default: 1, name: "炮術"},
        "Demolitions": {default: 1, name: "爆破"},
        "Diving": {default: 1, name: "潛水"},
        "Hypnosis": {default: 1, name: "催眠"},
        "Read Lips": {default: 1, name: "讀唇"}
      },
      page3: {
        "Pilot": {default: 0, name: "專業駕駛"},
        "Survival": {default: 10, name: "求生"},
        "Art and Craft": {default: 5, name: "藝術與工藝", rows: 3},
        "ac1": {default: 5, name: "", dep: true},
        "ac2": {default: 5, name: "", dep: true},
        "Fighting": {default: 25, name: "鬥毆", rows: 3},
        "f1": {default: 0, name: "", dep: true},
        "f2": {default: 0, name: "", dep: true},
        "Firearms": {default: 0, name: "火器", rows: 3},
        "fire1": {default: 0, name: "", dep: true},
        "fire2": {default: 0, name: "", dep: true},
        "Language (Other)": {default: 1, name: "他國語言", rows: 3},
        "l1": {default: 1, name: "", dep: true},
        "l2": {default: 1, name: "", dep: true},
        "Language (Own)": {default: 0, name: "母語"},
        "Science": {default: 0, name: "科學", rows: 3},
        "s1": {default: 0, name: "", dep: true},
        "s2": {default: 0, name: "", dep: true},
        "Lore": {default: 1, name: "偏門學問", rows: 3},
        "lore1": {default: 1, name: "", dep: true},
        "lore2": {default: 1, name: "", dep: true}
      }
    }
  },
  methods: {
    incSkill(event, type, key) {
      let value = event.currentTarget.value
      if (value < 0 || !value) {
        event.currentTarget.value = 0
      } else if (value > 100) {
        event.currentTarget.value = 100
      }
      event.currentTarget.value = parseInt(event.currentTarget.value);
      if (!this.skills.skill[key]) this.$set(this.skills.skill, key, {})
      this.$set(this.skills.skill[key], type, event.currentTarget.value)
      if (event.currentTarget.value == 0) {
        this.$delete(this.skills.skill[key], type)
        if (Object.keys(this.skills.skill[key]).length == 0) {
          this.$delete(this.skills.skill, key)
        }
      }
    },
    getTotal(key, origin) {
      let total = origin;
      if (!this.skills.skill[key]) return total
      for (let type in this.skills.skill[key]) {
        total += parseInt(this.skills.skill[key][type])
      }
      return total
    }
  },
  mounted() {
    for (let key in this.$refs) {
      let skill = key.split('_')
      let prefix = skill[0]
      let last = skill[1]
      if (!this.$props.skills.skill[prefix]) {
        this.$refs[key][0].value = 0;
        continue;
      }
      this.$refs[key][0].value = this.$props.skills.skill[prefix][last] || 0
    }
  },
  computed: {
    setDodge() {
      if (!this.stat) return 0
      else return Math.floor(this.stat.characteristic.dex / 2)
    },
    setMotherLanguage() {
      if (!this.stat) return 0
      else return this.stat.characteristic.edu
    },
    getClassPoint() {
      let total = 0;
      for (let key in this.skills.skill) {
        if (!this.skills.skill[key]['class']) continue
        total += parseInt(this.skills.skill[key]['class'])
      }
      switch (this.skills['class_feature']) {
        case 'EDU':
          return this.stat.characteristic.edu * 4 - total
        case 'EDU+STR':
          return (this.stat.characteristic.edu + this.stat.characteristic.str) * 2 - total
        case 'EDU+DEX':
          return (this.stat.characteristic.edu + this.stat.characteristic.dex) * 2 - total
        case 'EDU+APP':
          return (this.stat.characteristic.edu + this.stat.characteristic.app) * 2 - total
        case 'EDU+POW':
          return (this.stat.characteristic.edu + this.stat.characteristic.pow) * 2 - total
        default:
          return 0
      }
    },
    getInterestPoint() {
      let total = 0;
      for (let key in this.skills.skill) {
        if (!this.skills.skill[key]['interest']) continue
        total += parseInt(this.skills.skill[key]['interest'])
      }
      return this.stat.characteristic.int * 2 - total
    }
  },
  watch: {
    setDodge: {
      handler() {
        this.page1.Dodge.default = this.setDodge
      }
    },
    setMotherLanguage: {
      handler() {
        this.page3["Language (Own)"].default = this.setMotherLanguage
      }
    }
  }
}
</script>

<style scoped lang="scss">
table {
  width: 99%;
  text-align: center;
  height: 100%;

}

td {
  border: 1px solid lightgray;
  border-collapse: collapse;
  @include phone-width {
    font-size: 14px;
  }
}

.skill-max {
  padding: 0;
  height: 100%;

  table {
    height: 100%;
    overflow: hidden;
    width: 100%;
    border: none;

    td {
      border-bottom: none;
    }
  }

  .max {
    width: 50%;
  }
}

.skill {
  padding: 0;
  width: 10%;
  height: 50px;
  @include phone-width {
    width: 15%;
  }
}

.base-skill {
  padding: 0;
  width: 20%;
  height: 50px;
  @include phone-width {
    width: 35%;
  }
}

input {
  border: none;
  padding: 0;
  text-align: center;
  height: 100%;
  width: 100%;
  background: transparent;
  box-shadow: none !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>
