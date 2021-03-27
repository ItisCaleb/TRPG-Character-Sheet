<template>
  <div class="sheet-background">
    <SheetSection :title="$t('coc6th.char_equip')" class="bsection">
      <SheetInput v-model="equip.cash" :max="128" :name="$t('coc6th.money')" :val="equip.cash"
                  :view="view"></SheetInput>
      <SheetTextArea v-model="equip.equip" :max="512" :name="$t('coc6th.equip')" :val="equip.equip" :view="view"
                     style="margin-bottom: 7%"></SheetTextArea>

    </SheetSection>
    <SheetSection :title="$t('coc6th.magic_tomes')" class="bsection">
      <SheetTextArea v-model="story.tomes" :max="256" :name="$t('coc6th.tomes')" :val="story.tomes"
                     :view="view"></SheetTextArea>
      <SheetTextArea v-model="story.magic" :max="256" :name="$t('coc6th.magic')" :val="story.magic"
                     :view="view"></SheetTextArea>
    </SheetSection>
    <table style="width: 100%;text-align: center">
      <tr class="weapon-title">
        <td class="melee-fix">近戰</td>
        <td>%</td>
        <td>傷害</td>
        <td>HND</td>
        <td>範圍</td>
        <td>次數</td>
        <td>耐久</td>
      </tr>
      <tr v-for="weapon in defWeapon" :key="weapon.name" class="weapons">
        <td>{{ $t(`coc6th.${weapon.name}`) }}</td>
        <td>{{ weapon.accuracy }}</td>
        <td>{{ weapon.damage }}</td>
        <td>{{ weapon.hnd }}</td>
        <td>{{ weapon.rng }}</td>
        <td>{{ weapon.times }}</td>
        <td>{{ weapon.hp }}</td>
      </tr>
      <tr v-for="weapon in melee" :key="weapon.name" class="weapons">
        <td>{{ weapon.name }}</td>
        <td>{{ weapon.accuracy }}</td>
        <td><input :readonly="view" v-model="weapon.damage" class="form-control form-group weapon"></td>
        <td><input :readonly="view" v-model="weapon.hnd" class="form-control form-group weapon"></td>
        <td><input :readonly="view" v-model="weapon.rng" class="form-control form-group weapon"></td>
        <td><input :readonly="view" v-model="weapon.times" class="form-control form-group weapon"></td>
        <td><input :readonly="view" v-model="weapon.hp" class="form-control form-group weapon"></td>
      </tr>
    </table>
    <table style="width: 100%;text-align: center">
      <tr class="weapon-title">
        <td>遠程</td>
        <td>%</td>
        <td>傷害</td>
        <td>HND</td>
        <td>範圍</td>
        <td>次數</td>
        <td>耐久</td>
      </tr>
      <tr v-for="weapon in firearm" :key="weapon.name" class="weapons">
        <td class="firearm-fix">{{ weapon.name }}</td>
        <td>{{ weapon.accuracy }}</td>
        <td class="firearm-fix"><input v-model="weapon.damage" class="form-control form-group weapon"></td>
        <td><input :readonly="view" v-model="weapon.hnd" class="form-control form-group weapon"></td>
        <td><input :readonly="view" v-model="weapon.rng" class="form-control form-group weapon"></td>
        <td><input :readonly="view" v-model="weapon.times" class="form-control form-group weapon"></td>
        <td><input :readonly="view" v-model="weapon.hp" class="form-control form-group weapon"></td>
      </tr>
    </table>
  </div>
</template>

<script>
import SheetSection from "@/components/Sheet/SheetSection";
import SheetInput from "@/components/Sheet/SheetInput";
import SheetTextArea from "@/components/Sheet/SheetTextArea";

export default {
  name: "COC6thEquip",
  components: {SheetSection, SheetInput, SheetTextArea},
  props: {
    equip: {
      type: Object,
      required: true
    },
    story: {
      type: Object,
      required: true
    },
    skills: {
      type: Object,
      required: true
    },
    view: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      defWeapon: [
        {
          name: "Fist",
          accuracy: 50,
          damage: "1d3+db",
          hnd: 1,
          rng: "touch",
          times: 1,
          hp: "n/a"
        }, {
          name: "Grapple",
          accuracy: 25,
          damage: "special",
          hnd: 2,
          rng: "touch",
          times: 1,
          hp: "n/a"
        }, {
          name: "Head",
          accuracy: 10,
          damage: "1d4+db",
          hnd: 0,
          rng: "touch",
          times: 1,
          hp: "n/a"
        },
        {
          name: "Kick",
          accuracy: 25,
          damage: "1d6+db",
          hnd: 0,
          rng: "touch",
          times: 1,
          hp: "n/a"
        },
      ],
      melee: [],
      firearm: []
    }
  },
  methods: {
    calAccuracy(weapon) {
      if (!weapon) return 0
      let sum = weapon.default || 0
      sum += weapon.interest || 0
      sum += weapon.class || 0
      sum += weapon.grow || 0
      return sum
    },
    initWeapon(weapon, key, type) {
      if (this.equip.weapon[type][key]) {
        return {
          name: weapon.custom || "",
          accuracy: this.calAccuracy(weapon),
          damage: this.equip.weapon[type][key].damage,
          hnd: this.equip.weapon[type][key].hnd,
          rng: this.equip.weapon[type][key].rng,
          times: this.equip.weapon[type][key].times,
          hp: this.equip.weapon[type][key].hp,
          skill: key
        }
      } else return {
        name: weapon.custom || "",
        accuracy: this.calAccuracy(weapon),
        damage: "",
        hnd: "",
        rng: "",
        times: 0,
        hp: "n/a",
        skill: key
      }
    }
  },
  mounted() {
    this.melee = this.equip.weapon.melee
    this.firearm = this.equip.weapon.firearm
  },
  watch: {
    skills: {
      handler(skills) {
        const skill = skills.skill
        this.defWeapon[0].accuracy += this.calAccuracy(skill['Weapon'])
        this.defWeapon[1].accuracy += this.calAccuracy(skill['w1'])
        this.defWeapon[2].accuracy += this.calAccuracy(skill['w2'])
        this.defWeapon[3].accuracy += this.calAccuracy(skill['w3'])
        this.melee = []
        this.firearm = []
        let index=0
        for (let i = 4; i <= 5; i++) {
          if (!skill[`w${i}`]) continue
          this.melee.push(this.initWeapon(skill[`w${i}`], index,"melee"))
          index++
        }
        index=0
        if ((skill[`Firearm`])) this.firearm.push(this.initWeapon(skill[`Firearm`], index,"firearm"))
        for (let i = 1; i <= 5; i++) {
          if (!skill[`f${i}`]) continue
          this.firearm.push(this.initWeapon(skill[`f${i}`], index,"firearm"))
          index++
        }
      },
      deep: true,
      immediate: true
    },
    melee: {
      handler(newValue) {
        this.equip.weapon.melee = newValue
      },
      deep: true
    },
    firearm: {
      handler(newValue) {
        this.equip.weapon.firearm = newValue
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>


#tx label {
  width: 100%;

}

.bsection {
  width: 45%;
  @include phone-width {
    width: 100%;
  }
  @include small-pad-width {
    width: 100%;
  }
}

.weapon {
  border-top: none;
  border-right: none;
  border-left: none;
  width: 90%;
  margin: 2% auto;
  text-align: center;
  padding: 0;
  @include phone-width {
    font-size: 6px;
  }
}

.weapons {
  @include phone-width {
    font-size: 6px;
  }
}

.weapon-title {
  font-weight: bold;
  @include phone-width {
    font-size: 12px;
  }
}

.firearm-fix {
  @include phone-width {
    width: 15%;
  }
}
.melee-fix{
  @include phone-width {
    width: 15%;
  }
  @include pad-width{
    width: 15%;
  }
}

</style>
