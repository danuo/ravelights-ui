<template v-if="settings !== null">
  <div class="q-pt-sm q-px-sm row justify-between bg-grey-10">
    <div class="text-caption text-grey-5">timeline level</div>
    <div class="text-caption text-grey-5">device index</div>
  </div>
  <div class="q-pb-sm row justify-between bg-grey-10 no-wrap scroll-container">
    <q-btn-toggle
      v-model="settings.global_manual_timeline_level"
      @click="set_manual_timeline_index()"
      :options="[
        { label: 'b', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: 't', value: null },
      ]"
      size="lg"
      toggle-color="primary"
      color="black"
    />
    <q-btn-toggle
      v-model="settings.global_manual_timeline_level"
      @click="set_manual_timeline_index()"
      :options="[
        { label: 'b', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '2', value: 2 },
        { label: '2', value: 2 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: 't', value: null },
      ]"
      size="lg"
      toggle-color="primary"
      color="black"
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

<style>
.scroll-container {
  overflow-x: scroll;
  gap: 16px;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
