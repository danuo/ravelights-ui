<template>
  <q-page padding>
    <BpmComponent />
    <ColorComponent />
    <MainSettingsComponent />
  </q-page>
</template>

<script>
import BpmComponent from "src/components/BpmComponent.vue";
import ColorComponent from "src/components/ColorComponent.vue";
import MainSettingsComponent from "src/components/MainSettingsComponent.vue";
export default {
  name: "BPMPage",
  components: {
    BpmComponent,
    ColorComponent,
    MainSettingsComponent,
  },
};
</script>
