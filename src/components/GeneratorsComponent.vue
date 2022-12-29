<template>
  <h5 class="text-center q-ma-md">Active Generators</h5>
  <div class="q-pa-md row" v-if="activeGenerators !== null">
    <div class="col-3" v-for="gen_type in 4" :key="gen_type">
      <q-list bordered separator>
        <q-item v-for="gen_index in 3" :key="gen_index">
          <q-item-section>
            <q-item-label caption>
              {{ generatorClasses[gen_type - 1] }}
              {{ gen_index }}
            </q-item-label>
            <q-item-label>
              {{ activeGenerators[gen_type - 1][gen_index - 1] }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>

  <h5 class="text-center q-ma-md">Generator Selector</h5>

  <div class="q-mb-lg">
    <q-btn-toggle
      v-model="selectedTargetType"
      toggle-color="primary"
      :options="generateGenTypeOptions()"
    />
  </div>

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
    <div class="col-3" v-for="gen in filteredGeneratorsPattern" :key="gen">
      <q-btn
        :label="gen['generator_name']"
        style="width: 100%"
        class="q-pa-lg"
        @click="onSelectGenerator(gen.generator_name)"
        :color="
          gen.generator_name == selectedPatterns[selectedTargetLevel]
            ? 'primary'
            : 'white'
        "
        :text-color="
          gen['generator_name'] == selectedPatterns[selectedTargetLevel]
            ? 'white'
            : 'black'
        "
      />
    </div>
  </div>

  <h5 class="text-center q-ma-md">Effect Selector</h5>
  <b>put length selector here</b>
  <div class="row q-col-gutter-md">
    <div class="col-3" v-for="gen in filteredGeneratorsEffect" :key="gen">
      <q-btn
        :label="gen['generator_name']"
        style="width: 100%"
        class="q-pa-lg"
        @click="onSelectEffect(gen.generator_name)"
        color="#fff"
        text-color="#000"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

interface GeneratorMetadata {
  active_timeline_index: number; // int
  available_timelines: string[]; // list of strings
  available_keywords: string[];
  available_generators: string;
  generator_class_names: string[];
}

export default {
  name: 'ActiveGenerators',
  setup() {
    return {
      activeGenerators: ref(null),
      generatorMetadata: ref<GeneratorMetadata>(),
      //   generatorMetadata: ref(null),
      //   generatorClasses: ref({}),
      //   generatorClasses: ref<string>(),
      generatorClasses: ref(['test']),
      effectMetadata: ref({}),
      activeFilters: ref([]),
      selectedTargetLevel: ref(0),
      selectedTargetType: ref<string>(),
      selectedPatterns: ref([null, null, null]),
    };
  },
  mounted() {
    this.getGeneratorMetadata();
    this.getActiveGenerators();
  },
  computed: {
    filteredGeneratorsPattern() {
      if (
        this.generatorMetadata === undefined ||
        Object.keys(this.generatorMetadata).length === 0
      ) {
        return [];
      }
      return this.generatorMetadata['available_generators'][
        this.selectedTargetType
      ].filter((generator) => {
        return this.isIncludedInFilter(generator['generator_keywords']);
      });
    },
    selectableKeywords() {
      let filterOptions = [];
      if (this.generatorMetadata !== undefined) {
        for (var index in this.generatorMetadata['available_keywords']) {
          filterOptions.push({
            label: this.generatorMetadata['available_keywords'][index],
            value: this.generatorMetadata['available_keywords'][index],
          });
        }
      }
      return filterOptions;
    },
    filteredGeneratorsEffect() {
      if (
        this.generatorMetadata === undefined ||
        Object.keys(this.generatorMetadata).length === 0
      ) {
        return [];
      }
      return this.generatorMetadata['available_generators']['effect'].filter(
        (generator) => {
          return this.isIncludedInFilter(generator['generator_keywords']);
        }
      );
    },
  },
  methods: {
    generateGenTypeOptions() {
      return this.generatorClasses.map((level) => ({
        label: level.toUpperCase(),
        value: level,
      }));
    },
    getActiveGenerators() {
      fetch('/api/settings')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          console.log(response.selected);
          console.log(response.selected['pattern']);
          console.log(Object.keys(response.selected));
        });
      fetch('/api/active_generators')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          console.log(response.active_generators);
          this.activeGenerators = response.active_generators;
          this.selectedPatterns = this.activeGenerators[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSelectGenerator(generatorName: string) {
      this.selectedPatterns[this.selectedTargetLevel] = generatorName;
      this.activeGenerators[0] = this.selectedPatterns;
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
    },
    onSelectEffect(effectName: string) {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          effect_name: effectName,
          length_frames: 8,
        }),
      };
      fetch('/api/set_effects', requestOptions)
        .then((responsePromise) => responsePromise)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    isIncludedInFilter(generatorCategories: string[]) {
      return this.activeFilters.every((filter) => {
        return generatorCategories.includes(filter);
      });
    },
    getGeneratorMetadata() {
      fetch('/api/patternscheduler')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          this.generatorMetadata = response;
          this.generatorClasses = response['generator_class_names'];
          this.selectedTargetType = this.generatorClasses[0];
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
