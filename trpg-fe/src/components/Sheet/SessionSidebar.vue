<template>
  <div class="session-side-bar">
    <div class="open" @click="activeSide" :class="{'active':active}">
      <i class="fa fa-arrow-right"></i>
    </div>
    <transition name="side" mode="out-in">
      <div class="sidebar" :class="{'active':active}">
        <Tab style="width: 100%" :page="session.player">

        </Tab>
      </div>
    </transition>
  </div>
</template>

<script>
import Tab from "@/components/Tab";
export default {
  name: "SessionSidebar",
  components: {Tab},
  props:{
    session:{
      type:Object,
      required:true
    }
  },
  data(){
    return {
      active:false
    }
  },
  methods:{
    activeSide(){
      this.active=!this.active
    }
  }
}
</script>

<style scoped lang="scss">
.open{
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: #c9c9c9 1px 1px;
  background: #efefef;
  width: 20px;
  height: 10%;
  z-index: 1;
  cursor: pointer;
}
.active{
  transform: translateX(250px);
}
.sidebar{
  position: fixed;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: #c9c9c9 1px 1px;
  width: 250px;
  left: -250px;
  z-index: 1;
}
</style>
