<template>
  <div class="system-content" style="display: table">
    <div id="systems">
      <div @click="changeSystem('COC7th')" :class="{'systems-choose':isCurrent('COC7th')}" class="systems-title">
        <div class="systems-title-tile">
          COC7th
        </div>
      </div>
      <div @click="changeSystem('DND5e')" :class="{'systems-choose':isCurrent('DND5e')}" class="systems-title">
        <div class="systems-title-tile">
          DND5e
        </div>
      </div>
    </div>
    <div style="display: inline-block;text-align: center;padding: 4px">
      <Title>選擇系統</Title>
      <div v-show="isCurrent('COC7th')" class="systems-info">
        <img class="systems-picture" src="../../../static/source/call-of-cthulhu-logo-black.jpg" alt="">
        <div class="system-text">使用克蘇魯的召喚7版的系統<br>創建屬於你的調查員</div>
      </div>
      <div v-show="isCurrent('DND5e')" class="systems-info">
        <img class="systems-picture" src="../../../static/source/dungeons-and-dragons-5th-edition-logo.png" alt="">
        <div class="system-text">使用龍與地下城5版的系統(施工中)<br>創建屬於你的冒險者</div>
      </div>
      <FormInput v-model="name" type="text" id="name" ph="角色名稱"></FormInput>
      <button @click="createSheet" class="btn btn-primary">創建</button><br>
      <small style="color: red" v-if="small">{{small}}</small>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/User/FormInput";
import api from "@/api";
import Title from "@/components/Title";

export default {
  name: "ChooseSystem",
  components: {Title, FormInput},
  data() {
    return {
      choose: "COC7th",
      name: "",
      created: false,
      small:""
    }
  },
  methods: {
    changeSystem(name) {
      this.choose = name
    },
    isCurrent(name) {
      return this.choose === name
    },
    createSheet() {
      this.small=""
      if (this.created) return
      if(this.name.length===0) {
        this.small ="請輸入角色名稱"
        return
      }
      this.created = true
      api.createSheet(this.choose, this.name)
          .then((id) => {
            this.$store.dispatch('setSheet')
                .then(() => {
                  this.created = false
                  this.$router.replace(`/sheet/${this.choose}/${id}`)
                })
          })
          .catch(err => {
            this.small=err
            this.created = false
          })
    }
  }
}
</script>

<style scoped lang="scss">

#systems {
  vertical-align: top;
  width: 30%;
  text-align: center;
  display: table-cell;
  border-right: 1px solid lightgray;
  border-collapse: collapse;
}

.system-content {
  width: 100%;
}

#name {
  width: 200px;
  @include phone-width {
    width: 170px;
  }
}

.systems-title {
  text-align: center;
  font-size: 23px;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid lightgray;
}

.systems-title-tile {
  padding: 3px;
  cursor: pointer;

}

.systems-title-tile:hover {
  background: #46A3FF;
  color: white;
}

.systems-picture {
  max-width: 400px;
  @include phone-width {
    max-width: 100%;
  }
}

.system-text {
  font-size: 20px;
  @include phone-width {
    font-size: 14px;
  }
}

.systems-choose {
  border-left: 3px solid #4CAF50;
}

.systems-title-tile:hover {
  animation-name: choose-mouse-hover;
  animation-iteration-count: 1;
  animation-duration: 0.1s;
}

.systems-title-tile:not(:hover) {
  animation-name: choose-mouse-leave;
  animation-iteration-count: 1;
  animation-duration: 0.1s;
}

@keyframes choose-mouse-hover {
  0% {
    background: #ffffff;
    color: #000000;
  }
  100% {
    background: #46A3FF;
    color: white;
  }
}

@keyframes choose-mouse-leave {
  0% {
    background: #46A3FF;
    color: white;
  }
  100% {
    background: #ffffff;
    color: #000000;
  }
}
</style>
