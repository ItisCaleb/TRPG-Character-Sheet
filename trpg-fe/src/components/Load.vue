<template>
  <transition name="load" mode="out-in">
    <slot></slot>
  </transition>
</template>

<script>
export default {
name: "Load"
}
</script>

<style scoped lang="scss">

.load-enter {
  opacity: 0;
  transform: translateY(-30%);
  @include phone-width(){
    transform: translateY(-10%);
  }

}
.load-enter-active {
  transition: all 0.5s;
}
.load-enter-to{
  opacity: 1;
  transform: translateY(0);
}
.load-leave,.load-leave-active,.load-leave-to{
  opacity: 0;
}
</style>
