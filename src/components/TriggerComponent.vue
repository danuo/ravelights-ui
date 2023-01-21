<template>
  <h5 class="text-center q-ma-md">triggers</h5>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      v-for="(e, idx) in triggers['pattern'].length"
      :key="idx"
      label="test"
    />
  </div>
</template>

<script>
export default {
  name: 'TriggerComponent',
  data() {
    return {
      triggers: null,
    };
  },
  mounted() {
    fetch('/api')
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.triggers = response.triggers;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {},
};
</script>
