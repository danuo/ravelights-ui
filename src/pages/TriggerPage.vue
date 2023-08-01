<template>
  <q-page padding>
    <GlobalButtons />
    <TriggerComponent />
  </q-page>
</template>

<script lang="ts">
import TriggerComponent from "src/components/TriggerComponent.vue";
import GlobalButtons from "src/components/Actions.vue";
export default {
  name: "TriggerPage",
  components: {
    GlobalButtons,
    TriggerComponent,
  },
};
</script>
