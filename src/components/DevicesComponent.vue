<template>
  <div class="q-pt-md">
    <q-list bordered separator>
      <q-item v-for="(e, idx) in devices.length" :key="idx">
        <q-item-section>
          <q-item-label caption>
            Device {{ idx }} | lights:{{ devices[idx].n_lights }} | leds:{{
              devices[idx].n_leds
            }}
          </q-item-label>
          <div class="q-gutter-y-md">
            <q-btn-toggle
              v-model="devices[idx]['device_manual_timeline_level']"
              @click="set_device_settings(idx, 'device_manual_timeline_level')"
              spread
              :options="[
                { label: 'black', value: 0 },
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: 'none', value: 4 },
              ]"
              size="lg"
            />
          </div>
          <div class="q-px-md q-py-md">
            <q-item-label caption> device_triggerskip </q-item-label>
            <q-slider
              @change="set_device_settings(idx, 'device_triggerskip')"
              v-model="devices[idx]['device_triggerskip']"
              color="primary"
              selection-color="secondary"
              track-size="15px"
              thumb-size="30px"
              :min="0"
              :max="10"
              markers
              snap
              label
              marker-labels
            />
            <q-item-label caption> device_frameskip </q-item-label>
            <q-slider
              @change="set_device_settings(idx, 'device_frameskip')"
              v-model="devices[idx]['device_frameskip']"
              color="primary"
              selection-color="secondary"
              track-size="15px"
              thumb-size="30px"
              :min="1"
              :max="10"
              markers
              snap
              label
              marker-labels
            />
            <q-item-label caption> device_brightness </q-item-label>
            <q-slider
              @change="set_device_settings(idx, 'device_brightness')"
              v-model="devices[idx]['device_brightness']"
              color="primary"
              selection-color="secondary"
              track-size="15px"
              thumb-size="30px"
              :min="0"
              :max="1"
              :step="0.1"
              markers
              :marker-labels="[0, 0.25, 0.5, 0.75, 1]"
              label
              snap
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { devices } = storeToRefs(appStore);

function set_device_settings(device_id, var_name) {
  let body = {
    action: "set_device_settings",
    device_id: device_id,
  };
  body[var_name] = appStore.devices[device_id][var_name];
  axiosPut("/rest/settings", body);
}
</script>
