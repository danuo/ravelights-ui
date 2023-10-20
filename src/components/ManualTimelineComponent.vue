<template>
  <div class="q-mt-xs row justify-between" v-if="settings !== null">
    <q-btn-toggle
      v-model="settings.global_manual_timeline_level"
      @click="set_manual_timeline_index()"
      :toggle-color="settings.use_manual_timeline ? 'primary' : 'dark'"
      :options="[
        { label: 'black', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
      ]"
      size="lg"
    />
    <q-btn-toggle
      v-model="settings.use_manual_timeline"
      @click="set_manual_timeline_mode()"
      toggle-color="primary"
      :options="[
        { label: 'manual', value: true },
        { label: 'timeline', value: false },
      ]"
    />
  </div>
</template>

<script setup>
import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings } = storeToRefs(appStore);

function set_manual_timeline_index() {
  settings.value.use_manual_timeline = true;
  let body = {
    action: "set_settings",
    global_manual_timeline_level:
      appStore.settings.global_manual_timeline_level,
    use_manual_timeline: appStore.settings.use_manual_timeline,
  };
  axiosPut("/rest/settings", body);
}
function set_manual_timeline_mode() {
  let body = {
    action: "set_settings",
    use_manual_timeline: appStore.settings.use_manual_timeline,
  };
  axiosPut("/rest/settings", body);
}
</script>
