<template>
  <div class="row q-col-gutter-xs">
    <q-btn
      class="col-4"
      v-for="button in buttons"
      :key="button.name"
      :label="button.name"
      @click="handleClick(button.action)"
    />
  </div>
</template>

<script>
export default {
  name: 'ButtonGenerator',
  data() {
    return {
      buttons: [],
    };
  },
  mounted() {
    fetch('/api')
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.buttons = response['global_buttons'];
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleClick(action) {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: action,
        }),
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
