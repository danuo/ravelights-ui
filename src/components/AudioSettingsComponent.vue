<template v-if="meta.length > 0">
  <UniversalControlComponent
    :button="meta['controls_audio'][0]"
  ></UniversalControlComponent>
</template>

<script setup>
import UniversalControlComponent from "src/components/UniversalControlComponent.vue";

import { useAppStore } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { meta } = storeToRefs(appStore);
</script>
