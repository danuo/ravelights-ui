<template>
  <q-page padding>
    <TriggerComponent />
  </q-page>
</template>

<!-- from api we get this -->
<!-- {'trigger_on_beats': [0], 'trigger_on_quarters': 'A', 'loop_length': 4, 'p': 1.0} -->

<script lang="ts">
import TriggerComponent from 'src/components/TriggerComponent.vue';
export default {
  name: 'TriggerPage',
  components: {
    TriggerComponent,
  },
};
</script>
