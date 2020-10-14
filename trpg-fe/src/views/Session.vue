<template>
  <div style="text-align: center">
    <Title>團務</Title>
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
          <th>選項</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in session.slice((n-1)*10,9+((n-1)*10))" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.gm }}</td>
          <td><router-link class="btn btn-primary" :to="'/session/info/'+item.id">進入</router-link></td>
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

<style scoped lang="scss">
@import "public/main";
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

td{
  @include phone-width{
    font-size: 14px;
  }
}

th {
  font-size: 25px;
  @include phone-width{
    font-size: 20px;
  }
}
</style>
