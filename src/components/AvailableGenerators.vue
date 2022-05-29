<template>
  <div class="q-pa-lg">
    <q-option-group
      v-model="activeFilters"
      :options="parseFilters()"
      type="checkbox"
      inline
    />
    {{ availableGenerators[0] }}
  </div>

  <div class="q-pa-md row">
    <q-list bordered separator>
      <template v-for="gen in availableGenerators[1]" :key="gen">
        <q-item v-if="checkIfSelected(gen[1])">
          <q-item-section>
            <q-item-label> {{ gen[0] }} </q-item-label>
            <q-item-label caption> {{ gen[1] }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  name: 'AvailableGenerators',
  setup() {
    return {
      availableGenerators: ref([]),
      activeFilters: ref([]),
    };
  },
  mounted() {
    this.getAvailableGenerators();
  },
  methods: {
    checkIfSelected(generator_keywords) {
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
