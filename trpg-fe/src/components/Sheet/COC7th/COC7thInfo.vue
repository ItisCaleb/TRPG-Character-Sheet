<template>
  <div class="sheet-info">
    <div class="basic-info">
      <label>
        姓名<input @input="changeName" v-model="info.name">
      </label>
      <label>
        玩家<input v-model="info.player_name">
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "COC7thInfo",
  data(){
    return {
      info:"",
      stat:""
    }
  },
  methods:{
    changeName(){
      this.$parent.$data.info.name=this.info.name
    }
  }
}
</script>

<style scoped lang="scss">
  .basic-info{
    label{
      display: block;
      width: auto;
    }
  }

</style>