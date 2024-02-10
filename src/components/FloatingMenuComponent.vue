<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="enable_floating_menu" seamless position="bottom">
      <div class="floating-menu q-pa-sm">
        <!-- <q-card class="bg-black shadow-up-10 my-rounded" style="width: 350px"> -->
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <MenuButtonComponent
              label="Visualizer"
              icon="music_video"
              :callback="toggleVisualizer"
              :active="enable_visualizer"
            ></MenuButtonComponent>
          </div>
          <div class="col-6">
            <MenuButtonComponent
              label="Autopilot"
              icon="motion_photos_auto"
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
        </div>
        <!-- </q-card> -->
      </div>
    </q-dialog>
  </div>
</template>

<script setup>
import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings, enable_floating_menu, enable_visualizer } =
  storeToRefs(appStore);

import MenuButtonComponent from "src/components/MenuButtonComponent.vue";

function set_settings(var_name) {
  let body = { action: "set_settings" };
  body[var_name] = settings.value[var_name];
  axiosPut("/rest/settings", body);
}

function toggleVisualizer() {
  enable_visualizer.value = !enable_visualizer.value;
}

function toggleAutopilot() {
  console.log("toggleAutopilot");
  console.log(settings.value.enable_autopilot);
  settings.value.enable_autopilot = !settings.value.enable_autopilot;
  set_settings("enable_autopilot");
}
</script>

<style lang="scss" scoped>
.my-rounded {
  border-radius: 30px;
}

.floating-menu {
  border-top-left-radius: 15px !important;
  border-top-right-radius: 15px !important;
  border-top: solid 3px $purple !important;
  border-left: solid 3px $purple !important;
  border-right: solid 3px $purple !important;
  background-color: grey;
}
</style>
