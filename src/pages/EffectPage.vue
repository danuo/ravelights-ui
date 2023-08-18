<template>
  <q-page padding>
    <ManualTimelineComponent />
    <EffectList />
    <EffectComponent />
  </q-page>
</template>

<script>
import EffectComponent from "src/components/EffectComponent.vue";
import EffectList from "src/components/EffectList.vue";
import ManualTimelineComponent from "src/components/ManualTimelineComponent.vue";
export default {
  name: "EffectPage",
  components: {
    EffectComponent,
    EffectList,
    ManualTimelineComponent,
  },
};
</script>
