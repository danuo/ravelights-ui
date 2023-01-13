<!-- This is the new version -->

<template>
  <div v-for="button in buttons" :key="button.name">
    <!-- button is toggleslider -->
    <div v-if="button.type == 'toggle_slider'" class="row q-col-gutter-md">
      <div class="col-4">
        <q-toggle
          @click="handleClick"
          v-model="settings_autopilot[button.name_toggle]"
          :label="button.name_toggle"
        />
      </div>
      <div class="col-8">
        <q-slider
          @change="handleClick"
          v-model="settings_autopilot[button.name_slider]"
          :min="button.range_min"
          :max="button.range_max"
          :step="button.step"
          track-size="20px"
          thumb-size="40px"
          label-always
          :label-value="
            Math.trunc(100 * settings_autopilot[button.name_slider]) + ' %'
          "
        />
      </div>
    </div>

    <!-- button is toggle -->
    <div v-if="button.type == 'toggle'" class="row q-col-gutter-md">
      <div class="col-4">
        <q-toggle
          @click="handleClick"
          v-model="settings_autopilot[button.name_toggle]"
          :label="button.name_toggle"
        />
      </div>
    </div>

    <!-- button is slider with steps -->
    <div v-if="button.type == 'slider_with_steps'" class="row q-col-gutter-md">
      <div class="col-12">
        <q-slider
          @change="handleClick"
          v-model="settings_autopilot[button.name_slider]"
          track-size="20px"
          thumb-size="40px"
          :min="button.range_min"
          :max="button.range_max"
          :step="button.step"
          label-always
          :label-value="settings_autopilot[button.name_slider]"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonGenerator',
  data() {
    return {
      temp_toggle: 0,
      temp_slider_val: 0,
      buttons: [],
      settings_autopilot: {},
    };
  },
  mounted() {
    fetch('/api')
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.buttons = response['controls_autopilot'];
        this.settings_autopilot = response['settings_autopilot'];
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleClick() {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...this.settings_autopilot,
          action: 'set_settings_autopilot',
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
