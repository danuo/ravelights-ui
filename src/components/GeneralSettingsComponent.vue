<template v-if="Object.keys(appStore.settings).length > 0">
  <q-list bordered separator>
    <UniversalControlComponent
      v-for="button in appStore.meta.controls_global_sliders"
      :key="button.label"
      :button="button"
    />
  </q-list>
</template>

<script setup>
import UniversalControlComponent from "src/components/UniversalControlComponent.vue";

import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings } = storeToRefs(appStore);

function set_settings(name_slider) {
  let body = { action: "set_settings" };
  body[name_slider] = appStore.settings[name_slider];
  axiosPut("/rest/settings", body);
}
</script>
