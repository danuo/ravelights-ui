<template>
  <template v-if="props.button.type == 'toggle'">
    <q-item>
      <q-item-section>
        <q-item-label caption> {{ props.button.label }} </q-item-label>
        <div class="row q-pa-md">
          <div class="col-3">
            <q-toggle
              @update:model-value="
                (value, event) =>
                  set_settings_wrapper(props.button.var_name, value)
              "
              v-model="settingsTarget.value[props.button.var_name]"
              size="40px"
              color="secondary"
            />
          </div>
        </div>
      </q-item-section>
    </q-item>
  </template>
  <template v-if="props.button.type == 'toggle_slider'">
    <q-item>
      <q-item-section>
        <q-item-label caption> {{ props.button.label }} </q-item-label>
        <div class="row q-pa-md">
          <div class="col-3">
            <q-toggle
              @update:model-value="
                (value, event) =>
                  set_settings_wrapper(props.button.var_name_toggle, value)
              "
              v-model="settingsTarget.value[props.button.var_name_toggle]"
              size="40px"
              color="secondary"
            />
          </div>
          <div class="col-9">
            <q-slider
              @change="
                (value) =>
                  set_settings_wrapper(props.button.var_name_slider, value)
              "
              v-model="settingsTarget.value[props.button.var_name_slider]"
              color="primary"
              selection-color="secondary"
              track-size="15px"
              thumb-size="30px"
              :markers="props.button.markers"
              :min="props.button.range_min"
              :max="props.button.range_max"
              :step="props.button.step"
              snap
              label-always
              :label-value="settingsTarget.value[props.button.var_name_slider]"
            />
          </div>
        </div>
      </q-item-section>
    </q-item>
  </template>
  <template v-if="props.button.type == 'slider'">
    <q-item>
      <q-item-section>
        <q-item-label caption> {{ props.button.var_name }} </q-item-label>
        <div class="row q-pa-md">
          <div class="col-12">
            <q-slider
              @change="
                (value) => set_settings_wrapper(props.button.var_name, value)
              "
              v-model="settingsTarget.value[props.button.var_name]"
              color="primary"
              selection-color="secondary"
              track-size="15px"
              thumb-size="30px"
              :markers="props.button.markers"
              :min="props.button.range_min"
              :max="props.button.range_max"
              :step="props.button.step"
              snap
              label-always
              :label-value="settingsTarget.value[props.button.var_name]"
            />
          </div>
        </div>
      </q-item-section>
    </q-item>
  </template>
  <template v-if="props.button.type == 'padded_slider'">
    <q-item>
      <q-item-section>
        <q-item-label caption> {{ props.button.var_name }} </q-item-label>
        <div class="row q-pa-md">
          <div class="col-3"></div>
          <div class="col-9">
            <q-slider
              @change="
                (value) => set_settings_wrapper(props.button.var_name, value)
              "
              v-model="settingsTarget.value[props.button.var_name]"
              color="primary"
              selection-color="secondary"
              track-size="15px"
              thumb-size="30px"
              :markers="props.button.markers"
              :min="props.button.range_min"
              :max="props.button.range_max"
              :step="props.button.step"
              snap
              label-always
              :label-value="settingsTarget.value[props.button.var_name]"
            />
          </div>
        </div>
      </q-item-section>
    </q-item>
  </template>
  <template v-if="props.button.type == 'dropdown'">
    <q-select
      square
      outlined
      @update:model-value="
        (value) => set_settings_wrapper(props.button['var_name'], value)
      "
      v-model="settingsTarget.value[props.button['var_name']]"
      :options="props.button['options']"
      :label="props.button['var_name']"
      color="secondary"
    />
  </template>
</template>

<script setup>
const props = defineProps({
  button: Object,
  deviceIndex: Number,
});

import { computed } from "vue";
import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings, devices } = storeToRefs(appStore);

const settingsTarget = computed(() => {
  if (props.button.target == "device") {
    return devices[deviceIndex];
  }
  return settings;
});

function set_settings_wrapper(key, value) {
  // is device
  if (props.button.target == "device") {
    // todo set device settings
    return;
  }
  // is app
  appStore.set_settings_value(key, value);
}
</script>
