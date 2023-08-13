<template>
  <q-page padding>
    <DevicesComponent />
  </q-page>
</template>

<script lang="ts">
import DevicesComponent from "components/DevicesComponent.vue";
export default {
  name: "AutopilotPage",
  components: {
    DevicesComponent,
  },
};
</script>
