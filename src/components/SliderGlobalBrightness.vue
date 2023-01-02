<template>
  <div class="q-mt-xl">
    <q-slider
      @change="setGlobalBrightness"
      v-model="global_brightness"
      :min="0"
      :max="1"
      :step="0.1"
      label-always
      :label-value="100 * global_brightness + ' % Brightness'"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default {
  name: 'SliderGlobalBrightness',
  setup() {
    return {
      global_brightness: ref(1.0),
    };
  },
  mounted() {
    this.getGlobalBrightness();
  },
  methods: {
    getGlobalBrightness() {
      fetch('/api')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          this.global_brightness = response.global_brightness;
          console.log(this.global_brightness);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setGlobalBrightness() {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change_settings',
          global_brightness: this.global_brightness,
        }),
      };
      fetch('/api', requestOptions)
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
