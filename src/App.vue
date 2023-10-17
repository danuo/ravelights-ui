<template>
  <router-view />
</template>

<script setup>
import { useAppStore } from "stores/app-store";
import { useRouter } from "vue-router";

const appStore = useAppStore();
const router = useRouter();

appStore.refreshData();

if (Object.keys(appStore.settings).length === 0) {
  console.warn("cannot connect to ravelights-python");
  router.push("/");
}

// todo: move this elsewhere
initEventSource();

function initEventSource() {
  let eventSource = new EventSource("/feed");
  eventSource.onmessage = (event) => {
    console.log("feed event received");
    console.log(event);
    appStore.refreshData();
  };
}
</script>
