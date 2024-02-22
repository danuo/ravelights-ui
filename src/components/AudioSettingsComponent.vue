<template v-if="meta.length > 0">
  <UniversalControlComponent
    :button="meta['controls_audio'][0]"
  ></UniversalControlComponent>
</template>

<script setup>
import UniversalControlComponent from "src/components/UniversalControlComponent.vue";

import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings, meta } = storeToRefs(appStore);

function callback() {
  console.log("triggered");
}

function set_settings(var_name) {
  let body = { action: "set_settings" };
  body[var_name] = settings.value[var_name];
  axiosPut("/rest/settings", body);
}
</script>
