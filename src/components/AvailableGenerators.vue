<template>
  <div class="q-mb-lg">
    <q-option-group
      v-model="activeFilters"
      :options="filterOptions"
      type="checkbox"
      inline
      dense
    />
  </div>

  <div class="row q-col-gutter-md">
    <div class="col-3" v-for="gen in filteredGenerators" :key="gen">
      <q-btn
        :label="gen[0]"
        style="width: 100%"
        class="q-pa-lg"
        @click="selectedGenerator = gen[0]"
        :color="gen[0] == selectedGenerator ? 'primary' : 'white'"
        :text-color="gen[0] == selectedGenerator ? 'white' : 'black'"
      />
    </div>
  </div>
</template>

<style scoped>
/* TODO: Maybe use css class to set button colors? */
.btn-active {
}
.btn-inactive {
}
</style>

<script lang="ts">
import { ref } from 'vue';
export default {
  name: 'AvailableGenerators',
  setup() {
    return {
      /*
    this.availableGenerators = [
      ['ambient', 'techno', 'breakbeat', 'disco'], // categories
      [
        ['Strobe', ['techno']],
        ['Meteor', ['disco', 'techno']],
        ['MovingStrobe', ['breakbeat', 'techno']],
        ['Lavalamp', ['ambient']],
      ],
    ];
    */
      availableGenerators: ref([]),
      activeFilters: ref([]),
      selectedGenerator: ref(null),
    };
  },
  mounted() {
    this.getAvailableGenerators();
  },
  computed: {
    filteredGenerators() {
      if (
        this.availableGenerators === undefined ||
        this.availableGenerators.length == 0
      ) {
        return [];
      }
      return this.availableGenerators[1].filter((generator) => {
        return this.isIncludedInFilter(generator[1]);
      });
    },
    filterOptions() {
      let filterOptions = [];
      for (var index in this.availableGenerators[0]) {
        filterOptions.push({
          label: this.availableGenerators[0][index],
          value: this.availableGenerators[0][index],
        });
      }
      return filterOptions;
    },
  },
  methods: {
    isIncludedInFilter(generatorCategories: string[]) {
      return this.activeFilters.every((filter) => {
        return generatorCategories.includes(filter);
      });
    },
    getAvailableGenerators() {
      fetch('/api/available_generators')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          this.availableGenerators = response.available_generators;
          console.log(this.availableGenerators);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
