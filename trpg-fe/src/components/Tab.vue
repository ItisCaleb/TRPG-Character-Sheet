<template>
  <div id="tab">
    <ul style="padding-left:3%">
      <li v-for="pageName in page" @click="changePage(pageName)" :class="{'active':isCurrent(pageName)}"
           :key="pageName" class="tab-name">{{ pageName }}
      </li>
    </ul>
    <br>
    <div id="tab-container">
      <Load v-for="pageName in page"  :key="pageName">
        <div v-if="isCurrent(pageName)" class="tab-content">
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
      currentPage: ""
    }
  },
  methods: {
    changePage(name) {
      this.currentPage=name
    },
    isCurrent(name){
      return this.currentPage===name
    }
  },
  mounted() {
    this.currentPage=this.page[0]
  }
}
</script>
<style scoped lang="scss">
@import "public/main";
#tab {
  width: 90%;
  margin: auto;

  @include pc-width{
    width: 60%;
  }
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
