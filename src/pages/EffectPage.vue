<template>
  <q-page padding>
    <ManualTimelineComponent />
    <EffectList />
    <EffectComponent />
  </q-page>
</template>

<script setup>
import ManualTimelineComponent from "src/components/ManualTimelineComponent.vue";
import EffectList from "src/components/EffectList.vue";
import EffectComponent from "src/components/EffectComponent.vue";
</script>
