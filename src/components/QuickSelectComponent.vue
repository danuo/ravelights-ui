<template v-if="settings !== null">
  <div class="q-py-xs row justify-between bg-grey-10 no-wrap scroll-container">
    <q-btn-toggle
      v-model="settings.global_manual_timeline_level"
      @click="appStore.set_settings('global_manual_timeline_level')"
      :options="[
        { label: 'b', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: 't', value: null },
      ]"
      size="lg"
      toggle-color="primary"
      color="black"
      padding="5px 20px"
    />
    <q-btn-toggle
      v-if="appStore.device_list_options.length > 1"
      v-model="settings.target_device_index"
      @click="appStore.set_settings('target_device_index')"
      :options="device_options"
      size="lg"
      toggle-color="primary"
      color="black"
      padding="2px 15px"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAppStore } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings } = storeToRefs(appStore);

const device_options = computed({
  get() {
    let options = [{ label: "a", value: null }];
    for (let x of appStore.device_list_options) {
      options.push({ label: String(x), value: x });
    }
    return options;
  },
});
</script>

<style>
.scroll-container {
  overflow-x: scroll;
  gap: 16px;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
