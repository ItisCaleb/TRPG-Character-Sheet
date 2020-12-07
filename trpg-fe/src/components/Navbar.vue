<template>
  <nav id="nav" class="navbar navbar-expand-md navbar-light bg-light">
    <div class="navbar-brand" style="font-size: 32px">TRPG Toaster</div>
    <div class="collapse navbar-collapse mr-auto">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">首頁</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">關於</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="$store.getters.getLogin" class="nav-link" to="/session">團務</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="$store.getters.getLogin" class="nav-link" to="/sheet">角色卡</router-link>
        </li>
      </ul>
    </div>
    <div class="collapse navbar-collapse ml-auto">
      <ul class="navbar-nav ml-auto">
        <li v-if="!this.$store.state.LoggedIn" class="nav-item">
          <router-link class="nav-link" to="/login">登入</router-link>
        </li>
        <li v-if="!this.$store.state.LoggedIn" class="nav-item">
          <router-link class="nav-link" to="/signup">註冊</router-link>
        </li>
        <li v-if="this.$store.state.LoggedIn" class="nav-item">
          <router-link class="nav-link" :to="'/home/'+$store.state.user.name">{{$store.state.user.name}}</router-link>
        </li>
        <li v-if="this.$store.state.LoggedIn" class="nav-item">
          <router-link class="nav-link" to="/logout">登出</router-link>
        </li>
      </ul>
    </div>
    <div class="navbar-toggler" style="border: none">
      <i v-if="!sidebar" @click="SideBarOn" class="fa fa-navicon fa-lg" style="cursor: pointer"></i>
    </div>
    <div v-if="sidebar" @click="SideBarOn" class="black-layout"></div>
    <transition>
      <div v-if="sidebar" id="sidebar-nav" :class="{'nav-show':sidebar}">
        <ul class="navbar-nav" style="display: inline-block;width: 100%">
          <li @click="SideBarOn" class="nav-item sidebar-item">
            <router-link class="sidebar-link" to="/"><i class="fa fa-home"></i>首頁</router-link>
          </li>
          <li @click="SideBarOn" class="nav-item sidebar-item">
            <router-link class="sidebar-link" to="/about"><i class="fa fa-info"></i>關於</router-link>
          </li>
          <li @click="SideBarOn" v-if="this.$store.state.LoggedIn" class="nav-item sidebar-item">
            <router-link class="sidebar-link" to="/session"><i class="fa fa-users"></i>團務</router-link>
          </li>
          <li @click="SideBarOn" v-if="this.$store.state.LoggedIn" class="nav-item sidebar-item">
            <router-link class="sidebar-link" to="/sheet"><i class="fa fa-file"></i>角色卡</router-link>
          </li>
          <li @click="SideBarOn" v-if="!this.$store.state.LoggedIn" class="nav-item sidebar-item">
            <router-link class="sidebar-link" to="/login"><i class="fa fa-sign-in"></i>登入</router-link>
          </li>
          <li @click="SideBarOn" v-if="!this.$store.state.LoggedIn" class="nav-item sidebar-item">
            <router-link class="sidebar-link" to="/signup"><i class="fa fa-plus"></i>註冊</router-link>
          </li>
          <li @click="SideBarOn" v-if="this.$store.state.LoggedIn" class="nav-item sidebar-item">
            <router-link class="sidebar-link" :to="'/home/'+$store.state.user.name"><i class="fa fa-user"></i>{{$store.state.user.name}}</router-link>
          </li>
          <li @click="SideBarOn" v-if="this.$store.state.LoggedIn" class="nav-item sidebar-item">
            <router-link class="sidebar-link" to="/logout"><i class="fa fa-sign-out"></i>登出</router-link>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<script>

export default {
  name: "Navbar",
  data() {
    return {
      sidebar: false
    }
  },
  methods: {
    SideBarOn() {
      this.sidebar = (!this.sidebar);
    }
  },

}
</script>

<style scoped lang="scss">
#nav {
  padding: 15px;
  width: 100%;
  box-shadow: 0 0 1px grey;
  @include pc-width{
    position: fixed;
    top: 0;
  }
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  @include pad-width{
    .collapse{
      visibility: hidden;
    }
    .navbar-toggler{
      display: block;
    }
  }

  .nav-link {
    font-size: x-large;
    font-weight: bold;
    color: #2c3e50;
    &:hover {
      color: #42b983;
      transition: color 0.15s;
    }

  }

  .sidebar-link {
    font-size: x-large;
    font-weight: bold;
    color: #2c3e50;
    display: flex;
    width: 85%;
    margin: auto;
    align-items: center;
    justify-content: left;
    .fa{
      width: 20%;
    }
    @include pad-width{
      font-size: 35px;
    }
    @include small-pad-width{
      font-size: 35px;
    }
  }

}

.black-layout {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;
  width: 100%;
  height: 100%;
}

#sidebar-nav {
  position: fixed;
  top: 0;
  background: white;
  z-index: 3;
  width: 55%;
  height: 100%;
  text-align: center;
  padding-top: 5%;
  @include pad-width{
    width: 40%;
  }
  @include small-pad-width{
    width: 40%;
  }
  @include pc-width{
    width: 20%;
  }
  @include big-pc-width{
    width: 20%;
  }
}
.nav-show{
  right: 0;
}
.v-enter{
  right: -55%;
  @include pad-width{
    right: -40%;
  }
  @include small-pad-width{
    right: -40%;
  }
  @include pc-width{
    right: -20%;
  }
  @include big-pc-width{
    right: -20%;
  }
}
.v-enter-active{
  transition: all ease 0.4s;
}
.v-enter-to{
  right: 0;
}


</style>
