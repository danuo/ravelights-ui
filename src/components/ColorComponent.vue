<template>
  <!-- <q-badge color="grey-3" text-color="black" class="q-mb-sm">
    {{ color }}
    {{ selectedColorLevel }}
  </q-badge> -->

  <div class="q-py-lg row flex-center" style="width: 100%">
    <div class="q-gutter-y-md" style="width: 75%">
      <q-btn-group class="row" style="width: 100%">
        <q-btn
          v-for="(e, idx) in color_names.length"
          :key="idx"
          @click="selectedColorLevel = idx"
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

  <h5 class="text-center q-ma-xs">Color Settings</h5>

  <div class="text-subtitle2">Select Color Transition Speed</div>
  <div class="q-mb-lg">
    <q-btn-toggle
      v-model="color_transition_speed"
      @click="change_settings('color_transition_speed')"
      toggle-color="primary"
      :options="generateColorTransitionSpeedOptions()"
    />
  </div>

  <div class="row q-pa-md">
    <div class="col-4">
      <q-toggle
        @click="change_settings('color_sec_active')"
        v-model="color_sec_active"
        size="40px"
        color="secondary"
        label="Activate Rule"
      />
    </div>
    <div class="col-8">
      <q-select
        @update:model-value="change_settings('color_sec_mode')"
        outlined
        v-model="color_sec_mode"
        :options="color_sec_mode_names"
        label="Outlined"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ColorComponent",
  data() {
    return {
      color: [[1.0, 0, 0]],
      color_names: [],
      color_transition_speeds: [""],
      selectedColorLevel: 0,
      color_transition_speed: "",
      palette: [],
      color_sec_active: true,
      color_sec_mode: "",
      color_sec_mode_names: [""],
      temp_toggle: true,
    };
  },
  mounted() {
    this.get_color();
    fetch("/rest")
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.palette = response.controls.controls_color_palette;
        this.color_names = response.color_names;
        this.color_transition_speeds =
          response.controls.color_transition_speeds;
        this.color_transition_speed = response.color_transition_speed;
        this.color_sec_active = response.color_sec_active;
        this.color_sec_mode = response.color_sec_mode;
        this.color_sec_mode_names = response.color_sec_mode_names;
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    color_str: {
      get() {
        let color_float = this.color[this.selectedColorLevel];
        return this.floatToRgb(color_float);
      },
      set(color_str) {
        this.color[this.selectedColorLevel] = this.rgbToFloat(color_str);
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
    change_settings(var_name) {
      let requestBody = {
        action: "change_settings",
      };
      requestBody[var_name] = this[var_name];
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      };
      fetch("/rest", requestOptions)
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
          color: this.color[this.selectedColorLevel],
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
      console.log("testsd");
      console.log(floatList);
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
        this.selectedColorLevel == idx
          ? this.floatToRgb(this.color[idx])
          : "#000"
      );
      out_list.push(";");
      let final_str = out_list.join(" ");
      // console.log(final_str);
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
