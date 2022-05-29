<template>
  <div class="q-mb-lg">
    <q-option-group
      v-model="activeFilters"
      :options="parseFilters()"
      type="checkbox"
      inline
      dense
    />
  </div>

  <div class="row q-col-gutter-md">
    <div class="col-3" v-for="gen in filteredGenerators" :key="gen">
      <q-btn :label="gen[0]" style="width: 100%" class="q-pa-lg" />
    </div>
  </div>
</template>

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
        return this.checkIfSelected(generator[1]);
      });
    },
  },
  methods: {
    checkIfSelected(generator_keywords: string[]) {
      return this.activeFilters.every((filter) => {
        return generator_keywords.includes(filter);
      });
    },
    parseFilters() {
      let filters = [];
      for (var index in this.availableGenerators[0]) {
        filters.push({
          label: this.availableGenerators[0][index],
          value: this.availableGenerators[0][index],
        });
      }
      return filters;
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
