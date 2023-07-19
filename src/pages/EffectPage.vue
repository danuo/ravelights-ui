<template>
  <q-page padding>
    <GlobalButtons />
    <EffectComponent />
  </q-page>
</template>

<script>
import GlobalButtons from 'src/components/Actions.vue';
import EffectComponent from 'src/components/EffectComponent.vue';
export default {
  name: 'EffectPage',
  components: {
    GlobalButtons,
    EffectComponent,
  },
};
</script>
