<template>
  <q-page class="flex flex-center">
    <q-spinner color="primary" size="3em" :thickness="10" />
  </q-page>
</template>

<script setup>
import { useAppStore } from "stores/app-store";
import { useRouter } from "vue-router";

const appStore = useAppStore();
const router = useRouter();

const interval = setInterval(function () {
  // method to be executed;
  if (Object.keys(appStore.settings).length === 0) {
    console.warn("cannot connect to ravelights-python");
    appStore.refreshData();
  } else {
    console.log("yee");
    console.log(appStore.settings);
    clearInterval(interval);
    // redirect
    router.push("/perform");
  }
}, 1000);
</script>
