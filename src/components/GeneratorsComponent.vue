<template>
  <!-- setting toggles -->
  <div class="row q-col-gutter-xs" v-if="selectedGenerators !== null">
    <div class="col-12">
      <div class="grey-box row">
        <div class="col-4" v-for="button in buttons" :key="button">
          <q-item-label caption style="color: #474747"
            >{{ button }}
          </q-item-label>
          <q-toggle
            @click="set_settings(button)"
            v-model="apiResponse[button]"
            color="secondary"
          />
        </div>
      </div>
    </div>

    <!-- select type -->
    <div v-for="(e, gen_type_idx) in 4" :key="gen_type_idx" class="col-6">
      <div
        @click="this.selected_type = typ[gen_type_idx]"
        :class="
          this.selected_type == typ[gen_type_idx] ? 'green-box' : 'grey-box'
        "
      >
        <q-item-label caption style="color: #474747">
          {{ typ[gen_type_idx] }}
        </q-item-label>
        <div v-for="gen_index in 3" :key="gen_index">
          {{
            replace_underscores(
              selectedGenerators[typ[gen_type_idx]][gen_index]
            )
          }}
        </div>
      </div>
    </div>
    <div class="col-12">
      <div
        @click="this.selected_type = typ[4]"
        :class="this.selected_type == typ[4] ? 'green-box' : 'grey-box'"
      >
        <q-item-label caption style="color: #474747">
          {{ typ[4] }}
        </q-item-label>
        <div v-for="gen_index in 3" :key="gen_index">
          {{ replace_underscores(selectedGenerators[typ[4]][gen_index]) }}
        </div>
      </div>
    </div>
  </div>

  <!-- select generator level -->
  <div class="q-my-sm row justify-between">
    <q-btn-toggle
      v-model="timeline_level"
      toggle-color="primary"
      :options="[
        { label: 'auto', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '2', value: 3 },
      ]"
      size="lg"
    />

    <q-btn-group>
      <q-btn
        label="alternate"
        icon="update"
        @click="send_command('alternate')"
      />
    </q-btn-group>
  </div>

  <!-- select keywords -->
  <div class="q-my-sm">
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
        @click="setGenerator(gen.generator_name)"
        :label="replace_underscores(gen['generator_name'])"
        style="width: 100%; height: 80px"
        class="q-pa-sm"
        :square="true"
        :color="
          gen.generator_name ==
          selectedGenerators[selected_type][timeline_level]
            ? 'secondary'
            : 'primary'
        "
        :text-color="
          gen['generator_name'] ==
          selectedGenerators[selected_type][timeline_level]
            ? 'black'
            : 'white'
        "
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ActiveGenerators",
  data() {
    return {
      apiResponse: null,
      meta: null,
      selectedGenerators: null,
      selected_type: "pattern",
      timeline_level: 0,
      activeFilters: [],
      typ: ["pattern", "pattern_sec", "vfilter", "dimmer", "thinner", "effect"],
      buttons: [
        "global_vfilter",
        "global_dimmer",
        "global_thinner",
        "load_thinner_with_pat",
        "load_dimmer_with_pat",
        "load_triggers_with_gen",
      ],
    };
  },
  mounted() {
    fetch("/rest/settings")
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.apiResponse = response;
        this.selectedGenerators = response.selected;
        console.log(this.apiResponse);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("/rest/meta")
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.meta = response;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    filteredGenerators() {
      if (this.meta == null) {
        return [];
      }
      let selected_type = this.selected_type;
      selected_type =
        selected_type == "pattern_sec" ? "pattern" : selected_type;
      return this.meta["available_generators"][selected_type].filter(
        (generator) => {
          return this.isIncludedInFilter(generator["generator_keywords"]);
        }
      );
    },
    selectableKeywords() {
      let filterOptions = [];
      if (this.meta !== null) {
        for (var index in this.meta["available_keywords"]) {
          filterOptions.push({
            label: this.meta["available_keywords"][index],
            value: this.meta["available_keywords"][index],
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
      return input_string.replace(/_/g, " ");
    },
    setGenerator(generatorName) {
      this.selectedGenerators[this.selected_type][this.timeline_level] =
        generatorName;
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "set_generator",
          gen_type: this.selected_type,
          gen_name: generatorName,
          timeline_level: this.timeline_level,
        }),
      };
      fetch("/rest/settings", requestOptions)
        .then((responsePromise) => responsePromise)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    set_settings(var_name) {
      let requestBody = {
        action: "set_settings",
      };
      requestBody[var_name] = this.apiResponse[var_name];
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };
      fetch("/rest/settings", requestOptions)
        .then((responsePromise) => responsePromise)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    send_command(command) {
      const data = {
        action: "gen_command",
        command: command,
        gen_type: this.selected_type,
        timeline_level: this.timeline_level,
      };
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      fetch("/rest/settings", requestOptions)
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
