<template>
  <div class="dataset pt-5">
    <div v-if="!getLoadingDatasets">
      <div class="row">
        <div class="col-6 d-flex">
          <div class="dataset-info light-shadow w-100 d-flex flex-column">
            <span class="title">{{ getActiveDataset.name }}</span>
            <span class="description mt-3">{{ getActiveDataset.description }}</span>
            <div class="d-flex mt-3">
              <div class="d-flex">
                <span class="material-icons-outlined my-auto mr-2">visibility</span>
                <span
                    class="my-auto">{{ getActiveDataset.views }} {{ getWordWithCount(getActiveDataset.views, ['просмотр', 'просмотра', 'просмотров']) }}</span>
              </div>
              <div class="ml-auto">
                <div class="text-center">
                  <span :style="getGradeColor(getActiveDataset.score)" class="grade">{{ getActiveDataset.score }}</span>/10
                  <br>
                  <span>{{
                      getActiveDataset.vote_count
                    }} {{ getWordWithCount(getActiveDataset.vote_count, ['оценка', 'оценки', 'оценок']) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 d-flex">
          <div class="dataset-props light-shadow w-100 d-flex flex-column">
            <span class="header">Сведения о датасете</span>
            <span class="mt-2">Формат: {{ getActiveDataset.format }}</span>
            <span>Количество строк: {{ getActiveDataset.string_count }}</span>
            <span>Размер файла: {{ getActiveDataset.size }}</span>
            <span>Дата создания: {{ new Date(getActiveDataset.creation_date).toLocaleDateString() }}</span>
            <span>Последнее изменение: {{ new Date(getActiveDataset.last_change_date).toLocaleDateString() }}</span>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-3 d-flex">
          <div class="light-shadow w-100 dataset-schema">
            <p class="title text-center">Схема представления данных</p>
            <div class="d-flex flex-column">
              <span v-for="key in Object.keys(getActiveDataset.sceme)" :key="key" class="mb-2">
                {{ key }}: {{ getActiveDataset.sceme[key] }}
              </span>
            </div>
          </div>
        </div>
        <div class="col-3 d-flex">
          <div class="light-shadow add-fields w-100 d-flex flex-column text-center">
            <div class="d-flex flex-column">
              <div class="d-flex flex-column" v-if="agregations.length === 0">
                <span class="title mb-4">Добавленные поля</span>
                <span class="material-icons-outlined icon mb-3 mt-auto">add_circle_outline</span>
                <span class="add-desc">Добавьте собственное поле</span>
                <router-link class="mb-4" to="/learn/add_fields">Как добавлять поля</router-link>
              </div>
              <div v-else>
                <div class="w-100 px-3 py-2 pipeline" v-for="agr in agregations" :key="agr.name">
                  {{agr.name}}:{{agr.type}}
                </div>
              </div>
            </div>
            <button class="add-field-btn mb-3 mt-auto" disabled>Добавить</button>
          </div>
        </div>
        <div class="col-6">
          <div class="dataset-agregate w-100 light-shadow d-flex flex-column text-center">
            <div v-if="currentTask.status !== 'done'" class="d-flex flex-column text-center">
              <span class="title">Формирование датасета</span>
              <span class="description mt-2">
                Датасет формируется. Нужно подождать. пока он обработается на сервере и будет готов для дальнейших действий
              </span>
              <b-progress class="w-100 mt-2 mb-3" value="55"></b-progress>
            </div>
            <div v-else class="d-flex flex-column text-center">
              <span class="title">Датасет сформирован!</span>
              <span class="material-icons-outlined icon-done mt-4">check_circle</span>
              <span class="description mt-2">
                Ваши данные готовы к последующей обработке!
              </span>
              <button class="download-btn w-50 mx-auto mt-3">Скачать данные</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex flex-column text-center">
      <span class="searching">Загрузка задачи...</span>
      <b-spinner class="mx-auto mt-3" type="grow"></b-spinner>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {getGradeColor, getWordWithCount} from "../utils";

export default {
  data() {
    return {
      agree: false,
      agregations: [],
      selectedField: "Number"
    }
  },
  computed: {
    ...mapGetters(["getActiveDataset", "getLoadingDatasets", "currentTask"]),
  },
  methods: {
    getWordWithCount,
    getGradeColor,
    ...mapActions(["getTask"]),
  },
  mounted() {
    this.getTask(this.$route.params.tid)
  }
}
</script>

<style lang="scss">
@import "../style";

.searching {
  color: var(--text-color);
}

.spinner-grow {
  color: var(--accent-color)
}

.empty-search {
  color: var(--text-color)
}

.dataset-info, .dataset-props, .dataset-schema, .add-fields, .dataset-agregate {
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
    font-size: 28px;
  }

  .header {
    font-size: 20px;
    font-weight: 500;
  }
}

.dataset-schema, .add-fields, .dataset-agregate {
  .title {
    font-size: 16px;
  }
}

.add-fields {
  .icon {
    font-size: 82px;
    opacity: 0.8;
  }
}

.add-field-btn, .start-agregation {
  background: var(--background-light);
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 20px;
}

.start-agregation:disabled {
  opacity: .3;
}

.modal-add {
  background: var(--background);
  border-radius: 20px !important;

  footer, header {
    border-color: var(--background-light);
  }
}

.vs--searchable .vs__dropdown-toggle {
  background: var(--background-light);
}

.vs--single .vs__selected {
  color: var(--text-color);
}

.vs__clear, .vs__open-indicator {
  fill: var(--text-color) !important
}

.vs__dropdown-toggle {
  border-radius: 10px;
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

.var-pill {
  background: var(--background-light);
  border-radius: 10px;
}

.var-pill:hover {
  opacity: .8;
}

.agregetion-str {
  border-radius: 10px;
  background: var(--background-light);
  border: none;
  outline: none;
  padding: 8px 15px;
}

.agregation-btns{
  button{
    border: none;
    outline: none;
    border-radius: 10px;
    padding: 8px 16px;
    font-size: 18px;
  }
}

.cancel-agr{
  background: var(--red);
  color: white;
}

.okay{
  background: #165e26;
  color: white;
}

.pipeline{
  background: var(--background-light);
  border-radius: 10px;
  margin-bottom: 10px;
}

.progress-bar{
  background-color: var(--accent-color);
}

.download-btn{
  background: var(--background-light);
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
}

.icon-done{
  font-size: 82px;
}
</style>
