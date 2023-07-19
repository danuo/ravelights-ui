<template>
  <q-page padding>
    <BpmSliders />
  </q-page>
</template>

<script>
import BpmSliders from 'src/components/BpmSliders.vue';
export default {
  name: 'BPMPage',
  components: {
    BpmSliders,
  },
};
</script>
