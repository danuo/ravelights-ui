<template>
  <q-page padding>
    <EffectList />
    <EffectComponent />
  </q-page>
</template>

<script>
import EffectComponent from "src/components/EffectComponent.vue";
import EffectList from "src/components/EffectList.vue";
export default {
  name: "EffectPage",
  components: {
    EffectComponent,
    EffectList,
  },
};
</script>
