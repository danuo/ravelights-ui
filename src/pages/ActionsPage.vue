<template>
  <q-page>
    <GlobalButtons />
    <ColorComponent />
  </q-page>
</template>

<script>
import GlobalButtons from 'src/components/Actions.vue';
import ColorComponent from 'src/components/ColorComponent.vue';
export default {
  name: 'ActionsPage',
  components: {
    GlobalButtons,
    ColorComponent,
  },
};
</script>
