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

<style scoped>

.load-enter {
  opacity: 0;
  transform: translateY(-30%);
}
.load-enter-active {
  transition: all 0.6s;
}
.load-enter-to{
  opacity: 1;
  transform: translateY(0);
}
.load-leave{
  opacity: 0;
}
</style>
