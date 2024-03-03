<template>
  <ApiWarningComponent
    v-if="showPopup"
    :ui-ver="UI_API_VERSION"
    :server-ver="SERVER_API_VERSION"
  ></ApiWarningComponent>
  <router-view v-if="appStore.is_initialized" />
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useAppStore } from "stores/app-store";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import ApiWarningComponent from "src/components/ApiWarningComponent.vue";

const UI_API_VERSION = "1"; // set required version here

const SERVER_API_VERSION = ref(null);
const showPopup = ref(false);
const dataReceived = ref(false);

const router = useRouter();
const appStore = useAppStore();
init_app_store();
const { settings, is_initialized } = storeToRefs(appStore);

async function init_app_store() {
  await appStore.init_store_data();
  if (is_initialized.value) {
    appStore.init_sse();
    SERVER_API_VERSION.value = appStore.meta["API_VERSION"];
    checkApiVersion();
    dataReceived.value = true;
  } else {
    console.warn("cannot connect to REST-API");
    router.push("/");
    showPopup.value = true;
  }
}

function checkApiVersion() {
  if (UI_API_VERSION != SERVER_API_VERSION.value) {
    showPopup.value = true;
  }
}

watchEffect(() => {
  // make sure the selected device can actually be controlled
  if (settings.value.target_device_index === null) {
    return;
  }
  if (
    !appStore.device_list_options.includes(settings.value.target_device_index)
  ) {
    settings.value.target_device_index = 0;
    appStore.set_settings("target_device_index");
  }
});
</script>
