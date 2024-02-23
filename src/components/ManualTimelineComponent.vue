<template>
  <div class="q-mt-xs q-mx-xs" v-if="settings !== null">
    <q-btn-toggle
      v-model="settings.global_manual_timeline_level"
      @click="appStore.set_settings('global_manual_timeline_level')"
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
import { useAppStore } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings } = storeToRefs(appStore);
</script>
