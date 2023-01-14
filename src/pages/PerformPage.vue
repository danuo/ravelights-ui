<template>
  <q-page padding>
    <GeneratorsComponent />
    <TimelineComponent />
  </q-page>
</template>

<script lang="ts">
import GeneratorsComponent from 'src/components/GeneratorsComponent.vue';
import TimelineComponent from 'src/components/TimelineComponent.vue';
export default {
  name: 'PerformPage',
  components: {
    GeneratorsComponent,
    TimelineComponent,
  },
};
</script>
