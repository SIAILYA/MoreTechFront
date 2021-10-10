<template>
  <div class="login pt-5">
    <b-modal id="modal-login" centered content-class="modal-add" header-class hide-footer no-close-on-backdrop
             no-close-on-esc title="Добрый день!" visible>
      <div class="d-flex flex-column w-50 mx-auto">
        <span>Логин</span>
        <input ref="login" type="text">
        <span class="mt-2">Пароль</span>
        <input ref="pwd" type="password">

        <button class="mt-4" @click="login">Войти</button>
      </div>
    </b-modal>
  </div>
</template>

<script>

import {BACKEND} from "../../backend.config";
import axios from "axios";
import {parseJwt} from "../utils";
import {mapActions} from "vuex";

export default {
  data() {
    return {}
  },
  computed: {},
  methods: {
    ...mapActions(["userLogin"]),
    login() {
      axios.post(BACKEND + "/login_jwt", {login: this.$refs.login.value, password: this.$refs.pwd.value}).then(r => {
        localStorage.setItem("token", r.data)
        axios.defaults.headers.common['Application-Authorization'] = r.data;
        this.userLogin(parseJwt(r.data))
        this.$router.push("/")
      })
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss">
.modal-add {
  background: var(--background);
  border-radius: 20px !important;

  footer, header {
    border-color: var(--background-light);
  }
}

input {
  background: var(--background-light);
  color: var(--text-color);
  outline: none;
  border: none;
  border-radius: 10px;
  height: 100%;
  padding: 5px;
}

</style>

<style scoped>
button {
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 18px;
  font-weight: 500;
  background: var(--background-light);
}
</style>