<template>
  <ApiWarningComponent
    v-if="showPopup"
    :ui-ver="UI_API_VERSION"
    :server-ver="SERVER_API_VERSION"
  ></ApiWarningComponent>
  <router-view v-if="dataReceived" />
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useAppStore, axiosPut } from "stores/app-store";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import ApiWarningComponent from "src/components/ApiWarningComponent.vue";

const UI_API_VERSION = "1"; // set required version here

const SERVER_API_VERSION = ref(null);
const showPopup = ref(false);
const dataReceived = ref(false);

const router = useRouter();
const appStore = useAppStore();
initAppStore();
const { settings } = storeToRefs(appStore);

async function initAppStore() {
  await appStore.initAllData();
  if (Object.keys(appStore.settings).length === 0) {
    console.warn("cannot connect to REST-API");
    router.push("/");
    showPopup.value = true;
  } else {
    appStore.initSSE();
    SERVER_API_VERSION.value = appStore.meta["API_VERSION"];
    checkApiVersion();
    dataReceived.value = true;
  }
}

function checkApiVersion() {
  if (UI_API_VERSION != SERVER_API_VERSION.value) {
    showPopup.value = true;
  }
}

watchEffect(() => {
  // make sure the selected device can actually be controlled
  if (
    !appStore.device_list_options.includes(settings.value.target_device_index)
  ) {
    settings.value.target_device_index = 0;
    set_settings("target_device_index");
  }
});

function set_settings(var_name) {
  let body = { action: "set_settings" };
  body[var_name] = appStore.settings[var_name];
  axiosPut("/rest/settings", body);
}
</script>
