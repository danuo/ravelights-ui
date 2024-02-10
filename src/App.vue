<template>
  <q-dialog v-model="popup" persistent>
    <div>
      <q-banner class="text-white bg-red">
        <template v-slot:avatar>
          <q-icon name="sync_problem" size="xl" color="black" />
        </template>
        <div class="text-h6">API Version Mismatch.</div>
        <div>
          Backend Version: <strong>{{ SERVER_API_VERSION }}</strong>
        </div>
        <div>
          Frontend Version: <strong>{{ UI_API_VERSION }}</strong>
        </div>
        <template v-slot:action>
          <q-btn flat color="white" label="Dismiss" v-close-popup />
        </template>
      </q-banner>
    </div>
  </q-dialog>
  <router-view />
</template>

<script setup>
import { ref } from "vue";
import { useAppStore } from "stores/app-store";
import { useRouter } from "vue-router";

const UI_API_VERSION = 1;
const SERVER_API_VERSION = ref(0);
const popup = ref(false);

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
    check_api_version();
  }
}

function check_api_version() {
  SERVER_API_VERSION.value = appStore.meta["API_VERSION"];
  console.log(SERVER_API_VERSION.value);
  console.log(UI_API_VERSION);
  if (SERVER_API_VERSION.value != UI_API_VERSION) {
    console.log(popup.value);
    popup.value = true;
    console.log(popup.value);
  }
}
</script>
