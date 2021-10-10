<template>
  <div class="mt-5 home text-center">
    <div class="row">
      <div class="col-4">
        <div class="user-profile light-shadow d-flex flex-column text-center">
          <span class="title">Ваш профиль</span>
          <span class="material-icons-outlined mt-4 icon">person</span>
          <span class="user-name">{{ getUser.name }} {{ getUser.surname }}</span>
          <span class="role">{{ getUser.role }}</span>
        </div>
<!--        <div class="user-profile light-shadow d-flex p-3 mt-3 text-center">-->
<!--            <span class="material-icons-outlined my-auto mr-1 ml-auto">add_circle_outline</span>-->
<!--            <span class="my-auto mr-auto">Создать новое задание</span>-->
<!--        </div>-->
      </div>
      <div class="col-8">
        <span class="my-3 your-tasks">Ваши задачи</span>
        <div v-if="loading" class="d-flex flex-column text-center">
          <span class="searching">Загрузка задач</span>
          <b-spinner class="mx-auto mt-3" type="grow"></b-spinner>
        </div>
        <div class="d-flex mt-4 flex-wrap" v-else>
          <div class="px-2 w-50 mt-3 d-flex" v-for="ts in tasks" :key="ts._id">
            <router-link :to="'/task/' + ts._id" class="w-100 task-card light-shadow d-flex flex-column text-left text-decoration-none">
              <span class="title ml-0 mb-3">Task#{{ ts.task_id }}</span>
              <span class="mb-2">Датасет: <router-link :to="'/dataset/' + ts.dataset_id">{{ts.dataset}}</router-link></span>
              <div class="d-flex mt-2">
                <div class="d-flex">
                  <span class="material-icons-outlined mr-1">schedule</span>
                  <span>{{new Date(ts.date).toLocaleString()}}</span>
                </div>
                <div class="d-flex ml-auto">
                  <span class="material-icons-outlined mr-1">sync</span>
                  <span>{{ts.status === "in_progress" ? "В процессе" : ts.status === "done" ? "Готово" : ts.status}}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";
import {BACKEND} from "../../backend.config";

export default {
  name: 'Home',
  data() {
    return {
      tasks: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  methods: {},
  mounted() {
    this.loading = true
    axios.post(BACKEND + "/get_tasks", {user_id: this.getUser.user_id}).then(r => {
      this.loading = false
      this.tasks = r.data
    })
  }
}
</script>

<style lang="scss">
.user-profile, .task-card {
  background: var(--background);
  color: var(--text-color);
  border-radius: 20px;
  width: 100%;
  padding: 20px;

  .icon {
    font-size: 82px;
    margin-bottom: 10px;
  }

  .title {
    font-size: 20px;
    font-weight: 500;
    margin: auto;
    line-height: 1;
  }
}

.your-tasks{
  font-size: 18px!important;
  font-weight: 500;
}

.task-card:hover{
  transform: scale(1.03);
}
</style>

