<template>
  <ApiWarningComponent
    v-if="showPopup"
    :ui-ver="UI_API_VERSION"
    :server-ver="SERVER_API_VERSION"
  ></ApiWarningComponent>
  <router-view v-if="dataReceived" />
</template>

<script setup>
import { ref } from "vue";
import { useAppStore } from "stores/app-store";
import { useRouter } from "vue-router";

import ApiWarningComponent from "src/components/ApiWarningComponent.vue";

const router = useRouter();
const appStore = useAppStore();

const UI_API_VERSION = "1"; // set required version here

const SERVER_API_VERSION = ref(null);
const showPopup = ref(false);
const dataReceived = ref(false);
initAppStore();

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
</script>
