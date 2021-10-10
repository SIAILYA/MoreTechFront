<template>
  <div class="mt-5 home text-center">
    <h1 class="mb-1">
      Добро пожаловать, {{ getUser.name }}!
    </h1>
    <h3>
      Не знаете, с чего начать?
    </h3>
    <div class="quick-cards row mt-5">
      <div v-for="card in qc" :key="card.title" class="col-3 d-flex">
        <router-link tag="div" class="q-card d-flex flex-column light-shadow" v-if="card.to !== '/'" :to="card.to">
          <span class="material-icons-outlined icon">{{ card.icon }}</span>
          <span class="title">{{ card.title }}</span>
          <span class="desc">{{ card.desc }}</span>
        </router-link>
        <div v-else class="q-card d-flex flex-column light-shadow" @click="setSearchFocus">
          <span class="material-icons-outlined icon">{{ card.icon }}</span>
          <span class="title">{{ card.title }}</span>
          <span class="desc">{{ card.desc }}</span>
        </div>
      </div>
    </div>
    <h3 class="mt-5">Данные по категориям</h3>
    <div class="themes-cards mt-4 d-flex">
      <div v-for="card in cc" :key="card.title" class="d-flex c-card__wrapper">
        <a :href="'/search/' + card.title" class="c-card d-flex flex-column text-decoration-none">
          <span class="material-icons-outlined icon">{{ card.icon }}</span>
          <span class="title">{{card.title}}</span>
        </a>
      </div>
    </div>
    <router-link tag="h6" to="/cat" class="mt-3 cursor-pointer">Смотреть все категории</router-link>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Home',
  data() {
    return {
      qc: [
        {
          title: "Поиск датасетов",
          desc: "Сырые данные, которые можно свободно обрабатывать",
          to: "/",
          icon: "search"
        },
        {
          title: "Смотреть популярные",
          desc: "Данные, с которыми пользователи работают чаще всего",
          to: "/popular",
          icon: "auto_awesome"
        },
        {
          title: "Научиться работать",
          desc: "Документация и гайды по работе с платформой",
          to: "/learn",
          icon: "school"
        },
        {
          title: "Связь с поддержкой",
          desc: "При возникновении критических ошибок или вопросов",
          to: "/support",
          icon: "support_agent"
        },
      ],
      cc: [
        {
          icon: "image",
          title: "Изображения",
          to: "/cat/pictures"
        },
        {
          icon: "payments",
          title: "Финансы",
          to: "/cat/finance"
        },
        {
          icon: "public",
          title: "География",
          to: "/cat/geo"
        },
        {
          icon: "lock_open",
          title: "Персональные даные",
          to: "/cat/personal"
        },
        {
          icon: "crib",
          title: "Дети и родители",
          to: "/cat/child"
        },
      ]
    }
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  methods: {
    setSearchFocus() {
      document.getElementById('search').focus()
    }
  }
}
</script>

<style lang="scss">
.home {
  background: var(--background-light);

  h1, h3 {
    color: var(--text-color)
  }

  h3 {
    font-weight: normal;
  }
}

.quick-cards {
  .q-card {
    background: var(--background);
    color: var(--text-color);
    border-radius: 20px;
    padding: 10px;

    .icon {
      font-size: 96px;
    }

    .title {
      font-size: 20px;
      font-weight: 500;
      margin-top: 5px;
      margin-bottom: 10px;
    }
  }
}

.q-card:hover {
  cursor: pointer;
  transform: scale(1.03);

  .icon {
    color: var(--accent-color)
  }
}

.c-card__wrapper{
  width: 20%;
  padding: 0 8px;
  .c-card{
    background: var(--background);
    color: var(--text-color);
    border-radius: 20px;
    width: 100%;
    padding: 8px;

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
}

.c-card:hover{
  transform: scale(1.03);
  cursor: pointer;
  .icon{
    color: var(--accent-color);
  }
}

h6{
  text-decoration: underline;
  color: var(--text-color);
}
</style>

