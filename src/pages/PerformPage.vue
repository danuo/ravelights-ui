<template>
  <q-page padding>
    <BpmComponent/>
    <PatternComponent/>
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
