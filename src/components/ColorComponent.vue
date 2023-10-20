<template>
  <div v-if="Object.keys(appStore.settings).length > 0">
    <div class="q-py-md row flex-center" style="width: 100%">
      <div class="q-gutter-y-md" style="width: 75%">
        <q-btn-group class="row" style="width: 100%">
          <q-btn
            v-for="(e, idx) in color_names.length"
            :key="idx"
            @click="selected_color_key = color_keys[idx]"
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
      :palette="meta.controls_color_palette"
    />

    <div class="q-py-lg">
      <div class="row items-center" v-for="item in ['B', 'C']" :key="item">
        <div class="col-3">Color {{ item }} sec rule</div>
        <div class="col-9">
          <q-select
            @update:model-value="
              (val) => {
                color_sec_mode[item] = val;
                set_settings('color_sec_mode');
                console.log('test');
              }
            "
            dense
            outlined
            v-model="settings.color_sec_mode[item]"
            :options="meta.color_sec_mode_names"
            color="secondary"
          />
        </div>
      </div>
      <div class="row items-center" v-for="item in button_list" :key="item">
        <div class="col-3">Level {{ item[0] }} {{ item[1] }}</div>
        <div class="col-9">
          <q-btn-toggle
            spread
            dense
            v-model="settings.color_mapping[item[0]][item[1]]"
            :options="color_mapping_options"
            size="lg"
            @click="set_settings('color_mapping')"
          />
        </div>
      </div>

      <div class="q-my-sm row justify-end">
        <q-btn label="reset" icon="update" @click="reset_color_mappings()" />
      </div>
      <div class="row flex-center">
        <q-item-label caption style="color: #474747">
          Select Color Transition Speed
        </q-item-label>
        <q-btn-toggle
          v-model="settings.color_transition_speed"
          @click="set_settings('color_transition_speed')"
          toggle-color="primary"
          :options="gen_speed_options()"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { computed } from "vue";
import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings, meta } = storeToRefs(appStore);

const selected_color_key = ref("A");
const color_keys = ["A", "B", "C"];
const color_names = ["Color A", "Color B", "Color C"];
const color_mapping_options = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
];
const button_list = [
  [1, "prim"],
  [1, "sec"],
  [2, "prim"],
  [2, "sec"],
  [3, "prim"],
  [3, "sec"],
];

const color_str = computed({
  get() {
    let color_float = settings.value.colors[selected_color_key.value];
    return float_to_rgb(color_float);
  },
  set(color_str) {
    settings.value.colors[selected_color_key.value] = rgb_to_float(color_str);
  },
});

function reset_color_mappings() {
  let body = { action: "reset_color_mappings" };
  axiosPut("/rest/settings", body);
}

function set_settings(var_name) {
  let body = { action: "set_settings" };
  body[var_name] = appStore.settings[var_name];
  axiosPut("/rest/settings", body);
}

function set_color_put() {
  let body = {
    action: "set_color",
    color_rgb: settings.value.colors[selected_color_key.value],
    color_key: selected_color_key.value,
  };
  axiosPut("/rest/settings", body);
}

function float_to_rgb(floatList) {
  return `rgb(${Math.round(floatList[0] * 255)}, ${Math.round(
    floatList[1] * 255
  )}, ${Math.round(floatList[2] * 255)})`;
}

function rgb_to_float(rgb) {
  var parts = rgb.substring(4, rgb.length - 1).split(",");
  var r = parseInt(parts[0]) / 255;
  var g = parseInt(parts[1]) / 255;
  var b = parseInt(parts[2]) / 255;
  return [r, g, b];
}

function get_button_styling(idx) {
  const key = color_keys[idx];
  let out_list = [];
  out_list.push("height: 60px;");
  out_list.push("padding-top: 16px;");
  out_list.push("border-bottom: 8px solid ");
  out_list.push(float_to_rgb(settings.value.colors[key]));
  out_list.push(";");
  out_list.push("background-color: ");
  out_list.push(
    selected_color_key.value == key
      ? float_to_rgb(settings.value.colors[key])
      : "#000"
  );
  out_list.push(";");
  let final_str = out_list.join(" ");
  return final_str;
}

function gen_speed_options() {
  return meta.value.color_transition_speeds.map((speed_str) => ({
    label: speed_str.toUpperCase(),
    value: speed_str,
  }));
}
</script>
