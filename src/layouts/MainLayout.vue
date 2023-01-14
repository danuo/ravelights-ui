<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white" height-hint="50">
      <q-tabs align="left">
        <q-route-tab to="/perform" label="Perform" />
        <q-route-tab to="/actions" label="Actions" />
        <q-route-tab to="/bpm" label="BPM" />
        <q-route-tab to="/autopilot" label="Autopilot" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
