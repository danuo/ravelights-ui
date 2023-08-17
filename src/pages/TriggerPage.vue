<template>
  <q-page padding>
    <ManualTimelineComponent />
    <TriggerComponent />
  </q-page>
</template>

<script lang="ts">
import TriggerComponent from "src/components/TriggerComponent.vue";
import ManualTimelineComponent from "src/components/ManualTimelineComponent.vue";

export default {
  name: "TriggerPage",
  components: {
    TriggerComponent,
    ManualTimelineComponent,
  },
};
</script>
