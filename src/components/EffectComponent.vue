<template>
  <h5 class="text-center q-ma-md">Effects</h5>
  <div class="q-px-lg q-pt-md q-pb-xl" v-if="apiResponse !== null">
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

  <h5 class="text-center q-ma-md">Effect Selector</h5>

  <!-- effect list -->
  <div class="row q-col-gutter-xs" v-if="apiResponse !== null">
    <div
      class="col-4"
      v-for="gen in apiResponse['meta']['available_generators']['effect']"
      :key="gen"
    >
      <q-btn
        :label="replace_underscores(gen['generator_name'])"
        style="width: 100%; height: 100px"
        class="q-pa-sm"
        :square="true"
        @click="setEffect(gen.generator_name)"
        color="primary"
        text-color="#000"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EffectComponent',
  data() {
    return {
      apiResponse: null,
      objMarkerLabel: null,
      length_selection: 0,
    };
  },
  mounted() {
    fetch('/rest')
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.apiResponse = response;
        this.objMarkerLabel = response.meta.steps_dict;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    replace_underscores(input_string) {
      return input_string.replace(/_/g, ' ');
    },
    setEffect(effectName) {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'set_effect',
          effect_name: effectName,
          length_frames: 8,
        }),
      };
      fetch('/rest', requestOptions)
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
