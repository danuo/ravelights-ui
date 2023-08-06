<template>
  <q-page padding>
    <ManualTimelineComponent />
    <GeneratorsComponent />
  </q-page>
</template>

<script lang="ts">
import GeneratorsComponent from "src/components/GeneratorsComponent.vue";
import ManualTimelineComponent from "src/components/ManualTimelineComponent.vue";
export default {
  name: "PerformPage",
  components: {
    GeneratorsComponent,
    ManualTimelineComponent,
  },
};
</script>
