<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="enable_floating_menu" seamless position="bottom">
      <q-card class="bg-black shadow-up-10 my-rounded" style="width: 350px">
        <q-card-section class="row q-col-gutter-sm">
          <div class="col-6">
            <MenuButtonComponent
              label="whate"
              icon="music_video"
            ></MenuButtonComponent>
          </div>
          <div class="col-6">
            <MenuButtonComponent
              label="autopilot"
              icon="music_video"
              :callback="toggleAutopilot"
              :active="settings.enable_autopilot"
            ></MenuButtonComponent>
          </div>
          <div class="col-6">
            <MenuButtonComponent
              label="audio analysis"
              icon="music_video"
            ></MenuButtonComponent>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings, enable_floating_menu } = storeToRefs(appStore);

import MenuButtonComponent from "src/components/MenuButtonComponent.vue";

function set_settings(var_name) {
  let body = { action: "set_settings" };
  body[var_name] = settings.value[var_name];
  axiosPut("/rest/settings", body);
}

function toggleAutopilot() {
  console.log("toggleAutopilot");
  console.log(settings.value.enable_autopilot);
  settings.value.enable_autopilot = !settings.value.enable_autopilot;
  set_settings("enable_autopilot");
}

function toggleVisualizer() {
  enable_visualizer.value = !enable_visualizer.value;
}
</script>

<style>
.my-rounded {
  border-radius: 30px;
}
</style>
