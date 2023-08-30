<template>
  test
  <div class="row">
    <div class="col-4" style="background-color: #474747">L1 Prim</div>
    <div class="col-8" style="background-color: #474747">
      <q-btn-toggle
        spread
        v-model="test"
        :options="[
          { label: 'A', value: 'A' },
          { label: 'B', value: 'B' },
          { label: 'C', value: 'C' },
        ]"
        size="lg"
      />
    </div>
  </div>
  <div class="row">
    <div class="col-4" style="background-color: #474747">L1 Sec</div>
    <div class="col-8" style="background-color: #474747">right</div>
  </div>
  <div class="q-py-md row flex-center" style="width: 100%">
    <div class="q-gutter-y-md" style="width: 75%">
      <q-btn-group class="row" style="width: 100%">
        <q-btn
          v-for="(e, idx) in color_names.length"
          :key="idx"
          @click="selectedColorLevel = idx + 1"
          :label="color_names[idx]"
          class="col"
          :style="get_button_styling(idx)"
        />
      </q-btn-group>
    </div>
  </div>

  <q-color
    @change="set_color_put"
    v-model="color_str"
    default-value="#000"
    default-view="tune"
    format-model="rgb"
    no-header-tabs
    size="huge"
    :no-footer="true"
  />
  <q-color
    @change="set_color_put"
    v-model="color_str"
    default-value="#000"
    default-view="palette"
    format-model="rgb"
    no-header
    no-header-tabs
    size="huge"
    :no-footer="true"
    :palette="palette"
  />

  <div class="q-mt-lg row flex-center">
    <q-item-label caption style="color: #474747">
      Select Color Transition Speed
    </q-item-label>
    <q-btn-toggle
      v-model="color_transition_speed"
      @click="set_settings('color_transition_speed')"
      toggle-color="primary"
      :options="generateColorTransitionSpeedOptions()"
    />
  </div>

  <div class="row q-pa-md flex-center">
    <div class="col-4">
      <q-toggle
        @click="set_settings('color_sec_active')"
        v-model="color_sec_active"
        size="40px"
        color="secondary"
        label="Activate Rule"
      />
    </div>
    <div class="col-8">
      <q-select
        @update:model-value="(val) => set_settings_value('color_sec_mode', val)"
        outlined
        v-model="color_sec_mode"
        :options="color_sec_mode_names"
        color="secondary"
        label="secondary color rule"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ColorComponent",
  data() {
    return {
      color: [[1.0, 0, 0]],
      color_names: ref([]),
      color_transition_speed: ref(""),
      color_transition_speeds: [""],
      selectedColorLevel: ref(1),
      palette: [],
      color_sec_active: ref(true),
      color_sec_mode: ref(""),
      color_sec_mode_names: [""],
    };
  },
  mounted() {
    this.get_color();
    fetch("/rest/settings")
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.color_names = response.color_names;
        this.color_transition_speed = response.color_transition_speed;
        this.color_sec_active = response.color_sec_active;
        this.color_sec_mode = response.color_sec_mode;
        this.color_sec_mode_names = response.color_sec_mode_names;
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("/rest/meta")
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.palette = response.controls_color_palette;
        this.color_transition_speeds = response.color_transition_speeds;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    color_str: {
      get() {
        let color_float = this.color[this.selectedColorLevel - 1];
        return this.floatToRgb(color_float);
      },
      set(color_str) {
        this.color[this.selectedColorLevel - 1] = this.rgbToFloat(color_str);
      },
    },
  },
  methods: {
    get_color() {
      fetch("/rest/color")
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          this.color = response;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    set_settings(var_name) {
      let requestBody = {
        action: "set_settings",
      };
      requestBody[var_name] = this[var_name];
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };
      fetch("/rest/settings", requestOptions)
        .then((responsePromise) => responsePromise)
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    },
    set_settings_value(var_name, value) {
      let requestBody = {
        action: "set_settings",
      };
      requestBody[var_name] = value;
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };
      fetch("/rest/settings", requestOptions)
        .then((responsePromise) => responsePromise)
        .then((response) => {})
        .catch((err) => {
          console.log(err);
        });
    },
    set_color_put() {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "set_color",
          color: this.color[this.selectedColorLevel - 1],
          level: this.selectedColorLevel,
        }),
      };
      fetch("/rest/color", requestOptions)
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          console.log("color_put");
          this.color = response;
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    floatToRgb(floatList) {
      return `rgb(${Math.round(floatList[0] * 255)}, ${Math.round(
        floatList[1] * 255
      )}, ${Math.round(floatList[2] * 255)})`;
    },
    rgbToFloat(rgb) {
      var parts = rgb.substring(4, rgb.length - 1).split(",");
      var r = parseInt(parts[0]) / 255;
      var g = parseInt(parts[1]) / 255;
      var b = parseInt(parts[2]) / 255;
      return [r, g, b];
    },
    get_button_styling(idx) {
      let out_list = [];
      out_list.push("height: 60px;");
      out_list.push("padding-top: 16px;");
      out_list.push("border-bottom: 8px solid ");
      out_list.push(this.floatToRgb(this.color[idx]));
      out_list.push(";");
      out_list.push("background-color: ");
      out_list.push(
        this.selectedColorLevel == idx + 1
          ? this.floatToRgb(this.color[idx])
          : "#000"
      );
      out_list.push(";");
      let final_str = out_list.join(" ");
      return final_str;
    },
    generateColorTransitionSpeedOptions() {
      return this.color_transition_speeds.map((speed_str) => ({
        label: speed_str.toUpperCase(),
        value: speed_str,
      }));
    },
  },
};
</script>
