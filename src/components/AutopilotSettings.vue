<template>
  <div class="q-mt-xl">
    <div class="row q-col-gutter-md">
      <div class="col-4">
        <q-toggle
          @click="updateAutopilotSettings"
          v-model="autopilotSettings.color"
          label="Color"
        />
      </div>
      <div class="col-8">
        <q-slider
          @change="updateAutopilotSettings"
          v-model="autopilotSettings.p_color"
          :min="0"
          :max="1"
          :step="0.01"
          label-always
          :label-value="Math.trunc(100 * autopilotSettings.p_color) + ' %'"
        />
      </div>
      <div class="col-4">
        <q-toggle
          @click="updateAutopilotSettings"
          v-model="autopilotSettings.timeline"
          label="Timeline"
        />
      </div>
      <div class="col-8">
        <q-slider
          @change="updateAutopilotSettings"
          v-model="autopilotSettings.p_timeline"
          :min="0"
          :max="1"
          :step="0.01"
          label-always
          :label-value="Math.trunc(100 * autopilotSettings.p_timeline) + ' %'"
        />
      </div>
      <div class="col-4">
        <q-toggle
          @click="updateAutopilotSettings"
          v-model="autopilotSettings.pattern"
          label="Pattern 1"
        />
      </div>
      <div class="col-8">
        <q-slider
          @change="updateAutopilotSettings"
          v-model="autopilotSettings.p_pattern"
          :min="0"
          :max="1"
          :step="0.01"
          label-always
          :label-value="Math.trunc(100 * autopilotSettings.p_pattern) + ' %'"
        />
      </div>
      <div class="col-4">
        <q-toggle
          @click="updateAutopilotSettings"
          v-model="autopilotSettings.pattern_sec"
          label="Pattern 2"
        />
      </div>
      <div class="col-8">
        <q-slider
          @change="updateAutopilotSettings"
          v-model="autopilotSettings.p_pattern_sec"
          :min="0"
          :max="1"
          :step="0.01"
          label-always
          :label-value="
            Math.trunc(100 * autopilotSettings.p_pattern_sec) + ' %'
          "
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
export default {
  name: 'AutopilotSettings',
  setup() {
    return {
      autopilotSettings: ref({
        is_active: false,
        color: true,
        p_color: 0.1,
        timeline: true,
        p_timeline: 0.1,
        pattern: true,
        p_pattern: 0.1,
        pattern_sec: true,
        p_pattern_sec: 0.1,
      }),
    };
  },
  mounted() {
    this.fetchAutopilotSettings();
  },
  methods: {
    fetchAutopilotSettings() {
      fetch('/api/autopilot_settings')
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          console.log(response);
          this.autopilotSettings = response.autopilot_settings;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateAutopilotSettings() {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autopilot_settings: this.autopilotSettings }),
      };
      fetch('/api/autopilot_settings', requestOptions)
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
