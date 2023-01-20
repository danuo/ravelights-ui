<template>
  <q-page padding>
    <TimelineComponent />
  </q-page>
</template>

<script lang="ts">
import TimelineComponent from 'src/components/TimelineComponent.vue';
export default {
  name: 'TimelinesPage',
  components: {
    TimelineComponent,
  },
};
</script>
