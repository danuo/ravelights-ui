<template>
  <div class="q-mt-xs q-mb-lg">
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
  <div class="q-mb-lg row q-col-gutter-xs">
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
  data() {
    return {
      selectedTargetLevel: 0,
      buttons: [],
    };
  },
  mounted() {
    fetch("/rest/meta")
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.buttons = response.controls_live_generator;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleClick(button) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...button, level: this.selectedTargetLevel }),
      };
      fetch("/rest", requestOptions)
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
