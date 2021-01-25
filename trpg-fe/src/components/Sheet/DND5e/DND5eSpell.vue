<template>
  <div>
    <SheetSection>
      <SheetInput style="margin-right: 2%" name="法術職業" :view="view" v-model="spell.spell_class"></SheetInput>
      <label>
        法術施展能力
        <select v-model="spell.spell_ability">
          <option>cha</option>
          <option>int</option>
          <option>wis</option>
        </select>
      </label>
      <div class="inline">
        <SheetGridInput :down="true" type="number" :view="view" v-model.number="spell.spell_save">
          <span slot="down">法術豁免值</span>
        </SheetGridInput>
        <SheetGridInput :down="true" type="number" :view="view" v-model.number="spell.spell_bonus">
          <span slot="down">法術攻擊加值</span>
        </SheetGridInput>
      </div>
      <table>
        <tr style="width: 100%">
          <td class="spell-text" style="text-align: center;border-bottom: 1px lightgray solid">
            <span @click="showSpell(0)">0</span>
            <span @click="showSpell(0)">小法術</span>
            <span><i @click="addSpell(0)" class="fa fa-plus"></i></span>
          </td>
        </tr>
        <tr>
          <td style="font-size: 8px;color: darkgrey;text-align: left">等級</td>
        </tr>
        <tr v-show="show['0']" v-for="i in spell.spell['0'].list.length" :key="i">
          <td class="spell-input">
            <input type="checkbox" v-model="spell.spell['0'].list[i-1].check">
            <input type="text" v-model="spell.spell['0'].list[i-1].text"
                   style="width: 100%;border-bottom:1px gray solid">
            <i @click="removeSpell(0,i-1)" class="fa fa-minus"></i>
          </td>
        </tr>
      </table>
      <table v-for="k in range(1,1)" :key="k">
        <tr style="width: 100%">
          <td class="spell-text">
            <span @click="showSpell(k)">{{ k }}</span>
            <input v-model.number="spell.spell[k].total" @input="calMinMax(k,'total')" type="number"
                   style="width: 100%;margin: 0 1%" @click="showSpell(k)">
            <input v-model.number="spell.spell[k].usage" @input="calMinMax(k,'usage')" type="number"
                   style="width: 100%;margin: 0 1%" @click="showSpell(k)">
            <span><i @click="addSpell(k)" class="fa fa-plus"></i></span>
          </td>
        </tr>
        <tr>
          <td style="font-size: 8px;color: darkgrey;text-align: center;display: flex;">
            <span>等級</span>
            <span style="flex: 2">總數</span>
            <span style="flex: 2">用量</span>
            <span>增加</span>
          </td>
        </tr>
        <tr v-show="show[k]" v-for="i in spell.spell[k].list.length" :key="i">
          <td class="spell-input">
            <input type="checkbox" v-model="spell.spell[k].list[i-1].check">
            <input type="text" v-model="spell.spell[k].list[i-1].text" style="width: 100%;border-bottom:1px gray solid">
            <i @click="removeSpell(k,i-1)" class="fa fa-minus"></i>
          </td>
        </tr>
      </table>
    </SheetSection>
    <SheetSection>
      <table v-for="k in range(2,5)" :key="k">
        <tr style="width: 100%">
          <td class="spell-text">
            <span @click="showSpell(k)">{{ k }}</span>
            <input v-model.number="spell.spell[k].total" @input="calMinMax(k,'total')" type="number"
                   style="width: 100%;margin: 0 1%" @click="showSpell(k)">
            <input v-model.number="spell.spell[k].usage" @input="calMinMax(k,'usage')" type="number"
                   style="width: 100%;margin: 0 1%" @click="showSpell(k)">
            <span><i @click="addSpell(k)" class="fa fa-plus"></i></span>
          </td>
        </tr>
        <tr>
          <td style="font-size: 8px;color: darkgrey;text-align: center;display: flex;">
            <span>等級</span>
            <span style="flex: 2">總數</span>
            <span style="flex: 2">用量</span>
            <span>增加</span>
          </td>
        </tr>
        <tr v-show="show[k]" v-for="i in spell.spell[k].list.length" :key="i">
          <td class="spell-input">
            <input type="checkbox" v-model="spell.spell[k].list[i-1].check">
            <input type="text" v-model="spell.spell[k].list[i-1].text" style="width: 100%;border-bottom:1px gray solid">
            <i @click="removeSpell(k,i-1)" class="fa fa-minus"></i>
          </td>
        </tr>
      </table>
    </SheetSection>
    <SheetSection>
      <table v-for="k in range(6,9)" :key="k">
        <tr style="width: 100%">
          <td class="spell-text">
            <span @click="showSpell(k)">{{ k }}</span>
            <input v-model.number="spell.spell[k].total" @input="calMinMax(k,'total')" type="number"
                   style="width: 100%;margin: 0 1%" @click="showSpell(k)">
            <input v-model.number="spell.spell[k].usage" @input="calMinMax(k,'usage')" type="number"
                   style="width: 100%;margin: 0 1%" @click="showSpell(k)">
            <span><i @click="addSpell(k)" class="fa fa-plus"></i></span>
          </td>
        </tr>
        <tr>
          <td style="font-size: 8px;color: darkgrey;text-align: center;display: flex;">
            <span>等級</span>
            <span style="flex: 2">總數</span>
            <span style="flex: 2">用量</span>
            <span>增加</span>
          </td>
        </tr>
        <tr v-show="show[k]" v-for="i in spell.spell[k].list.length" :key="i">
          <td class="spell-input">
            <input type="checkbox" v-model="spell.spell[k].list[i-1].check">
            <input type="text" v-model="spell.spell[k].list[i-1].text" style="width: 100%;border-bottom:1px gray solid">
            <i @click="removeSpell(k,i-1)" class="fa fa-minus"></i>
          </td>
        </tr>
      </table>
    </SheetSection>
  </div>

</template>

<script>
import SheetInput from "@/components/Sheet/SheetInput";
import SheetGridInput from "@/components/Sheet/SheetGridInput";
import SheetSection from "@/components/Sheet/SheetSection";

export default {
  name: "DND5eSpell",
  components: {SheetSection, SheetGridInput, SheetInput},
  props: {
    stat: {
      type: Object,
      required: true
    },
    spell: {
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
      show: {
        "0": false,
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false,
        "6": false,
        "7": false,
        "8": false,
        "9": false,
      }
    }
  },
  methods: {
    addSpell(num) {
      if (this.spell.spell[num].list.length > 15) return
      this.show[num] = true
      this.spell.spell[num].list.push({check: false, text: ""})
    },
    showSpell(num) {
      this.show[num] = !this.show[num]
    },
    removeSpell(num, index) {
      if (this.spell.spell[num].list.length == 1) return
      this.spell.spell[num].list.splice(index, 1)
    },
    range(start, end) {
      return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
    },
    calMinMax(index, value) {
      if (this.spell.spell[index][value] < 0 || this.spell.spell[index][value] == "") this.spell.spell[index][value] = 0
      else if (this.spell.spell[index][value] > 30) this.spell.spell[index][value] = 30
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

input[type=text] {
  outline: none;
  box-shadow: none;
  border: none;
  border-bottom: 1px lightgray solid
}

.spell-text {
  display: flex;
  justify-content: space-between;

  input {
    outline: none;
    box-shadow: none;
    border: none;
    border-bottom: 1px lightgray solid;
    text-align: center;
  }

  span {
    font-weight: bold;
    cursor: pointer;
  }
}

.spell-input {
  display: flex;
  align-items: center;
  text-align: center;
}

table {
  text-align: center;
  width: 100%;
  margin: 10% 0;

}

</style>
