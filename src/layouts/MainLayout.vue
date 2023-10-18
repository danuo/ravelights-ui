<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white" height-hint="50">
      <q-tabs align="left" style="height: 6em">
        <q-route-tab to="/bpm" name="BPM" icon="alarm" />
        <q-route-tab to="/perform" name="Perform" icon="live_tv" />
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
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
