<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="enable_floating_menu" seamless position="bottom">
      <div class="floating-menu q-pa-sm">
        <div class="row q-col-gutter-sm q-pb-sm">
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
              label="Audio Analysis"
              icon="mic"
              :callback="toggleAudioAnalysis"
              :active="settings.enable_audio_analysis"
            ></MenuButtonComponent>
          </div>
        </div>
        <q-option-group v-model="group" :options="options" color="primary" />
      </div>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

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

function toggleAudioAnalysis() {
  settings.value.enable_audio_analysis = !settings.value.enable_audio_analysis;
  set_settings("enable_audio_analysis");
}

function toggleVisualizer() {
  enable_visualizer.value = !enable_visualizer.value;
}

function toggleAutopilot() {
  settings.value.enable_autopilot = !settings.value.enable_autopilot;
  set_settings("enable_autopilot");
}

const group = ref("op1");
const options = [
  {
    label: "Option 1",
    value: "op1",
  },
  {
    label: "Option 2",
    value: "op2",
  },
  {
    label: "Option 3",
    value: "op3",
  },
];
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
  background-color: black;
}

div.q-option-group > :deep(div) {
  background-color: red !important;
}

div.q-option-group > :deep(div:first-child) {
  border-top-left-radius: 15px !important;
  border-top-right-radius: 15px !important;
  border: solid 3px $purple !important;
  background-color: blue !important;
}

div.q-option-group > :deep(div:last-child) {
  border-bottom-left-radius: 15px !important;
  border-bottom-right-radius: 15px !important;
  border: solid 3px $purple !important;
  background-color: blue !important;
}
</style>
