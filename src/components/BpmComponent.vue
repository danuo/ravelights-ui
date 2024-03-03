<template>
  <div
    class="q-mt-xs q-col-gutter-xs"
    v-if="Object.keys(appStore.settings).length > 0"
  >
    <div class="row">
      <div class="col-6" id="bpm_input">
        <q-input v-model.number="settings.bpm_base" outlined />
      </div>
      <div class="col-3">
        <q-btn
          @click="set_bpm(0.1)"
          style="width: 100%; height: 70px"
          :square="true"
          color="primary"
          icon="expand_less"
          size="25px"
        />
      </div>
      <div class="col-3">
        <q-btn
          @click="set_bpm(-0.1)"
          style="width: 100%; height: 70px"
          color="primary"
          icon="expand_more"
          size="25px"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <q-btn
          @click="set_sync()"
          label="sync"
          style="width: 100%; height: 70px"
          color="primary"
          size="20px"
        />
      </div>
      <div class="col-3">
        <q-btn
          @click="adjust_sync(0.1)"
          style="width: 100%; height: 70px"
          color="primary"
          icon="navigate_before"
          size="25px"
        />
      </div>
      <div class="col-3">
        <q-btn
          @click="adjust_sync(-0.1)"
          style="width: 100%; height: 70px"
          color="primary"
          icon="navigate_next"
          size="25px"
        />
      </div>
    </div>
  </div>

  <div class="q-px-none q-mt-lg q-mb-md">
    <div style="padding-left: 16px" class="text-caption">bpm multiplier</div>
    <div class="row flex-center" style="width: 100%">
      <q-slider
        @change="appStore.set_settings('bpm_multiplier')"
        v-model="bpm_multiplier_sliderval"
        color="secondary"
        selection-color="secondary"
        track-size="15px"
        thumb-size="30px"
        :min="0"
        :max="2"
        :marker-labels="bpm_multiplier_mapping"
        snap
        style="width: 66%"
      />
    </div>
  </div>
</template>

<style>
#bpm_input .q-field__control {
  height: 70px !important;
  font-size: 25px;
}
</style>

<script setup>
import { computed } from "vue";
import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings } = storeToRefs(appStore);

const bpm_multiplier_mapping = { 0: "1/2", 1: 1, 2: 2 };

const bpm_multiplier_sliderval = computed({
  get() {
    // bpm_multiplier -> bpm_multiplier_sliderval
    // 0.5 -> 0
    // 1.0 -> 1
    // 2.0 -> 2
    return appStore.settings.bpm_multiplier == 0.5
      ? 0
      : appStore.settings.bpm_multiplier;
  },
  set(bpm_multiplier_sliderval) {
    // bpm_multiplier_sliderval -> bpm_multiplier
    // 0.0 -> 0.5
    // 1.0 -> 1.0
    // 2.0 -> 2.0
    settings.value.bpm_multiplier =
      bpm_multiplier_sliderval == 0 ? 0.5 : bpm_multiplier_sliderval;
  },
});

function set_sync() {
  let body = { action: "set_sync" };
  axiosPut("/rest/settings", body);
}

function adjust_sync(value) {
  let body = { action: "adjust_sync", value: value };
  axiosPut("/rest/settings", body);
}

function set_bpm(value) {
  settings.value.bpm_base = parseFloat(
    (appStore.settings.bpm_base + value).toFixed(2)
  );
  appStore.set_settings("bpm_base");
}
</script>
