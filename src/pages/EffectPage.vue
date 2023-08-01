<template>
  <q-page padding>
    <EffectList />
    <GlobalButtons />
    <EffectComponent />
  </q-page>
</template>

<script>
import GlobalButtons from "src/components/Actions.vue";
import EffectComponent from "src/components/EffectComponent.vue";
import EffectList from "src/components/EffectList.vue";
export default {
  name: "EffectPage",
  components: {
    GlobalButtons,
    EffectComponent,
    EffectList,
  },
};
</script>
