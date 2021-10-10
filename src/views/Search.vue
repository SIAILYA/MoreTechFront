<template>
  <div class="about pt-5">
    <div v-if="getLoadingDatasets" class="d-flex flex-column text-center">
      <span class="searching">Поиск датасетов...</span>
      <b-spinner class="mx-auto mt-3" type="grow"></b-spinner>
    </div>
    <div v-else>
      <div v-if="getSearchDatasets.length === 0" class="text-center empty-search">
        <h2>К сожалению, пусто :(</h2>
        <span>Попробуйте переформулировать запрос</span>
        <div>Например:
          <a v-for="(d, index) in randomDatasets" :href="'/search/' + d" :key="d">{{ d }} {{index !== (randomDatasets.length - 1) ? ',' : ''}} </a>
        </div>
      </div>
      <div v-else>
        <div class="row">
          <span class="col-9">{{
              getWordWithCount(getSearchDatasets.length, ["Найден", "Найдено", "Найдено"])
            }} {{ getSearchDatasets.length }} {{ getWordWithCount(getSearchDatasets.length, ["результат", "результата", "результатов"]) }} по запросу "{{
              $route.params.searchQuery
            }}" за {{getSearchTime}} сек</span>
          <div class="col-3">
            <div class="sort-btn">
              <v-select :options="['Рейтинг (вверх)', 'Рейтинг (вниз)', 'Оценки (вверх)', 'Оценки (вниз)']" v-model="selectedSort" @input="setSort"></v-select>
            </div>
          </div>
        </div>
        <div class="datasets-views row mt-5">
          <div v-for="ds in getSearchDatasets" :key="ds._id" class="col-4 d-flex">
            <router-link :to="'/dataset/' + ds._id" class="dataset-card w-100 light-shadow d-flex flex-column" tag="div">
              <span class="title mb-1">{{ ds.name }}</span>
              <span class="desc mb-2">{{ ds.description }}</span>
              <div class="d-flex mt-auto mt-3">
                <div>
                  <div class="type d-flex">
                    <span class="material-icons-outlined my-auto mr-2">toc</span>
                    <span class="my-auto info">{{ ds.type }}</span>
                  </div>
                  <div class="type d-flex">
                    <span class="material-icons-outlined my-auto mr-2">schedule</span>
                    <span class="my-auto info">{{ new Date(ds.last_change_date).toLocaleDateString("ru") }}</span>
                  </div>
                </div>
                <div class="d-flex flex-column text-center ml-auto">
                  <span :style="getGradeColor(ds.score)" class="grade">{{ ds.score }}</span>
                  <span
                      class=" info">{{
                      ds.vote_count
                    }} {{ getWordWithCount(ds.vote_count, ['отзыв', 'отзыва', 'отзывов']) }}</span>
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
import {getWordWithCount, getGradeColor} from "../utils";
import {mapActions, mapGetters} from "vuex";
import axios from "axios";
import {BACKEND} from "../../backend.config";

export default {
  data() {
    return {
      selectedSort: "Рейтинг (вниз)",
      randomDatasets: []
    }
  },
  computed: {
    ...mapGetters(["getLoadingDatasets", "getSearchDatasets", "getSearchTime"]),
  },
  methods: {
    ...mapActions(["searchDatasets", "sortDatasets", "setLoadingState"]),
    getWordWithCount,
    getGradeColor,
    setSort(e) {
      console.log(e)
      this.sortDatasets(e)
    }
  },
  mounted() {
    if (this.getLoadingDatasets === null) {
      this.searchDatasets(this.$route.params.searchQuery)
    }

    axios.get(BACKEND + "/random_dataset").then(r => {
      this.randomDatasets = r.data
    })
  }
}
</script>

<style lang="scss">
.searching {
  color: var(--text-color);
}

.spinner-grow {
  color: var(--accent-color)
}

.empty-search {
  color: var(--text-color)
}

.dataset-card {
  background: var(--background);
  color: var(--text-color);
  border-radius: 20px;
  padding: 15px;

  .title {
    font-size: 22px;
    font-weight: 500;
    line-height: 1;
  }

  .desc {
    font-size: 18px;
  }

  .info {
    font-size: 14px;
  }

  .grade {
    font-size: 24px;
  }
}
</style>
