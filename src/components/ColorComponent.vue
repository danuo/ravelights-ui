<template>
  <div v-if="this.color_mapping !== null">
    <div class="row" v-for="item in this.button_list" :key="item">
      <div class="col-4" style="background-color: #474747">
        Level {{ item[0] }} {{ item[1] }}
      </div>
      <div class="col-8">
        <q-btn-toggle
          spread
          v-model="this.color_mapping[item[0]][item[1]]"
          :options="this.color_mapping_options"
          size="lg"
          @click="set_settings('color_mapping')"
        />
      </div>
    </div>
  </div>

  <div class="q-py-md row flex-center" style="width: 100%">
    <div class="q-gutter-y-md" style="width: 75%">
      <q-btn-group class="row" style="width: 100%">
        <q-btn
          v-for="(e, idx) in color_names.length"
          :key="idx"
          @click="selected_color_key = this.color_keys[idx]"
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
      colors: ref({ A: [0, 0, 0], B: [0, 0, 0], C: [0, 0, 0] }),
      color_keys: ref(["A", "B", "C"]),
      color_names: ref(["Color A", "Color B", "Color C"]),
      color_mapping: null,
      color_mapping_options: [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
        { label: "C", value: "C" },
      ],
      button_list: [
        [1, "prim"],
        [1, "sec"],
        [2, "prim"],
        [2, "sec"],
        [3, "prim"],
        [3, "sec"],
      ],
      color_transition_speed: ref(""),
      color_transition_speeds: [""],
      selected_color_key: ref("A"),
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
        this.color_transition_speed = response.color_transition_speed;
        this.color_sec_active = response.color_sec_active;
        this.color_sec_mode = response.color_sec_mode;
        this.color_sec_mode_names = response.color_sec_mode_names;
        this.color_mapping = response.color_mapping;
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
        let color_float = this.colors[this.selected_color_key];
        return this.floatToRgb(color_float);
      },
      set(color_str) {
        this.colors[this.selected_color_key] = this.rgbToFloat(color_str);
      },
    },
  },
  methods: {
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
    get_color() {
      fetch("/rest/color")
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          this.colors = response;
        })
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
          color: this.colors[this.selected_color_key],
          color_key: this.selected_color_key,
        }),
      };
      fetch("/rest/color", requestOptions)
        .then((responsePromise) => responsePromise.json())
        .then((response) => {
          console.log("color_put");
          this.colors = response;
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
      const key = this.color_keys[idx];
      let out_list = [];
      out_list.push("height: 60px;");
      out_list.push("padding-top: 16px;");
      out_list.push("border-bottom: 8px solid ");
      out_list.push(this.floatToRgb(this.colors[key]));
      out_list.push(";");
      out_list.push("background-color: ");
      out_list.push(
        this.selected_color_key == key
          ? this.floatToRgb(this.colors[key])
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
