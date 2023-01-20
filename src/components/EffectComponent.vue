<template>
  <div class="q-px-lg q-pt-md q-pb-xl" v-if="api_response !== null">
    <q-slider
      v-model="length_selection"
      color="primary"
      selection-color="secondary"
      track-size="15px"
      thumb-size="30px"
      :min="0"
      :max="Object.keys(objMarkerLabel).length - 1"
      :marker-labels="objMarkerLabel"
      snap
      label-always
      :label-value="'effect length'"
    />
  </div>
</template>

<script>
export default {
  name: 'EffectComponent',
  data() {
    return {
      api_response: null,
      objMarkerLabel: null,
      length_selection: 0,
    };
  },
  mounted() {
    fetch('/api')
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.api_response = response;
        this.objMarkerLabel = response.meta.steps_dict;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {},
};
</script>
