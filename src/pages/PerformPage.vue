<template>
  <q-page padding>
    <h5 class="text-center q-mt-md">BPM Slider</h5>
    <BpmComponent />
    <h5 class="text-center">Pattern Selector</h5>
    <PatternComponent />
  </q-page>
</template>

<script lang="ts">
import BpmComponent from 'components/BpmComponent.vue';
import PatternComponent from 'components/PatternComponent.vue';
export default {
  name: 'PerformPage',
  components: {
    BpmComponent,
    PatternComponent,
  },
};
</script>
