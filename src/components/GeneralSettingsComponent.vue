<template>
  <div v-if="Object.keys(appStore.settings).length > 0">
    <q-list bordered separator>
      <q-item
        v-for="slider in appStore.meta.controls_global_sliders"
        :key="slider.name"
      >
        <!-- is slider -->
        <q-item-section v-if="slider.type == 'slider'">
          <q-item-label caption> {{ slider.name_slider }} </q-item-label>
          <div class="row q-pa-md">
            <div class="col-12">
              <q-slider
                @change="set_settings(slider.name_slider)"
                v-model="settings[slider.name_slider]"
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
                :label-value="settings[slider.name_slider]"
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

function set_settings(name_slider) {
  let body = { action: "set_settings" };
  body[name_slider] = appStore.settings[name_slider];
  axiosPut("/rest/settings", body);
}
</script>
