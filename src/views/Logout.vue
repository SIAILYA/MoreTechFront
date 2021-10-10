<template>
  <div class="logout pt-5">
    <b-spinner type="grow"></b-spinner>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  data() {
    return {}
  },
  computed: {},
  methods: {
    ...mapActions(["userLogin"]),
  },
  mounted() {
    this.userLogin({})
    localStorage.setItem("token", "")
    this.$router.push("/login")
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