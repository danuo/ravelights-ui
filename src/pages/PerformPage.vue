<template>
  <q-page padding>
    <ManualTimelineComponent />
    <GeneratorsComponent />
  </q-page>
</template>

<script>
import ManualTimelineComponent from "src/components/ManualTimelineComponent.vue";
import GeneratorsComponent from "src/components/GeneratorsComponent.vue";
export default {
  name: "PerformPage",
  components: { ManualTimelineComponent, GeneratorsComponent },
};
</script>
