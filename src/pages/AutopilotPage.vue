<template>
  <q-page padding>
    <h5 class="text-center q-ma-md">Autopilot Settings</h5>
    <AutopilotButtons />
  </q-page>
</template>

<script lang="ts">
import AutopilotButtons from 'components/AutopilotButtons.vue';
export default {
  name: 'AutopilotPage',
  components: {
    AutopilotButtons,
  },
};
</script>
