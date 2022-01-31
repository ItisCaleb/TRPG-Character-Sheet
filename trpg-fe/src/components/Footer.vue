<template>
  <footer id="footer">
    <span>Copyright © 2021 trpgtoaster.com</span>
    <!-- eslint-disable-next-line -->
    <span>　All rights reserved.</span>
  </footer>
</template>

<script>
export default {
name: "Footer"
}
</script>

<style scoped lang="scss">
  #footer{
    width: 100%;
    text-align: center;
    bottom: 0;
    position: absolute;
    border-top: lightgray 1px solid;
    background-color: white;
    font-size: 16px;
    overflow: hidden;
  }
  span{
    display: inline-block;
    @include phone-width {
      display: block;
    }
  }
</style>
