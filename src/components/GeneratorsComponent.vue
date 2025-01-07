<template>
  <!-- setting toggles -->
  <div class="row q-col-gutter-xs q-mb-sm">
    <div class="col-4" v-for="button in buttons" :key="button.label">
      <SmallToggleComponent
        :active="settings[button.var_name]"
        @click="toggleSetting(button.var_name)"
        :label="button.label"
      ></SmallToggleComponent>
    </div>
  </div>

  <div class="row q-col-gutter-xs">
    <!-- select type -->
    <div v-for="(e, gen_type_idx) in 6" :key="gen_type_idx" class="col-6">
      <div
        @click="selected_type = typ[gen_type_idx]"
        :class="selected_type == typ[gen_type_idx] ? 'green-box' : 'grey-box'"
      >
        <q-item-label caption style="color: #474747">
          {{ typ[gen_type_idx] }}
        </q-item-label>
        <div v-for="gen_index in 3" :key="gen_index">
          {{
            replace_underscores(
              settings.selected[effective_device_index][typ[gen_type_idx]][
                gen_index
              ]
            )
          }}
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
        { label: 'auto', value: null },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
      ]"
      size="lg"
    />

    <q-btn-group>
      <q-btn
        label="alternate"
        icon="update"
        @click="send_gen_command('alternate')"
      />
    </q-btn-group>
  </div>

  <!-- select keywords -->
  <div class="q-my-sm">
    <q-option-group
      v-model="activeFilters"
      :options="available_keywords"
      type="checkbox"
      inline
      dense
    />
  </div>

  <!-- generator list -->
  <div class="row q-col-gutter-xs">
    <div class="col-4" v-for="gen in filtered_generators" :key="gen">
      <q-btn
        @click="set_generator(gen.generator_name)"
        :label="replace_underscores(gen['generator_name'])"
        style="width: 100%; height: 80px"
        class="q-pa-sm"
        :square="true"
        :color="
          gen.generator_name ==
          settings.selected[effective_device_index][selected_type][
            effective_timeline_level
          ]
            ? 'secondary'
            : 'primary'
        "
        :text-color="
          gen['generator_name'] ==
          settings.selected[effective_device_index][selected_type][
            effective_timeline_level
          ]
            ? 'black'
            : 'white'
        "
      />
    </div>
  </div>
</template>

<script setup>
import SmallToggleComponent from "src/components/buttons/SmallToggleComponent.vue";

import { ref, computed } from "vue";
import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings } = storeToRefs(appStore);

const selected_type = ref("pattern");
const activeFilters = ref([]);
const timeline_level = ref(null);

const typ = [
  "pattern",
  "pattern_sec",
  "pattern_break",
  "vfilter",
  "dimmer",
  "thinner",
  "effect",
];

const buttons = [
  { var_name: "global_pattern_sec", label: "global_pattern_sec" },
  { var_name: "global_pattern_break", label: "global_pattern_break" },
  { var_name: "global_vfilter", label: "global_vfilter" },
  { var_name: "global_dimmer", label: "global_dimmer" },
  { var_name: "global_thinner", label: "global_thinner" },
  { var_name: "renew_thinner_from_manual", label: "renew_thinner" },
  { var_name: "renew_dimmer_from_manual", label: "renew_dimmer" },
  { var_name: "renew_trigger_from_manual", label: "renew_triggers" },
];

const effective_device_index = computed({
  get() {
    let device_index = settings.value.target_device_index;
    if (device_index == null) {
      device_index = 0;
    }
    return device_index;
  },
});

const effective_timeline_level = computed({
  get() {
    if (timeline_level.value == null) {
      return appStore.settings.global_manual_timeline_level;
    } else {
      return timeline_level.value;
    }
  },
});

function is_in_filters(generatorCategories) {
  return activeFilters.value.every((filter) => {
    return generatorCategories.includes(filter);
  });
}

const filtered_generators = computed({
  get() {
    if (appStore.meta == null) {
      return [];
    }
    return appStore.meta.available_generators[
      effective_selected_type.value
    ].filter((generator) => {
      return is_in_filters(generator["generator_keywords"]);
    });
  },
});

const effective_selected_type = computed({
  get() {
    if (selected_type.value == "pattern_sec") {
      return "pattern";
    } else if (selected_type.value == "pattern_break") {
      return "pattern";
    } else {
      return selected_type.value;
    }
  },
});

const available_keywords = computed({
  get() {
    let filterOptions = [];
    if (appStore.meta == null) {
      return filterOptions;
    }
    for (var index in appStore.meta.available_keywords) {
      filterOptions.push({
        label: appStore.meta.available_keywords[index],
        value: appStore.meta.available_keywords[index],
      });
    }
    return filterOptions;
  },
});

function replace_underscores(input_string) {
  return input_string.replace(/_/g, " ");
}

function set_generator(generatorName) {
  // set locally
  if (settings.value.target_device_index == null) {
    for (let i = 0; i < settings.value.selected.length; i++) {
      settings.value.selected[i][selected_type.value][
        effective_timeline_level.value
      ] = generatorName;
    }
  } else {
    settings.value.selected[settings.value.target_device_index][
      selected_type.value
    ][effective_timeline_level.value] = generatorName;
  }

  let body = {
    action: "set_generator",
    device_index: settings.value.target_device_index,
    gen_type: selected_type.value,
    gen_name: generatorName,
    timeline_level: effective_timeline_level.value,
  };
  axiosPut("/rest/settings", body);
}

function send_gen_command(command) {
  let body = {
    action: "gen_command",
    device_index: settings.value.target_device_index,
    command: command,
    gen_type: selected_type.value,
    timeline_level: effective_timeline_level.value,
  };
  axiosPut("/rest/settings", body);
}

function toggleSetting(var_name) {
  settings.value[var_name] = !settings.value[var_name];
  appStore.set_settings(var_name);
}
</script>

<style scoped>
.grey-box {
  padding: 10px 15px;
  background: rgba(86, 61, 124, 0.15);
  border: 1px solid rgba(86, 61, 124, 0.2);
}

.green-box {
  padding: 10px 15px;
  background: rgba(12, 119, 28, 0.367);
  border: 1px solid rgb(13, 255, 0);
}
</style>
