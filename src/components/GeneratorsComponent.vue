<template>
  <h5 class="text-center q-ma-md">Active Generators</h5>

  <div class="row q-col-gutter-xs" v-if="selectedGenerators !== null">
    <div v-for="gen_type in 4" :key="gen_type" class="col-6">
      <div class="grey-box">
        <q-item-label caption style="color: #474747">
          {{ generatorClasses[gen_type - 1] }}
        </q-item-label>
        <div v-for="gen_index in 3" :key="gen_index">
          {{
            replace_underscores(
              selectedGenerators[generatorClasses[gen_type - 1]][gen_index]
            )
          }}
        </div>
      </div>
    </div>
    <q-space />
  </div>

  <h5 class="text-center q-ma-xs">Generator Selector</h5>

  <!-- select generator type -->
  <div class="q-mb-lg">
    <q-btn-toggle
      v-model="selectedTargetType"
      toggle-color="primary"
      :options="generateGenTypeOptions()"
    />
  </div>

  <!-- select generator level -->
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

  <!-- select keywords -->
  <div class="q-mb-lg">
    <q-option-group
      v-model="activeFilters"
      :options="selectableKeywords"
      type="checkbox"
      inline
      dense
    />
  </div>

  <!-- generator list -->
  <div class="row q-col-gutter-xs" v-if="selectedGenerators !== null">
    <div class="col-4" v-for="gen in filteredGenerators" :key="gen">
      <q-btn
        :label="replace_underscores(gen['generator_name'])"
        style="width: 100%; height: 100px"
        class="q-pa-sm"
        :square="true"
        @click="setGenerator(gen.generator_name)"
        :color="
          gen.generator_name ==
          selectedGenerators[selectedTargetType][selectedTargetLevel]
            ? 'secondary'
            : 'primary'
        "
        :text-color="
          gen['generator_name'] ==
          selectedGenerators[selectedTargetType][selectedTargetLevel]
            ? 'black'
            : 'white'
        "
      />
    </div>
  </div>

  <!-- effect list -->
  <h5 class="text-center q-ma-md">Effect Selector</h5>
  <b>put length selector here</b>
  <div class="row q-col-gutter-md">
    <div class="col-4" v-for="gen in filteredEffects" :key="gen">
      <q-btn
        :label="replace_underscores(gen['generator_name'])"
        style="width: 100%; height: 100px"
        class="q-pa-sm"
        :square="true"
        @click="setEffect(gen.generator_name)"
        color="#fff"
        text-color="#000"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.grey-box
  padding: 10px 15px
  background: rgba(86,61,124,.15)
  border: 1px solid rgba(86,61,124,.2)
</style>

<script>
export default {
  name: 'ActiveGenerators',
  data() {
    return {
      selectedGenerators: null,
      apiResponse: {},
      generatorClasses: [],
      activeFilters: [],
      selectedTargetLevel: 1,
      selectedTargetType: '',
    };
  },
  mounted() {
    fetch('/api')
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.apiResponse = response;
        this.generatorClasses = response['generator_classes_identifiers'].slice(
          0,
          4
        );
        this.selectedTargetType = this.generatorClasses[0];
        this.selectedGenerators = response.selected;
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    filteredGenerators() {
      if (Object.keys(this.apiResponse).length === 0) {
        return [];
      }
      return this.apiResponse['meta_available_generators'][
        this.selectedTargetType
      ].filter((generator) => {
        return this.isIncludedInFilter(generator['generator_keywords']);
      });
    },
    filteredEffects() {
      if (Object.keys(this.apiResponse).length === 0) {
        return [];
      }
      return this.apiResponse['meta_available_generators'][
        'effect_glob'
      ].filter((generator) => {
        return this.isIncludedInFilter(generator['generator_keywords']);
      });
    },
    selectableKeywords() {
      let filterOptions = [];
      if (this.apiResponse !== null) {
        for (var index in this.apiResponse['meta_available_keywords']) {
          filterOptions.push({
            label: this.apiResponse['meta_available_keywords'][index],
            value: this.apiResponse['meta_available_keywords'][index],
          });
        }
      }
      return filterOptions;
    },
  },
  methods: {
    isIncludedInFilter(generatorCategories) {
      return this.activeFilters.every((filter) => {
        return generatorCategories.includes(filter);
      });
    },
    replace_underscores(input_string) {
      return input_string.replace(/_/g, ' ');
    },
    generateGenTypeOptions() {
      return this.generatorClasses.map((level) => ({
        label: level.toUpperCase(),
        value: level,
      }));
    },
    setGenerator(generatorName) {
      this.selectedGenerators[this.selectedTargetType][
        this.selectedTargetLevel
      ] = generatorName;
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
    setEffect(effectName) {
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
  },
};
</script>
