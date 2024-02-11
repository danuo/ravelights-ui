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
              fancy
            ></MenuButtonComponent>
          </div>
          <div class="col-6">
            <MenuButtonComponent
              label="Autopilot"
              icon="motion_photos_auto"
              :callback="toggleAutopilot"
              :active="settings.enable_autopilot"
              fancy
            ></MenuButtonComponent>
          </div>
          <div class="col-6">
            <MenuButtonComponent
              label="Audio Analysis"
              icon="mic"
              :callback="toggleAudioAnalysis"
              :active="settings.enable_audio_analysis"
              fancy
            ></MenuButtonComponent>
          </div>
        </div>

        <div class="column" id="device-selector">
          <div class="relative-position">
            <q-radio
              v-model="demo_radio"
              :val="0"
              v-ripple
              class="non-selectable"
              label="Line"
              color="secondary"
            />
          </div>
          <div class="relative-position">
            <q-radio
              v-model="demo_radio"
              :val="1"
              v-ripple
              class="non-selectable"
              label="Rectangle"
              color="secondary"
            />
          </div>
          <div class="relative-position">
            <q-radio
              v-model="demo_radio"
              :val="2"
              v-ripple
              class="non-selectable"
              label="Ellipse"
              color="secondary"
            />
          </div>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const demo_radio = ref(0);

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
</script>

<style lang="scss" scoped>
$radius-menu: 15px;
$radius-button: 8px;

.floating-menu {
  border-top-left-radius: $radius-menu !important;
  border-top-right-radius: $radius-menu !important;
  border-top: solid 3px $purple !important;
  border-left: solid 3px $purple !important;
  border-right: solid 3px $purple !important;
  background-color: black;
}

div#device-selector div.q-radio {
  border: solid 2px $grey-10 !important;
  height: 60px;
  width: 100%;
}
div#device-selector div.q-radio[aria-checked="true"] {
  border: solid 3px $purple !important;
}

div#device-selector div:first-child div.q-radio {
  border-top-left-radius: $radius-button !important;
  border-top-right-radius: $radius-button !important;
}

div#device-selector div:last-child div.q-radio {
  border-bottom-left-radius: $radius-button !important;
  border-bottom-right-radius: $radius-button !important;
}
</style>
