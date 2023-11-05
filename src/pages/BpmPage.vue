<template>
  <q-page padding>
    <ManualTimelineComponent />
    <BpmComponent />
    <ColorComponent />
    <GeneralSettingsComponent />
  </q-page>
</template>

<script setup>
import ManualTimelineComponent from "src/components/ManualTimelineComponent.vue";
import BpmComponent from "src/components/BpmComponent.vue";
import ColorComponent from "src/components/ColorComponent.vue";
import GeneralSettingsComponent from "src/components/GeneralSettingsComponent.vue";
</script>
