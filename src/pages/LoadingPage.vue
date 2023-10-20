<template>
  <q-page class="flex flex-center">
    <q-spinner color="primary" size="3em" :thickness="10" />
  </q-page>
</template>

<script setup>
import { useAppStore } from "stores/app-store";
import { useRouter } from "vue-router";

const router = useRouter();
const appStore = useAppStore();

var forwardToRoute = "/perform";

const interval = setInterval(function () {
  appStore.initAllData();
  if (Object.keys(appStore.settings).length > 0) {
    appStore.initSSE();
    router.push(forwardToRoute);
    clearInterval(interval);
  } else {
    console.warn("cannot connect to REST-API");
  }
}, 1500);
</script>
