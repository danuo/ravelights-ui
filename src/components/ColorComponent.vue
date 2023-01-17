<template>
  <h5 class="text-center q-ma-md">Colors</h5>
  <div class="q-mb-lg">
    <q-btn-toggle
      v-model="selectedColorLevel"
      toggle-color="primary"
      :options="[
        { label: 'color_1', value: 'color_1' },
        { label: 'color_2', value: 'color_2' },
        { label: 'color_sec_1', value: 'color_sec_1' },
        { label: 'color_sec_2', value: 'color_sec_2' },
      ]"
    />
  </div>

  <q-color
    v-model="hex"
    default-view="tune"
    format-model="rgb"
    no-header-tabs
    size="huge"
    :no-footer="true"
  />
  <q-color
    v-model="hex"
    default-view="palette"
    format-model="rgb"
    no-header
    no-header-tabs
    size="huge"
    :no-footer="true"
    :palette="[
      '#019A9D',
      '#D9B801',
      '#E8045A',
      '#B2028A',
      '#2A0449',
      '#019A9D',
      '#019A9D',
      '#D9B801',
      '#E8045A',
      '#B2028A',
      '#2A0449',
      '#019A9D',
    ]"
  />
</template>

<script>
export default {
  name: 'ColorComponent',
  data() {
    return {
      selectedColorLevel: 'color_1',
      buttons: [],
      hex: '#fff',
    };
  },
  mounted() {
    fetch('/api')
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.buttons = response['controls']['controls_live_generator'];
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
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
  },
};
</script>
