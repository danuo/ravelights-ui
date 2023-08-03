<template>
  <q-page padding>
    <ManualTimelineComponent />
    <TimelineComponent />
  </q-page>
</template>

<script lang="ts">
import TimelineComponent from "src/components/TimelineComponent.vue";
import ManualTimelineComponent from "src/components/ManualTimelineComponent.vue";
export default {
  name: "TimelinesPage",
  components: {
    TimelineComponent,
    ManualTimelineComponent,
  },
};
</script>
