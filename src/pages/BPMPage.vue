<template>
  <q-page padding>
    <ManualTimelineComponent />
    <BpmComponent />
    <ColorComponent />
    <MainSettingsComponent />
  </q-page>
</template>

<script>
import BpmComponent from "src/components/BpmComponent.vue";
import ColorComponent from "src/components/ColorComponent.vue";
import MainSettingsComponent from "src/components/MainSettingsComponent.vue";
import ManualTimelineComponent from "src/components/ManualTimelineComponent.vue";
export default {
  name: "BPMPage",
  components: {
    BpmComponent,
    ColorComponent,
    MainSettingsComponent,
    ManualTimelineComponent,
  },
};
</script>
