<template>
  <div class="q-pa-xs">
    <q-space />
  </div>
  <q-list bordered separator>
    <UniversalControlComponent
      v-for="button in appStore.meta.controls_autopilot"
      :key="button.label"
      :button="button"
    ></UniversalControlComponent>
  </q-list>
</template>

<script setup>
import UniversalControlComponent from "src/components/buttons/UniversalControlComponent.vue";

import { useAppStore } from "stores/app-store";

const appStore = useAppStore();
</script>
