<template>
  <q-item>
    <q-item-section>
      <!-- is toggle slider -->
      <template v-if="button.type == 'toggle_slider'">
        <q-item-label caption> {{ button.name_toggle }} </q-item-label>
        <div class="row q-pa-md">
          <div class="col-3">
            <q-toggle
              @click="callback"
              v-model="settings_dict[button.name_toggle]"
              size="40px"
              color="secondary"
            />
          </div>
          <div class="col-9">
            <q-slider
              @change="callback"
              v-model="settings_dict[button.name_slider]"
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
              :label-value="settings_dict[button.name_slider]"
            />
          </div>
        </div>
      </template>

      <!-- is slider -->
      <template v-if="button.type == 'slider'">
        <q-item-label caption> {{ button.name_slider }} </q-item-label>
        <div class="row q-pa-md">
          <div class="col-3"></div>
          <div class="col-9">
            <q-slider
              @change="callback"
              v-model="settings_dict[button.name_slider]"
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
              :label-value="settings_dict[button.name_slider]"
            />
          </div>
        </div>
      </template>

      <!-- is toggle -->
      <template v-if="button.type == 'toggle'">
        <q-item-label caption> {{ button.name_toggle }} </q-item-label>
        <div class="row q-pa-md">
          <div class="col-3">
            <q-toggle
              @click="callback"
              v-model="settings_dict[button.name_toggle]"
              color="secondary"
            />
          </div>
        </div>
      </template>
    </q-item-section>
  </q-item>
</template>

<script setup>
const props = defineProps({
  settings_dict: Object,
  button: Object,
  callback: Function,
});
</script>
