<template>
  <div class="q-mt-xs-pm" v-if="settings !== null">
    <q-btn-toggle
      v-model="settings.global_manual_timeline_level"
      @click="set_manual_timeline_index()"
      toggle-color="secondary"
      spread
      :options="[
        { label: 'b', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: 't', value: null },
      ]"
      size="lg"
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
  };
  axiosPut("/rest/settings", body);
}
</script>
