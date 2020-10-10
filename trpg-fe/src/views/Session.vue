<template>
  <div style="text-align: center">
    <Title>團務</Title>
    <div id="intro">
      團務系統可以讓你上傳你的角色卡<br>
      方便跑團時的GM以及團員檢閱<br>
      一個團務的玩家上限是15人<br>

    </div>
    <div>
      <router-link class="btn btn-primary" to="/session/create">創建團務</router-link>
      <router-link class="btn btn-primary" to="/session/join">加入團務</router-link>
    </div>
    <div v-if="typeof session === 'string'">{{ session }}</div>
    <Tab :page="sessionPage" v-else>
      <table :slot="n" v-for="n in sessionPage.length" :key="n">
        <thead>
        <tr>
          <th>團務名稱</th>
          <th>GM</th>
          <th>進入</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in session.slice((n-1)*10,9+((n-1)*10))" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.gm }}</td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </Tab>
  </div>
</template>

<script>
import Title from "@/components/Title";
import Tab from "@/components/Tab";

export default {
  name: "Session",
  components: {Tab, Title},
  data() {
    return {
      session: ""
    }
  },
  created() {
    this.session = this.$store.getters.getSession;
  },
  computed: {
    sessionPage() {
      const pages = [];
      for (let i = 0; i <= this.session.length / 10; i++) {
        pages.push(i + 1)
      }
      return pages
    }
  }
}
</script>

<style scoped>
a {
  margin-right: 1%;
}

table {
  width: 100%;
}

td, th {
  border: 1px solid lightgray;
  height: 100%;
  border-collapse:collapse;
  padding: .75rem;
}

th {
  font-size: 25px;
}
</style>
