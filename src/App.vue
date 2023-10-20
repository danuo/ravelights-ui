<template>
  <router-view />
</template>

<script setup>
import { useAppStore } from "stores/app-store";
import { useRouter } from "vue-router";

const appStore = useAppStore();
initAppStore();

const router = useRouter();

async function initAppStore() {
  await appStore.initAllData();
  if (Object.keys(appStore.settings).length === 0) {
    console.warn("cannot connect to REST-API");
    router.push("/");
  } else {
    appStore.initSSE();
  }
}
</script>
