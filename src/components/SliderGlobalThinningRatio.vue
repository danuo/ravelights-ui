<template>
  <div class="q-mt-xl">
    <q-slider
      @change="setGlobalThinningRatio"
      v-model="global_thinning_ratio"
      :min="0"
      :max="1"
      :step="0.1"
      label-always
      :label-value="100 * global_thinning_ratio + ' % ThinningRatio'"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  name: 'SliderGlobalThinningRatio',
  setup() {
    return {
      global_thinning_ratio: ref(0.7),
    };
  },
  mounted() {
    this.getGlobalThinningRatio();
  },
  methods: {
    getGlobalThinningRatio() {
      fetch('/api/global_thinning_ratio')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          this.global_thinning_ratio = response.global_thinning_ratio;
          console.log(this.global_thinning_ratio);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setGlobalThinningRatio() {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          global_thinning_ratio: this.global_thinning_ratio,
        }),
      };

      fetch('/api/global_thinning_ratio', requestOptions)
        .then((responsePromise) => responsePromise)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
