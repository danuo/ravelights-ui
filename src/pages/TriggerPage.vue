<template>
  <q-page padding>
    <ManualTimelineComponent />
    <ActionButtons />
    <TriggerComponent />
  </q-page>
</template>

<script lang="ts">
import TriggerComponent from "src/components/TriggerComponent.vue";
import ActionButtons from "src/components/ActionButtons.vue";
import ManualTimelineComponent from "src/components/ManualTimelineComponent.vue";

export default {
  name: "TriggerPage",
  components: {
    ActionButtons,
    TriggerComponent,
    ManualTimelineComponent,
  },
};
</script>
