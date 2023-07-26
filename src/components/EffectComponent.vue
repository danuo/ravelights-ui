<template>
  <h5 class="text-center q-ma-md">Effect Selector</h5>

  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-card>
        <q-tabs v-model="mode" align="justify">
          <q-tab name="quarters" label="Beat Limit" />
          <q-tab name="frames" label="Frame Limit" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="mode" animated>
          <q-tab-panel name="quarters">
            <div class="q-px-lg q-pt-lg q-pb-xs">
              <q-slider
                v-model="loop_length"
                color="primary"
                selection-color="secondary"
                track-size="15px"
                thumb-size="30px"
                :min="0"
                :max="Object.keys(loop_length_options).length - 1"
                :marker-labels="loop_length_options"
                snap
                label-always
                label-value="loop length"
              />
              <q-slider
                v-model="frames_length"
                color="primary"
                selection-color="secondary"
                track-size="15px"
                thumb-size="30px"
                :min="0"
                :max="Object.keys(frames_length_options).length - 1"
                :marker-labels="frames_length_options"
                snap
                label-always
                label-value="frames length"
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="frames">
            <div class="q-px-lg q-pt-lg q-pb-xs">
              <q-slider
                v-model="frames_length"
                color="primary"
                selection-color="secondary"
                track-size="15px"
                thumb-size="30px"
                :min="0"
                :max="Object.keys(frames_length_options).length - 1"
                :marker-labels="frames_length_options"
                snap
                label-always
                label-value="frames length"
              />
            </div>
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
        @click="setEffect(gen.generator_name, loop_length_options[loop_length])"
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
      frames_length: 5,
      frames_length_options: {
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 6,
        5: 8,
        6: 12,
        7: 20,
        8: 40,
        9: "match",
        10: "inf",
      },
      loop_length_options: {
        0: 1,
        1: 2,
        2: 4,
        3: 8,
        4: 16,
        5: 32,
        6: "match",
        7: "inf",
      },
      loop_length: 3,
      mode: ref("quarters"),
    };
  },
  mounted() {
    fetch("/rest")
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.apiResponse = response;
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
