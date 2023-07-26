<template>
  <h5 class="text-center q-ma-md">Effect Selector</h5>
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

  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-card>
        <q-tabs v-model="tab" dense align="justify">
          <q-tab name="beat_limit" label="Beat Limit" />
          <q-tab name="frame_limit" label="Frame Limit" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="beat_limit">
            other stuff with strobe on beats
            <div class="q-px-lg q-pt-lg q-pb-xs" v-if="apiResponse !== null">
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
          </q-tab-panel>

          <q-tab-panel name="frame_limit">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>

  <q-btn
    label="clear effect queue"
    @click="clearEffectQueue()"
    style="height: 70px"
    color="#ddd"
    size="20px"
  />

  <!-- effect list -->
  <div class="row q-col-gutter-xs" v-if="apiResponse !== null">
    <div
      class="col-4"
      v-for="gen in apiResponse['meta']['available_generators']['effect']"
      :key="gen"
    >
      <q-btn
        :label="replace_underscores(gen['generator_name'])"
        @click="setEffect(gen.generator_name, objMarkerLabel[length_selection])"
        style="width: 100%; height: 100px"
        class="q-pa-sm"
        :square="true"
        color="primary"
        text-color="#000"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "EffectComponent",
  data() {
    return {
      apiResponse: null,
      objMarkerLabel: null,
      length_selection: 0,
      tab: ref("beat_limit"),
    };
  },
  mounted() {
    fetch("/rest")
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
      return input_string.replace(/_/g, " ");
    },
    setEffect(effectName, length) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "set_effect",
          effect_name: effectName,
          length_frames: length,
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
    clearEffectQueue() {
      let requestBody = {
        action: "clear_effect_queue",
      };
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
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
