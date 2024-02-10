<template>
  <div class="q-pa-xs">
    <q-space />
  </div>
  <q-list bordered separator>
    <q-item v-for="button in meta.controls_autopilot" :key="button.name">
      <!-- is toggle slider -->
      <q-item-section v-if="button.type == 'toggle_slider'">
        <q-item-label caption> {{ button.name_toggle }} </q-item-label>
        <div class="row q-pa-md">
          <div class="col-3">
            <q-toggle
              @click="setSettingsAutopilot"
              v-model="settings.settings_autopilot[button.name_toggle]"
              size="40px"
              color="secondary"
            />
          </div>
          <div class="col-9">
            <q-slider
              @change="setSettingsAutopilot"
              v-model="settings.settings_autopilot[button.name_slider]"
              color="primary"
              selection-color="secondary"
              track-size="15px"
              thumb-size="30px"
              :markers="button.markers"
              :min="button.range_min"
              :max="button.range_max"
              :step="button.step"
              snap
              label-always
              :label-value="settings.settings_autopilot[button.name_slider]"
            />
          </div>
        </div>
      </q-item-section>

      <!-- is slider -->
      <q-item-section v-if="button.type == 'slider'">
        <q-item-label caption> {{ button.name_slider }} </q-item-label>
        <div class="row q-pa-md">
          <div class="col-3"></div>
          <div class="col-9">
            <q-slider
              @change="setSettingsAutopilot"
              v-model="settings.settings_autopilot[button.name_slider]"
              color="primary"
              selection-color="secondary"
              track-size="15px"
              thumb-size="30px"
              :markers="button.markers"
              :min="button.range_min"
              :max="button.range_max"
              :step="button.step"
              snap
              label-always
              :label-value="settings.settings_autopilot[button.name_slider]"
            />
          </div>
        </div>
      </q-item-section>

      <!-- is toggle -->
      <q-item-section v-if="button.type == 'toggle'">
        <q-item-label caption> {{ button.name_toggle }} </q-item-label>
        <div class="row q-pa-md">
          <div class="col-3">
            <q-toggle
              @click="setSettingsAutopilot"
              v-model="settings.settings_autopilot[button.name_toggle]"
              color="secondary"
            />
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings, meta } = storeToRefs(appStore);

function setSettingsAutopilot() {
  let body = {
    action: "set_settings_autopilot",
    ...settings.value.settings_autopilot,
  };
  axiosPut("/rest/settings", body);
}
</script>
