<template>
  <h5 class="text-center q-ma-md">Effect Selector</h5>

  <div class="q-px-md q-py-xs">
    <q-item-label caption style="color: #474747"> Multi </q-item-label>
  </div>
  <q-slider
    v-model="multi"
    color="primary"
    selection-color="secondary"
    track-size="15px"
    thumb-size="30px"
    snap
    :min="0"
    :max="Object.keys(multi_options).length - 1"
    :marker-labels="multi_options"
  />

  <div class="q-px-md q-py-xs">
    <q-item-label caption style="color: #474747">
      Frames Pattern Selection
    </q-item-label>
  </div>
  <div class="row q-col-gutter-xs">
    <div
      v-for="(e, gen_type_idx) in this.frames_pattern_options.length"
      :key="gen_type_idx"
      class="col-6"
    >
      <div
        @click="this.frames_pattern = gen_type_idx"
        :class="this.frames_pattern == gen_type_idx ? 'green-box' : 'grey-box'"
      >
        <div>{{ this.frames_pattern_options[gen_type_idx] }}</div>
      </div>
    </div>
  </div>

  <div class="q-px-md q-py-xs">
    <q-item-label caption style="color: #474747">
      Quater Pattern Selection
    </q-item-label>
  </div>
  <div class="row q-col-gutter-xs">
    <div
      v-for="(e, gen_type_idx) in this.quarters_pattern_options.length"
      :key="gen_type_idx"
      class="col-6"
    >
      <div
        @click="this.quarters_pattern = gen_type_idx"
        :class="
          this.quarters_pattern == gen_type_idx ? 'green-box' : 'grey-box'
        "
      >
        <div>{{ this.quarters_pattern_options[gen_type_idx] }}</div>
      </div>
    </div>
  </div>

  <div class="q-px-md q-pt-lg q-pb-xs">
    <q-item-label caption style="color: #474747">
      Quater Pattern Selection
    </q-item-label>
  </div>

  <div class="q-px-md">
    <div class="q-gutter-y-md">
      <q-card flat bordered style="background-color: rgb(30, 6, 23)">
        <q-tabs v-model="mode" align="justify">
          <q-tab name="frames" label="Frame Limit" />
          <q-tab name="quarters" label="Quarters Limit" />
          <q-tab name="loopquarters" label="Loop Quarters Limit" />
        </q-tabs>

        <q-separator />

        <q-tab-panels
          v-model="mode"
          animated
          style="background-color: rgb(10, 2, 6)"
        >
          <q-tab-panel name="frames">
            <div class="q-px-md q-py-md">
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

          <q-tab-panel name="quarters">
            <div class="q-px-md q-py-md">
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
                :max="Object.keys(limit_frames_options).length - 1"
                :marker-labels="limit_frames_options"
                snap
              />
            </div>
          </q-tab-panel>

          <q-tab-panel name="loopquarters">
            <div class="q-px-md q-py-md">
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
            <div class="q-px-md q-py-md">
              <q-item-label caption style="color: #676767">
                quarters limit
              </q-item-label>
              <q-slider
                v-model="limit_loopquarters"
                color="primary"
                selection-color="secondary"
                track-size="15px"
                thumb-size="30px"
                :min="0"
                :max="Object.keys(limit_loopquarters_options).length - 1"
                :marker-labels="limit_loopquarters_options"
                snap
              />
            </div>
            <div class="q-px-md q-py-md">
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
            <div class="q-px-md q-py-md">
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
      frames_pattern: 0,
      frames_pattern_options: [
        ["L1", 0],
        ["L2", 0],
        ["L3", 0],
        ["L3", 0, 1],
        ["L4", 0],
        ["L8", 0, 4, 6],
      ],
      multi: 1,
      multi_options: {
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        5: 10,
        6: 20,
      },
      quarters_pattern: 0,
      quarters_pattern_options: [
        ["1A", "2A"],
        ["1A", "1C"],
      ],
      limit_frames: 5,
      limit_frames_options: {
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 6,
        5: 8,
        6: 12,
        7: 16,
        8: 20,
        9: 40,
        10: "match",
        11: "inf",
      },
      limit_quarters: 5,
      limit_loopquarters: 5,
      limit_loopquarters_options: {
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
    setEffect(effectName) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "set_effect",
          effect_name: effectName,
          mode: this.mode,
          limit_frames: this.limit_frames_options[this.limit_frames],
          limit_quarters: this.limit_frames_options[this.limit_quarters],
          limit_loopquarters:
            this.limit_loopquarters_options[this.limit_loopquarters],
          loop_length_beats: this.loop_length_options[this.loop_length],
          limit_quarters_loop: this.limit_loop_options[this.limit_loop],
          multi: this.multi,
          frames_pattern: this.frames_pattern_options[this.frames_pattern],
          quarters_pattern:
            this.quarters_pattern_options[this.quarters_pattern],
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
      this.$bus.emit("refresh_effect_list");
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
