<template>
  <!-- ---------------------------- pattern settings ---------------------------- -->

  <!--  ------------------------------- draw modes ------------------------------- -->

  <div class="q-px-md q-pt-md q-pb-xs">
    <q-item-label caption style="color: #474747">
      Advanced Settings
    </q-item-label>
  </div>
  <div class="q-gutter-y-md q-pb-md">
    <q-card flat bordered style="background-color: rgb(25, 6, 30)">
      <q-tabs v-model="advanced_settings_mode" align="justify">
        <q-tab name="draw_mode" label="draw_mode" />
        <q-tab name="frame_patterns" label="frame patterns" />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="advanced_settings_mode"
        animated
        style="background-color: rgb(8, 2, 10)"
      >
        <q-tab-panel name="draw_mode">
          <div class="q-px-md row justify-between">
            <div>
              <q-item-label caption style="color: #474747">
                Global Effect Draw mode
              </q-item-label>
              <q-btn-toggle
                v-model="global_effect_draw_mode"
                @click="change_settings('global_effect_draw_mode')"
                toggle-color="primary"
                :options="[
                  { label: 'overlay', value: 'overlay' },
                  { label: 'normal', value: 'normal' },
                ]"
                size="md"
              />
            </div>
            <div>
              <q-item-label caption style="color: #474747">
                Effect Draw mode
              </q-item-label>
              <q-btn-toggle
                v-model="effect_draw_mode"
                @click="change_settings('effect_draw_mode')"
                toggle-color="primary"
                :options="[
                  { label: 'overlay', value: 'overlay' },
                  { label: 'normal', value: 'normal' },
                ]"
                size="md"
              />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="frame_patterns">
          <div class="q-px-md q-pb-xs">
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
                :class="
                  this.frames_pattern == gen_type_idx ? 'green-box' : 'grey-box'
                "
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
                  this.quarters_pattern == gen_type_idx
                    ? 'green-box'
                    : 'grey-box'
                "
              >
                <div>{{ this.quarters_pattern_options[gen_type_idx] }}</div>
              </div>
            </div>
          </div>
          <div class="q-mx-md q-mt-md">
            <q-item-label caption style="color: #474747"> Multi </q-item-label>
          </div>
          <div class="q-px-lg">
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
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
  <div class="q-px-md q-pt-md q-pb-xs">
    <q-item-label caption style="color: #474747">
      Effect Duration
    </q-item-label>
  </div>
  <div class="q-gutter-y-md q-pb-md">
    <q-card flat bordered style="background-color: rgb(25, 6, 30)">
      <q-tabs v-model="mode" align="justify">
        <q-tab name="frames" label="Frame Limit" />
        <q-tab name="quarters" label="Quarters Limit" />
        <q-tab name="loopquarters" label="Loop Quarters Limit" />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="mode"
        animated
        style="background-color: rgb(8, 2, 10)"
      >
        <q-tab-panel name="frames">
          <div class="q-px-md q-py-md">
            <q-list>
              <q-item-label caption> frames limit </q-item-label>
            </q-list>
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
            <q-list>
              <q-item-label caption> quarters limit </q-item-label>
            </q-list>

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
          <q-list>
            <div class="q-px-md q-py-md">
              <q-item-label caption> frames limit [frames] </q-item-label>
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
              <q-item-label caption> quarters limit [quarters] </q-item-label>
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
              <q-item-label caption> loop length [beats] </q-item-label>
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
              <q-item-label caption> loop limit [n times] </q-item-label>
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
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>

  <!-- available effects -->
  <div class="row q-col-gutter-xs" v-if="available_effects !== null">
    <div class="col-4" v-for="gen in available_effects" :key="gen">
      <q-btn
        :label="replace_underscores(gen['generator_name'])"
        @click="setEffect(gen.generator_name)"
        style="width: 100%; height: 80px"
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
      global_effect_draw_mode: "overlay",
      effect_draw_mode: "overlay",
      available_effects: null,
      frames_pattern: 0,
      frames_pattern_options: [
        ["L1", 0],
        ["L2", 0],
        ["L3", 0],
        ["L3", 0, 1],
        ["L4", 0],
        ["L8", 0, 4, 6],
        ["L16", 0, 7, 11, 13, 15],
      ],
      multi: 0,
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
        ["0A", "0C"],
        ["0A", "2A"],
        ["0A", "3A", "7A", "7C"],
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
        10: "inf",
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
      advanced_settings_mode: ref("draw_mode"),
    };
  },
  mounted() {
    fetch("/rest/settings")
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.apiResponse = response;
        this.global_effect_draw_mode = response.global_effect_draw_mode;
        this.effect_draw_mode = response.effect_draw_mode;
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("/rest/meta")
      .then((responsePromise) => responsePromise.json())
      .then((response) => {
        this.available_effects = response.available_generators.effect;
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
          multi: this.multi_options[this.multi],
          frames_pattern: this.frames_pattern_options[this.frames_pattern],
          quarters_pattern:
            this.quarters_pattern_options[this.quarters_pattern],
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
      this.$bus.emit("refresh_effect_list");
    },
    change_settings(var_name) {
      let requestBody = {
        action: "set_settings",
      };
      requestBody[var_name] = this[var_name];
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
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
