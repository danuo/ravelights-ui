<template>
  <q-page padding>
    <h5 class="text-center q-ma-md">Autopilot Settings</h5>
    <AutopilotSettings />
  </q-page>
</template>

<script lang="ts">
import AutopilotSettings from 'components/AutopilotSettings.vue';
export default {
  name: 'AutopilotPage',
  components: {
    AutopilotSettings,
  },
};
</script>
