<template>
  <q-page padding>
    <BpmComponent />
    <AudioSettingsComponent />
    <GeneralSettingsComponent />
  </q-page>
</template>

<script setup>
import BpmComponent from "src/components/BpmComponent.vue";
import AudioSettingsComponent from "src/components/AudioSettingsComponent.vue";
import GeneralSettingsComponent from "src/components/GeneralSettingsComponent.vue";
</script>
