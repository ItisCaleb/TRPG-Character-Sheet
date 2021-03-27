<template>
  <Tab :page="[1,2,3]" style="width: 100%;text-align: center;overflow: auto" :overflow="[true,true,true]">
    <table slot="1">
      <tr>
        <th colspan="7" style="font-size: 20px">{{ $t('coc7th.char_skill') }}</th>
      </tr>
      <tr>
        <td colspan="1">{{ $t('coc7th.class_feature') }}
          <select :disabled="view" v-model="skills['class_feature']">
            <option>EDU</option>
            <option>EDU+STR</option>
            <option>EDU+DEX</option>
            <option>EDU+APP</option>
            <option>EDU+POW</option>
          </select>
        </td>
        <td colspan="3">{{ $t('coc7th.class_point') }}{{ getClassPoint }}</td>
        <td colspan="3">{{ $t('coc7th.interest_point') }}{{ getInterestPoint }}</td>
      </tr>
      <tr>
        <td>{{ $t('coc7th.skill_name') }}</td>
        <td>{{ $t('coc7th.skill_default') }}</td>
        <td>{{ $t('coc7th.skill_interest') }}</td>
        <td>{{ $t('coc7th.skill_class') }}</td>
        <td>{{ $t('coc7th.skill_grow') }}</td>
        <td>{{ $t('coc7th.skill_total') }}</td>
      </tr>
      <tr v-for="(skill,key) in page1" :key="key">
        <td>
          {{ $t(`coc7th.${key}`) }}<br>
          <span v-show="checkLang">({{ key }})</span>
        </td>
        <td>{{ skill.default }}</td>
        <td class="skill"><input :readonly="view" v-model.number="page1[key].interest" type="number"
                                 @input="incSkill($event,'interest',key,'page1')" class="form-control input-group"></td>
        <td class="skill"><input :readonly="view" v-model.number="page1[key].class" type="number"
                                 @input="incSkill($event,'class',key,'page1')" class="form-control input-group"></td>
        <td class="skill"><input :readonly="view" v-model.number="page1[key].grow" type="number"
                                 @input="incSkill($event,'grow',key,'page1')" class="form-control input-group">
        </td>
        <td class="skill-max">
          <table>
            <tr>
              <td class="max" rowspan="2">{{ getTotal(key, 'page1') }}</td>
              <td>{{ Math.floor(getTotal(key, 'page1') / 2) }}</td>
            </tr>
            <tr>
              <td>{{ Math.floor(getTotal(key, 'page1') / 5) }}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table slot="2">
      <tr>
        <th colspan="7" style="font-size: 20px">{{ $t('coc7th.char_skill') }}</th>
      </tr>
      <tr>
        <td colspan="1">{{ $t('coc7th.class_feature') }}
          <select :disabled="view" v-model="skills['class_feature']">
            <option>EDU</option>
            <option>EDU+STR</option>
            <option>EDU+DEX</option>
            <option>EDU+APP</option>
            <option>EDU+POW</option>
          </select>
        </td>
        <td colspan="3">{{ $t('coc7th.class_point') }}{{ getClassPoint }}</td>
        <td colspan="3">{{ $t('coc7th.interest_point') }}{{ getInterestPoint }}</td>
      </tr>
      <tr>
        <td>{{ $t('coc7th.skill_name') }}</td>
        <td>{{ $t('coc7th.skill_default') }}</td>
        <td>{{ $t('coc7th.skill_interest') }}</td>
        <td>{{ $t('coc7th.skill_class') }}</td>
        <td>{{ $t('coc7th.skill_grow') }}</td>
        <td>{{ $t('coc7th.skill_total') }}</td>
      </tr>
      <tr v-for="(skill,key) in page2" :key="key">
        <td>
          {{ $t(`coc7th.${key}`) }}<br>
          <span v-show="checkLang">({{ key }})</span>
        </td>
        <td>{{ skill.default }}</td>
        <td class="skill"><input :readonly="view" v-model.number="page2[key].interest" type="number"
                                 @input="incSkill($event,'interest',key,'page2')" class="form-control input-group"></td>
        <td class="skill"><input :readonly="view" v-model.number="page2[key].class" type="number"
                                 @input="incSkill($event,'class',key,'page2')"
                                 class="form-control input-group"></td>
        <td class="skill"><input :readonly="view" v-model.number="page2[key].grow" type="number"
                                 @input="incSkill($event,'grow',key,'page2')"
                                 class="form-control input-group"></td>
        <td class="skill-max">
          <table>
            <tr>
              <td class="max" rowspan="2">{{ getTotal(key, 'page2') }}</td>
              <td>{{ Math.floor(getTotal(key, 'page2') / 2) }}</td>
            </tr>
            <tr>
              <td>{{ Math.floor(getTotal(key, 'page2') / 5) }}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <table slot="3">
      <tr>
        <th colspan="7" style="font-size: 20px">{{ $t('coc7th.char_skill') }}</th>
      </tr>
      <tr>
        <td colspan="1">{{ $t('coc7th.class_feature') }}
          <select :disabled="view" v-model="skills['class_feature']">
            <option>EDU</option>
            <option>EDU+STR</option>
            <option>EDU+DEX</option>
            <option>EDU+APP</option>
            <option>EDU+POW</option>
          </select>
        </td>
        <td colspan="3">{{ $t('coc7th.class_point') }}{{ getClassPoint }}</td>
        <td colspan="3">{{ $t('coc7th.interest_point') }}{{ getInterestPoint }}</td>
      </tr>
      <tr>
        <td>{{ $t('coc7th.skill_name') }}</td>
        <td>{{ $t('coc7th.skill_custom')}}</td>
        <td>{{ $t('coc7th.skill_default') }}</td>
        <td>{{ $t('coc7th.skill_interest') }}</td>
        <td>{{ $t('coc7th.skill_class') }}</td>
        <td>{{ $t('coc7th.skill_grow') }}</td>
        <td>{{ $t('coc7th.skill_total') }}</td>
      </tr>
      <tr v-for="(skill,key) in page3" :key="key">
        <td :rowspan="skill.rows ||1" v-if="!skill.dep">
          {{ $t(`coc7th.${key}`) }}<br>
          <span v-show="checkLang">({{ key }})</span>
        </td>
        <td class="base-skill"><input @input="setCustom($event,key)" v-model="page3[key].custom" :readonly="view"
                                      class="form-control input-group"
                                      :placeholder="$t('coc7th.skill_custom')"></td>
        <td>{{ skill.default }}</td>
        <td class="skill"><input :readonly="view" v-model.number="page3[key].interest" type="number"
                                 @input="incSkill($event,'interest',key,'page3')" class="form-control input-group"></td>
        <td class="skill"><input :readonly="view" v-model.number="page3[key].class" type="number"
                                 @input="incSkill($event,'class',key,'page3')"
                                 class="form-control input-group"></td>
        <td class="skill"><input :readonly="view" v-model.number="page3[key].grow" type="number"
                                 @input="incSkill($event,'grow',key,'page3')"
                                 class="form-control input-group"></td>
        <td class="skill-max">
          <table>
            <tr>
              <td class="max" rowspan="2">{{ getTotal(key, 'page3') }}</td>
              <td>{{ Math.floor(getTotal(key, 'page3') / 2) }}</td>
            </tr>
            <tr>
              <td>{{ Math.floor(getTotal(key, 'page3') / 5) }}</td>
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
    },
    view: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      page1: {
        "Accounting": {default: 5, interest: 0, class: 0, grow: 0},
        "Anthropology": {default: 1, interest: 0, class: 0, grow: 0},
        "Appraise": {default: 5, interest: 0, class: 0, grow: 0},
        "Archaeology": {default: 1, interest: 0, class: 0, grow: 0},
        "Charm": {default: 15, interest: 0, class: 0, grow: 0},
        "Climb": {default: 20, interest: 0, class: 0, grow: 0},
        "Computer Use": {default: 5, interest: 0, class: 0, grow: 0},
        "Credit Rating": {default: 0, interest: 0, class: 0, grow: 0},
        "Cthulhu Mythos": {default: 0, interest: 0, class: 0, grow: 0},
        "Disguise": {default: 5, interest: 0, class: 0, grow: 0},
        "Dodge": {default: 0, interest: 0, class: 0, grow: 0},
        "Drive Auto": {default: 20, interest: 0, class: 0, grow: 0},
        "Electrical Repair": {default: 1, interest: 0, class: 0, grow: 0},
        "Electronics": {default: 10, interest: 0, class: 0, grow: 0},
        "Fast-Talk": {default: 5, interest: 0, class: 0, grow: 0},
        "First Aid": {default: 30, interest: 0, class: 0, grow: 0},
        "History": {default: 5, interest: 0, class: 0, grow: 0},
        "Intimidate": {default: 15, interest: 0, class: 0, grow: 0},
        "Jump": {default: 20, interest: 0, class: 0, grow: 0},
        "Law": {default: 5, interest: 0, class: 0, grow: 0},
        "Library Use": {default: 20, interest: 0, class: 0, grow: 0},
        "Listen": {default: 20, interest: 0, class: 0, grow: 0},
        "Locksmith": {default: 1, interest: 0, class: 0, grow: 0}
      },
      page2: {
        "Mechanical Repair": {default: 10, interest: 0, class: 0, grow: 0},
        "Medicine": {default: 1, interest: 0, class: 0, grow: 0},
        "Natural World": {default: 10, interest: 0, class: 0, grow: 0},
        "Navigate": {default: 10, interest: 0, class: 0, grow: 0},
        "Occult": {default: 5, interest: 0, class: 0, grow: 0},
        "Operate Heavy Machinery": {default: 1, interest: 0, class: 0, grow: 0},
        "Persuade": {default: 10, interest: 0, class: 0, grow: 0},
        "Psychoanalysis": {default: 1, interest: 0, class: 0, grow: 0},
        "Psychology": {default: 10, interest: 0, class: 0, grow: 0},
        "Ride": {default: 5, interest: 0, class: 0, grow: 0},
        "Sleight of Hand": {default: 10, interest: 0, class: 0, grow: 0},
        "Spot Hidden": {default: 25, interest: 0, class: 0, grow: 0},
        "Stealth": {default: 20, interest: 0, class: 0, grow: 0},
        "Swim": {default: 20, interest: 0, class: 0, grow: 0},
        "Throw": {default: 20, interest: 0, class: 0, grow: 0},
        "Track": {default: 10, interest: 0, class: 0, grow: 0},
        "Animal Handling": {default: 5, interest: 0, class: 0, grow: 0},
        "Artillery": {default: 1, interest: 0, class: 0, grow: 0},
        "Demolitions": {default: 1, interest: 0, class: 0, grow: 0},
        "Diving": {default: 1, interest: 0, class: 0, grow: 0},
        "Hypnosis": {default: 1, interest: 0, class: 0, grow: 0},
        "Read Lips": {default: 1, interest: 0, class: 0, grow: 0}
      },
      page3: {
        "Pilot": {default: 0, custom: "", interest: 0, class: 0, grow: 0},
        "Survival": {default: 10, custom: "", interest: 0, class: 0, grow: 0},
        "Art and Craft": {default: 5, custom: "", rows: 3, interest: 0, class: 0, grow: 0},
        "ac1": {default: 5, custom: "", dep: true, interest: 0, class: 0, grow: 0},
        "ac2": {default: 5, custom: "", dep: true, interest: 0, class: 0, grow: 0},
        "Fighting": {default: 25, custom: "", rows: 3, interest: 0, class: 0, grow: 0},
        "f1": {default: 0, custom: "", dep: true, interest: 0, class: 0, grow: 0},
        "f2": {default: 0, custom: "", dep: true, interest: 0, class: 0, grow: 0},
        "Firearms": {default: 0, custom: "", rows: 3, interest: 0, class: 0, grow: 0},
        "fire1": {default: 0, custom: "", dep: true, interest: 0, class: 0, grow: 0},
        "fire2": {default: 0, custom: "", dep: true, interest: 0, class: 0, grow: 0},
        "Language (Other)": {default: 1, custom: "", rows: 3, interest: 0, class: 0, grow: 0},
        "l1": {default: 1, custom: "", dep: true, interest: 0, class: 0, grow: 0},
        "l2": {default: 1, custom: "", dep: true, interest: 0, class: 0, grow: 0},
        "Language (Own)": {default: 0, custom: "", interest: 0, class: 0, grow: 0},
        "Science": {default: 0, custom: "", rows: 3, interest: 0, class: 0, grow: 0},
        "s1": {default: 0, custom: "", dep: true, interest: 0, class: 0, grow: 0},
        "s2": {default: 0, custom: "", dep: true, interest: 0, class: 0, grow: 0},
        "Lore": {default: 1, custom: "", rows: 3, interest: 0, class: 0, grow: 0},
        "lore1": {default: 1, custom: "", dep: true, interest: 0, class: 0, grow: 0},
        "lore2": {default: 1, custom: "", dep: true, interest: 0, class: 0, grow: 0}
      }
    }
  },
  methods: {
    incSkill(event, type, key, page) {
      let value = event.currentTarget.value
      if (value < 0 || !value) {
        this[page][key][type] = 0
      } else if (value > 100) {
        this[page][key][type] = 100
      }
      if(!this.skills.skill) this.$set(this.skills,"skill",{})
      if (!this.skills.skill[key]) this.$set(this.skills.skill, key, {})
      this.$set(this.skills.skill[key], type, this[page][key][type])
      if (this[page][key][type] == 0) {
        this.$delete(this.skills.skill[key], type)
        if (Object.keys(this.skills.skill[key]).length == 0) {
          this.$delete(this.skills.skill, key)
        }
      }
    },
    setCustom(event, key) {
      let value = event.currentTarget.value
      console.log(value.length)
      if (value.length > 10) {
        this.page3[key].custom = value.slice(0, 10)
      }
      if (!this.skills.skill[key]) this.$set(this.skills.skill, key, {})
      this.$set(this.skills.skill[key], 'custom', this.page3[key].custom)
      if (this.page3[key].custom.length === 0) {
        this.$delete(this.skills.skill[key], 'custom')
        if (Object.keys(this.skills.skill[key]).length == 0) {
          this.$delete(this.skills.skill, key)
        }
      }
    },
    getTotal(key, page) {
      return parseInt(this[page][key].interest) +
          parseInt(this[page][key].class) +
          parseInt(this[page][key].grow) +
          this[page][key].default
    }
  },
  mounted() {
    if (!this.skills.skill) return
    for (let key in this.skills.skill) {
      if (key in this.page1) {
        this.page1[key].interest = this.skills.skill[key].interest || 0
        this.page1[key].class = this.skills.skill[key].class || 0
        this.page1[key].grow = this.skills.skill[key].grow || 0
      } else if (key in this.page2) {
        this.page2[key].interest = this.skills.skill[key].interest || 0
        this.page2[key].class = this.skills.skill[key].class || 0
        this.page2[key].grow = this.skills.skill[key].grow || 0
      } else if (key in this.page3) {
        this.page3[key].custom = this.skills.skill[key].custom || ""
        this.page3[key].interest = this.skills.skill[key].interest || 0
        this.page3[key].class = this.skills.skill[key].class || 0
        this.page3[key].grow = this.skills.skill[key].grow || 0
      }
    }
  },
  updated() {
    if (!this.skills.skill) return
    for (let key in this.skills.skill) {
      if (key in this.page1) {
        this.page1[key].interest = parseInt(this.skills.skill[key].interest) || 0
        this.page1[key].class = parseInt(this.skills.skill[key].class) || 0
        this.page1[key].grow = parseInt(this.skills.skill[key].grow) || 0
      } else if (key in this.page2) {
        this.page2[key].interest = parseInt(this.skills.skill[key].interest) || 0
        this.page2[key].class = parseInt(this.skills.skill[key].class) || 0
        this.page2[key].grow = parseInt(this.skills.skill[key].grow) || 0
      } else if (key in this.page3) {
        this.page3[key].interest = parseInt(this.skills.skill[key].interest) || 0
        this.page3[key].class = parseInt(this.skills.skill[key].class) || 0
        this.page3[key].grow = parseInt(this.skills.skill[key].grow) || 0
      }
    }
  },
  computed: {
    checkLang(){
      return this.$i18n.locale != 'en_us';
    },
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
      return parseInt(this.stat.characteristic.int) * 2 - total
    },
  },
  watch: {
    setDodge: {
      handler(value) {
        this.page1.Dodge.default = value
      },
      immediate: true
    },
    setMotherLanguage: {
      handler(value) {
        this.page3["Language (Own)"].default = value
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
table {
  width: 99%;
  text-align: center;
  height: 100%;
  margin: auto;
}
td {
  border: 1px solid lightgray;
  border-collapse: collapse;
  @include phone-width {
    font-size: 12px;
  }
}
.skill{
  input{
    font-size: 12px;
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
  input::placeholder{
    font-size: 8px;
  }
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
