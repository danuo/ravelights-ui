<!-- 
example data input:

data = {
  "available_keywords": ["keyword 1", "keyword 2"...]
  "available_generators": [
    {
      "generator_name": "name1",
      "generator_keywords": ["keyword 3", "keyword 4"...],
    },
    {
      "generator_name": "name2",
      "generator_keywords": ["keyword 2", "keyword 4"...],
    }
  ]
}
-->

<template>
  <div class="q-mb-lg">
    <q-btn-toggle
      v-model="selectedTargetLevel"
      toggle-color="primary"
      :options="[
        { label: 'Primary', value: 0 },
        { label: 'Seconday', value: 1 },
        { label: 'Tertiary', value: 2 },
      ]"
    />
  </div>

  <div class="q-mb-lg">
    <q-option-group
      v-model="activeFilters"
      :options="selectableKeywords"
      type="checkbox"
      inline
      dense
    />
  </div>

  <div class="row q-col-gutter-md">
    <div class="col-3" v-for="gen in filteredGenerators" :key="gen">
      <q-btn
        :label="gen['generator_name']"
        style="width: 100%"
        class="q-pa-lg"
        @click="onSelectGenerator(gen.generator_name)"
        :color="
          gen.generator_name == selectedGenerators[selectedTargetLevel]
            ? 'primary'
            : 'white'
        "
        :text-color="
          gen['generator_name'] == selectedGenerators[selectedTargetLevel]
            ? 'white'
            : 'black'
        "
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
      generatorMetadata: ref({}),
      activeFilters: ref([]),
      selectedTargetLevel: ref(0),
      selectedGenerators: ref([null, null, null]),
    };
  },
  mounted() {
    this.getGeneratorMetadata();
  },
  computed: {
    filteredGenerators() {
      if (
        this.generatorMetadata === undefined ||
        Object.keys(this.generatorMetadata).length === 0
      ) {
        return [];
      }
      return this.generatorMetadata['available_generators'].filter(
        (generator) => {
          return this.isIncludedInFilter(generator['generator_keywords']);
        }
      );
    },
    selectableKeywords() {
      let filterOptions = [];
      for (var index in this.generatorMetadata['available_keywords']) {
        filterOptions.push({
          label: this.generatorMetadata['available_keywords'][index],
          value: this.generatorMetadata['available_keywords'][index],
        });
      }
      return filterOptions;
    },
  },
  methods: {
    onSelectGenerator(generatorName: string) {
      this.selectedGenerators[this.selectedTargetLevel] = generatorName;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type_name: 'pattern',
          level_index: this.selectedTargetLevel + 1,
          generator_name: generatorName,
        }),
      };
      fetch('/api/set_generators', requestOptions)
        .then((responsePromise) => responsePromise)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      // TODO:_Update ActiveGenerator component
    },
    isIncludedInFilter(generatorCategories: string[]) {
      return this.activeFilters.every((filter) => {
        return generatorCategories.includes(filter);
      });
    },
    getGeneratorMetadata() {
      fetch('/api/generator_metadata')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          this.generatorMetadata = response;
          console.log(this.generatorMetadata);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
