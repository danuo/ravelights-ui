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

import { useAppStore } from "stores/app-store";

// meta is static so no need for refs here
const appStore = useAppStore();
</script>
