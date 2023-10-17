<template>
  <q-page class="flex flex-center">
    <BpmComponent />
  </q-page>
</template>

<script>
import BpmComponent from "src/components/BpmComponent.vue";
export default {
  name: "PerformPage",
  components: { BpmComponent },
};
</script>
