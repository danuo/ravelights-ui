<template>
  <!-- <h5 class="text-center q-ma-md">Colors</h5> -->
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
    v-model="color_str"
    default-value="#000"
    default-view="tune"
    format-model="rgb"
    no-header-tabs
    size="huge"
    :no-footer="true"
  />
  <q-color
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

  <div class="row q-pa-md">
    <div class="col-4">
      <q-toggle
        v-model="temp_toggle"
        size="40px"
        color="secondary"
        label="Activate Rule"
      />
    </div>
    <div class="col-8">
      <q-select
        outlined
        v-model="model"
        :options="rule_options"
        label="Outlined"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorComponent',
  data() {
    return {
      color: [[1.0, 0, 0]],
      color_names: [],
      selectedColorLevel: 0,
      palette: [],
      rule_options: ['none', 'random', 'complementary'],
      temp_toggle: true,
    };
  },
  mounted() {
    fetch('/api')
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.palette = response.controls.controls_color_palette;
        this.color = response.color;
        this.color_names = response.color_names;
        console.log(this.color_names);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    color_str: {
      get() {
        const color_float = this.color[this.selectedColorLevel];
        return this.floatToRgb(color_float);
      },
      set(color_str) {
        this.color[this.selectedColorLevel] = this.rgbToFloat(color_str);
      },
    },
  },
  methods: {
    handleClick(button) {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...button, level: this.selectedTargetLevel }),
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
    floatToRgb(floatList) {
      return `rgb(${Math.round(floatList[0] * 255)}, ${Math.round(
        floatList[1] * 255
      )}, ${Math.round(floatList[2] * 255)})`;
    },
    rgbToFloat(rgb) {
      var parts = rgb.substring(4, rgb.length - 1).split(',');
      var r = parseInt(parts[0]) / 255;
      var g = parseInt(parts[1]) / 255;
      var b = parseInt(parts[2]) / 255;
      return [r, g, b];
    },
    get_button_styling(idx) {
      let out_list = [];
      out_list.push('height: 60px;');
      out_list.push('padding-top: 16px;');
      out_list.push('border-bottom: 8px solid ');
      out_list.push(this.floatToRgb(this.color[idx]));
      out_list.push(';');
      out_list.push('background-color: ');
      out_list.push(
        this.selectedColorLevel == idx
          ? this.floatToRgb(this.color[idx])
          : '#000'
      );
      out_list.push(';');
      let final_str = out_list.join(' ');
      console.log(final_str);
      return final_str;
    },
  },
};
</script>
