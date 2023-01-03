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
              {{ activeGenerators[generatorClasses[gen_type - 1]][gen_index] }}
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
        { label: 'Primary', value: 1 },
        { label: 'Seconday', value: 2 },
        { label: 'Tertiary', value: 3 },
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

  <div class="row q-col-gutter-md" v-if="activeGenerators !== null">
    <div class="col-3" v-for="gen in filteredGeneratorsPattern" :key="gen">
      <q-btn
        :label="gen['generator_name']"
        style="width: 100%"
        class="q-pa-lg"
        @click="onSelectGenerator(gen.generator_name)"
        :color="
          gen.generator_name ==
          activeGenerators[selectedTargetType][selectedTargetLevel]
            ? 'primary'
            : 'white'
        "
        :text-color="
          gen['generator_name'] ==
          activeGenerators[selectedTargetType][selectedTargetLevel]
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
  meta_available_timelines: string[]; // list of strings
  meta_available_keywords: string[];
  meta_available_generators: string;
  generator_class_names: string[];
}

export default {
  name: 'ActiveGenerators',
  setup() {
    return {
      activeGenerators: ref(null),
      generatorMetadata: ref<GeneratorMetadata>(),
      generatorClasses: ref(['']),
      effectMetadata: ref({}),
      activeFilters: ref([]),
      selectedTargetLevel: ref(1),
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
      return this.generatorMetadata['meta_available_generators'][
        this.selectedTargetType
      ].filter((generator) => {
        return this.isIncludedInFilter(generator['generator_keywords']);
      });
    },
    selectableKeywords() {
      let filterOptions = [];
      if (this.generatorMetadata !== undefined) {
        for (var index in this.generatorMetadata['meta_available_keywords']) {
          filterOptions.push({
            label: this.generatorMetadata['meta_available_keywords'][index],
            value: this.generatorMetadata['meta_available_keywords'][index],
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
      return this.generatorMetadata['meta_available_generators'][
        'effect'
      ].filter((generator) => {
        return this.isIncludedInFilter(generator['generator_keywords']);
      });
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
      fetch('/api')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          console.log(response.selected);
          this.activeGenerators = response.selected;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSelectGenerator(generatorName: string) {
      this.activeGenerators[this.selectedTargetType][this.selectedTargetLevel] =
        generatorName;
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'set_generator',
          gen_type: this.selectedTargetType,
          gen_name: generatorName,
          level_index: this.selectedTargetLevel,
        }),
      };
      fetch('/api', requestOptions)
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
          action: 'set_effect',
          effect_name: effectName,
          length_frames: 8,
        }),
      };
      fetch('/api', requestOptions)
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
      fetch('/api')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          this.generatorMetadata = response;
          this.generatorClasses = response[
            'generator_classes_identifiers'
          ].slice(0, 4);
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
