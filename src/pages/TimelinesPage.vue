<template>
  <q-page padding>
    <TimelineComponentNew />
  </q-page>
</template>

<script lang="ts">
import TimelineComponentNew from 'src/components/TimelineComponentNew.vue';
export default {
  name: 'TimelinesPage',
  components: {
    TimelineComponentNew,
  },
};
</script>
