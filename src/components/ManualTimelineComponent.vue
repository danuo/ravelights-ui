<template>
  <div class="row justify-between">
    <q-btn-toggle
      v-model="manual_timeline_index"
      :toggle-color="use_timeline ? 'dark' : 'primary'"
      :options="[
        { label: '0', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
      ]"
      @click="changeIndex()"
      size="xl"
    />
    <q-btn-toggle
      v-model="use_timeline"
      toggle-color="primary"
      :options="[
        { label: 'manual', value: false },
        { label: 'timeline', value: true },
      ]"
    />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      manual_timeline_index: ref(0),
      use_timeline: ref(true),
    };
  },
  methods: {
    changeIndex() {
      this.use_timeline = false;
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "set_setting",
          manual_timeline_index: this.manual_timeline_index,
          use_timeline: this.use_timeline,
        }),
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
    changeMode() {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "set_setting",
          use_timeline: this.use_timeline,
        }),
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
