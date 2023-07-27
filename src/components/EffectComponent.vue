<template>
  <h5 class="text-center q-ma-md">Effect Selector</h5>

  <div class="q-px-md q-py-xs">
    <q-item-label caption style="color: #474747">
      Frames Pattern Selection
    </q-item-label>
  </div>
  <div class="row q-col-gutter-xs" v-if="apiResponse !== null">
    <div
      v-for="(e, gen_type_idx) in this.frame_patterns.length"
      :key="gen_type_idx"
      class="col-6"
    >
      <div
        @click="this.selected_pattern = gen_type_idx"
        :class="
          this.selected_pattern == gen_type_idx ? 'green-box' : 'grey-box'
        "
      >
        <div>{{ this.frame_patterns[gen_type_idx] }}</div>
      </div>
    </div>
  </div>

  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-card flat bordered style="background-color: rgb(30, 6, 23)">
        <q-tabs v-model="mode" align="justify">
          <q-tab name="quarters" label="Beat Limit" />
          <q-tab name="frames" label="Frame Limit" />
        </q-tabs>

        <q-separator />

        <q-tab-panels
          v-model="mode"
          animated
          style="background-color: rgb(10, 2, 6)"
        >
          <q-tab-panel name="quarters">
            <div class="q-px-xl q-py-md">
              <q-item-label caption style="color: #676767">
                frames limit
              </q-item-label>
              <q-slider
                v-model="limit_frames"
                color="primary"
                selection-color="secondary"
                track-size="15px"
                thumb-size="30px"
                :min="0"
                :max="Object.keys(limit_frames_options).length - 1"
                :marker-labels="limit_frames_options"
                snap
              />
            </div>
            <div class="q-px-xl q-py-md">
              <q-item-label caption style="color: #676767">
                quarters limit
              </q-item-label>
              <q-slider
                v-model="limit_quarters"
                color="primary"
                selection-color="secondary"
                track-size="15px"
                thumb-size="30px"
                :min="0"
                :max="Object.keys(limit_quarters_options).length - 1"
                :marker-labels="limit_quarters_options"
                snap
              />
            </div>
            <div class="q-px-xl q-py-md">
              <q-item-label caption style="color: #676767">
                loop length
              </q-item-label>
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
              />
            </div>
            <div class="q-px-xl q-py-md">
              <q-item-label caption style="color: #676767">
                loop limit
              </q-item-label>
              <q-slider
                v-model="limit_loop"
                color="primary"
                selection-color="secondary"
                track-size="15px"
                thumb-size="30px"
                :min="0"
                :max="Object.keys(limit_loop_options).length - 1"
                :marker-labels="limit_loop_options"
                snap
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="frames">
            <div class="q-px-xl q-py-md">
              <q-item-label caption style="color: #676767">
                frames limit
              </q-item-label>
              <q-slider
                v-model="limit_frames"
                color="primary"
                selection-color="secondary"
                track-size="15px"
                thumb-size="30px"
                :min="0"
                :max="Object.keys(limit_frames_options).length - 1"
                :marker-labels="limit_frames_options"
                snap
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
        @click="setEffect(gen.generator_name)"
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
      limit_frames: 5,
      selected_pattern: 0,
      frame_patterns: [
        [0, 1, 2, 3],
        [0, 2, 4, 6],
        [0, 4, 8, 10, 12],
      ],
      limit_frames_options: {
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
      limit_quarters: 5,
      limit_quarters_options: {
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 6,
        5: 8,
        6: 16,
        7: 32,
        8: "match",
      },
      loop_length: 3,
      loop_length_options: {
        0: 1,
        1: 2,
        2: 4,
        3: 8,
        4: 16,
        5: 32,
      },
      limit_loop: 5,
      limit_loop_options: {
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 6,
        5: 8,
        6: 12,
        7: 20,
        8: 40,
        9: "inf",
      },
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
          mode: this.mode,
          limit_frames: this.limit_frames_options[this.limit_frames],
          limit_quarters: this.limit_quarters_options[this.limit_quarters],
          loop_length_beats: this.loop_length_options[this.loop_length],
          limit_quarters_loop: this.limit_loop_options[this.limit_loop],
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
