<template>
  <router-view />
</template>

<script setup>
import { useAppStore } from "stores/app-store";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const REQUIRED_APP_VERSION = 1;

const $q = useQuasar();

const router = useRouter();
const appStore = useAppStore();
initAppStore();

async function initAppStore() {
  await appStore.initAllData();
  if (Object.keys(appStore.settings).length === 0) {
    console.warn("cannot connect to REST-API");
    router.push("/");
  } else {
    appStore.initSSE();
  }
  check_api_version();
}

function check_api_version() {
  var remote_api_version = appStore.meta["API_VERSION"];
  const title = "API Version missmatch";
  const message = `Ravelights Remote API Version: ${remote_api_version}\nWebUI Client API Version: ${REQUIRED_APP_VERSION}`;
  if (REQUIRED_APP_VERSION != remote_api_version) {
    alert(title, message);
  }
}

function alert(title, message) {
  $q.dialog({
    title: title,
    message: message,
    persistent: true,
  });
}
</script>
