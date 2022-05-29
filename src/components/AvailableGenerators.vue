<template>
  <div class="q-pa-lg">
    <q-option-group
      v-model="patternFilter"
      :options="parseFilters()"
      type="checkbox"
      inline
    />
    {{ availableGenerators[0] }}
  </div>

  <div class="q-pa-md row">
    <q-list bordered separator>
      <q-item v-for="gen in availableGenerators[1]" :key="gen">
        <q-item-section>
          <q-item-label> {{ gen[0] }} </q-item-label>
          <q-item-label caption> {{ gen[1] }}</q-item-label>
        </q-item-section>
      </q-item>
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
      patternFilter: ref([]),
    };
  },
  mounted() {
    this.getAvailableGenerators();
  },
  methods: {
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
