<template>
  <q-page padding>
    <h5 class="text-center">Available Generators</h5>
    <AvailableGenerators />
    <!-- <h5 class="text-center">Active Generators</h5> -->
    <!-- <ActiveGenerators /> -->
    <h5 class="text-center q-mt-md">BPM Slider</h5>
    <BpmComponent />
    <h5 class="text-center q-mt-md">Global Brigthness Slider</h5>
    <SliderGlobalBrightness />
    <h5 class="text-center q-mt-md">Global Thinning Ratio</h5>
    <SliderGlobalThinningRatio />
    <h5 class="text-center q-mt-md">Global Energy</h5>
    <SliderGlobalEnergy />
  </q-page>
</template>

<script lang="ts">
import BpmComponent from 'components/BpmComponent.vue';
// import ActiveGenerators from 'components/ActiveGenerators.vue';
import AvailableGenerators from 'src/components/AvailableGenerators.vue';
import SliderGlobalBrightness from 'src/components/SliderGlobalBrightness.vue';
import SliderGlobalThinningRatio from 'src/components/SliderGlobalThinningRatio.vue';
import SliderGlobalEnergy from 'src/components/SliderGlobalEnergy.vue';
export default {
  name: 'PerformPage',
  components: {
    // ActiveGenerators,
    AvailableGenerators,
    BpmComponent,
    SliderGlobalBrightness,
    SliderGlobalThinningRatio,
    SliderGlobalEnergy,
  },
};
</script>
