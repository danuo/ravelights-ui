<template>
  <q-list bordered separator>
    <q-item v-for="(e, idx) in devices.length" :key="idx">
      <q-item-section>
        <q-item-label caption style="color: #676767">
          Device {{ idx }} | lights:{{ devices[idx].n_lights }} | leds:{{
            devices[idx].n_leds
          }}
        </q-item-label>
        <div class="q-mt-xs row justify-between">
          <q-btn-toggle
            v-model="devices[idx]['device_manual_timeline_level']"
            @click="changeIndex()"
            :options="[
              { label: 'black', value: 0 },
              { label: '[1]', value: 1 },
              { label: '[2]', value: 2 },
              { label: '[3]', value: 3 },
              { label: 'none', value: 4 },
            ]"
            size="lg"
          />
        </div>
        <div class="q-px-md q-py-md">
          <q-item-label caption style="color: #676767">
            device_triggerskip
          </q-item-label>
          <q-slider
            @change="change_device_settings(idx, 'device_triggerskip')"
            v-model="devices[idx]['device_triggerskip']"
            color="primary"
            selection-color="secondary"
            track-size="15px"
            thumb-size="30px"
            :min="0"
            :max="10"
            snap
          />
          <q-item-label caption style="color: #676767">
            device_frameskip
          </q-item-label>
          <q-slider
            @change="change_device_settings(idx, 'device_frameskip')"
            v-model="devices[idx]['device_frameskip']"
            color="primary"
            selection-color="secondary"
            track-size="15px"
            thumb-size="30px"
            :min="1"
            :max="10"
            snap
          />
          <q-item-label caption style="color: #676767">
            device_brightness
          </q-item-label>
          <q-slider
            @change="change_device_settings(idx, 'device_brightness')"
            v-model="devices[idx]['device_brightness']"
            color="primary"
            selection-color="secondary"
            track-size="15px"
            thumb-size="30px"
            :min="0"
            :max="1"
            :step="0.1"
            marker-labels
          />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  data() {
    return {
      devices: [],
    };
  },
  mounted() {
    fetch("/rest/devices")
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        console.log(response);
        this.devices = response;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    change_device_settings(device_id, var_name) {
      let requestBody = {
        action: "set_device_settings",
        device_id: device_id,
      };
      requestBody[var_name] = this.devices[device_id][var_name];
      console.log(requestBody);
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };
      fetch("/rest/settings", requestOptions)
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
