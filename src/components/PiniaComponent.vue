<template>
  <div>{{ settings }}</div>
  <div>{{ meta }}</div>
</template>

<script setup>
import { useAppStore } from "stores/app-store";
import { storeToRefs } from "pinia";

// good guide with many options of how to use this
// https://quasar.dev/quasar-cli-vite/state-management-with-pinia/

const appStore = useAppStore();
const { settings, meta } = storeToRefs(appStore); // state and getters need "storeToRefs"

// lifecycle hooks
</script>
