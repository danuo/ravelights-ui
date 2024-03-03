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
          <div>
            <q-btn-toggle
              v-model="devices[idx]['device_manual_timeline_level']"
              @click="set_device_settings(idx, 'device_manual_timeline_level')"
              spread
              :options="[
                { label: 'b', value: 0 },
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: 't', value: null },
              ]"
              size="lg"
            />
          </div>
          <div class="q-px-sm q-py-md">
            <template v-if="enable_advanced_mode">
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
            </template>
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

          <!-- buttons -->
          <div class="row q-col-gutter-xs">
            <!-- use effect -->
            <div class="col-4" v-for="level in ['1', '2', '3']" :key="level">
              <SmallToggleComponent
                :active="devices[idx]['use_effect'][level]"
                @click="toggleUseEffect(idx, level)"
                :label="'use effect level ' + level"
              ></SmallToggleComponent>
            </div>
            <!-- further settings -->
            <div class="col-4">
              <SmallToggleComponent
                :active="devices[idx]['refresh_from_timeline']"
                @click="toggleValue(idx, 'refresh_from_timeline')"
                label="refresh from timeline"
              ></SmallToggleComponent>
            </div>
            <div class="col-4">
              <SmallToggleComponent
                :active="devices[idx]['use_autopilot']"
                @click="toggleValue(idx, 'use_autopilot')"
                label="use autopilot"
              ></SmallToggleComponent>
            </div>
          </div>

          <template v-if="idx != 0">
            <q-item-label caption> linked_to </q-item-label>
            <q-btn-toggle
              v-model="devices[idx]['linked_to']"
              @click="set_device_settings(idx, 'linked_to')"
              :options="getLinkedOptions(idx)"
              :clearable="true"
              size="lg"
            />
          </template>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import SmallToggleComponent from "src/components/buttons/SmallToggleComponent.vue";

import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { devices, enable_advanced_mode } = storeToRefs(appStore);

function toggleUseEffect(device_index, level) {
  devices.value[device_index]["use_effect"][level] =
    !devices.value[device_index]["use_effect"][level];
  set_device_settings(device_index, "use_effect");
}

function toggleValue(device_index, var_name) {
  devices.value[device_index][var_name] =
    !devices.value[device_index][var_name];
  set_device_settings(device_index, var_name);
}

function set_device_settings(device_index, var_name) {
  let body = {
    action: "set_device_settings",
    device_index: device_index,
  };
  body[var_name] = appStore.devices[device_index][var_name];
  axiosPut("/rest/settings", body);
}

function getLinkedOptions(current_index) {
  let result = [];
  for (
    let linked_to_index = 0;
    linked_to_index < current_index;
    linked_to_index++
  ) {
    if (this.devices[linked_to_index].linked_to == null) {
      result.push({
        label: "D" + linked_to_index.toString(),
        value: linked_to_index,
      });
    }
  }
  return result;
}
</script>
