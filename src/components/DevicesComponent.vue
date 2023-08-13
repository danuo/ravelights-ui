<template>
  <q-list bordered separator>
    <q-item v-for="(e, idx) in devices.length" :key="idx">
      <q-item-section> test </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  data() {
    return {
      devices: [],
    };
  },
  mounted() {
    fetch("/rest/devices")
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        console.log(response);
        this.devices = response;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {},
};
</script>
