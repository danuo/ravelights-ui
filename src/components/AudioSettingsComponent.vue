<template>
  <UniversalControlComponent
    v-for="button in appStore.meta.controls_audio"
    :key="button.label"
    :button="button"
  ></UniversalControlComponent>
</template>

<script setup>
import UniversalControlComponent from "src/components/buttons/UniversalControlComponent.vue";

import { useAppStore } from "stores/app-store";

const appStore = useAppStore();
</script>
