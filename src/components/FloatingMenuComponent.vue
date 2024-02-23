<template>
  <div class="floating-menu q-pa-md">
    <div class="row q-col-gutter-md q-pb-md">
      <div class="col-6">
        <MenuButtonComponent
          @click="toggleVisualizer"
          :active="enable_visualizer"
          label="Visualizer"
          icon="music_video"
          fancy
        ></MenuButtonComponent>
      </div>
      <div class="col-6">
        <MenuButtonComponent
          @click="toggleQuickSelect"
          :active="enable_quick_select"
          label="Quick Select"
          icon="offline_bolt"
          fancy
        ></MenuButtonComponent>
      </div>
      <div class="col-6">
        <MenuButtonComponent
          @click="toggleAutopilot"
          :active="settings.enable_autopilot"
          label="Autopilot"
          icon="motion_photos_auto"
          fancy
        ></MenuButtonComponent>
      </div>
      <div class="col-6">
        <MenuButtonComponent
          @click="toggleAudioAnalysis"
          :active="settings.enable_audio_analysis"
          label="Audio Analysis"
          icon="mic"
          fancy
        ></MenuButtonComponent>
      </div>
      <div class="col-6">
        <MenuButtonComponent
          @click="toggleFullscreen"
          :active="$q.fullscreen.isActive"
          label="Fullscreen"
          icon="fullscreen"
          fancy
        ></MenuButtonComponent>
      </div>
      <div class="col-6">
        <MenuButtonComponent
          @click="toggleAdvancedMode"
          :active="enable_advanced_mode"
          label="Advanced"
          icon="science"
          fancy
        ></MenuButtonComponent>
      </div>
    </div>

    <div
      class="column"
      id="device-selector"
      v-if="get_device_list_options.length > 1"
    >
      <div
        class="relative-position"
        v-for="device_index in get_device_list_options"
        :key="device_index"
      >
        <q-radio
          v-model="settings.target_device_index"
          @click="set_settings('target_device_index')"
          :val="device_index"
          v-ripple
          class="non-selectable q-pa-sm"
          :label="'Device ' + device_index + ' | ' + 'Device Name'"
          color="secondary"
        />
      </div>
    </div>
    <div id="spacer"></div>
  </div>
</template>

<script setup>
import MenuButtonComponent from "src/components/MenuButtonComponent.vue";

import { computed, watchEffect } from "vue";
import { useQuasar } from "quasar";
import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const $q = useQuasar();

const appStore = useAppStore();
const {
  settings,
  devices,
  enable_visualizer,
  enable_advanced_mode,
  enable_quick_select,
} = storeToRefs(appStore);

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

function toggleFullscreen() {
  $q.fullscreen.toggle();
}

function toggleAdvancedMode() {
  enable_advanced_mode.value = !enable_advanced_mode.value;
}

function toggleQuickSelect() {
  enable_quick_select.value = !enable_quick_select.value;
}

const get_device_list_options = computed(() => {
  let device_indices = [];
  for (let i = 0; i < devices.value.length; i++) {
    if (devices.value[i].linked_to == null) {
      device_indices.push(i);
    }
  }
  return device_indices;
});

watchEffect(() => {
  // make sure the selected device can actually be controlled
  if (
    !get_device_list_options.value.includes(settings.value.target_device_index)
  ) {
    settings.value.target_device_index = 0;
    set_settings("target_device_index");
  }
});
</script>

<style lang="scss" scoped>
$radius-menu: 15px;
$radius-button: 8px;

.floating-menu {
  box-sizing: border-box;
  border-top-left-radius: $radius-menu !important;
  border-top-right-radius: $radius-menu !important;
  border-top: solid 3px $purple !important;
  border-left: solid 3px $purple !important;
  border-right: solid 3px $purple !important;
  background-color: black;
  max-width: 700px;
  margin: auto;
  margin-bottom: -50px; // fixes slide animation
}

#spacer {
  height: 35px; // fixes slide animation
}

div#device-selector {
  margin-bottom: 15px; // fixes slide animation
}

div#device-selector div.q-radio {
  box-sizing: border-box;
  border: solid 3px $grey-10 !important;
  height: 60px;
  width: 100%;
}
div#device-selector div.q-radio[aria-checked="true"] {
  box-sizing: border-box;
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
