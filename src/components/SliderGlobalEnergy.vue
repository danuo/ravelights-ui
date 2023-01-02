<template>
  <div class="q-mt-xl">
    <q-slider
      @change="setGlobalEnergy"
      v-model="global_energy"
      :min="0"
      :max="1"
      :step="0.1"
      label-always
      :label-value="100 * global_energy + ' % Energy'"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  name: 'SliderGlobalEnergy',
  setup() {
    return {
      global_energy: ref(1.0),
    };
  },
  mounted() {
    this.getGlobalEnergy();
  },
  methods: {
    getGlobalEnergy() {
      fetch('/api/settings')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          this.global_energy = response.global_energy;
          console.log(this.global_energy);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setGlobalEnergy() {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change_settings',
          global_energy: this.global_energy,
        }),
      };
      fetch('/api/settings', requestOptions)
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
