<template>
  <div>
    <keep-alive>
      <transition name="box">
        <div v-show="show" class="box">
          <slot class="box-content"></slot>
        </div>
      </transition>
    </keep-alive>
    <div v-show="show" @click="MsgboxOn" class="black-layout"></div>
  </div>

</template>

<script>
export default {
  name: "Msgbox",
  data(){
    return{
      show:false
    }
  },
  methods: {
    MsgboxOn() {
      this.show = (!this.show);
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  min-height: 20%;
  z-index: 2;
  border: 1px solid lightgray;
  position: fixed;
  background-color: white;
  box-shadow: 0 2px 2px lightgray;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  place-items: center;
  @include phone-width{
    min-width: 90%
  }
  @include pad-width{
    min-width: 70%;
  };
  @include small-pad-width{
    min-width: 70%;
  };
  @include pc-width{
    min-width: 60%;
  }
  @include big-pc-width{
    min-width: 45%;
  }
}

.black-layout {
  position: fixed;
  top: 0;
  left: 0;
  background: transparent;
  z-index: 1;
  width: 100%;
  height: 100%;
}

.box-enter, .box-leave-to {
  top: -100%;
}

.box-enter-active,.box-leave-active {
  transition: all ease 0.5s;
}

.box-enter-to, .box-leave {
  top: 10%;
}

</style>
