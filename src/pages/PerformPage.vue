<template>
  <q-page padding>
    <BpmComponent />
  </q-page>
</template>

<script lang="ts">
import BpmComponent from 'components/BpmComponent.vue';
export default {
  name: 'PerformPage',
  components: {
    BpmComponent,
  },
};
</script>
