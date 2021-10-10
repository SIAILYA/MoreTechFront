<template>
  <div class="learn pt-5 text-center">
    <h1>Обучение и гайды</h1>
    <div class="mt-4">
      Чтобы работать в нашем сервисе не нужно быть специалистом в области BigData - интерфейс программы дружелюбен и прост.
    </div>
  </div>
</template>

<script>
import {getGradeColor, getWordWithCount} from "../utils";
import {mapActions, mapGetters} from "vuex";

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
    ...mapActions(["getPopular", "sortDatasets", "setLoadingState"]),
    getWordWithCount,
    getGradeColor,
  },
  mounted() {
    this.getPopular()
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
