<template>
  <div class="dataset pt-5">
    <b-modal id="modal-add-agregate" centered content-class="modal-add" hide-footer title="Добавление нового поля">
      <div>
        Основная информация
        <div class="mt-2 row">
          <div class="col-6">
            <input class="w-100" placeholder="Название поля" ref="agregation-name" type="text">
          </div>
          <div class="col-6">
            <v-select v-model="selectedField" :options="['Number', 'String', 'Boolean', 'Date']"
                      class="w-100"></v-select>
          </div>
        </div>
      </div>
      <div class="mt-4">
        Конструктор значения
        <div class="d-flex flex-wrap">
          <div
              v-for="k in Object.keys(getActiveDataset.sceme).filter((i) => {return (getActiveDataset.sceme[i] === selectedField) && (i !== selectedField)})"
              :key="k" class="var-pill mr-2 px-2 py-1 mt-2 cursor-pointer" @click="addVariable(k)">
            {{ k }}
          </div>
        </div>

        <div class="d-flex flex-wrap mt-3">
          <div v-for="o in (
              selectedField === 'Number' ? ['+', '-', '*', '/'] :
          selectedField === 'Boolean' ? ['and', 'or'] :
          selectedField === 'String' ? ['+', '_'] : [])" :key="o" @click="addVariable(o)" class="var-pill mr-2 py-2 px-3 mt-2 cursor-pointer">
            {{ o }}
          </div>
        </div>

        <textarea ref="agregation-str" class="w-100 mt-3 agregetion-str">
          =
        </textarea>

        <div class="mt-4">
          <div class="d-flex agregation-btns">
            <button class="cancel-agr ml-auto" @click="cancelAgregation">Отмена</button>
            <button class="okay ml-3" @click="saveAgregation">Сохранить</button>
          </div>
        </div>
      </div>
    </b-modal>
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
            <button class="add-field-btn mb-3 mt-auto" @click="$bvModal.show('modal-add-agregate')">Добавить</button>
          </div>
        </div>
        <div class="col-6">
          <div class="dataset-agregate w-100 light-shadow d-flex flex-column text-center">
            <span class="title">Формирование датасета</span>
            <span class="description mt-2">
              После того, как создаите все нужные поля - запустите формирование датасета. Этот процесс происходит на удаленном сервере и может занять время. За его ходом вы сможете следить на этой странице
            </span>
            <div class="text-left mt-3">
              <b-form-checkbox
                  id="checkbox-agree"
                  v-model="agree"
                  name="checkbox-agree"
              >
                Подтвержаю, что все нужные поля сформированы и данные готовы к обработке на сервере
              </b-form-checkbox>
            </div>
            <button :disabled="!agree" @click="startTask" class="start-agregation mt-4 w-25 mx-auto">Запустить</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex flex-column text-center">
      <span class="searching">Загрузка датасета...</span>
      <b-spinner class="mx-auto mt-3" type="grow"></b-spinner>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {getGradeColor, getWordWithCount} from "../utils";
import axios from "axios";
import {BACKEND} from "../../backend.config";

export default {
  data() {
    return {
      agree: false,
      agregations: [],
      selectedField: "Number"
    }
  },
  computed: {
    ...mapGetters(["getActiveDataset", "getLoadingDatasets", "getUser"]),
  },
  methods: {
    getWordWithCount,
    getGradeColor,
    ...mapActions(["getDataset"]),
    addVariable(v) {
      this.$refs["agregation-str"].value += (" " + v + " ")
    },
    saveAgregation() {
      this.agregations.push({
        name: this.$refs["agregation-name"].value,
        agregation: this.$refs["agregation-str"].value,
        type: this.selectedField
      })

      this.cancelAgregation()
    },
    cancelAgregation() {
      this.$refs["agregation-str"].value = ""
      this.$refs["agregation-name"].value = ""
      this.selectedField = "Number"
      this.$bvModal.hide("modal-add-agregate")
    },
    startTask() {
      axios.post(BACKEND + "/add_task", {user_id: this.getUser.user_id, dataset_id: this.getActiveDataset._id, dataset_name: this.getActiveDataset.name}).then(r => {
        this.$router.push("/task/" + r.data)
      })
    }
  },
  mounted() {
    this.getDataset(this.$route.params.did)
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
</style>
