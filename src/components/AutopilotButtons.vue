<template>
  <q-list bordered separator>
    <q-item v-for="button in buttons" :key="button.name">
      <!-- is toggle slider -->
      <q-item-section v-if="button.type == 'toggle_slider'">
        <q-item-label caption> {{ button.name_toggle }} </q-item-label>
        <div class="row q-pa-md">
          <div class="col-3">
            <q-toggle
              @click="handleClick"
              v-model="settings_autopilot[button.name_toggle]"
              size="40px"
            />
          </div>
          <div class="col-9">
            <q-slider
              @change="handleClick"
              v-model="settings_autopilot[button.name_slider]"
              :min="button.range_min"
              :max="button.range_max"
              :step="button.step"
              track-size="15px"
              thumb-size="30px"
              label-always
              :label-value="
                Math.trunc(100 * settings_autopilot[button.name_slider]) + ' %'
              "
            />
          </div>
        </div>
      </q-item-section>

      <!-- is slider -->
      <q-item-section v-if="button.type == 'slider'">
        <q-item-label caption> {{ button.name_slider }} </q-item-label>
        <div class="row q-pa-md">
          <div class="col-3"></div>
          <div class="col-9">
            <q-slider
              @change="handleClick"
              v-model="settings_autopilot[button.name_slider]"
              track-size="15px"
              thumb-size="30px"
              :min="button.range_min"
              :max="button.range_max"
              :step="button.step"
              label-always
              :label-value="settings_autopilot[button.name_slider]"
            />
          </div>
        </div>
      </q-item-section>

      <!-- is toggle -->
      <q-item-section v-if="button.type == 'toggle'">
        <q-item-label caption> {{ button.name_toggle }} </q-item-label>
        <div class="row q-pa-md">
          <div class="col-3">
            <q-toggle
              @click="handleClick"
              v-model="settings_autopilot[button.name_toggle]"
            />
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
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
