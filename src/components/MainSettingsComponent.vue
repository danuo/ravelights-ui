<template>
  <q-list bordered separator>
    <q-item v-for="slider in controls_global_sliders" :key="slider.name">
      <!-- is slider -->
      <q-item-section v-if="slider.type == 'slider'">
        <q-item-label caption> {{ slider.var_name }} </q-item-label>
        <div class="row q-pa-md">
          <div class="col-12">
            <q-slider
              @change="change_settings(slider.var_name)"
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
  name: "BpmComponent",
  data() {
    return {
      controls_global_sliders: [],
      api_response: {},
      bpm_multiplier_mapping: { 0: "1/2", 1: 1, 2: 2 },
      bpm_multiplier_placeholder: 1,
    };
  },
  mounted() {
    fetch("/rest/settings")
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.api_response = response;
        this.bpm_multiplier_placeholder = response.bpm_multiplier;
        this.bpm_multiplier_placeholder =
          this.bpm_multiplier_placeholder == 0.5
            ? 0
            : this.bpm_multiplier_placeholder;
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("/rest/meta")
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.controls_global_sliders = response.controls_global_sliders;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    change_settings(var_name) {
      let requestBody = {
        action: "set_settings",
      };
      requestBody[var_name] = this.api_response[var_name];
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
    sync() {
      const currentTime = new Date().getTime();
      console.log("before");
      console.log(currentTime);
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "set_sync",
        }),
      };
      fetch("/rest/settings", requestOptions)
        .then((responsePromise) => responsePromise)
        .then((response) => {
          const currentTime2 = new Date().getTime();
          console.log("after");
          console.log(currentTime2);
          return response;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    change_sync(value) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "adjust_sync",
          value: value,
        }),
      };
      fetch("/rest/settings", requestOptions)
        .then((responsePromise) => responsePromise)
        .then((response) => response)
        .catch((err) => {
          console.log(err);
        });
    },
    change_bpm(value) {
      this.api_response["bpm_base"] = parseFloat(
        (this.api_response["bpm_base"] + value).toFixed(2)
      );
      this.change_settings("bpm_base");
    },
    change_settings_bpm_multiplier() {
      this.api_response["bpm_multiplier"] =
        this.bpm_multiplier_placeholder == 0
          ? 0.5
          : this.bpm_multiplier_placeholder;
      this.change_settings("bpm_multiplier");
    },
  },
};
</script>
