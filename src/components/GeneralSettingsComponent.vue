<template v-if="Object.keys(appStore.settings).length > 0">
  <q-list bordered separator>
    <UniversalControlComponent
      v-for="button in meta.controls_global_sliders"
      :key="button.label"
      :button="button"
    />
  </q-list>
</template>

<script setup>
import UniversalControlComponent from "src/components/UniversalControlComponent.vue";

import { useAppStore } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { meta } = storeToRefs(appStore);
</script>
