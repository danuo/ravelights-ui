<template>
  <q-page padding>
    <h5 class="text-center q-mt-md">BPM Slider</h5>
    <BpmComponent />
    <h5 class="text-center q-mt-md">Global Brigthness Slider</h5>
    <SliderGlobalBrightness />
    <h5 class="text-center q-mt-md">Global Thinning Ratio</h5>
    <SliderGlobalThinningRatio />
    <h5 class="text-center q-mt-md">Global Energy</h5>
    <SliderGlobalEnergy />
    <h5 class="text-center">Pattern Selector</h5>
    <PatternComponent />
  </q-page>
</template>

<script lang="ts">
import BpmComponent from 'components/BpmComponent.vue';
import PatternComponent from 'components/PatternComponent.vue';
import SliderGlobalBrightness from 'src/components/SliderGlobalBrightness.vue';
import SliderGlobalThinningRatio from 'src/components/SliderGlobalThinningRatio.vue';
import SliderGlobalEnergy from 'src/components/SliderGlobalEnergy.vue';
export default {
  name: 'PerformPage',
  components: {
    BpmComponent,
    PatternComponent,
    SliderGlobalBrightness,
    SliderGlobalThinningRatio,
    SliderGlobalEnergy,
  },
};
</script>
