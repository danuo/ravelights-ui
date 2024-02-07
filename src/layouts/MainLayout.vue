<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white" height-hint="50">
      <q-tabs align="left" style="height: 6em">
        <q-btn flat icon="live_tv" @click="toggleVisualizer" />
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
    </q-header>

    <q-page-container>
      <div id="stickie">
        <WebglVisualizerComponent
          :visualizerEnabled="visualizerEnabled"
        ></WebglVisualizerComponent>
        <ManualTimelineComponent></ManualTimelineComponent>
      </div>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const visualizerEnabled = ref(true);

function toggleVisualizer() {
  visualizerEnabled.value = !visualizerEnabled.value;
}
import ManualTimelineComponent from "src/components/ManualTimelineComponent.vue";
import WebglVisualizerComponent from "src/components/WebglVisualizerComponent.vue";
</script>

<style>
#stickie {
  width: 100%;
  background-color: black;
  top: 0;
  position: sticky;
  z-index: 10;
}
</style>
