<template>
  <div class="q-mt-xl">
    <q-slider
      @change="setBpm"
      v-model="bpm"
      :min="50"
      :max="200"
      :step="1"
      label-always
      :label-value="bpm + ' BPM'"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  name: 'BpmComponent',
  setup() {
    return {
      bpm: ref(145),
    };
  },
  mounted() {
    this.getBpm();
  },
  methods: {
    getBpm() {
      fetch('/api/settings')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          this.bpm = response.bpm;
          console.log(this.bpm);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setBpm() {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bpm: this.bpm }),
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
