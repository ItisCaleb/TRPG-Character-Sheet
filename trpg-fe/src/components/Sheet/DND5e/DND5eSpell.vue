<template>
  <div>
    <SheetSection>
      <SheetInput style="margin-right: 2%" :name="$t('dnd5e.spell_class')"
                  :view="view" v-model="spell.spell_class"></SheetInput>
      <label>
        {{ $t('dnd5e.spell_ability') }}
        <select :disabled="view" v-model="spell.spell_ability">
          <option value="cha">{{ $t('dnd5e.cha') }}</option>
          <option value="int">{{ $t('dnd5e.int') }}</option>
          <option value="int">{{ $t('dnd5e.wis') }}</option>
        </select>
      </label>
      <div class="inline">
        <SheetGridInput down type="number" :view="view" v-model.number="spell.spell_save">
          <span slot="down">{{ $t('dnd5e.spell_save') }}</span>
        </SheetGridInput>
        <SheetGridInput down type="number" :view="view" v-model.number="spell.spell_bonus">
          <span slot="down">{{ $t('dnd5e.spell_bonus') }}</span>
        </SheetGridInput>
      </div>
      <table class="spell-list">
        <tr style="width: 100%">
          <td class="spell-text" style="text-align: center;border-bottom: 1px lightgray solid">
            <span @click="showSpell(0)">0<i class="fa fa-angle-down"></i></span>
            <span @click="showSpell(0)">{{ $t('dnd5e.cantrips') }}</span>
            <span><i v-if="!view" @click="addSpell(0)" class="fa fa-plus"></i></span>
          </td>
        </tr>
        <tr>
          <td style="font-size: 8px;color: darkgrey;text-align: left">{{ $t('dnd5e.level') }}</td>
        </tr>
        <tr v-show="show['0']" v-for="i in spell.spell['0'].list.length" :key="i">
          <td class="spell-input">
            <input :disabled="view" type="checkbox" v-model="spell.spell['0'].list[i-1].check">
            <input :readonly="view" type="text" v-model="spell.spell['0'].list[i-1].text"
                   style="width: 100%;border-bottom:1px gray solid">
            <i v-if="!view" @click="removeSpell(0,i-1)" class="fa fa-minus"></i>
          </td>
        </tr>
      </table>
      <table class="spell-list" v-for="k in range(1,1)" :key="k">
        <tr style="width: 100%">
          <td class="spell-text">
            <span @click="showSpell(k)">{{ k }}<i class="fa fa-angle-down"></i></span>
            <input :readonly="view" v-model.number="spell.spell[k].total" @input="calMinMax(k,'total')" type="number"
                   class="spell-number" @click="showSpell(k)">
            <input :readonly="view" v-model.number="spell.spell[k].usage" @input="calMinMax(k,'usage')" type="number"
                   class="spell-number" @click="showSpell(k)">
            <span><i v-if="!view" @click="addSpell(k)" class="fa fa-plus"></i></span>
          </td>
        </tr>
        <tr>
          <td class="spell-hint">
            <span>{{ $t('dnd5e.level') }}</span>
            <span style="flex: 2">{{$t('dnd5e.spell_total')}}</span>
            <span style="flex: 2">{{$t('dnd5e.spell_expanded')}}</span>
            <span v-if="!view">{{$t('dnd5e.list_append')}}</span>
          </td>
        </tr>
        <tr v-show="show[k]" v-for="i in spell.spell[k].list.length" :key="i">
          <td class="spell-input">
            <input :disabled="view" type="checkbox" v-model="spell.spell[k].list[i-1].check">
            <input :readonly="view" type="text" v-model="spell.spell[k].list[i-1].text" style="width: 100%;border-bottom:1px gray solid">
            <i v-if="!view" @click="removeSpell(k,i-1)" class="fa fa-minus"></i>
          </td>
        </tr>
      </table>
    </SheetSection>
    <SheetSection>
      <table class="spell-list" v-for="k in range(2,5)" :key="k">
        <tr style="width: 100%">
          <td class="spell-text">
            <span @click="showSpell(k)">{{ k }}<i class="fa fa-angle-down"></i></span>
            <input :readonly="view" v-model.number="spell.spell[k].total" @input="calMinMax(k,'total')" type="number"
                   class="spell-number" @click="showSpell(k)">
            <input :readonly="view" v-model.number="spell.spell[k].usage" @input="calMinMax(k,'usage')" type="number"
                   class="spell-number" @click="showSpell(k)">
            <span><i v-if="!view" @click="addSpell(k)" class="fa fa-plus"></i></span>
          </td>
        </tr>
        <tr>
          <td class="spell-hint">
            <span>{{ $t('dnd5e.level') }}</span>
            <span style="flex: 2">{{$t('dnd5e.spell_total')}}</span>
            <span style="flex: 2">{{$t('dnd5e.spell_expanded')}}</span>
            <span v-if="!view">{{$t('dnd5e.list_append')}}</span>
          </td>
        </tr>
        <tr v-show="show[k]" v-for="i in spell.spell[k].list.length" :key="i">
          <td class="spell-input">
            <input :disabled="view" type="checkbox" v-model="spell.spell[k].list[i-1].check">
            <input :readonly="view" type="text" v-model="spell.spell[k].list[i-1].text" style="width: 100%;border-bottom:1px gray solid">
            <i v-if="!view" @click="removeSpell(k,i-1)" class="fa fa-minus"></i>
          </td>
        </tr>
      </table>
    </SheetSection>
    <SheetSection>
      <table class="spell-list" v-for="k in range(6,9)" :key="k">
        <tr style="width: 100%">
          <td class="spell-text">
            <span @click="showSpell(k)">{{ k }}<i class="fa fa-angle-down"></i></span>
            <input :readonly="view" v-model.number="spell.spell[k].total" @input="calMinMax(k,'total')" type="number"
                   class="spell-number" @click="showSpell(k)">
            <input :readonly="view" v-model.number="spell.spell[k].usage" @input="calMinMax(k,'usage')" type="number"
                   class="spell-number" @click="showSpell(k)">
            <span><i v-if="!view" @click="addSpell(k)" class="fa fa-plus"></i></span>
          </td>
        </tr>
        <tr>
          <td class="spell-hint">
            <span>{{ $t('dnd5e.level') }}</span>
            <span style="flex: 2">{{$t('dnd5e.spell_total')}}</span>
            <span style="flex: 2">{{$t('dnd5e.spell_expanded')}}</span>
            <span v-if="!view">{{$t('dnd5e.list_append')}}</span>
          </td>
        </tr>
        <tr v-show="show[k]" v-for="i in spell.spell[k].list.length" :key="i">
          <td class="spell-input">
            <input :disabled="view" type="checkbox" v-model="spell.spell[k].list[i-1].check">
            <input :readonly="view" type="text" v-model="spell.spell[k].list[i-1].text" style="width: 100%;border-bottom:1px gray solid">
            <i v-if="!view" @click="removeSpell(k,i-1)" class="fa fa-minus"></i>
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
.spell-hint {
  font-size: 8px;
  color: darkgrey;
  text-align: center;
  display: flex;
  @include big-pc-width{
    font-size: 14px;
  }
}


.spell-list {
  text-align: center;
  width: 100%;
  margin: 10% 0;

}
.spell-number{
  width: 40%;
  box-shadow: none !important;
  -moz-appearance: none;
}

</style>
