<template>
  <q-page padding>
    <ActionButtons />
    <TriggerComponent />
  </q-page>
</template>

<script lang="ts">
import TriggerComponent from "src/components/TriggerComponent.vue";
import ActionButtons from "src/components/ActionButtons.vue";
export default {
  name: "TriggerPage",
  components: {
    ActionButtons,
    TriggerComponent,
  },
};
</script>
