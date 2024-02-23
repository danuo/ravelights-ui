<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="text-white">
      <q-tabs align="left" style="height: 60px">
        <q-btn
          icon="settings"
          @click="toggleFloatingMenu"
          square
          color="black"
          style="width: 60px"
        />
        <q-route-tab to="/perform" name="Perform" icon="live_tv" />
        <q-route-tab
          to="/effect"
          name="Effect"
          icon="stream"
          v-if="enable_advanced_mode"
        />
        <q-route-tab to="/color" name="Color" icon="palette" />
        <q-route-tab to="/audio" name="Audio" icon="mic" />
        <q-route-tab to="/devices" name="Devices" icon="widgets" />
        <q-route-tab to="/timeline" name="Timeline" icon="movie" />
        <q-route-tab
          to="/autopilot"
          name="Autopilot"
          icon="motion_photos_auto"
        />
        <q-route-tab
          to="/trigger"
          name="Trigger"
          icon="pattern"
          v-if="enable_advanced_mode"
        />
      </q-tabs>
      <div class="black-bg">
        <WebglVisualizerComponent />
        <QuickSelectComponent v-if="enable_quick_select" />
      </div>
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <q-footer class="no-pointer-events">
      <q-slide-transition>
        <FloatingMenuComponent
          class="all-pointer-events"
          v-show="enable_floating_menu"
        ></FloatingMenuComponent>
      </q-slide-transition>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useAppStore } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { enable_floating_menu, enable_quick_select, enable_advanced_mode } =
  storeToRefs(appStore);

function toggleFloatingMenu() {
  enable_floating_menu.value = !enable_floating_menu.value;
}
import QuickSelectComponent from "src/components/QuickSelectComponent.vue";
import WebglVisualizerComponent from "src/components/WebglVisualizerComponent.vue";
import FloatingMenuComponent from "src/components/FloatingMenuComponent.vue";
</script>

<style>
header div.row.no-wrap button {
  flex: 1 1 auto;
  height: 100%;
  max-width: 100px;
}

footer {
  background-color: transparent !important;
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
