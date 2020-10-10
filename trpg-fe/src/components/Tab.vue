<template>
  <div id="tab">
    <ul style="padding-left:3%">
      <li v-for="(pageName,index) in page" @click="changePage" :class="{'active':currentPage[index]}"
          :data-tab="pageName" :key="pageName" class="tab-name">{{ pageName }}
      </li>
    </ul>
    <br>
    <div id="tab-container">
      <Load v-for="(pageName,index) in page"  :key="pageName">
        <div v-if="currentPage[index]" class="tab-content">
          <slot :name="pageName"></slot>
        </div>
      </Load>
    </div>
  </div>
</template>
<script>
import Load from "@/components/Load";

export default {
  name: "Tab",
  components: {Load},
  props: {
    page: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentPage: []
    }
  },
  methods: {
    changePage(event) {
      const name = event.target.getAttribute('data-tab')
      for (let i in this.page) {
        this.$set(this.currentPage, i, false)
        if (this.page[i] == name) {
          this.$set(this.currentPage, i, true)
        }
      }
    }
  },
  mounted() {
    for (let i in this.page) {
      this.$set(this.currentPage, i, false)
    }
    this.$set(this.currentPage, 0, true)
  }
}
</script>
<style scoped lang="scss">
#tab {
  width: 85%;
  margin: auto;
}

.active {
  border-bottom: 3px #28a1dc solid;
  background-color: #e8e8e8;
}

.tab-name {
  list-style: none;
  display: flex;
  align-items: center;
  float: left;
  width: auto;
  padding: 0 3%;
  text-align: center;
  height: 40px;
  cursor: pointer;
  &:hover {
    opacity: 1;
    background-color: lightgray;
  }

}

#tab-container {
  border-top: 1px lightgray solid;
  margin-top: 10px;
  padding-top:2%;
  width: 100%;
  overflow: hidden;
}
</style>
