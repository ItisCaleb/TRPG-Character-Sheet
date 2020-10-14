<template>
  <div>
    <Title>關於</Title>
    <Tab :page="['介紹','團務功能','角色卡']" style="text-align: center">
      <div slot="介紹" class="about">
        這是一個可以建置自動化TRPG角色卡的工具<br>
        你可以使用這個網站來幫助你快速建立角色卡<br>
        <div style="display: inline-block">
          如果有任何疑惑，請回報admin@trpgtoater.com<br>
          <a href="https://github.com/ItisCaleb" target="_blank"><i class="fa fa-github fa-2x"></i></a>
          <a href="https://github.com/ItisCaleb" target="_blank">https://github.com/ItisCaleb</a><br>
          <a href="https://github.com/Xialai-Kulimi" target="_blank"><i class="fa fa-github fa-2x"></i></a>
          <a href="https://github.com/Xialai-Kulimi" target="_blank">https://github.com/Xialai-Kulimi</a>
        </div>
      </div>
      <div slot="團務功能">
        <div>
          團務系統可以讓你上傳你的角色卡<br>
          方便跑團時的GM以及團員檢閱<br>
          一個團務的玩家上限是15人<br>
        </div>
      </div>
      <div slot="角色卡">
        <div>
          一人可擁有的角色卡上限為20張<br>
          而目前支援的系統為<br>
          克蘇魯的召喚7版<br>
          龍與地下城5版
        </div>
      </div>
    </Tab>
  </div>
</template>

<script>
import Title from "@/components/Title";
import Tab from "@/components/Tab";

export default {
  name: "About",
  components: {Tab, Title}
}
</script>

<style scoped>

</style>
