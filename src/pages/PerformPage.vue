<template>
  <q-page padding>
    <GeneratorsComponent />
    <h5 class="text-center q-ma-md">BPM Slider</h5>
    <BpmComponent />
    <h5 class="text-center q-ma-md">Global Brigthness Slider</h5>
    <SliderGlobalBrightness />
    <h5 class="text-center q-ma-md">Global Thinning Ratio</h5>
    <SliderGlobalThinningRatio />
    <h5 class="text-center q-ma-md">Global Energy</h5>
    <SliderGlobalEnergy />
  </q-page>
</template>

<script lang="ts">
import BpmComponent from 'components/BpmComponent.vue';
import GeneratorsComponent from 'src/components/GeneratorsComponent.vue';
import SliderGlobalBrightness from 'src/components/SliderGlobalBrightness.vue';
import SliderGlobalThinningRatio from 'src/components/SliderGlobalThinningRatio.vue';
import SliderGlobalEnergy from 'src/components/SliderGlobalEnergy.vue';
export default {
  name: 'PerformPage',
  components: {
    GeneratorsComponent,
    BpmComponent,
    SliderGlobalBrightness,
    SliderGlobalThinningRatio,
    SliderGlobalEnergy,
  },
};
</script>
