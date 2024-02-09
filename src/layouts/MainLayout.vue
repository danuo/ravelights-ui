<template>
  <FloatingMenuComponent></FloatingMenuComponent>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white" height-hint="50">
      <q-tabs align="left" style="height: 6em">
        <q-btn flat icon="live_tv" @click="toggleFloatingMenu" />
        <q-route-tab to="/bpm" name="BPM" icon="alarm" />
        <q-route-tab to="/perform" name="Perform" icon="view_timeline" />
        <q-route-tab to="/trigger" name="Trigger" icon="pattern" />
        <q-route-tab to="/effect" name="Effect" icon="stream" />
        <q-route-tab to="/devices" name="Devices" icon="widgets" />
        <q-route-tab to="/timeline" name="Timeline" icon="movie" />
        <q-route-tab
          to="/autopilot"
          name="Autopilot"
          icon="motion_photos_auto"
        />
      </q-tabs>
      <div class="black-bg">
        <WebglVisualizerComponent
          :visualizerEnabled="enable_visualizer"
        ></WebglVisualizerComponent>
        <ManualTimelineComponent></ManualTimelineComponent>
      </div>
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAppStore } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { enable_floating_menu, enable_visualizer } = storeToRefs(appStore);

function toggleFloatingMenu() {
  enable_floating_menu.value = !enable_floating_menu.value;
  console.log(enable_floating_menu.value);
}
import ManualTimelineComponent from "src/components/ManualTimelineComponent.vue";
import WebglVisualizerComponent from "src/components/WebglVisualizerComponent.vue";
import FloatingMenuComponent from "src/components/FloatingMenuComponent.vue";
</script>

<style>
div.q-tabs__content > button {
  height: 100%;
  background-color: black;
}

.black-bg {
  background-color: black;
}

#stickie {
  width: 100%;
  top: 0;
  position: sticky;
  z-index: 10;
}
</style>
