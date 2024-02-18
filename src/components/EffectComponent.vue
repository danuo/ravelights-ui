<template>
  <div v-if="Object.keys(appStore.settings).length > 0">
    <!--  ------------------------------- draw modes ------------------------------- -->
    <div class="q-px-md q-pt-sm">
      <q-item-label caption style="color: #474747"> Target level </q-item-label>
      <q-btn-toggle
        v-model="effect_target_level"
        spread
        toggle-color="primary"
        :options="[
          { label: 'all', value: 0 },
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
        ]"
        size="md"
      />
    </div>
    <div class="q-px-md q-pt-sm q-pb-xs">
      <q-item-label caption style="color: #474747">
        Advanced Settings
      </q-item-label>
    </div>
    <div class="q-gutter-y-md">
      <q-card flat bordered style="background-color: rgb(25, 6, 30)">
        <q-tabs v-model="advanced_settings_mode" align="justify">
          <q-tab name="frame_patterns" label="frame patterns" />
        </q-tabs>

        <q-separator />

        <q-tab-panels
          v-model="advanced_settings_mode"
          animated
          style="background-color: rgb(8, 2, 10)"
        >
          <q-tab-panel name="frame_patterns">
            <div class="q-px-md q-pb-xs">
              <q-item-label caption style="color: #474747">
                Frames Pattern Selection
              </q-item-label>
            </div>
            <div class="row q-col-gutter-xs">
              <div
                v-for="(e, gen_type_idx) in frames_pattern_options.length"
                :key="gen_type_idx"
                class="col-6"
              >
                <div
                  @click="this.frames_pattern = gen_type_idx"
                  :class="
                    this.frames_pattern == gen_type_idx
                      ? 'green-box'
                      : 'grey-box'
                  "
                >
                  <div>{{ frames_pattern_options[gen_type_idx] }}</div>
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
                v-for="(e, gen_type_idx) in quarters_pattern_options.length"
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
                  <div>{{ quarters_pattern_options[gen_type_idx] }}</div>
                </div>
              </div>
            </div>
            <div class="q-mx-md q-mt-md">
              <q-item-label caption style="color: #474747">
                Multi
              </q-item-label>
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
    <div class="q-px-md q-pt-sm q-pb-xs">
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
    <div
      class="row q-col-gutter-xs"
      v-if="meta.available_generators.effect !== null"
    >
      <div
        class="col-4"
        v-for="gen in meta.available_generators.effect"
        :key="gen"
      >
        <q-btn
          :label="replace_underscores(gen['generator_name'])"
          @click="set_effect(gen.generator_name)"
          style="width: 100%; height: 80px"
          class="q-pa-sm"
          :square="true"
          color="primary"
          text-color="#000"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAppStore, axiosPut } from "stores/app-store";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { settings, meta, effect_target_level } = storeToRefs(appStore);

const frames_pattern = ref(0);
const frames_pattern_options = [
  ["L1", 0],
  ["L2", 0],
  ["L3", 0],
  ["L3", 0, 1],
  ["L4", 0],
  ["L8", 0, 4, 6],
  ["L16", 0, 7, 11, 13, 15],
];
const multi = ref(0);
const multi_options = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 10,
  6: 20,
};
const quarters_pattern = ref(0);
const quarters_pattern_options = [
  ["0A", "0C"],
  ["0A", "2A"],
  ["0A", "3A", "7A", "7C"],
];
const limit_frames = ref(5);
const limit_frames_options = {
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
};
const limit_quarters = ref(5);
const limit_loopquarters = ref(5);
const limit_loopquarters_options = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 6,
  5: 8,
  6: 16,
  7: 32,
};
const loop_length = ref(3);
const loop_length_options = {
  0: 1,
  1: 2,
  2: 4,
  3: 8,
  4: 16,
  5: 32,
};
const limit_loop = ref(5);
const limit_loop_options = {
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
};

const mode = ref("quarters");

function replace_underscores(input_string) {
  return input_string.replace(/_/g, " ");
}

function set_effect(effectName) {
  let body = {
    action: "set_effect",
    effect_name: effectName,
    timeline_level: effect_target_level.value,
    mode: mode.value,
    limit_frames: limit_frames_options[limit_frames.value],
    limit_quarters: limit_frames_options[limit_quarters.value],
    limit_loopquarters: limit_loopquarters_options[limit_loopquarters.value],
    loop_length_beats: loop_length_options[loop_length.value],
    limit_quarters_loop: limit_loop_options[limit_loop.value],
    multi: multi_options[multi.value],
    frames_pattern: frames_pattern_options[frames_pattern.value],
    quarters_pattern: quarters_pattern_options[quarters_pattern.value],
  };
  axiosPut("/rest/settings", body);
}

function set_settings(var_name) {
  let body = { action: "set_settings" };
  body[var_name] = settings[var_name];
  axiosPut("/rest/settings", body);
}
</script>
