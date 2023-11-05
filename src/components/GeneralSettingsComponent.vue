<template>
  <div v-if="Object.keys(appStore.settings).length > 0">
    <q-list bordered separator>
      <q-item
        v-for="slider in appStore.meta.controls_global_sliders"
        :key="slider.name"
      >
        <!-- is slider -->
        <q-item-section v-if="slider.type == 'slider'">
          <q-item-label caption> {{ slider.var_name }} </q-item-label>
          <div class="row q-pa-md">
            <div class="col-12">
              <q-slider
                @change="set_settings(slider.var_name)"
                v-model="settings[slider.var_name]"
                color="primary"
                selection-color="secondary"
                track-size="15px"
                thumb-size="30px"
                :markers="slider.markers"
                :min="slider.range_min"
                :max="slider.range_max"
                :step="slider.step"
                snap
                label-always
                :label-value="settings[slider.var_name]"
              />
            </div>
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
const { settings } = storeToRefs(appStore);

function set_settings(var_name) {
  let body = { action: "set_settings" };
  body[var_name] = appStore.settings[var_name];
  axiosPut("/rest/settings", body);
}
</script>
