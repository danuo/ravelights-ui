<template>
  <div class="q-col-gutter-xs">
    <q-space />
    <q-space />
    <div class="row">
      <div class="col-6">
        <q-input v-model.number="api_response['bpm']" outlined />
      </div>
      <div class="col-3">
        <q-btn
          v-model="api_response['bpm']"
          @click="increaseBPM"
          style="width: 100%; height: 70px"
          :square="true"
          color="primary"
          icon="expand_less"
          size="25px"
        />
      </div>
      <div class="col-3">
        <q-btn
          v-model="api_response['bpm']"
          @click="decreaseBPM"
          style="width: 100%; height: 70px"
          color="primary"
          icon="expand_more"
          size="25px"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <q-btn
          label="sync"
          style="width: 100%; height: 70px"
          color="primary"
          size="20px"
        />
      </div>
      <div class="col-3">
        <q-btn
          style="width: 100%; height: 70px"
          color="primary"
          icon="navigate_before"
          size="25px"
        />
      </div>
      <div class="col-3">
        <q-btn
          style="width: 100%; height: 70px"
          color="primary"
          icon="navigate_next"
          size="25px"
        />
      </div>
    </div>
    <q-space />
    <q-space />
    <q-space />
    <q-space />
  </div>

  <q-list bordered separator>
    <q-item v-for="slider in sliders" :key="slider.name">
      <!-- is slider -->
      <q-item-section v-if="slider.type == 'slider'">
        <q-item-label caption> {{ slider.var_name }} </q-item-label>
        <div class="row q-pa-md">
          <div class="col-12">
            <q-slider
              @change="handleClick(slider.var_name)"
              v-model="api_response[slider.var_name]"
              color="primary"
              selection-color="secondary"
              track-size="15px"
              thumb-size="30px"
              :markers="slider.markers"
              :min="slider.range_min"
              :max="slider.range_max"
              :step="slider.step"
              snap
              label-always
              :label-value="api_response[slider.var_name]"
            />
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style>
.q-field__control {
  height: 70px !important;
  font-size: 25px;
}
</style>

<script>
export default {
  name: 'BpmSliders',
  data() {
    return {
      sliders: [],
      api_response: {},
    };
  },
  mounted() {
    fetch('/api')
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.sliders = response['controls_global_sliders'];
        console.log(this.sliders);
        this.api_response = response;
        console.log(this.api_response);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleClick(var_name) {
      const requestBody = {
        action: 'change_settings',
      };
      requestBody[var_name] = this.api_response[var_name];
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
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
    increaseBPM() {
      this.api_response['bpm'] = parseFloat(
        (this.api_response['bpm'] + 0.1).toFixed(2)
      );
      this.handleClick('bpm');
    },
    decreaseBPM() {
      this.api_response['bpm'] = parseFloat(
        (this.api_response['bpm'] - 0.1).toFixed(2)
      );
      this.handleClick('bpm');
    },
  },
};
</script>
