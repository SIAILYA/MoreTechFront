<template>
  <div id="app">
    <div id="nav">
      <b-container>
        <div class="top-nav w-100 d-flex justify-content-between light-shadow">
          <router-link to="/" class="d-block text-decoration-none logo">
            Data<span>Union</span>
          </router-link>
          <div class="search-string d-flex w-50">
            <span class="material-icons-outlined my-auto ml-3">search</span>
            <input type="text" class="w-100" placeholder="Поиск датасетов" ref="search" id="search" @keypress="searchEvent" :value="getQuery" @input="setQuery">
            <div class="search-button" @click="sendSearch" :class="getQuery !== '' ? 'ready-search' : ''">Поиск</div>
          </div>
          <div class="d-flex">
            <div class="switcher d-flex mr-3 my-auto cursor-pointer" @click="setTheme">
              <img src="@/assets/sun.svg" class="m-auto" width="22" v-if="theme === 'light'" alt="">
              <img src="@/assets/moon.svg" class="m-auto" width="22" v-else-if="theme === 'default'" alt="">
              <img src="@/assets/flash.svg" class="m-auto" width="22" v-else alt="">
            </div>
            <div class="logout my-auto d-flex">
              <router-link to="/logout" tag="span" class="material-icons-outlined my-auto text-decoration-none">logout</router-link>
            </div>
          </div>
        </div>
      </b-container>
    </div>
    <div class="side-nav d-flex flex-column light-shadow" :class="wideMenu ? 'opened' : ''">
      <div class="mb-3 d-flex cursor-pointer side-link" @click="setWideMenu">
        <span class="material-icons-outlined mb-3">menu</span>
      </div>
      <router-link to="/lk" tag="div" class="cursor-pointer side-link overflow-hidden mb-3 d-flex">
        <span class="material-icons-outlined mb-1">person</span>
        <span class="ml-2" :class="wideMenu ? '' : 'menu-title-hidden'">Личный кабинет</span>
      </router-link>
<!--      <router-link to="/" tag="div" class="cursor-pointer side-link overflow-hidden mb-3 d-flex">-->
<!--        <span class="material-icons-outlined mb-1">schedule</span>-->
<!--        <span class="ml-2" :class="wideMenu ? '' : 'menu-title-hidden'">Операции</span>-->
<!--      </router-link>-->
      <router-link to="/" tag="div" class="cursor-pointer side-link overflow-hidden mb-3 d-flex">
        <span class="material-icons-outlined mb-1">paid</span>
        <span class="ml-2" :class="wideMenu ? '' : 'menu-title-hidden'">Биллинг</span>
      </router-link>
      <router-link to="/" tag="div" class="cursor-pointer side-link overflow-hidden mb-3 d-flex mt-auto">
        <span class="material-icons-outlined mt-auto">settings</span>
        <span class="ml-2" :class="wideMenu ? '' : 'menu-title-hidden'">Настройки</span>
      </router-link>
    </div>
    <b-container>
      <transition name="fade" mode="out-in" appear>
        <router-view/>
      </transition>
    </b-container>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import axios from "axios";
import {parseJwt} from "./utils";

export default {
  data () {
    return {
      theme: "",
      wideMenu: false,
      searchInput: ""
    }
  },
  computed: {
    ...mapGetters(["getQuery"])
  },
  methods: {
    ...mapActions(["searchDatasets", "setQuery", "userLogin"]),
    setTheme() {
      if (this.theme === "default") {
        this.theme = "light"
        document.documentElement.setAttribute("theme", "light")
        localStorage.setItem("theme", "light")
      } else if (this.theme === "dark") {
        this.theme = "default"
        document.documentElement.setAttribute("theme", "default")
        localStorage.setItem("theme", "default")
      } else {
        this.theme = "dark"
        document.documentElement.setAttribute("theme", "dark")
        localStorage.setItem("theme", "dark")
      }
    },
    setWideMenu() {
      this.wideMenu = !this.wideMenu;
    },
    searchEvent(e) {
      if (e.code === "Enter" && this.getQuery.trim() !== '') {
        this.sendSearch()
      }
    },
    sendSearch() {
      if (this.getQuery.trim() !== '') {
        this.searchDatasets(this.getQuery)
        this.$router.push("/search/" + this.getQuery)
      }
    }
  },
  mounted() {
    let docTheme = document.documentElement.getAttribute("theme")
    let storeTheme = localStorage.getItem("theme")

    if (docTheme || storeTheme) {
      this.theme = docTheme || storeTheme
      document.documentElement.setAttribute("theme", this.theme)
      localStorage.setItem("theme", this.theme)
    } else {
      this.theme = "default"
      document.documentElement.setAttribute("theme", "default")
      localStorage.setItem("theme", "default")
    }

    // restore auth

    let jwt = localStorage.getItem("token")
    if (jwt) {
      axios.defaults.headers.common['Application-Authorization'] = jwt;
      this.userLogin(parseJwt(jwt))
      // if (this.$route.path !== "/") {
      //   this.$router.push("/")
      // }
    } else {
      this.$router.push("/login")
    }
  }
}
</script>

<style lang="scss">
@import "style";

#app{
  background: var(--background-light);
}

.top-nav {
  background: var(--background);
  padding: 20px 10px;
  border-radius: 0 0 20px 20px;
}

#nav {
  background: var(--background-light);
}

.search-string {
  background: var(--background-light);
  border-radius: 10px;
  overflow: hidden;

  input {
    background: none;
    border: none;
    outline: none;
    font-size: 18px;
    padding: 8px 10px;
    color: var(--text-color)
  }

  input::placeholder {
    opacity: 0.3;
    color: var(--text-color);
  }

  span{
    opacity: 0.3;
    color: var(--text-color);
    font-size: 32px;
  }
}

.logout{
  @extend .cursor-pointer;
  span{
    opacity: 0.8;
    color: var(--text-color);
    font-size: 42px;
  }
}

.switcher{
  background: var(--text-color);
  width: 35px;
  height: 35px;
  border-radius: 50px;
  position: relative;
  opacity: 0.8;
}

.side-nav{
  background: var(--background);
  width: 70px;
  position: fixed;
  top: 20vh;
  height: 40vh;
  border-radius: 0 20px 20px 0;
  padding: 16px 20px;
  color: var(--text-color);
  z-index: 1000;
  span{
    word-break: keep-all;
    text-wrap: none;
    white-space: nowrap;
  }
}

.side-nav.opened{
  width: 220px;
  overflow: hidden;
}


.menu-title-hidden{
  opacity: 0;
}

.logo{
  font-size: 24px;
  font-weight: 500;
  color: var(--text-color);
  span{
    color: var(--accent-color);
  }
}

.side-link{
  transition: all .15s ease;
}

.side-link:hover{
  color: var(--accent-color);
}

.search-button{
  border-radius: 10px;
  height: 100%;
  background: var(--accent-color);
  color: var(--background-light);
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  width: 0;
  padding: 10px;
  padding-left: 0;
  padding-right: 0;
}

.search-button.ready-search{
  width: 88px;
  padding: 10px 15px;
}
</style>
