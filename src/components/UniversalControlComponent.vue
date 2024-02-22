<template>
  <template v-if="props.button.type == 'slider'">
    <q-item-section>
      <q-item-label caption> {{ props.button.name_slider }} </q-item-label>
      <div class="row q-pa-md">
        <div class="col-12">
          <q-slider
            @change="set_settings(props.button.name_slider)"
            v-model="settings[props.button.name_slider]"
            color="primary"
            selection-color="secondary"
            track-size="15px"
            thumb-size="30px"
            :markers="props.button.markers"
            :min="props.button.range_min"
            :max="props.button.range_max"
            :step="props.button.step"
            snap
            label-always
            :label-value="settings[props.button.name_slider]"
          />
        </div>
      </div>
    </q-item-section>
  </template>
  <template v-if="props.button.type == 'dropdown'">
    <q-select
      square
      outlined
      @update:model-value="set_settings_wrapper"
      v-model="settingsTarget.value[props.button['var_name']]"
      :options="props.button['options']"
      :label="props.button['var_name']"
      color="secondary"
    />
  </template>
</template>

<script setup>
const props = defineProps({
  button: Object,
  deviceIndex: Number,
});

import { computed } from "vue";
import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings, devices } = storeToRefs(appStore);

const settingsTarget = computed(() => {
  if (props.button.target == "device") {
    return devices[deviceIndex];
  }
  return settings;
});

function set_settings_wrapper(value) {
  // is device
  if (props.button.target == "device") {
    // todo set device settings
    return;
  }
  let var_name = props.button["var_name"];
  let body = { action: "set_settings" };
  body[var_name] = value;
  axiosPut("/rest/settings", body);
}
</script>
