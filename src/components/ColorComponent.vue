<template>
  <h5 class="text-center q-ma-md">Colors</h5>
  <!-- <q-badge color="grey-3" text-color="black" class="q-mb-sm">
    {{ color }}
    {{ selectedColorLevel }}
  </q-badge> -->

  <div class="q-mb-lg row flex-center" style="width: 100%">
    <div class="q-gutter-y-md" style="width: 70%">
      <q-btn-toggle
        v-model="selectedColorLevel"
        toggle-color="primary"
        style="height: 60px"
        :spread="true"
        :options="color_options"
      />
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
</template>

<style lang="sass" scoped>
.custom_button
  width: 200px
</style>

<script>
export default {
  name: 'ColorComponent',
  data() {
    return {
      color: [[1.0, 0, 0]],
      color_names: [],
      selectedColorLevel: 0,
      palette: [],
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
    color_options() {
      let originalList = ['str1', 'str2', 'str3'];
      return this.color_names.map((str, index) => ({
        label: str,
        value: index,
      }));
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
  },
};
</script>
