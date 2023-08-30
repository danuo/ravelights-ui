<template>
  <div class="q-mt-xs q-col-gutter-xs">
    <div class="row">
      <div class="col-6" id="bpm_input">
        <q-input v-model.number="api_response['bpm_base']" outlined />
      </div>
      <div class="col-3">
        <q-btn
          v-model="api_response['bpm_base']"
          @click="change_bpm(0.1)"
          style="width: 100%; height: 70px"
          :square="true"
          color="primary"
          icon="expand_less"
          size="25px"
        />
      </div>
      <div class="col-3">
        <q-btn
          v-model="api_response['bpm_base']"
          @click="change_bpm(-0.1)"
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
          @click="sync"
          label="sync"
          style="width: 100%; height: 70px"
          color="primary"
          size="20px"
        />
      </div>
      <div class="col-3">
        <q-btn
          @click="change_sync(0.1)"
          style="width: 100%; height: 70px"
          color="primary"
          icon="navigate_before"
          size="25px"
        />
      </div>
      <div class="col-3">
        <q-btn
          @click="change_sync(-0.1)"
          style="width: 100%; height: 70px"
          color="primary"
          icon="navigate_next"
          size="25px"
        />
      </div>
    </div>
  </div>

  <div class="q-px-none q-mt-lg q-mb-md" v-if="api_response !== null">
    <div style="padding-left: 16px" class="text-caption">bpm multiplier</div>
    <div class="row flex-center" style="width: 100%">
      <q-slider
        @change="change_settings_bpm_multiplier()"
        v-model="bpm_multiplier_placeholder"
        color="secondary"
        selection-color="secondary"
        track-size="15px"
        thumb-size="30px"
        :min="0"
        :max="2"
        :marker-labels="bpm_multiplier_mapping"
        snap
        style="width: 66%"
      />
    </div>
  </div>
</template>

<style>
#bpm_input .q-field__control {
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
