<template>
  <div class="q-mb-lg">
    <q-btn-toggle
      v-model="selectedTargetLevel"
      toggle-color="primary"
      :options="[
        { label: 'Auto', value: 0 },
        { label: 'Primary', value: 1 },
        { label: 'Seconday', value: 2 },
        { label: 'Tertiary', value: 3 },
      ]"
    />
  </div>
  <div class="row q-col-gutter-xs">
    <q-btn
      class="col-4"
      v-for="button in buttons"
      :key="button.name"
      :label="button.name"
      @click="handleClick(button)"
    />
  </div>
</template>

<script>
export default {
  name: 'ButtonGenerator',
  data() {
    return {
      selectedTargetLevel: 0,
      buttons: [],
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
