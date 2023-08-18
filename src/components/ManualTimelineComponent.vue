<template>
  <div class="q-mt-xs row justify-between">
    <q-btn-toggle
      v-model="global_manual_timeline_level"
      @click="changeIndex()"
      :toggle-color="use_manual_timeline ? 'primary' : 'dark'"
      :options="[
        { label: 'black', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
      ]"
      size="lg"
    />
    <q-btn-toggle
      v-model="use_manual_timeline"
      @click="changeMode()"
      toggle-color="primary"
      :options="[
        { label: 'manual', value: true },
        { label: 'timeline', value: false },
      ]"
    />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      global_manual_timeline_level: ref(0),
      use_manual_timeline: ref(true),
    };
  },
  mounted() {
    fetch("/rest/settings")
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        console.log(response);
        this.use_manual_timeline = response.use_manual_timeline;
        this.global_manual_timeline_level =
          response.global_manual_timeline_level;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    changeIndex() {
      this.use_manual_timeline = true;
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "set_settings",
          global_manual_timeline_level: this.global_manual_timeline_level,
          use_manual_timeline: this.use_manual_timeline,
        }),
      };
      this.$bus.emit(
        "global_manual_timeline_level",
        this.global_manual_timeline_level
      );
      fetch("/rest/settings", requestOptions)
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
          action: "set_settings",
          use_manual_timeline: this.use_manual_timeline,
        }),
      };
      fetch("/rest/settings", requestOptions)
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
