<template>
  <div class="q-mt-xs q-mx-xs" v-if="devices !== null">
    <q-btn-toggle
      v-model="settings.target_device_index"
      @click="set_settings('target_device_index')"
      toggle-color="secondary"
      spread
      :options="get_device_list_options()"
      size="lg"
    />
  </div>
</template>

<script setup>
import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings, devices } = storeToRefs(appStore);

function get_device_list_options() {
  let device_indices = [];
  let result = [];
  for (let i = 0; i < devices.value.length; i++) {
    if (devices.value[i].linked_to == null) {
      device_indices.push(i);
      result.push({
        label: "D" + i,
        value: i,
      });
    }
  }
  // make sure the selected device can actually be controlled
  if (!device_indices.includes(settings.value.target_device_index)) {
    settings.value.target_device_index = 0;
    set_settings("target_device_index");
  }
  return result;
}

function set_settings(var_name) {
  let body = { action: "set_settings" };
  body[var_name] = appStore.settings[var_name];
  axiosPut("/rest/settings", body);
}
</script>
