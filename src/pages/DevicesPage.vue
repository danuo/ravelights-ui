<template>
  <q-page padding>
    <ManualTimelineComponent />
    <DevicesComponent />
  </q-page>
</template>

<script lang="ts">
import DevicesComponent from "components/DevicesComponent.vue";
import ManualTimelineComponent from "src/components/ManualTimelineComponent.vue";

export default {
  name: "AutopilotPage",
  components: {
    DevicesComponent,
    ManualTimelineComponent,
  },
};
</script>
